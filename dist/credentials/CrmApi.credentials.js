"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmApi = void 0;
class CrmApi {
    constructor() {
        this.name = 'crmApi';
        this.icon = 'file:crm.svg';
        this.displayName = 'CRM API';
        this.documentationUrl = 'https://github.com/org/repo';
        this.properties = [
            {
                displayName: 'Auth URL',
                name: 'authUrl',
                type: 'string',
                default: 'https://v1.identity.mktlab.app/auth/token',
                required: true,
                description: 'The URL to fetch the authentication token',
            },
            {
                displayName: 'Application ID',
                name: 'applicationId',
                type: 'string',
                default: '',
                required: true,
                description: 'The application ID for authentication',
            },
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'string',
                default: 'apikey',
                required: true,
                description: 'The grant type for authentication',
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
                description: 'The x-client-id for authentication',
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'The x-client-secret for authentication',
            },
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: 'https://api.example.com',
                description: 'The base URL for the CRM API',
            },
        ];
    }
}
exports.CrmApi = CrmApi;
//# sourceMappingURL=CrmApi.credentials.js.map