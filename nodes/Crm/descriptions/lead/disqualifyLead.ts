import type { INodeProperties } from 'n8n-workflow';
import { leadReasonOptions } from './options';

export const leadDisqualifyDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardIdDisqualify',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		default: '',
		description: 'The ID of the card (lead) to disqualify',
	},
	{
		displayName: 'Board Name or ID',
		name: 'boardId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
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
		displayName: 'Coluna De Desqualificação Name or ID',
		name: 'toColumnId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getColumns',
			loadOptionsDependsOn: ['boardId'],
		},
		default: '',
		description:
			'The column where the disqualified lead will be moved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Novo Index',
		name: 'newIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		default: 0,
		description: 'The new index position of the card in the column',
	},
	{
		displayName: 'Ignorar Validação De Campos Obrigatórios',
		name: 'ignoreColumnsRequiredFieldsValidation',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		default: true,
		description:
			'Whether to ignore required fields validation when moving to disqualification column',
	},
	{
		displayName: 'Razão Da Desqualificação',
		name: 'reasonForLost',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		options: leadReasonOptions,
		default: 'SPAM',
		description: 'The reason for disqualifying the lead',
	},
	{
		displayName: 'Descrição Da Desqualificação',
		name: 'descriptionForLost',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['disqualifyLead'],
			},
		},
		default: '',
		description: 'Additional description for the disqualification reason',
	},
];
