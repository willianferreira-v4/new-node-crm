import type { INodeProperties } from 'n8n-workflow';
import { leadCreateDescription } from './lead/create';
import { leadBaseDescription } from './lead/base';
import { leadCreateAndUpdateDescription } from './lead/createAndUpdate';
import { leadUpdateFieldDescription } from './lead/updateLeadField';
import { leadUpdateColumnDescription } from './lead/updateLeadColumn';
import { leadDisqualifyDescription } from './lead/disqualifyLead';
import { leadChangeTenantDescription } from './lead/changeTenant';
import { leadUpdateDescription } from './lead/update';
import { leadAddLabelDescription } from './lead/addLabel';
import { leadRemoveLabelDescription } from './lead/removeLabel';
import { leadUpsertCustomFieldDescription } from './lead/upsertCustomField';
import { leadGetDescription } from './lead/get';
import { leadListDescription } from './lead/list';

export const leadProperties: INodeProperties[] = [
	...leadBaseDescription,
	// Create Lead fields
	...leadCreateDescription,
	// Create and Update Lead fields
	...leadCreateAndUpdateDescription,
	// Update Lead Field fields
	...leadUpdateFieldDescription,
	// Update Lead Column fields
	...leadUpdateColumnDescription,
	// Disqualify Lead fields
	...leadDisqualifyDescription,
	// Change Tenant fields
	...leadChangeTenantDescription,
	// Update Lead fields
	...leadUpdateDescription,
	// Add Label fields
	...leadAddLabelDescription,
	// Remove Label fields
	...leadRemoveLabelDescription,
	// Upsert Custom Field fields
	...leadUpsertCustomFieldDescription,
	// Get Lead fields
	...leadGetDescription,
	// List Leads fields
	...leadListDescription,
];
