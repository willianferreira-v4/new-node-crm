import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class CrmApi implements ICredentialType {
    name: string;
    icon: Icon;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
}
