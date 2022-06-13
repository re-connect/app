import * as React from 'react';
import { EventInterface } from '../types/Event';

export interface EventContextInterface {
  list: EventInterface[];
  setList: (list: EventInterface[]) => void;
}

const defaultState: EventContextInterface = {
  list: [],
  setList: (): void => {},
};

const EventContext = React.createContext(defaultState);

export default EventContext;
