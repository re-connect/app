import { EnableBeneficiaryErrorsInterface } from '../types/Beneficiaries';

export const formatEnableBeneficiaryErrors = (serverErrors: EnableBeneficiaryErrorsInterface) => {
  const errors = {
    secret_question: serverErrors.questionSecrete,
    other_secret_question: serverErrors.autreQuestionSecrete,
    secret_response: serverErrors.reponseSecrete,
    password: serverErrors.plainPassword,
    email: serverErrors.email,
  };

  return errors;
};
