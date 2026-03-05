import type { INodeProperties } from 'n8n-workflow';
import { boardBaseDescription } from './board/base';
import { boardListDescription } from './board/list';

export const boardProperties: INodeProperties[] = [
	...boardBaseDescription,
	...boardListDescription,
];
