import type { INodeProperties } from 'n8n-workflow';

export const opportunityBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
			},
		},
		options: [
			{
				name: 'Change Tenant',
				value: 'changeTenant',
				description: 'Transfer an opportunity and its related contact, company and lead to a new tenant',
				action: 'Change the tenant of an opportunity',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List opportunities',
				action: 'List opportunities',
			},
		],
		default: 'list',
	},
];
