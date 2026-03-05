import type { IExecuteFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { leadProperties } from './descriptions/lead';
import { activityProperties } from './descriptions/activity';
import { boardProperties } from './descriptions/board';
import { columnProperties } from './descriptions/column';
import { opportunityProperties } from './descriptions/opportunity';
import { loadOptions } from './methods/loadOptions';
import { executeLead } from './execute/lead';
import { executeActivity } from './execute/activity';
import { executeBoard } from './execute/board';
import { executeColumn } from './execute/column';
import { executeOpportunity } from './execute/opportunity';

export class Crm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mars CRM',
		name: 'crm',
		icon: 'file:crm.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Mars CRM',
		defaults: {
			name: 'Mars CRM',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'crmApi',
				required: true,
				testedBy: 'Crm',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'Board',
						value: 'board',
					},
					{
						name: 'Column',
						value: 'column',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
				],
				default: 'lead',
			},
			...activityProperties,
			...boardProperties,
			...columnProperties,
			...leadProperties,
			...opportunityProperties,
		],
		usableAsTool: true,
	};

	methods = {
		loadOptions,
	};

	async execute(this: IExecuteFunctions) {
		const resource = this.getNodeParameter('resource', 0) as string;

		if (resource === 'lead') {
			return executeLead.call(this);
		} else if (resource === 'activity') {
			return executeActivity.call(this);
		} else if (resource === 'board') {
			return executeBoard.call(this);
		} else if (resource === 'column') {
			return executeColumn.call(this);
		} else if (resource === 'opportunity') {
			return executeOpportunity.call(this);
		}

		throw new Error(`The resource "${resource}" is not known!`);
	}
}
