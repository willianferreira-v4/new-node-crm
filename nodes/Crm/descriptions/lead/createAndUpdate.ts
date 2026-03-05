import type { INodeProperties } from 'n8n-workflow';

export const leadCreateAndUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Owner Name or ID',
		name: 'ownerIdCreateUpdate',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
				operation: ['createAndUpdate'],
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
		name: 'columnIdCreateUpdate',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
		name: 'companyNameCreateUpdate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'The name of the company',
	},
	{
		displayName: 'Title',
		name: 'titleCreateUpdate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'The title of the lead',
	},
	{
		displayName: 'Email',
		name: 'emailCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'Email address of the lead',
	},
	{
		displayName: 'Phone',
		name: 'phoneCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'Phone number of the lead',
	},
	{
		displayName: 'Tax ID',
		name: 'taxIdCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'Tax identification number',
	},
	{
		displayName: 'Company Nationality',
		name: 'companyNationalityCreateUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
		name: 'originChannelIdCreateUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
		name: 'acquisitionChannelIdCreateUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
		name: 'utmSourceCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'UTM source parameter',
	},
	{
		displayName: 'UTM Campaign',
		name: 'utmCampaignCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'UTM campaign parameter',
	},
	{
		displayName: 'UTM Content',
		name: 'utmContentCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'UTM content parameter',
	},
	{
		displayName: 'UTM Medium',
		name: 'utmMediumCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'UTM medium parameter',
	},
	{
		displayName: 'UTM Term',
		name: 'utmTermCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'UTM term parameter',
	},
	{
		displayName: 'Source Page',
		name: 'sourcePageCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: '',
		description: 'The source page where the lead came from',
	},
	{
		displayName: 'Custom Fields',
		name: 'customFieldsCreateUpdate',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		default: {},
		placeholder: 'Add Custom Field',
		description: 'Custom fields to update after creating the lead',
		options: [
			{
				name: 'field',
				displayName: 'Field',
				values: [
					{
						displayName: 'Boolean Value',
						name: 'booleanValue',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Custom Field Name or ID',
						name: 'fieldName',
						type: 'options',
						default: '',
						description: 'The custom field to update. Choose from the list, or specify an ID using an expression.',
					},
					{
						displayName: 'Date Value',
						name: 'dateValue',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Number Value',
						name: 'numberValue',
						type: 'number',
						default: 0
					},
					{
						displayName: 'Option Value',
						name: 'optionValue',
						type: 'options',
						default: '',
						description: 'Select an option for the custom field',
					},
					{
						displayName: 'String Value',
						name: 'listValue',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value Type',
						name: 'valueType',
						type: 'options',
						options: [
							{
								name: 'Boolean',
								value: 'booleanValue',
							},
							{
								name: 'Date',
								value: 'dateValue',
							},
							{
								name: 'Number',
								value: 'numberValue',
							},
							{
								name: 'Option (Predefined)',
								value: 'optionValue',
							},
							{
								name: 'String\t/\tList',
								value: 'listValues',
							},
						],
							required:	true,
						default: 'listValues',
					},
			],
			},
		],
	},
];
