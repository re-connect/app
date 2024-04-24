import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import EventForm from '../../components/Events/EventForm';
import Screen from '../../components/Screen';
import EventContext from '../../context/EventContext';
import { useUpdateData } from '../../hooks/DataHooks';
import { CreateEventData, EventInterface } from '../../types/Event';
import { EditEventScreenProps } from '../../routing/routes/types/Event';

const styles = StyleSheet.create({
  container: { paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'stretch' },
});

const EditEventScreen: React.FC<EditEventScreenProps> = ({ route }) => {
  const { eventId } = route.params;
  const { list } = React.useContext(EventContext);
  const { isUpdating, update } = useUpdateData(`events/${eventId}`, eventId, EventContext);
  const event: any = list.find((event: EventInterface) => event.id === eventId);

  if (!event) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <EventForm
          event={event}
          isSubmitting={isUpdating}
          onSubmit={(newEvent: CreateEventData) => update({ ...event, ...newEvent })}
        />
      </View>
    </Screen>
  );
};

export default EditEventScreen;
