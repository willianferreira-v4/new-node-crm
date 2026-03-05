import type { INodeProperties } from 'n8n-workflow';

export const activityUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the activity to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['update'],
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
				description: 'User ID responsible for this activity. Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Content or description of the activity',
			},
			{
				displayName: 'Due At',
				name: 'dueAt',
				type: 'dateTime',
				default: '',
				description: 'When the activity is due',
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
				description: 'Priority of the activity',
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
				description: 'Status of the activity',
			},
			{
				displayName: 'Target ID',
				name: 'targetId',
				type: 'string',
				default: '',
				description: 'The ID of the lead or opportunity card',
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
				description: 'The type of entity the activity is related to',
			},
			{
				displayName: 'Tenant Contact ID',
				name: 'tenantContactId',
				type: 'string',
				default: '',
				description: 'UUID of the tenant contact if applicable',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the activity',
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
				description: 'Type of the activity',
			},
		],
	},
];
