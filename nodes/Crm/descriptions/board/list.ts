import type { INodeProperties } from 'n8n-workflow';

export const boardListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['list', 'listTitles'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['list', 'listTitles'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Board Type',
		name: 'boardType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['listTitles'],
			},
		},
		options: [
			{
				name: 'All',
				value: '',
			},
			{
				name: 'Lead',
				value: 'LEAD',
			},
			{
				name: 'Opportunity',
				value: 'OPPORTUNITY',
			},
		],
		default: '',
		description: 'Filter boards by type',
	},
];
