import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { getAuthToken, handleExecuteError } from '../../GenericFunctions';

export async function executeColumn(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const { token, apiUrl } = await getAuthToken(this);

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		try {
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			if (operation === 'list') {
				const boardId = this.getNodeParameter('boardId', itemIndex) as string;

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `${apiUrl.replace(/\/$/, '')}/columns/boardId`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					qs: { boardId },
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				let data = response.data || response.items || response;
				if (!Array.isArray(data)) {
					data = data ? [data] : [];
				}

				// API retorna [{ columns: [{ id, title, ... }, ...] }] — extrair apenas as colunas
				let columns: IDataObject[] = [];
				if (data[0] && Array.isArray((data[0] as { columns?: unknown[] }).columns)) {
					columns = (data[0] as { columns: IDataObject[] }).columns;
				} else {
					columns = data as IDataObject[];
				}

				for (const column of columns) {
					returnData.push({ json: column, pairedItem: itemIndex });
				}
			}
		} catch (error) {
			const operation = this.getNodeParameter('operation', itemIndex) as string;
			handleExecuteError(this, error, operation, itemIndex, returnData);
		}
	}

	return [returnData];
}
