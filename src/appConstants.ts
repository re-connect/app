import { config } from '../src/config';
import environments from './environment';

export const MAX_LOGIN_ATTEMPTS = 10;
export const crispUri = `https://go.crisp.chat/chat/embed/?website_id=${config.crispWebsiteId}`;
export const backendUrl = `https://${environments.ENV === 'prod' ? '' : 'preprod.'}reconnect.fr`;
export const apiEndpoint = `${backendUrl}/api`;
export const apiv2Endpoint = `${apiEndpoint}/v2`;
export const apiv3Endpoint = `${apiEndpoint}/v3`;
export const loginApiEndpoint = `${backendUrl}/oauth/v2/token`;
export const connexionInformation = config.connexionInformation;
export const geniusSdkLicense = config.geniusSdkLicense;
