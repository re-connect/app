import * as React from 'react';
import { UseBooleanActions } from 'react-hanger/array';

interface ThemeContextInterface {
  value: boolean;
  actions: UseBooleanActions;
}

const defaultValue = {
  value: false,
  actions: {
    setValue: () => null,
    toggle: () => null,
    setTrue: () => null,
    setFalse: () => null,
  },
};

const ThemeContext = React.createContext<ThemeContextInterface>(defaultValue);

export default ThemeContext;
