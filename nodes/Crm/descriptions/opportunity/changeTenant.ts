import type { INodeProperties } from 'n8n-workflow';

export const opportunityChangeTenantDescription: INodeProperties[] = [
	{
		displayName: 'Opportunity ID',
		name: 'opportunityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['changeTenant'],
			},
		},
		default: '',
		description: 'The ID of the opportunity to change tenant',
	},
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['changeTenant'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTenants',
		},
		default: '',
		description:
			'The tenant to assign to the opportunity. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
