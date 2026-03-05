import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { getAuthToken, handleExecuteError, cleanObject } from '../../GenericFunctions';

export async function executeLead(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const { token, apiUrl } = await getAuthToken(this);

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		try {
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			if (operation === 'createLead') {
				const ownerId = this.getNodeParameter('ownerId', itemIndex) as string;
				const columnId = this.getNodeParameter('columnId', itemIndex) as string;
				const companyName = this.getNodeParameter('companyName', itemIndex) as string;
				const title = this.getNodeParameter('title', itemIndex) as string;
				const email = this.getNodeParameter('email', itemIndex, '') as string;
				const phone = this.getNodeParameter('phone', itemIndex, '') as string;
				const taxId = this.getNodeParameter('taxId', itemIndex, '') as string;
				const companyNationality = this.getNodeParameter(
					'companyNationality',
					itemIndex,
					'',
				) as string;
				const originChannelId = this.getNodeParameter('originChannelId', itemIndex, '') as string;
				const acquisitionChannelId = this.getNodeParameter(
					'acquisitionChannelId',
					itemIndex,
					'',
				) as string;
				const utmSource = this.getNodeParameter('utmSource', itemIndex, '') as string;
				const utmCampaign = this.getNodeParameter('utmCampaign', itemIndex, '') as string;
				const utmContent = this.getNodeParameter('utmContent', itemIndex, '') as string;
				const utmMedium = this.getNodeParameter('utmMedium', itemIndex, '') as string;
				const utmTerm = this.getNodeParameter('utmTerm', itemIndex, '') as string;
				const sourcePage = this.getNodeParameter('sourcePage', itemIndex, '') as string;

				const body: IDataObject = cleanObject({
					ownerId,
					companyName,
					title,
					email,
					phone,
					taxId,
					companyNationality,
					originChannelId,
					acquisitionChannelId,
					utmSource,
					utmCampaign,
					utmContent,
					utmMedium,
					utmTerm,
					sourcePage,
				});

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/cards/leads/integration/${columnId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};
				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'createAndUpdate') {
				// Get create lead parameters
				const ownerId = this.getNodeParameter('ownerIdCreateUpdate', itemIndex) as string;
				const columnId = this.getNodeParameter('columnIdCreateUpdate', itemIndex) as string;
				const companyName = this.getNodeParameter('companyNameCreateUpdate', itemIndex) as string;
				const title = this.getNodeParameter('titleCreateUpdate', itemIndex) as string;
				const email = this.getNodeParameter('emailCreateUpdate', itemIndex, '') as string;
				const phone = this.getNodeParameter('phoneCreateUpdate', itemIndex, '') as string;
				const taxId = this.getNodeParameter('taxIdCreateUpdate', itemIndex, '') as string;
				const companyNationality = this.getNodeParameter(
					'companyNationalityCreateUpdate',
					itemIndex,
					'',
				) as string;
				const originChannelId = this.getNodeParameter(
					'originChannelIdCreateUpdate',
					itemIndex,
					'',
				) as string;
				const acquisitionChannelId = this.getNodeParameter(
					'acquisitionChannelIdCreateUpdate',
					itemIndex,
					'',
				) as string;
				const utmSource = this.getNodeParameter('utmSourceCreateUpdate', itemIndex, '') as string;
				const utmCampaign = this.getNodeParameter(
					'utmCampaignCreateUpdate',
					itemIndex,
					'',
				) as string;
				const utmContent = this.getNodeParameter('utmContentCreateUpdate', itemIndex, '') as string;
				const utmMedium = this.getNodeParameter('utmMediumCreateUpdate', itemIndex, '') as string;
				const utmTerm = this.getNodeParameter('utmTermCreateUpdate', itemIndex, '') as string;
				const sourcePage = this.getNodeParameter('sourcePageCreateUpdate', itemIndex, '') as string;

				// Build create lead body
				const createBody: IDataObject = cleanObject({
					ownerId,
					companyName,
					title,
					email,
					phone,
					taxId,
					companyNationality,
					originChannelId,
					acquisitionChannelId,
					utmSource,
					utmCampaign,
					utmContent,
					utmMedium,
					utmTerm,
					sourcePage,
				});

				// Create the lead
				const createOptions: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/cards/leads/integration/${columnId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: createBody,
					json: true,
				};

				const createResponse = await this.helpers.httpRequest(createOptions);

				// Extract card ID from response
				const cardId = createResponse.cardId || createResponse.id;

				if (!cardId) {
					throw new NodeOperationError(
						this.getNode(),
						'Could not extract cardId from create lead response',
						{ itemIndex },
					);
				}

				// Get custom fields to update
				const customFields = this.getNodeParameter(
					'customFieldsCreateUpdate.field',
					itemIndex,
					[],
				) as IDataObject[];

				const updateResponses: IDataObject[] = [];

				// Update custom fields if provided
				if (customFields && customFields.length > 0) {
					for (const fieldData of customFields) {
						const fieldId = fieldData.fieldName as string;
						const valueType = fieldData.valueType as string;

						const updateBody: IDataObject = {
							cardId,
							cardCustomFieldsId: fieldId,
						};

						if (valueType === 'listValues') {
							const val = fieldData.listValue as string;
							if (val === undefined || val === '') continue;
							updateBody.listValues = [val];
						} else if (valueType === 'optionValue') {
							const val = fieldData.optionValue as string;
							if (val === undefined || val === '') continue;
							updateBody.listValues = [val];
						} else if (valueType === 'booleanValue') {
							const val = fieldData.booleanValue as boolean;
							if (val === undefined) continue;
							updateBody.booleanValue = val;
						} else if (valueType === 'dateValue') {
							const val = fieldData.dateValue as string;
							if (val === undefined || val === '') continue;
							updateBody.dateValue = val;
						} else if (valueType === 'numberValue') {
							const val = fieldData.numberValue as number;
							if (val === undefined) continue;
							updateBody.numberValue = val;
						}

						const updateOptions: IHttpRequestOptions = {
							method: 'POST',
							url: `${apiUrl.replace(/\/$/, '')}/card-custom-fields-value/upsert`,
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
							body: updateBody,
							json: true,
						};

						const updateResponse = await this.helpers.httpRequest(updateOptions);
						updateResponses.push({
							field: fieldId,
							response: updateResponse,
						});
					}
				}

				// Return combined response
				returnData.push({
					json: {
						cardId,
						createResponse,
						customFieldUpdates: updateResponses,
						success: true,
					},
					pairedItem: itemIndex,
				});
			} else if (operation === 'updateLead') {
				const cardId = this.getNodeParameter('cardIdUpdate', itemIndex) as string;

				// Get all optional fields
				const title = this.getNodeParameter('titleUpdate', itemIndex, '') as string;
				const companyName = this.getNodeParameter('companyNameUpdate', itemIndex, '') as string;
				const email = this.getNodeParameter('emailUpdate', itemIndex, '') as string;
				const phone = this.getNodeParameter('phoneUpdate', itemIndex, '') as string;
				const taxId = this.getNodeParameter('taxIdUpdate', itemIndex, '') as string;
				const ownerId = this.getNodeParameter('ownerIdUpdate', itemIndex, '') as string;
				const tenantId = this.getNodeParameter('tenantIdUpdate', itemIndex, '') as string;
				const originChannelId = this.getNodeParameter(
					'originChannelIdUpdate',
					itemIndex,
					'',
				) as string;
				const acquisitionChannelId = this.getNodeParameter(
					'acquisitionChannelIdUpdate',
					itemIndex,
					'',
				) as string;
				const utmSource = this.getNodeParameter('utmSourceUpdate', itemIndex, '') as string;
				const utmCampaign = this.getNodeParameter('utmCampaignUpdate', itemIndex, '') as string;
				const utmContent = this.getNodeParameter('utmContentUpdate', itemIndex, '') as string;
				const utmMedium = this.getNodeParameter('utmMediumUpdate', itemIndex, '') as string;
				const utmTerm = this.getNodeParameter('utmTermUpdate', itemIndex, '') as string;
				const sourcePage = this.getNodeParameter('sourcePageUpdate', itemIndex, '') as string;
				const lostReason = this.getNodeParameter('lostReasonUpdate', itemIndex, '') as string;
				const lostDescription = this.getNodeParameter(
					'lostDescriptionUpdate',
					itemIndex,
					'',
				) as string;

				// Build body with only non-empty fields
				const body: IDataObject = cleanObject({
					title,
					companyName,
					email,
					phone,
					taxId,
					ownerId,
					tenantId,
					originChannelId,
					acquisitionChannelId,
					utmSource,
					utmCampaign,
					utmContent,
					utmMedium,
					utmTerm,
					sourcePage,
					lostReason,
					lostDescription,
				});

				const options: IHttpRequestOptions = {
					method: 'PUT',
					url: `${apiUrl.replace(/\/$/, '')}/cards/${cardId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'updateLeadField') {
				const cardId = this.getNodeParameter('cardId', itemIndex) as string;
				const fieldsToUpdate = this.getNodeParameter(
					'fieldsToUpdate.field',
					itemIndex,
					[],
				) as IDataObject[];

				const responses: IDataObject[] = [];

				// Process each field
				for (const fieldData of fieldsToUpdate) {
					const fieldId = fieldData.fieldName as string;
					const valueType = fieldData.valueType as string;

					const body: IDataObject = {
						cardId,
						cardCustomFieldsId: fieldId,
					};

					if (valueType === 'listValues') {
						const val = fieldData.listValue as string;
						if (val === undefined || val === '') continue;
						body.listValues = [val];
					} else if (valueType === 'optionValue') {
						const val = fieldData.optionValue as string;
						if (val === undefined || val === '') continue;
						body.listValues = [val];
					} else if (valueType === 'booleanValue') {
						const val = fieldData.booleanValue as boolean;
						if (val === undefined) continue;
						body.booleanValue = val;
					} else if (valueType === 'dateValue') {
						const val = fieldData.dateValue as string;
						if (val === undefined || val === '') continue;
						body.dateValue = val;
					} else if (valueType === 'numberValue') {
						const val = fieldData.numberValue as number;
						if (val === undefined) continue;
						body.numberValue = val;
					}

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${apiUrl.replace(/\/$/, '')}/card-custom-fields-value/upsert`,
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					const response = await this.helpers.httpRequest(options);
					responses.push({
						field: fieldId,
						response,
					});
				}

				returnData.push({
					json: {
						cardId,
						updates: responses,
						success: true,
					},
					pairedItem: itemIndex,
				});
			} else if (operation === 'disqualifyLead') {
				const cardId = this.getNodeParameter('cardIdDisqualify', itemIndex) as string;
				const toColumnId = this.getNodeParameter('toColumnId', itemIndex) as string;
				const newIndex = this.getNodeParameter('newIndex', itemIndex) as number;
				const ignoreColumnsRequiredFieldsValidation = this.getNodeParameter(
					'ignoreColumnsRequiredFieldsValidation',
					itemIndex,
				) as boolean;
				const reasonForLost = this.getNodeParameter('reasonForLost', itemIndex) as string;
				const descriptionForLost = this.getNodeParameter(
					'descriptionForLost',
					itemIndex,
					'',
				) as string;

				const body: IDataObject = {
					toColumnId,
					newIndex,
					ignoreColumnsRequiredFieldsValidation,
					reasonForLost,
					descriptionForLost,
				};

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/cards/${cardId}/disqualify`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'changeTenant') {
				const cardId = this.getNodeParameter('cardIdChangeTenant', itemIndex) as string;
				const tenantId = this.getNodeParameter('tenantId', itemIndex) as string;

				const body: IDataObject = {
					leadId: cardId,
					newTenantId: tenantId,
				};

				const options: IHttpRequestOptions = {
					method: 'PUT',
					url: `${apiUrl.replace(/\/$/, '')}/tenants/lead`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'updateLeadColumn') {
				const cardId = this.getNodeParameter('cardIdUpdateColumn', itemIndex) as string;
				const toColumnId = this.getNodeParameter('toColumnIdUpdate', itemIndex) as string;
				const newIndex = this.getNodeParameter('newIndexUpdate', itemIndex) as number;
				const ignoreColumnsRequiredFieldsValidation = this.getNodeParameter(
					'ignoreColumnsRequiredFieldsValidationUpdate',
					itemIndex,
				) as boolean;

				const body: IDataObject = {
					toColumnId,
					newIndex,
					ignoreColumnsRequiredFieldsValidation,
				};

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/cards/move/${cardId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'addLabel') {
				const cardId = this.getNodeParameter('cardId', itemIndex) as string;
				const labelId = this.getNodeParameter('labelId', itemIndex) as string;

				const body: IDataObject = {
					boardLabelId: labelId,
				};

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/cards/${cardId}/labels`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'removeLabel') {
				const cardId = this.getNodeParameter('cardId', itemIndex) as string;
				const labelId = this.getNodeParameter('labelId', itemIndex) as string;

				const options: IHttpRequestOptions = {
					method: 'DELETE',
					url: `${apiUrl.replace(/\/$/, '')}/cards/${cardId}/labels/${labelId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response || { success: true }, pairedItem: itemIndex });
			} else if (operation === 'upsertCustomField') {
				const cardId = this.getNodeParameter('cardId', itemIndex) as string;
				const cardCustomFieldsId = this.getNodeParameter('cardCustomFieldsId', itemIndex) as string;
				const valueType = this.getNodeParameter('valueType', itemIndex) as string;

				const body: IDataObject = {
					cardId,
					cardCustomFieldsId,
				};

				if (valueType === 'listValues') {
					const val = this.getNodeParameter('listValue', itemIndex) as string;
					body.listValues = [val];
				} else if (valueType === 'optionValue') {
					const val = this.getNodeParameter('optionValue', itemIndex) as string;
					body.listValues = [val];
				} else if (valueType === 'booleanValue') {
					body.booleanValue = this.getNodeParameter('booleanValue', itemIndex) as boolean;
				} else if (valueType === 'dateValue') {
					body.dateValue = this.getNodeParameter('dateValue', itemIndex) as string;
				}

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl.replace(/\/$/, '')}/card-custom-fields-value/upsert`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'get') {
				const cardId = this.getNodeParameter('cardId', itemIndex) as string;

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `${apiUrl.replace(/\/$/, '')}/columns/cards/${cardId}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: itemIndex });
			} else if (operation === 'list') {
				const getBy = this.getNodeParameter('getBy', itemIndex) as string;
				const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
				const filters = this.getNodeParameter('filters', itemIndex) as IDataObject;

				const qs: IDataObject = { ...filters };

				let url = '';
				if (getBy === 'board') {
					qs.boardId = this.getNodeParameter('boardId', itemIndex) as string;
					url = `${apiUrl.replace(/\/$/, '')}/cards/boards`;
				} else {
					qs.columnId = this.getNodeParameter('columnId', itemIndex) as string;
					url = `${apiUrl.replace(/\/$/, '')}/cards`;
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
				let leads = response.data || response.items || response;
				if (!Array.isArray(leads)) {
					leads = [leads];
				}

				for (const lead of leads) {
					returnData.push({ json: lead, pairedItem: itemIndex });
				}
			}
		} catch (error) {
			const operation = this.getNodeParameter('operation', itemIndex) as string;
			handleExecuteError(this, error, operation, itemIndex, returnData);
		}
	}

	return [returnData];
}