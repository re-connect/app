import { EnableBeneficiaryInterface } from '../types/Beneficiaries';
import { UserInterface } from '../types/Users';

export const basicBeneficiary: UserInterface = {
  id: 5590,
  subject_id: 8025,
  username: 'mathias.duchossoy.06/10/1989',
  username_canonical: 'mathias.duchossoy.06/10/1989',
  email: 'mathias.duchossoy@gmail.com',
  email_canonical: 'mathias.duchossoy@gmail.com',
  enabled: true,
  last_login: '2019-09-05T11:17:12+02:00',
  groups: {},
  roles: ['ROLE_BENEFICIAIRE'],
  created_at: '2019-03-11T07:26:35+01:00',
  updated_at: '2019-09-05T11:17:13+02:00',
  prenom: 'mathias',
  nom: 'duchossoy',
  telephone: '+33685876953',
  b_actif: false,
  type_user: 'ROLE_BENEFICIAIRE',
  b_first_mobile_connexion: false,
  date_naissance: '1989-10-06T00:00:00+01:00',
  total_file_size: 36180473,
  centres: ['CHRS Reconnect', 'Gymnase', 'Halte Jeunes'],
  question_secrete: 'Quel est le prenom de la mère du bénéficiaire ?',
  reponse_secrete: 'jeanne',
};

export const basicBeneficiaryCreateData = {
  first_name: 'mathias',
  last_name: 'duchossoy',
  password: 'password',
  confirmPassword: 'password',
  email: 'mathias.duchossoy2@reconnect.fr',
  phone: '111111111',
  birth_date: new Date('10/06/1995'),
  secret_question: 'Quel est le prenom de la mère du bénéficiaire ?',
  secret_question_custom_text: '',
  secret_question_answer: 'jeanne',
  centers: [1, 2, 3],
};

export const basicBeneficiaryCreateDataForm = {
  're_form_beneficiaire[user][prenom]': 'mathias',
  're_form_beneficiaire[user][nom]': 'duchossoy',
  're_form_beneficiaire[user][telephone]': '0111111111',
  're_form_beneficiaire[user][email]': 'mathias.duchossoy2@reconnect.fr',
  're_form_beneficiaire[user][plainPassword][first]': 'password',
  're_form_beneficiaire[user][plainPassword][second]': 'password',
  're_form_beneficiaire[questionSecrete]': 'Quel est le prenom de la mère du bénéficiaire ?',
  're_form_beneficiaire[autreQuestionSecrete]': '',
  're_form_beneficiaire[reponseSecrete]': 'jeanne',
  're_form_beneficiaire[dateNaissance][day]': 6,
  're_form_beneficiaire[dateNaissance][month]': 10,
  're_form_beneficiaire[dateNaissance][year]': 1995,
  're_form_beneficiaire[centres][0]': 1,
  're_form_beneficiaire[centres][1]': 2,
  're_form_beneficiaire[centres][2]': 3,
};

export const basicSecretQuestions = {
  Autre: 'Autre',
  'Quel est la couleur preferee du beneficiaire ?': 'Quel est la couleur préferée du bénéficiaire ?',
  'Quel est la ville de naissance du beneficiaire ?': 'Quel est la ville de naissance du bénéficiaire ?',
  'Quel est le nom de famille de la mere du beneficiaire ?': 'Quel est le nom de famille de la mère du bénéficiaire ?',
  "Quel est le nom de l'animal de compagnie du beneficiaire ?":
    "Quel est le nom de l'animal de compagnie du bénéficiaire ?",
  'Quel est le nom de la rue preferee du beneficiaire ?': 'Quel est le nom de la rue préférée du bénéficiaire ?',
  'Quel est le prenom de la mere du beneficiaire ?': 'Quel est le prénom de la mère du bénéficiaire ?',
  'Quel est le surnom du beneficiaire ?': 'Quel est le surnom du bénéficiaire ?',
  'Quel etablissement du secondaire le beneficiaire se souvient avoir frequente ?':
    'Quel établissement du secondaire le bénéficiaire se souvient avoir fréquenté ?',
};

export const basicSecretQuestionsList = [
  'Autre',
  'Quel est la couleur préferée du bénéficiaire ?',
  'Quel est la ville de naissance du bénéficiaire ?',
  'Quel est le nom de famille de la mère du bénéficiaire ?',
  "Quel est le nom de l'animal de compagnie du bénéficiaire ?",
  'Quel est le nom de la rue préférée du bénéficiaire ?',
  'Quel est le prénom de la mère du bénéficiaire ?',
  'Quel est le surnom du bénéficiaire ?',
  'Quel établissement du secondaire le bénéficiaire se souvient avoir fréquenté ?',
];

export const serverErrors = {
  user: {
    username: ['error'],
    prenom: ['error'],
    nom: ['error'],
    telephone: ['error'],
    email: ['error'],
    plainPassword: {
      first: ['error'],
      second: ['error'],
    },
  },
  dateNaissance: ['error'],
  questionSecrete: ['error'],
  reponseSecrete: ['error'],
};

export const beneficiaryFormErrors = {
  username: ['error'],
  first_name: ['error'],
  last_name: ['error'],
  phone: ['error'],
  email: ['error'],
  password: ['error'],
  birth_date: ['error'],
  secret_question: ['error'],
  secret_question_answer: ['error'],
};

export const basicBeneficiariesList: UserInterface[] = [
  basicBeneficiary,
  {
    id: 5590,
    subject_id: 8025,
    username: 'thibaut.cheymol.09/01/1989',
    username_canonical: 'thibaut.cheymol.09/01/1989',
    email: 'thibaut.cheymol@reconnect.fr',
    email_canonical: 'thibaut.cheymol@reconnect.fr',
    enabled: true,
    last_login: '2019-09-05T11:17:12+02:00',
    groups: {},
    roles: ['ROLE_BENEFICIAIRE'],
    created_at: '2019-03-11T07:26:35+01:00',
    updated_at: '2019-09-05T11:17:13+02:00',
    prenom: 'thibaut',
    nom: 'cheymol',
    telephone: '+33612345678',
    b_actif: false,
    type_user: 'ROLE_BENEFICIAIRE',
    b_first_mobile_connexion: false,
    date_naissance: '1989-10-06T00:00:00+01:00',
    total_file_size: 36180473,
    centres: ['CHRS Reconnect', 'Gymnase', 'Halte Jeunes'],
  },
];

export const basicEnableBeneficiary: EnableBeneficiaryInterface = {
  secret_question: 'Quel est la couleur préférée du bénéficiaire ?',
  other_secret_question: 'Question ?',
  secret_response: 'réponse',
  password: 'password',
  email: 'prenom.nom@reconnect.fr',
};
