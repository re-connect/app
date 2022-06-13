import { CreateDataInterface, DataInterface } from './Data';

export interface NoteInterface extends DataInterface {
  contenu: string;
  nom: string;
}

export interface CreateNoteData extends CreateDataInterface {
  contenu: string;
  nom: string;
  b_prive: boolean;
}
