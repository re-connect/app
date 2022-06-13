import { AnyDataInterface } from "./Data";

export interface DocumentInterface extends AnyDataInterface {
  b_prive: boolean;
  documents?: DocumentInterface[];
  id: number;
  nom: string;
  extension?: string;
  dossier_image?: string;
  url?: string;
  thumb?: string;
  folder_id?: number;
  big_thumb?: string;
  beneficiaire?: {
    id?: number;
  };
}

export interface DocumentCardInterface {
  item: DocumentInterface;
}
