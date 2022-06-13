import * as React from 'react';
import { FolderInterface } from '../types/Folder';

export interface FolderContextInterface {
  list: FolderInterface[];
  setList: (list: FolderInterface[]) => void;
}

const defaultState: FolderContextInterface = {
  list: [],
  setList: () => null,
};

const FolderContext = React.createContext(defaultState);

export default FolderContext;
