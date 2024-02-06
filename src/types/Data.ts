import { DocumentInterface } from './Documents';
import { ReminderInterface } from './Event';
import { FolderInterface } from './Folder';

export interface CreateDataInterface {
  id?: number;
  b_prive: boolean;
}
export interface DataInterface {
  b_prive: boolean;
  created_at: Date | string;
  id: number;
  updated_at: Date | string;
}

export interface AnyDataInterface extends DataInterface {
  archive?: boolean;
  association?: string;
  beneficiaire?: {
    id?: number;
  };
  big_thumb?: string;
  commentaire?: string;
  contenu?: string;
  date?: Date | string | null;
  dateToString?: string;
  documents?: DocumentInterface[];
  beneficiaire_id?: number;
  sous_dossiers?: FolderInterface[];
  dossier_image?: string;
  email?: string;
  extension?: string;
  folder_id?: number;
  is_folder?: boolean;
  lieu?: string;
  nom: string;
  prenom?: string;
  rappels?: ReminderInterface[] | string[];
  telephone?: string;
  thumb?: string;
  url?: string;
}

export interface CreateAnyDataInterface extends CreateDataInterface {
  association?: string;
  commentaire?: string;
  email?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  contenu?: string;
  archive?: boolean;
  date?: Date | string;
  dateToString?: string;
  lieu?: string;
  rappels?: Array<{ date: Date | string }>;
}

export interface ListContextInterface<T extends AnyDataInterface> {
  list: T[];
  setList: (list: T[]) => void;
}
