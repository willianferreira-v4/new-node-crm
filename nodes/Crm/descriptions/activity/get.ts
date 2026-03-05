import type { INodeProperties } from 'n8n-workflow';

export const activityGetDescription: INodeProperties[] = [
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the activity to retrieve',
	},
];
