import { CenterInterface } from './Centers';

export interface UserInterface {
  b_actif: boolean;
  b_first_mobile_connexion: boolean;
  created_at: string;
  email_canonical: string;
  email: string;
  enabled: boolean;
  groups: Record<string, unknown>;
  id: number;
  last_login: string;
  nom: string;
  prenom: string;
  roles: string[];
  subject_id: number;
  telephone: string;
  type_user: string;
  updated_at: string;
  username_canonical: string;
  username: string;
  date_naissance?: string;
  beneficiaires_centres?: CenterInterface[];
  total_file_size?: number;
  centres?: string[];
  question_secrete?: string;
  reponse_secrete?: string;
}

export type UserField =
  | 'email'
  | 'nom'
  | 'prenom'
  | 'telephone'
  | 'username'
  | 'date_naissance'
  | 'question_secrete'
  | 'reponse_secrete';

export interface ResetPasswordData {
  password: string;
  confirm: string;
  currentPassword?: string;
}
