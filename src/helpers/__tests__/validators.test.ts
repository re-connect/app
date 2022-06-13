import { emailValidator } from '../validators';

const emails = {
  valid1: 'gandalf.legris@yopmail.com',
  valid2: 'gandalf.legris@yopmail.com',
  inalid1: 'gandalf.legris@yopmail',
  inalid2: 'gandalf.legris@yopmailcom',
  inalid3: 'gandalf.legris.yopmailcom',
  inalid4: '@yopmailcom',
  empty: '',
};

describe('emailValidator', () => {
  it('Should validate email format', () => {
    expect(emailValidator(emails.inalid1)).toBeFalsy();
    expect(emailValidator(emails.inalid2)).toBeFalsy();
    expect(emailValidator(emails.inalid3)).toBeFalsy();
    expect(emailValidator(emails.inalid4)).toBeFalsy();
    expect(emailValidator(emails.valid1)).toBeTruthy();
    expect(emailValidator(emails.valid2)).toBeTruthy();
    expect(emailValidator(emails.empty)).toBeFalsy();
    expect(emailValidator('')).toBeFalsy();
    expect(emailValidator()).toBeFalsy();
    expect(emailValidator(null)).toBeFalsy();
  });
});
