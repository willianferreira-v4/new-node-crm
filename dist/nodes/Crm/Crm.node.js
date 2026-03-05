"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crm = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const lead_1 = require("./descriptions/lead");
const activity_1 = require("./descriptions/activity");
const board_1 = require("./descriptions/board");
const column_1 = require("./descriptions/column");
const opportunity_1 = require("./descriptions/opportunity");
const loadOptions_1 = require("./methods/loadOptions");
const lead_2 = require("./execute/lead");
const activity_2 = require("./execute/activity");
const board_2 = require("./execute/board");
const column_2 = require("./execute/column");
const opportunity_2 = require("./execute/opportunity");
class Crm {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                ...activity_1.activityProperties,
                ...board_1.boardProperties,
                ...column_1.columnProperties,
                ...lead_1.leadProperties,
                ...opportunity_1.opportunityProperties,
            ],
            usableAsTool: true,
        };
        this.methods = {
            loadOptions: loadOptions_1.loadOptions,
        };
    }
    async execute() {
        const resource = this.getNodeParameter('resource', 0);
        if (resource === 'lead') {
            return lead_2.executeLead.call(this);
        }
        else if (resource === 'activity') {
            return activity_2.executeActivity.call(this);
        }
        else if (resource === 'board') {
            return board_2.executeBoard.call(this);
        }
        else if (resource === 'column') {
            return column_2.executeColumn.call(this);
        }
        else if (resource === 'opportunity') {
            return opportunity_2.executeOpportunity.call(this);
        }
        throw new Error(`The resource "${resource}" is not known!`);
    }
}
exports.Crm = Crm;
//# sourceMappingURL=Crm.node.js.map