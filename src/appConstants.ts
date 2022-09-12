import environments from './environment';
// @ts-ignore: Unreachable code error
// eslint-disable-next-line
import secrets from './secrets.json';

export const crispUri = `https://go.crisp.chat/chat/embed/?website_id=${secrets['crispWebsiteId']}`;

export const backendUrl =
  environments && environments.ENV && environments.ENV === 'prod'
    ? `https://www.reconnect.fr`
    : `https://preprod.reconnect.fr`;
export const apiEndpoint = `${backendUrl}/api`;
export const apiv2Endpoint = `${apiEndpoint}/v2`;
export const loginApiEndpoint = `${backendUrl}/oauth/v2/token`;
export const connexionInformation = secrets['connexionInformation'];
export const geniusSdkLicense =
  environments && environments.ENV && environments.ENV === 'prod'
    ? secrets.geniusProd
    : environments.ENV === 'preprod'
    ? secrets.geniusPreProd
    : secrets.geniusDebug;
