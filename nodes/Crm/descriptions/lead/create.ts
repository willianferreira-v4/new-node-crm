import type { INodeProperties } from 'n8n-workflow';

export const leadCreateDescription: INodeProperties[] = [
	{
		displayName: 'Owner Name or ID',
		name: 'ownerId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getOwners',
		},
		default: '',
		description:
			'The owner for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Board Name or ID',
		name: 'boardId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getBoards',
		},
		default: '',
		description:
			'The board where the lead will be created. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Coluna De Entrada Do Lead Name or ID',
		name: 'columnId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getColumns',
			loadOptionsDependsOn: ['boardId'],
		},
		default: '',
		description:
			'The column where the lead will be created. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'The name of the company',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'The title of the lead',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'Email address of the lead',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'Phone number of the lead',
	},
	{
		displayName: 'Tax ID',
		name: 'taxId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'Tax identification number',
	},
	{
		displayName: 'Company Nationality',
		name: 'companyNationality',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		options: [
			{ name: 'Brazil', value: 'brazil' },
			{ name: 'EUA', value: 'eua' },
			{ name: 'Others', value: 'others' },
		],
		default: 'brazil',
		description: 'Nationality of the company',
	},
	{
		displayName: 'Canal De Origem Name or ID',
		name: 'originChannelId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getOriginChannels',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Canal De Aquisição Name or ID',
		name: 'acquisitionChannelId',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getAcquisitionChannels',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'UTM Source',
		name: 'utmSource',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'UTM source parameter',
	},
	{
		displayName: 'UTM Campaign',
		name: 'utmCampaign',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'UTM campaign parameter',
	},
	{
		displayName: 'UTM Content',
		name: 'utmContent',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'UTM content parameter',
	},
	{
		displayName: 'UTM Medium',
		name: 'utmMedium',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'UTM medium parameter',
	},
	{
		displayName: 'UTM Term',
		name: 'utmTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'UTM term parameter',
	},
	{
		displayName: 'Source Page',
		name: 'sourcePage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createLead'],
			},
		},
		default: '',
		description: 'The source page where the lead came from',
	},
];
