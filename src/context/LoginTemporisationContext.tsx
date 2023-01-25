import * as React from 'react';

export interface LoginTemporisationInterface {
  attempts: number;
  isTemporarlyBlocked: boolean;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  setIsTemporarlyBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  attempts: 0,
  isTemporarlyBlocked: false,
  setAttempts: () => 0,
  setIsTemporarlyBlocked: () => false,
};

const LoginTemporisationContext = React.createContext<LoginTemporisationInterface>(defaultState);

export default LoginTemporisationContext;
