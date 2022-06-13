import * as React from 'react';
import { ContactInterface } from '../types/Contact';

export interface ContactContextInterface {
  list: ContactInterface[];
  setList: (list: ContactInterface[]) => void;
}

const defaultState: ContactContextInterface = {
  list: [],
  setList: (): void => {},
};

const ContactContext = React.createContext(defaultState);

export default ContactContext;
