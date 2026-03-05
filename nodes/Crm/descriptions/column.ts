import type { INodeProperties } from 'n8n-workflow';
import { columnBaseDescription } from './column/base';
import { columnListDescription } from './column/list';

export const columnProperties: INodeProperties[] = [
	...columnBaseDescription,
	...columnListDescription,
];
