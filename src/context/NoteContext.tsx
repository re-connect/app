import * as React from 'react';
import { NoteInterface } from '../types/Note';

export interface NoteContextInterface {
  list: NoteInterface[];
  setList: (list: NoteInterface[]) => void;
}

const defaultState: NoteContextInterface = {
  list: [],
  setList: (): void => {},
};

const NoteContext = React.createContext(defaultState);

export default NoteContext;
