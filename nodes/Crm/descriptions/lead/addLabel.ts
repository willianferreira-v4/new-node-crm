import type { INodeProperties } from 'n8n-workflow';

export const leadAddLabelDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['addLabel'],
			},
		},
		default: '',
		description: 'The ID of the card (lead) to add the label to',
	},
	{
		displayName: 'Label/Tag Name or ID',
		name: 'labelId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['addLabel'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description: 'The tag to add to the lead. Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
