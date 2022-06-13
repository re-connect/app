import * as React from 'react';
import { UserInterface } from '../types/Users';

export interface UsersContextInterface {
  user: UserInterface | null;
  lastUsername: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  setLastUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultState = {
  user: null,
  lastUsername: null,
  setUser: () => null,
  setLastUsername: () => null,
};

const UserContext = React.createContext<UsersContextInterface>(defaultState);

export default UserContext;
