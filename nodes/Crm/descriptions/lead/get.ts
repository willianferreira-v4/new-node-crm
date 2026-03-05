import type { INodeProperties } from 'n8n-workflow';

export const leadGetDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the card (lead) to get',
	},
];
