import { parse } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import { CreateBeneficiaryDataInterface, EnableBeneficiaryErrorsInterface } from '../types/Beneficiaries';
import { CenterInterface } from '../types/Centers';

export const serializeBeneficiary = (beneficiary: CreateBeneficiaryDataInterface) => {
  const birthDate = parse(beneficiary.birth_date, 'ddMMyyyy', new Date());
  const formattedBeneficiary: Record<string, string | number | CenterInterface> = {
    're_form_beneficiaire[user][prenom]': beneficiary.first_name,
    're_form_beneficiaire[user][nom]': beneficiary.last_name,
    're_form_beneficiaire[user][telephone]': !beneficiary.phone ? '' : `0${beneficiary.phone}`,
    're_form_beneficiaire[user][email]': !beneficiary.email ? '' : beneficiary.email,
    're_form_beneficiaire[user][plainPassword][first]': beneficiary.password,
    're_form_beneficiaire[user][plainPassword][second]': beneficiary.confirmPassword,
    're_form_beneficiaire[questionSecrete]': !beneficiary.secret_question ? '' : beneficiary.secret_question,
    're_form_beneficiaire[autreQuestionSecrete]': !beneficiary.secret_question_custom_text
      ? ''
      : beneficiary.secret_question_custom_text,
    're_form_beneficiaire[reponseSecrete]': !beneficiary.secret_question_answer
      ? ''
      : beneficiary.secret_question_answer,
    're_form_beneficiaire[dateNaissance][day]': getDate(birthDate ? birthDate : 0),
    're_form_beneficiaire[dateNaissance][month]': getMonth(birthDate ? birthDate : 0) + 1,
    're_form_beneficiaire[dateNaissance][year]': getYear(birthDate ? birthDate : 0),
  };

  if (beneficiary.centers) {
    beneficiary.centers.forEach((center, index) => {
      const key = 're_form_beneficiaire[centres][' + index + ']';
      formattedBeneficiary[key] = center;
    });
  }

  return formattedBeneficiary;
};

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
