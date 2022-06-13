import { RouteProp } from '@react-navigation/native';
import { formatISO9075, parse } from 'date-fns';
import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import EventForm from '../components/Events/EventForm';
import Screen from '../components/Screen';
import EventContext from '../context/EventContext';
import { useUpdateData } from '../hooks/DataHooks';
import { CreateEventData, EventInterface } from '../types/Event';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  actions: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  form: {
    paddingHorizontal: 32,
    flex: 1,
    alignSelf: 'stretch',
  },
});

type CreateEventScreenParams = {
  Event: { eventId: number };
};
type Props = {
  route: RouteProp<CreateEventScreenParams, 'Event'>;
};

const serializeEvent = (event: CreateEventData) => ({
  ...event,
  date: !event.date ? new Date() : formatISO9075(parse(event.date, 'ddMMyyyyHHmm', new Date())),
  rappels: event.rappels.map((dateRappel: string) =>
    ({date: formatISO9075(parse(dateRappel, 'ddMMyyyyHHmm', new Date()))})),
});

const EditEventScreen: React.FC<Props> = ({route}) => {
  const {eventId} = route.params;
  const {list} = React.useContext(EventContext);
  const {isUpdating, update} = useUpdateData(`events/${eventId}`, eventId, EventContext);
  const event: any = list.find((event: EventInterface) => event.id === eventId);

  if (!event) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <EventForm
          event={event}
          isSubmitting={isUpdating}
          onSubmit={(newEvent: CreateEventData) => update({...event, ...serializeEvent(newEvent)})}
        />
      </View>
    </Screen>
  );
};

export default EditEventScreen;
