import { rolePro } from '../helpers/userHelpers';
import { UserInterface } from '../types/Users';

export const basicMember: UserInterface = {
  id: 1039,
  subject_id: 5914,
  username: 'duchossoy.mathias',
  username_canonical: 'duchossoy.mathias',
  email: 'mathias.duchossoy@reconnect.fr',
  email_canonical: 'mathias.duchossoy@reconnect.fr',
  enabled: true,
  last_login: '2019-08-22T11:55:37+02:00',
  groups: {},
  roles: [rolePro],
  created_at: '2018-09-17T10:40:11+02:00',
  updated_at: '2019-08-22T11:55:37+02:00',
  prenom: 'Mathias',
  nom: 'DUCHOSSOY',
  telephone: '0785335635',
  b_actif: false,
  type_user: rolePro,
  b_first_mobile_connexion: true,
};
