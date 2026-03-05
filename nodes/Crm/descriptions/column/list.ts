import type { INodeProperties } from 'n8n-workflow';

export const columnListDescription: INodeProperties[] = [
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
				resource: ['column'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'The Board ID to list columns from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
