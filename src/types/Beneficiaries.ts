import { UserInterface } from './Users';

export interface CreateBeneficiaryDataInterface {
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  password: string;
  confirmPassword: string;
  secret_question?: string;
  secret_question_custom_text?: string;
  secret_question_answer?: string;
  birth_date: string;
  centers: number[];
}

export interface CreateBeneficiaryErrorsInterface {
  user?: {
    username?: string;
    prenom?: string;
    nom?: string;
    telephone?: string;
    email?: string;
    plainPassword?: {
      first?: string;
      second?: string;
    };
  };
  dateNaissance?: string;
  questionSecrete?: string;
  reponseSecrete?: string;
}

export interface BeneficiaryCardInterface {
  item: BeneficiaryInterface;
}

export interface EnableBeneficiaryInterface {
  secret_question: string;
  other_secret_question?: string;
  secret_response: string;
  password: string;
  email?: string;
}

export interface EnableBeneficiaryErrorsInterface {
  questionSecrete?: string;
  autreQuestionSecrete?: string;
  reponseSecrete?: string;
  plainPassword?: string;
  email?: string;
}

export interface EnableBeneficiaryDataInterface {
  autre_question_secrete: string;
  confirmPassword: string;
  email: string;
  password: string;
  question_secrete: string;
  reponse_secrete: string;
}

export interface BeneficiaryInterface {
  id: number;
  user: UserInterface;
}
