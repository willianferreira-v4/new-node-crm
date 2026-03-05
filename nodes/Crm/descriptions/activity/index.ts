import type { INodeProperties } from 'n8n-workflow';
import { activityBaseDescription } from './base';
import { activityCreateDescription } from './create';
import { activityGetDescription } from './get';
import { activityListDescription } from './list';
import { activityUpdateDescription } from './update';

export const activityProperties: INodeProperties[] = [
	...activityBaseDescription,
	...activityCreateDescription,
	...activityGetDescription,
	...activityListDescription,
	...activityUpdateDescription,
];
