import { formatEnableBeneficiaryErrors } from '../dataTransformer';

describe('enableBeneficiaryErrors', () => {
  it('Should format the server errors', () => {
    const serverErrors = {
      questionSecrete: 'Qui ne passera pas ?',
      autreQuestionSecrete: 'Non',
      reponseSecrete: 'Vous',
      plainPassword: 'You$h@llN0tP@ss',
      email: 'gandalf@khazaddum.com',
    };

    const formErrors = formatEnableBeneficiaryErrors(serverErrors);
    expect(formErrors.secret_question).toBe('Qui ne passera pas ?');
    expect(formErrors.other_secret_question).toBe('Non');
    expect(formErrors.secret_response).toBe('Vous');
    expect(formErrors.password).toBe('You$h@llN0tP@ss');
    expect(formErrors.email).toBe('gandalf@khazaddum.com');
  });
});
