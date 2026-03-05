import type { INodeProperties } from 'n8n-workflow';

export const activityListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['activity'],
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
				resource: ['activity'],
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
				resource: ['activity'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Assignee / Owner Name or ID',
				name: 'assigneeIdentityId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getActivityOwners',
				},
				default: '',
				description: 'Filter by user responsible for the activity. Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Filter By Owner',
				name: 'filterByOwner',
				type: 'boolean',
				default: false,
				description: 'Whether to filter activities by the current authenticated owner',
			},
			{
				displayName: 'From Date',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'Filter activities from this date',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Medium', value: 'MEDIUM' },
					{ name: 'High', value: 'HIGH' },
				],
				default: 'MEDIUM',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search string',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Not Started', value: 'NOT_STARTED' },
					{ name: 'In Progress', value: 'IN_PROGRESS' },
					{ name: 'Postponed', value: 'POSTPONED' },
					{ name: 'Completed', value: 'COMPLETED' },
				],
				default: 'IN_PROGRESS',
			},
			{
				displayName: 'Target ID',
				name: 'targetId',
				type: 'string',
				default: '',
				description: 'Filter activities by a specific Target ID (Card ID / Opportunity ID)',
			},
			{
				displayName: 'Target Type',
				name: 'targetType',
				type: 'options',
				options: [
					{ name: 'Lead', value: 'LEAD' },
					{ name: 'Opportunity', value: 'OPPORTUNITY' },
				],
				default: 'LEAD',
			},
			{
				displayName: 'To Date',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'Filter activities up to this date',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Call', value: 'CALL' },
					{ name: 'Email', value: 'EMAIL' },
					{ name: 'Meeting', value: 'MEETING' },
					{ name: 'Task', value: 'TASK' },
					{ name: 'Visit', value: 'VISIT' },
					{ name: 'WhatsApp', value: 'WHATSAPP' },
				],
				default: 'TASK',
			},
		],
	},
];
