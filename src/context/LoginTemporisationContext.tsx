import * as React from 'react';

export interface LoginTemporisationInterface {
  attempts: number;
  isTemporarlyBlocked: () => boolean;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}

const defaultState = {
  attempts: 0,
  isTemporarlyBlocked: () => false,
  setAttempts: () => 0,
};

const LoginTemporisationContext = React.createContext<LoginTemporisationInterface>(defaultState);

export default LoginTemporisationContext;
