import storage from '@react-native-async-storage/async-storage';
import nock from 'nock';
import { makeAuthenticatedUrlv2, makeRequestv2 } from '../requests';

const accessToken = 'ThisIsMyTestAccessToken';

describe('request service', () => {
  beforeAll(async () => {
    await storage.setItem('accessToken', accessToken);
  });

  describe('makeRequestV2', () => {
    it('should call the endpoint with GET verb and token stored in AsyncStorage', async () => {
      const scope = nock('https://preprod.reconnect.fr/api/v2')
        .get(`/user?access_token=${accessToken}`)
        .reply(200, { status: 'OK' });
      const endpoint = '/user';
      const response: any = await makeRequestv2(endpoint, 'GET');

      expect(scope.isDone()).toBeTruthy();
      expect(response).toBeDefined();
      expect(response.status).toBe('OK');
    });

    it('should call the endpoint with POST verb and token stored in AsyncStorage', async () => {
      const scope = nock('https://preprod.reconnect.fr/api/v2')
        .post(`/user?access_token=${accessToken}`)
        .reply(200, { status: 'OK', user: { id: 3 } });
      const data = { id: 3 };
      const endpoint = '/user';
      const response: any = await makeRequestv2(endpoint, 'POST', data);

      expect(scope.isDone()).toBeTruthy();
      expect(response).toBeDefined();
      expect(response.status).toBe('OK');
      expect(response.user).toBeDefined();
      expect(response.user.id).toBe(3);
    });

    it('should call the handleError function from error service if api throws', async () => {
      const scope = nock('https://preprod.reconnect.fr/api/v2')
        .get(`/user?access_token=${accessToken}`)
        .replyWithError('Some problem did happen');
      const endpoint = '/user';
      const response = await makeRequestv2(endpoint, 'GET');

      expect(scope.isDone()).toBeTruthy();
      expect(response).not.toBeDefined();
    });
  });

  describe('makeAuthenticatedUrlv2', () => {
    it('should build a url with the api endpoint, the provided endmoint, and the token', async () => {
      const expectedUrl = `https://preprod.reconnect.fr/api/v2/documents?access_token=${accessToken}`;
      const endpoint = '/documents';
      const url = await makeAuthenticatedUrlv2(endpoint);
      expect(url).toBe(expectedUrl);
    });
  });
});
