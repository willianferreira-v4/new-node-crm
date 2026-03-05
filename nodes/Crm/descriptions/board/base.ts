import type { INodeProperties } from 'n8n-workflow';

export const boardBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['board'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List boards',
				action: 'List boards',
			},
			{
				name: 'List Titles',
				value: 'listTitles',
				description: 'List board titles and IDs',
				action: 'List board titles',
			},
		],
		default: 'list',
	},
];
