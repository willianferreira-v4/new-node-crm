import type { INodeProperties } from 'n8n-workflow';

export const leadUpdateFieldDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadField'],
			},
		},
		default: '',
		description: 'The ID of the card (lead) to update',
	},
	{
		displayName: 'Fields to Update',
		name: 'fieldsToUpdate',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLeadField'],
			},
		},
		default: {},
		placeholder: 'Add Field',
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
