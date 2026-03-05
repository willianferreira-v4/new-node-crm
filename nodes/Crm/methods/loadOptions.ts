import {
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
} from 'n8n-workflow';
import { crmApiRequest } from '../../GenericFunctions';

export type CrmCustomField = {
	id: string;
	title?: string;
	name?: string;
	jsonFieldsOptions?: unknown[];
	options?: unknown[];
	listOptions?: unknown[];
	choices?: unknown[];
	values?: unknown[];
	items?: unknown[];
	settings?: {
		options?: unknown[];
		choices?: unknown[];
		listOptions?: unknown[];
	};
	[key: string]: unknown;
};

type CustomFieldItem = {
	id?: string;
	fieldType?: string;
	customFields?: CrmCustomField[];
	fields?: CrmCustomField[];
	cardsCustomFields?: CrmCustomField[];
	[key: string]: unknown;
};

async function fetchAllAvailableCustomFields(this: ILoadOptionsFunctions): Promise<CrmCustomField[]> {
	let cardId: string | undefined;
	
	try {
		cardId = this.getCurrentNodeParameter('cardId') as string | undefined;
	} catch {
		// ignore
	}

	if (cardId) {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', `/custom-fields-categories/${cardId}`);
			const data = responseData?.data || responseData;
			
			const allFields: CrmCustomField[] = [];
			if (Array.isArray(data)) {
				for (const item of data as CustomFieldItem[]) {
					// A rota custom-fields-categories/{cardId} retorna categorias de campos
					if (item.customFields && Array.isArray(item.customFields)) {
						allFields.push(...item.customFields);
					} else if (item.fields && Array.isArray(item.fields)) {
						allFields.push(...item.fields);
					} else if (item.cardsCustomFields && Array.isArray(item.cardsCustomFields)) {
						allFields.push(...item.cardsCustomFields);
					} else if (item.fieldType && item.id) {
						// Caso o array seja flat e não seja categoria
						allFields.push(item as CrmCustomField);
					}
				}
			}
			
			if (allFields.length > 0) {
				return allFields;
			}
		} catch {
			// ignore
		}
	}

	// Fallback padrão se não houver cardId (ex: Node de Create Lead)
	let boardId;
	try {
		boardId = this.getCurrentNodeParameter('boardId', { extractValue: true }) as string | undefined;
	} catch {
		// ignore
	}
	
	const endpoint = boardId ? `/custom-fields/${boardId}` : '/custom-fields';
	const responseData = await crmApiRequest.call(this, 'GET', endpoint).catch(() => null);
	return responseData?.cardsCustomFields || responseData?.data || responseData || [];
}

