import { isCodePushEnabled } from '../codePushHelper';
import environment from '../../environment';

describe('isCodePushEnabled', () => {
  it('should return true if the configured environment enables CodePush', () => {
    environment.CODEPUSH = true;
    expect(isCodePushEnabled()).toBe(true);
  });
  it('should return false if the configured environment does not enable CodePush', () => {
    environment.CODEPUSH = false;
    expect(isCodePushEnabled()).toBe(false);
  });
});
