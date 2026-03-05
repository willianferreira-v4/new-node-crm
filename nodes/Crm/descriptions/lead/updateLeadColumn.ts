import type { INodeProperties } from 'n8n-workflow';

export const leadUpdateColumnDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardIdUpdateColumn',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadColumn'],
			},
		},
		default: '',
		description: 'The ID of the card (lead) to move',
	},
	{
		displayName: 'Board Name or ID',
		name: 'boardId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadColumn'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getBoards',
		},
		default: '',
		description:
			'The board where the column is located. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Coluna De Destino Name or ID',
		name: 'toColumnIdUpdate',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadColumn'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getColumns',
			loadOptionsDependsOn: ['boardId'],
		},
		default: '',
		description:
			'The column where the lead will be moved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Novo Index',
		name: 'newIndexUpdate',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadColumn'],
			},
		},
		default: 0,
		description: 'The new index position of the card in the column',
	},
	{
		displayName: 'Ignorar Validação De Campos Obrigatórios',
		name: 'ignoreColumnsRequiredFieldsValidationUpdate',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadColumn'],
			},
		},
		default: true,
		description: 'Whether to ignore required fields validation when moving to the column',
	},
];
