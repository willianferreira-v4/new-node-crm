import type { INodeProperties } from 'n8n-workflow';

export const activityBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activity'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an activity (e-mail, call, WhatsApp, meeting, etc)',
				action: 'Create an activity',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an activity by ID',
				action: 'Get an activity',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List activities',
				action: 'List activities',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an activity',
				action: 'Update an activity',
			},
		],
		default: 'create',
	},
];
