import type { INodeProperties } from 'n8n-workflow';

export const columnBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['column'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List columns by board',
				action: 'List columns',
			},
		],
		default: 'list',
	},
];
