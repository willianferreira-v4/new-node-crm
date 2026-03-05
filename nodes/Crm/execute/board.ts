import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { getAuthToken, handleExecuteError } from '../../GenericFunctions';

export async function executeBoard(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const { token, apiUrl } = await getAuthToken(this);

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		try {
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			if (operation === 'list' || operation === 'listTitles') {
				const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
				const qs: IDataObject = {};

				if (!returnAll) {
					qs.limit = this.getNodeParameter('limit', itemIndex) as number;
				}

				if (operation === 'listTitles') {
					const boardType = this.getNodeParameter('boardType', itemIndex, '') as string;
					if (boardType) {
						qs.boardType = boardType;
					}
				}

				const urlSuffix = operation === 'listTitles' ? '/board/titles' : '/boards';

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `${apiUrl.replace(/\/$/, '')}${urlSuffix}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					qs,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				let boards = response.data || response.items || response;
				if (!Array.isArray(boards)) {
					boards = [boards];
				}

				for (const board of boards) {
					returnData.push({ json: board, pairedItem: itemIndex });
				}
			}
		} catch (error) {
			const operation = this.getNodeParameter('operation', itemIndex) as string;
			handleExecuteError(this, error, operation, itemIndex, returnData);
		}
	}

	return [returnData];
}
