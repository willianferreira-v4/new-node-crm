import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IHttpRequestOptions,
	IDataObject,
	IHttpRequestMethods,
	NodeApiError,
	NodeOperationError,
	INodeExecutionData,
} from 'n8n-workflow';

// Simple in-memory cache for Tokens and API Requests
interface CacheItem {
	data: unknown;
	expiresAt: number;
}
const requestCache: Record<string, CacheItem> = {};

function getFromCache(key: string): unknown | null {
	const item = requestCache[key];
	if (item && item.expiresAt > Date.now()) {
		return item.data;
	}
	if (item) {
		delete requestCache[key]; // Clean up expired
	}
	return null;
}

function setInCache(key: string, data: unknown, ttlSeconds: number) {
	requestCache[key] = {
		data,
		expiresAt: Date.now() + ttlSeconds * 1000,
	};
}

export async function crmApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | string | unknown = {},
	qs: IDataObject = {},
) {
	const credentials = await this.getCredentials('crmApi');
	const apiUrl = credentials.apiUrl as string;
	const clientId = credentials.clientId as string;
	const clientSecret = credentials.clientSecret as string;
	const authUrl = (credentials.authUrl as string) || 'https://v1.identity.mktlab.app/auth/token';
	const applicationId = credentials.applicationId as string;
	const grantType = (credentials.grantType as string) || 'apikey';

	const isLoadOptions = 'getCurrentNodeParameter' in this;
	
	// Cache GET requests for loadOptions for 5 minutes
	const requestCacheKey = `REQ_${clientId}_${method}_${endpoint}_${JSON.stringify(qs)}`;
	if (isLoadOptions && method === 'GET') {
		const cachedData = getFromCache(requestCacheKey);
		if (cachedData) {
			return cachedData;
		}
	}

	// Fetch Bearer token
	let token: string;
	const tokenCacheKey = `TOKEN_${clientId}`;
	const cachedToken = getFromCache(tokenCacheKey) as string | null;

	if (cachedToken) {
		token = cachedToken;
	} else {
		try {
			const authOptions: IHttpRequestOptions = {
				method: 'POST',
				url: authUrl,
				body: {
					grantType,
					clientId,
					clientSecret,
					applicationId,
				},
				json: true,
			};
			const authResponse = await this.helpers.httpRequest(authOptions);
			token = authResponse.access_token || authResponse.token || authResponse.accessToken || authResponse.id_token;
			
			if (!token) {
				throw new Error('Failed to extract token from authentication response');
			}

			// Cache token for 20 seconds
			setInCache(tokenCacheKey, token, 20);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			throw new Error(`Authentication failed: ${errorMessage}`);
		}
	}

	const options: IHttpRequestOptions = {
		method,
		url: `${apiUrl.replace(/\/$/, '')}${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		qs,
		json: true,
	};

	if (typeof body === 'object' && body !== null && Object.keys(body as object).length !== 0) {
		options.body = body as IDataObject;
	} else if (typeof body === 'string' && body.trim() !== '') {
		options.body = body;
	}

	try {
		const responseData = await this.helpers.httpRequest(options);
		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (typeof console !== 'undefined' && !isLoadOptions) { // Avoid logging loadOptions spam
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				// eslint-disable-next-line no-console
				console.log(`[CRM API Success] ${method} ${endpoint}`, JSON.stringify({ requestBody: body, requestQs: qs, responseData }, null, 2));
			}
		} catch {
			// ignore
		}

		// Save GET response to cache if it's loadOptions
		if (isLoadOptions && method === 'GET') {
			setInCache(requestCacheKey, responseData, 300); // 5 minutes cache
		}

		return responseData;
	} catch (error) {
		let errorDetails = '';
		
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const err = error as any;
		
		if (err.response && err.response.data) {
			errorDetails = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
		} else if (err.error) {
			errorDetails = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
		}

		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (typeof console !== 'undefined') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				// eslint-disable-next-line no-console
				console.error(`[CRM API Error] ${method} ${endpoint}`, JSON.stringify({
					requestBody: body,
					requestQs: qs,
					errorMessage: err.message,
					errorResponse: errorDetails
				}, null, 2));
			}
		} catch {
			// ignore
		}
		
		const node = this.getNode ? this.getNode() : { name: 'CRM API', type: 'n8n-nodes-crm.crm' };
		
		const errorMessage = err.message || 'Unknown error';
		if (errorDetails) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			throw new NodeApiError(node as any, error as import('n8n-workflow').JsonObject, { message: `API Request failed: ${errorMessage}`, description: errorDetails });
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		throw new NodeApiError(node as any, error as import('n8n-workflow').JsonObject, { message: `API Request failed: ${errorMessage}` });
	}
}

export async function crmApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	// For paginated endpoints if necessary, but returning direct for now
	return await crmApiRequest.call(this, method, endpoint, body, qs);
}

export async function getAuthToken(context: IExecuteFunctions) {
	const credentials = await context.getCredentials('crmApi');
	const apiUrl = credentials.apiUrl as string;
	const clientId = credentials.clientId as string;
	const clientSecret = credentials.clientSecret as string;
	const authUrl = (credentials.authUrl as string) || 'https://v1.identity.mktlab.app/auth/token';
	const applicationId = credentials.applicationId as string;
	const grantType = (credentials.grantType as string) || 'apikey';

	let token: string;
	try {
		const authOptions: IHttpRequestOptions = {
			method: 'POST',
			url: authUrl,
			body: {
				grantType,
				clientId,
				clientSecret,
				applicationId,
			},
			json: true,
		};
		const authResponse = await context.helpers.httpRequest(authOptions);
		token = authResponse.access_token || authResponse.token || authResponse.accessToken || authResponse.id_token;
		
		if (!token) {
			throw new NodeOperationError(context.getNode(), 'Failed to extract token from authentication response', {
				description: `Response: ${JSON.stringify(authResponse)}`,
			});
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		throw new NodeOperationError(context.getNode(), `Authentication failed: ${errorMessage}`, {
			description: 'Please check your API credentials',
		});
	}

	return { token, apiUrl };
}

export function handleExecuteError(
	context: IExecuteFunctions,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any,
	operation: string,
	itemIndex: number,
	returnData: INodeExecutionData[],
) {
	let responseBody;
	let statusCode: number | undefined;
	let requestUrl: string | undefined;
	let requestMethod: string | undefined;

	if (error.response) {
		statusCode = error.response.status || error.response.statusCode;
		responseBody = error.response.data || error.response.body;
		requestUrl = error.response.config?.url || error.config?.url;
		requestMethod = error.response.config?.method || error.config?.method;
	} else if (error.cause?.response) {
		statusCode = error.cause.response.status || error.cause.response.statusCode;
		responseBody = error.cause.response.data || error.cause.response.body;
		requestUrl = error.cause.response.config?.url;
		requestMethod = error.cause.response.config?.method;
	}

	if (!responseBody && error.options?.body) {
		responseBody = error.options.body;
	}

	let detailedMessage = `CRM API Error - ${operation}\n\n`;
	detailedMessage += `Status Code: ${statusCode || 'Unknown'}\n`;

	if (requestMethod && requestUrl) {
		detailedMessage += `Request: ${requestMethod.toUpperCase()} ${requestUrl}\n\n`;
	}

	if (responseBody) {
		if (responseBody.errors && Array.isArray(responseBody.errors)) {
			detailedMessage += `Errors:\n`;
			responseBody.errors.forEach((err: { code: number; message: string }, index: number) => {
				detailedMessage += `\n  ${index + 1}. ${err.code || 'Error'}:\n`;
				detailedMessage += `     ${err.message || JSON.stringify(err)}\n`;
			});

			if (responseBody.traceId) {
				detailedMessage += `\nTrace ID: ${responseBody.traceId}\n`;
			}
		} else if (responseBody.message) {
			detailedMessage += `Message: ${responseBody.message}\n`;
		} else {
			detailedMessage += `\nAPI Response:\n`;
			if (typeof responseBody === 'string') {
				detailedMessage += responseBody;
			} else {
				detailedMessage += JSON.stringify(responseBody, null, 2);
			}
		}
	} else {
		detailedMessage += `\nNo response body available\n`;
		detailedMessage += `Original error: ${error.message}`;
	}

	if (context.continueOnFail()) {
		returnData.push({
			json: {
				error: error.message,
				operation,
				statusCode,
				responseBody,
				requestUrl,
				requestMethod,
			},
			pairedItem: itemIndex,
		});
	} else {
		throw new NodeOperationError(context.getNode(), detailedMessage, {
			itemIndex,
			description: `CRM ${operation} operation failed`,
		});
	}
}

export function cleanObject(obj: IDataObject): IDataObject {
	const cleaned: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== null && value !== '') {
			cleaned[key] = value;
		}
	}
	return cleaned;
}
