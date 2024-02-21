import storage from '@react-native-async-storage/async-storage';
import nock from 'nock';
import { login } from '../authentication';
import * as errors from '../errors';

const mockHandleError = jest.spyOn(errors, 'handleError');
mockHandleError.mockImplementation(() => 'OK');

describe('login', () => {
  beforeEach(async () => {
    await storage.removeItem('accessToken');
  });
  it('should set the token in the AsyncStorage', async () => {
    const tokenBefore = await storage.getItem('accessToken');
    expect(tokenBefore).toBeNull();
    const data = {
      username: 'gandalf',
      password: 'Youshallnotpass',
    };
    const scope = nock('https://preprod.reconnect.fr/oauth/v2')
      .get(uri => uri.includes('/token'))
      .reply(200, { access_token: 'thisIsANewAccessToken' });

    await login(data.username, data.password);
    expect(scope.isDone()).toBeTruthy();
    const token = await storage.getItem('accessToken');
    expect(token).toEqual('thisIsANewAccessToken');
  });

  it('should not set the token in the AsyncStorage and throw login error if request throws', async () => {
    const tokenBefore = await storage.getItem('accessToken');
    expect(tokenBefore).toBeNull();
    const data = {
      username: 'gandalf',
      password: 'Youshallnotpass',
    };
    const scope = nock('https://preprod.reconnect.fr/oauth/v2')
      .get(uri => uri.includes('/token'))
      .replyWithError('something awful happened');
    try {
      await login(data.username, data.password);
    } catch (error: any) {
      expect(scope.isDone()).toBeTruthy();
      const token = await storage.getItem('accessToken');
      expect(token).toBeNull();
    }
  });
});
