import { AnyDataInterface, CreateDataInterface } from './Data';

export interface ReminderInterface {
  id: number;
  date: string;
}

export interface EventInterface extends AnyDataInterface {
  archive: boolean;
  commentaire?: string;
  date?: string | null | Date;
  dateToString: string;
  lieu?: string;
  nom: string;
  rappels: ReminderInterface[];
}

export interface CreateEventData extends CreateDataInterface {
  nom: string;
  rappels: string[];
  date: string;
  commentaire?: string;
  lieu?: string;
}
