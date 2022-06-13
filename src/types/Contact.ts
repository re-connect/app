import { CreateDataInterface, DataInterface } from './Data';

export interface ContactInterface extends DataInterface {
  association?: string;
  commentaire?: string;
  email?: string;
  nom: string;
  prenom: string;
  telephone?: string;
}

export interface CreateContactData extends CreateDataInterface {
  association?: string;
  b_prive: boolean;
  commentaire?: string;
  email?: string;
  nom: string;
  prenom: string;
  telephone?: string;
}
