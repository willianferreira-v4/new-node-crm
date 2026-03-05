import type { INodeProperties } from 'n8n-workflow';
import { opportunityBaseDescription } from './opportunity/base';
import { opportunityListDescription } from './opportunity/list';
import { opportunityChangeTenantDescription } from './opportunity/changeTenant';

export const opportunityProperties: INodeProperties[] = [
	...opportunityBaseDescription,
	...opportunityListDescription,
	...opportunityChangeTenantDescription,
];
