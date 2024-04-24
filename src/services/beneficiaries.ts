import {
  BeneficiaryInterface,
  CreateBeneficiaryDataInterface,
  CreateBeneficiaryErrorsInterface,
} from '../types/Beneficiaries';

export const searchBeneficiaries = (beneficiaries: BeneficiaryInterface[], search: string) =>
  beneficiaries.filter(item => JSON.stringify(item).toLowerCase().match(search.toLowerCase()));

export const formatCreateBeneficiaryErrors = (serverErrors: CreateBeneficiaryErrorsInterface) => {
  const passwordError =
    serverErrors.user &&
    serverErrors.user.plainPassword &&
    (serverErrors.user.plainPassword.first || serverErrors.user.plainPassword.second);
  const errors = {
    username: serverErrors.user ? serverErrors.user.username : null,
    first_name: serverErrors.user ? serverErrors.user.prenom : null,
    last_name: serverErrors.user ? serverErrors.user.nom : null,
    phone: serverErrors.user ? serverErrors.user.telephone : null,
    email: serverErrors.user ? serverErrors.user.email : null,
    password: passwordError || null,
    birth_date: serverErrors.dateNaissance,
    secret_question: serverErrors.questionSecrete,
    secret_question_answer: serverErrors.reponseSecrete,
  };

  return errors;
};
