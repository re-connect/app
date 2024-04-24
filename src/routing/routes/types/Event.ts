import { NavigationProp, RouteProp } from '@react-navigation/native';

type EventScreenParams = { eventId: number; beneficiaryId: number };
export type EventScreenProps = {
  route: RouteProp<{ Event: EventScreenParams }, 'Event'>;
  navigation: NavigationProp<any, any>;
};

type EditEventScreenParams = { eventId: number };
export type EditEventScreenProps = {
  route: RouteProp<{ EditEvent: EditEventScreenParams }, 'EditEvent'>;
};

export type EventStackParamList = {
  EventsList: {};
  CreateEvent: {};
  Event: EventScreenParams;
  EditEvent: EditEventScreenParams;
};
