import type { INodeProperties } from 'n8n-workflow';

export const opportunityListDescription: INodeProperties[] = [
	{
		displayName: 'Get By',
		name: 'getBy',
		type: 'options',
		options: [
			{
				name: 'Board',
				value: 'board',
			},
			{
				name: 'Column',
				value: 'column',
			},
		],
		default: 'board',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
			},
		},
		description: 'Whether to list opportunities by Board or by Column',
	},
	{
		displayName: 'Board Name or ID',
		name: 'boardId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getBoards',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
				getBy: ['board', 'column'],
			},
		},
		default: '',
		description: 'The Board ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Column Name or ID',
		name: 'columnId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getColumns',
			loadOptionsDependsOn: ['boardId'],
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
				getBy: ['column'],
			},
		},
		default: '',
		description: 'The Column ID to list opportunities from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
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
				resource: ['opportunity'],
				operation: ['list'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Query (Search Text)',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Text to search for opportunities',
			},
			{
				displayName: 'Personalized Filter Name or ID',
				name: 'personalizedFilterId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getPersonalizedFilters',
				},
				default: '',
				description: 'Filter by a personalized filter saved in CRM. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Filter By Owner',
				name: 'filterByOwner',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by the current owner',
			},
		],
	},
];
