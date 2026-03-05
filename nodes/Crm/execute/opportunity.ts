import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { getAuthToken, handleExecuteError } from '../../GenericFunctions';

export async function executeOpportunity(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const { token, apiUrl } = await getAuthToken(this);

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		try {
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			if (operation === 'list') {
				const getBy = this.getNodeParameter('getBy', itemIndex) as string;
				const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
				const filters = this.getNodeParameter('filters', itemIndex) as IDataObject;

				const qs: IDataObject = { ...filters };

				let url = '';
				if (getBy === 'board') {
					qs.boardId = this.getNodeParameter('boardId', itemIndex) as string;
					url = `${apiUrl.replace(/\/$/, '')}/opportunity/boards`;
				} else {
					qs.columnId = this.getNodeParameter('columnId', itemIndex) as string;
					url = `${apiUrl.replace(/\/$/, '')}/opportunity/columns`;
				}

				if (!returnAll) {
					qs.limit = this.getNodeParameter('limit', itemIndex) as number;
				}

				const options: IHttpRequestOptions = {
					method: 'GET',
					url,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					qs,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				let opportunities = response.data || response.items || response;
				if (!Array.isArray(opportunities)) {
					opportunities = [opportunities];
				}

				for (const opportunity of opportunities) {
					returnData.push({ json: opportunity, pairedItem: itemIndex });
				}
			} else if (operation === 'changeTenant') {
				const opportunityId = this.getNodeParameter('opportunityId', itemIndex) as string;
				const newTenantId = this.getNodeParameter('tenantId', itemIndex) as string;

				const body: IDataObject = {
					opportunityId,
					newTenantId,
				};

				const options: IHttpRequestOptions = {
					method: 'PUT',
					url: `${apiUrl.replace(/\/$/, '')}/tenants/opp-contact-company-lead`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			}
		} catch (error) {
			const operation = this.getNodeParameter('operation', itemIndex) as string;
			handleExecuteError(this, error, operation, itemIndex, returnData);
		}
	}

	return [returnData];
}
