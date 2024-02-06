import { Alert } from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import { handleError } from '../errors';

const alertMock = jest.spyOn(Alert, 'alert');
const navigateMock = jest.spyOn(RootNavigation, 'navigate');

describe('handleError', () => {
  beforeEach(() => {
    alertMock.mockReset();
  });

  it('Should not do anything if code is not known', () => {
    const randomError: any = {
      text: 'generic_error',
      response: {
        status: 500,
      },
    };
    handleError(randomError);
    expect(alertMock).toHaveBeenCalledTimes(0);
  });
  it('Should show a not connected  error if code is 401', () => {
    const unauthenticatedError: any = {
      text: 'not_logged_in',
      response: {
        status: 401,
      },
    };
    handleError(unauthenticatedError);
    expect(alertMock).toHaveBeenCalledTimes(0);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('Auth');
  });

  it('Should show a not allowed error if code is 403', () => {
    const unauthorizedError: any = {
      text: 'unauthorized',
      response: {
        status: 403,
      },
    };
    handleError(unauthorizedError);
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('You are not allowed to perform this action');
  });
});
