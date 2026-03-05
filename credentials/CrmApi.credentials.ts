import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CrmApi implements ICredentialType {
	name = 'crmApi';
	icon: Icon = 'file:crm.svg';
	displayName = 'CRM API';
	documentationUrl = 'https://github.com/org/repo';
	properties: INodeProperties[] = [
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
