import type { INodeProperties } from 'n8n-workflow';

export const leadUpsertCustomFieldDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
			},
		},
		default: '',
		description: 'The ID of the card (lead)',
	},
	{
		displayName: 'Custom Field Name or ID',
		name: 'cardCustomFieldsId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getCustomFields',
			loadOptionsDependsOn: ['cardId'],
		},
		default: '',
		description: 'The custom field to update. Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Value Type',
		name: 'valueType',
		type: 'options',
		options: [
			{ name: 'String / List', value: 'listValues' },
			{ name: 'Option (Predefined)', value: 'optionValue' },
			{ name: 'Boolean', value: 'booleanValue' },
			{ name: 'Date', value: 'dateValue' },
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
			},
		},
		default: 'listValues',
	},
	{
		displayName: 'Option Value Name or ID',
		name: 'optionValue',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
				valueType: ['optionValue'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getCustomFieldOptions',
			loadOptionsDependsOn: ['cardCustomFieldsId'],
		},
		default: '',
		description: 'Select an option for the custom field. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'String Value',
		name: 'listValue',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
				valueType: ['listValues'],
			},
		},
		default: '',
		description: 'The string value for the custom field',
	},
	{
		displayName: 'Boolean Value',
		name: 'booleanValue',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
				valueType: ['booleanValue'],
			},
		},
		default: false,
		description: 'Whether the custom field is true or false',
	},
	{
		displayName: 'Date Value',
		name: 'dateValue',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['upsertCustomField'],
				valueType: ['dateValue'],
			},
		},
		default: '',
		description: 'The date value for the custom field',
	},
];
