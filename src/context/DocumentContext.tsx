import * as React from 'react';
import { DocumentInterface } from '../types/Documents';
export interface DocumentsContextInterface {
  list: DocumentInterface[];
  setList: (list: DocumentInterface[]) => void;
}

const defaultState: DocumentsContextInterface = {
  list: [],
  setList: () => null,
};

const DocumentContext = React.createContext(defaultState);

export default DocumentContext;
