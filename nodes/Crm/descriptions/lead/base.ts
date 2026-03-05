import type { INodeProperties } from 'n8n-workflow';

export const leadBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Add Label/Tag',
				value: 'addLabel',
				description: 'Add a label to a lead',
				action: 'Add a label to a lead',
			},
			{
				name: 'Change Tenant',
				value: 'changeTenant',
				description: 'Change the tenant of a lead',
				action: 'Change the tenant of a lead',
			},
			{
				name: 'Create',
				value: 'createLead',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Create and Update Fields',
				value: 'createAndUpdate',
				description: 'Create a new lead and update custom fields',
				action: 'Create a lead and update fields',
			},
			{
				name: 'Disqualify',
				value: 'disqualifyLead',
				description: 'Disqualify a lead and move to disqualification column',
				action: 'Disqualify a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lead by ID',
				action: 'Get a lead',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List leads',
				action: 'List leads',
			},
			{
				name: 'Remove Label/Tag',
				value: 'removeLabel',
				description: 'Remove a label from a lead',
				action: 'Remove a label from a lead',
			},
			{
				name: 'Update',
				value: 'updateLead',
				description: 'Update main fields of a lead',
				action: 'Update a lead',
			},
			{
				name: 'Update Column / Move',
				value: 'updateLeadColumn',
				description: 'Move a lead to a different column',
				action: 'Update a lead column',
			},
			{
				name: 'Update Custom Field',
				value: 'updateLeadField',
				description: 'Update a custom field on a lead (Multiple/Bulk)',
				action: 'Update a custom field on a lead',
			},
			{
				name: 'Upsert Custom Field',
				value: 'upsertCustomField',
				description: 'Create or update a single custom field value',
				action: 'Upsert a custom field on a lead',
			},
		],
		default: 'createLead',
	},
];
