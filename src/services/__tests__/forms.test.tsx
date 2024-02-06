import { validateLoginForm } from '../forms';

let formValues;
describe('validateLoginForm', (): void => {
  beforeEach((): void => {
    formValues = {
      username: 'gandalf@theshire.com',
      password: 'You $hall N0t P@ss',
    };
  });
  it('Should return no error if password and username are filled', (): void => {
    const errors = validateLoginForm(formValues);
    expect(errors).toEqual({});
  });
  it('Should return an error in the password field if password is not filled', (): void => {
    delete formValues.username;
    const errors = validateLoginForm(formValues);
    expect(errors.username).toEqual('required_field');
  });
  it('Should return an error in the username field if username is not filled', (): void => {
    delete formValues.password;
    const errors = validateLoginForm(formValues);
    expect(errors.password).toEqual('required_field');
  });
});
