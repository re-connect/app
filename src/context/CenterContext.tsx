import * as React from 'react';
import { UserCenterInterface } from '../types/Centers';

export interface ContextInterface {
  list: UserCenterInterface[];
  setList: (centers: UserCenterInterface[]) => void;
}

const defaultState: ContextInterface = {
  list: [],
  setList: (): void => {},
};

const CenterContext = React.createContext(defaultState);

export default CenterContext;
