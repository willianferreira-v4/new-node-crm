import type { IExecuteFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class Crm implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getOwners(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getActivityOwners(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getBoards(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getColumns(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getOriginChannels(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getAcquisitionChannels(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getCustomFields(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getCustomFieldOptions(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getTags(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getTenants(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
            getPersonalizedFilters(this: import("n8n-workflow").ILoadOptionsFunctions): Promise<import("n8n-workflow").INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<import("n8n-workflow").INodeExecutionData[][]>;
}