export const loadOptions = {
	async getOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/users/only-names?page=1&limit=100');
			const owners = responseData?.users || responseData?.data || responseData;
			if (!Array.isArray(owners)) return [{ name: 'Nenhum Owner Encontrado', value: '' }];
			// Backend expects identityId in ownerId (CreateLeadByIntegrationUseCase uses findByIdentityId)
			return owners.map((owner: { name?: string; id: string | number; identity_id?: string }) => ({
				name: owner.name || `Usuário ${owner.id}`,
				value: String(owner.identity_id ?? owner.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Owners`, value: '' }];
		}
	},
	async getActivityOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/users/only-names?page=1&limit=100');
			const owners = responseData?.users || responseData?.data || responseData;
			if (!Array.isArray(owners)) return [{ name: 'Nenhum Owner Encontrado', value: '' }];
			return owners.map((owner: { name?: string; id: string | number; identity_id?: string | number }) => ({
				name: owner.name || `Usuário ${owner.id}`,
				value: String(owner.identity_id || owner.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Activity Owners`, value: '' }];
		}
	},
	async getBoards(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			// Get boards using the listTitles endpoint
			const responseData = await crmApiRequest.call(this, 'GET', '/board/titles');
			const boards = responseData?.data || responseData;
			
			if (!Array.isArray(boards)) {
				return [{ name: 'Nenhum Board Encontrado', value: '' }];
			}
			
			return boards.map((board: { name?: string; title?: string; id: string | number }) => ({
				name: board.name || board.title || `Board ${board.id}`,
				value: String(board.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Boards`, value: '' }];
		}
	},
	async getColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			let boardId;
			try {
				boardId = this.getCurrentNodeParameter('boardId') as string | undefined;
			} catch {
				// ignore
			}
			
			if (!boardId) {
				return [{ name: 'Please Select a Board First', value: '' }];
			}
			
			const responseData = await crmApiRequest.call(this, 'GET', '/columns/boardId', {}, { boardId });
			
			let data = responseData?.data || responseData?.items || responseData;
			
			if (!Array.isArray(data)) {
				if (data) {
					data = [data];
				} else {
					return [{ name: 'Nenhuma Coluna Encontrada (Vazio)', value: '' }];
				}
			}

			if (data.length === 0) {
				return [{ name: 'Nenhuma Coluna Encontrada (Array Vazio)', value: '' }];
			}
			
			// A API retorna um array onde o primeiro item é o board e dentro dele tem a propriedade "columns"
			// Exemplo: [{ id: "board-id", columns: [{id: "col-id", title: "Col Title"}, ...] }]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let columns: any[] = [];
			
			// Se o primeiro item do array tem uma propriedade "columns" que é um array, extraia
			if (data[0] && Array.isArray(data[0].columns)) {
				columns = data[0].columns;
			} else {
				// Se a API retornar as colunas diretamente no array
				columns = data;
			}
			
			if (!columns || columns.length === 0) {
				return [{ name: 'Nenhuma Coluna Encontrada No Board', value: '' }];
			}

			return columns.map((column: { name?: string; title?: string; id?: string | number }) => {
				const idVal = column.id !== undefined ? String(column.id) : JSON.stringify(column).substring(0, 30);
				return {
					name: column.name || column.title || `Column ${idVal}`,
					value: idVal,
				};
			});
		} catch (error) {
			const e = error as Error;
			return [{ name: `Erro: ${e.message || 'Desconhecido'}`, value: '' }];
		}
	},
	async getOriginChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/origin-channel?limit=100&page=1');
			const channels = responseData?.OriginChannels || responseData?.originChannels || responseData?.data || responseData;
			if (!Array.isArray(channels)) return [];
			return channels.map((channel: { title?: string; name?: string; id: string | number }) => ({
				name: channel.title || channel.name || String(channel.id),
				value: channel.id,
			}));
		} catch {
			return [{ name: 'Erro Ao Carregar Canais (Origin)', value: '' }];
		}
	},
	async getAcquisitionChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/acquisition-channel?limit=100&page=1');
			const channels = responseData?.acquisitionChannels || responseData?.data || responseData;
			if (!Array.isArray(channels)) return [];
			return channels.map((channel: { title?: string; name?: string; id: string | number }) => ({
				name: channel.title || channel.name || String(channel.id),
				value: channel.id,
			}));
		} catch {
			return [{ name: 'Erro Ao Carregar Canais (Acquisition)', value: '' }];
		}
	},
	async getCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const fields = await fetchAllAvailableCustomFields.call(this);
			if (!Array.isArray(fields)) return [{ name: 'Nenhum Campo Customizado Encontrado', value: '' }];
			return fields.map((field: CrmCustomField) => ({
				name: field.title || field.name || String(field.id),
				value: String(field.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Custom Fields`, value: '' }];
		}
	},
	async getCustomFieldOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			let fieldId: string | undefined;
			try {
				fieldId = this.getCurrentNodeParameter('cardCustomFieldsId') as string | undefined;
			} catch {
				// ignore
			}
			
			if (!fieldId) {
				try {
					fieldId = this.getCurrentNodeParameter('fieldName') as string | undefined;
				} catch {
					// ignore
				}
			}

			if (!fieldId) {
				return [{ name: 'Selecione Um Custom Field Primeiro', value: 'error_no_field' }];
			}

			const fields = await fetchAllAvailableCustomFields.call(this);
			if (!Array.isArray(fields)) return [{ name: 'Erro: Campos não encontrados', value: 'error_no_fields' }];
			
			const selectedField = fields.find((f: CrmCustomField) => String(f.id) === String(fieldId));
			if (!selectedField) return [{ name: `Campo não encontrado (ID: ${fieldId})`, value: 'error_not_found' }];

			const options = selectedField.jsonFieldsOptions ||
							selectedField.options || 
							selectedField.listOptions || 
							selectedField.choices || 
							selectedField.values ||
							selectedField.items ||
							selectedField.settings?.options ||
							selectedField.settings?.choices ||
							selectedField.settings?.listOptions;

			if (!Array.isArray(options)) {
				const chaves = Object.keys(selectedField).join(', ');
				return [{ name: `Sem opções. Chaves: ${chaves.substring(0, 50)}...`, value: 'debug' }];
			}

			const optionsArray = options as Array<{ value?: string; name?: string; label?: string; title?: string; id?: string } | string>;

			return optionsArray.map((opt) => {
				if (typeof opt === 'string') {
					return { name: opt, value: opt };
				}
				const nameVal = opt.name || opt.label || opt.title || opt.value || JSON.stringify(opt);
				const valueVal = opt.value || opt.id || opt.name || JSON.stringify(opt);
				return {
					name: typeof nameVal === 'string' ? nameVal : JSON.stringify(nameVal),
					value: typeof valueVal === 'string' || typeof valueVal === 'number' ? String(valueVal) : JSON.stringify(valueVal),
				};
			});
		} catch {
			return [{ name: `Erro Ao Carregar Opções`, value: 'error' }];
		}
	},
	async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			let boardId;
			try {
				boardId = this.getCurrentNodeParameter('boardId', { extractValue: true }) as string | undefined;
			} catch {
				// ignore
			}
			
			if (!boardId) return [{ name: 'Selecione Um Board Primeiro', value: '' }];
			const responseData = await crmApiRequest.call(this, 'POST', `/tags/find-tag/${boardId}`);
			const tags = responseData?.data || responseData;
			if (!Array.isArray(tags)) return [{ name: 'Nenhuma Tag Encontrada', value: '' }];
			return tags.map((tag: { name?: string; title?: string; id: string | number }) => ({
				name: tag.name || tag.title || `Tag ${tag.id}`,
				value: String(tag.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Tags`, value: '' }];
		}
	},
	async getTenants(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/tenants/company');
			const tenants = responseData?.data || responseData?.items || responseData;
			
			if (!Array.isArray(tenants)) return [];
			
			return tenants.map((tenant: { tenantId?: string; id?: string; tradingName?: string; legalName?: string; name?: string; title?: string; companyName?: string; company_name?: string; fantasyName?: string; socialReason?: string; tenantName?: string; slug?: string; [key: string]: unknown } | string) => {
				if (typeof tenant === 'string') {
					return { name: tenant, value: tenant };
				}

				// Tenta buscar o nome em diversas propriedades possíveis
				const tenantName = tenant.tradingName || 
								   tenant.legalName || 
								   tenant.name || 
								   tenant.title || 
								   tenant.companyName || 
								   tenant.company_name || 
								   tenant.fantasyName || 
								   tenant.socialReason || 
								   tenant.tenantName ||
								   tenant.slug ||
								   '';

				// Se ainda assim não achar o nome, vamos mostrar as chaves do objeto para ajudar a debugar
				const debugInfo = tenantName ? '' : `[Keys: ${Object.keys(tenant).slice(0, 4).join(', ')}]`;
				const finalName = tenantName ? `${tenant.tenantId || tenant.id} - ${tenantName}` : `${tenant.tenantId || tenant.id} ${debugInfo}`;

				const finalValue = tenant.tenantId || tenant.id || '';
				return {
					name: finalName,
					value: typeof finalValue === 'string' || typeof finalValue === 'number' ? finalValue : String(finalValue),
				};
			});
		} catch {
			return [{ name: 'Erro Ao Carregar Tenants', value: '' }];
		}
	},
	async getPersonalizedFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		try {
			const responseData = await crmApiRequest.call(this, 'GET', '/personalized-filters/names?limit=100&page=1');
			const filters = responseData?.data || responseData?.items || responseData;
			if (!Array.isArray(filters)) return [{ name: 'Nenhum Filtro Encontrado', value: '' }];
			return filters.map((filter: { name?: string; title?: string; id: string | number }) => ({
				name: filter.name || filter.title || `Filter ${filter.id}`,
				value: String(filter.id),
			}));
		} catch {
			return [{ name: `Erro Ao Carregar Filtros`, value: '' }];
		}
	},
};