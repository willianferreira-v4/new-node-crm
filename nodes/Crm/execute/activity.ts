import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { crmApiRequest } from '../../GenericFunctions';

export async function executeActivity(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const operation = this.getNodeParameter('operation', i) as string;

			if (operation === 'create') {
				const targetType = this.getNodeParameter('targetType', i) as string;
				const targetId = this.getNodeParameter('targetId', i) as string;
				const type = this.getNodeParameter('type', i) as string;
				const title = this.getNodeParameter('title', i) as string;
				const priority = this.getNodeParameter('priority', i) as string;
				let dueAt = this.getNodeParameter('dueAt', i) as string;
				
				// Fix dueAt to be a valid ISO 8601 datetime string with timezone for Zod (.datetime())
				// Zod expects strict ISO8601 like: "2026-03-12T00:00:00Z" or "2026-03-12T00:01:00.000Z"
				if (dueAt) {
					// If it contains a space (like "2026-03-12 00:01:00"), replace with T
					if (dueAt.includes(' ')) {
						dueAt = dueAt.replace(' ', 'T');
					}
					// Ensure it has a timezone indicator (Z or offset like -03:00)
					if (!dueAt.endsWith('Z') && !dueAt.match(/[+-]\d{2}:\d{2}$/)) {
						dueAt = `${dueAt}Z`;
					}
				}

				const assigneeIdentityId = this.getNodeParameter('assigneeIdentityId', i) as string;

				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				const body: IDataObject = {
					targetType,
					targetId,
					type,
					title,
					priority,
					dueAt,
					assigneeIdentityId,
					...additionalFields,
				};

				const response = await crmApiRequest.call(this, 'POST', '/activities', body);
				returnData.push({ json: response, pairedItem: i });
			} else if (operation === 'update') {
				const activityId = this.getNodeParameter('activityId', i) as string;
				const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

				const body: IDataObject = {
					...updateFields,
				};

				const response = await crmApiRequest.call(this, 'PATCH', `/activities/${activityId}`, body);
				returnData.push({ json: response, pairedItem: i });
			} else if (operation === 'get') {
				const activityId = this.getNodeParameter('activityId', i) as string;

				const response = await crmApiRequest.call(this, 'GET', `/activities/${activityId}`);
				returnData.push({ json: response, pairedItem: i });
			} else if (operation === 'list') {
				const returnAll = this.getNodeParameter('returnAll', i) as boolean;
				const filters = this.getNodeParameter('filters', i) as IDataObject;

				// Setting up QS
				const qs: IDataObject = { ...filters };

				let page = 1;
				const limit = returnAll ? 100 : (this.getNodeParameter('limit', i) as number);
				qs.page = page;
				qs.limit = limit;

				// Handle pagination if returnAll is true
				let activities: IDataObject[] = [];
				let fetchMore = true;

				while (fetchMore) {
					const response = await crmApiRequest.call(this, 'GET', '/activities', {}, qs);
					const currentData = response.data || response;
					
					if (Array.isArray(currentData)) {
						activities.push(...currentData);
						if (!returnAll || currentData.length < limit || currentData.length === 0) {
							fetchMore = false;
						} else {
							page++;
							qs.page = page;
						}
					} else {
						activities.push(currentData);
						fetchMore = false;
					}
				}

				if (!returnAll) {
					activities = activities.slice(0, limit);
				}

				for (const activity of activities) {
					returnData.push({ json: activity, pairedItem: i });
				}
			}
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: i });
			} else {
				throw error;
			}
		}
	}

	return [returnData];
}
