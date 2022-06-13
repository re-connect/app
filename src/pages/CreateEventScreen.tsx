import { formatISO9075, parse } from 'date-fns';
import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import EventForm from '../components/Events/EventForm';
import Screen from '../components/Screen';
import BeneficiaryContext from '../context/BeneficiaryContext';
import EventContext from '../context/EventContext';
import UserContext from '../context/UserContext';
import { usePostData } from '../hooks/DataHooks';
import { CreateEventData } from '../types/Event';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

const serializeEvent = (event: CreateEventData) => ({
  ...event,
  date: !event.date ? new Date() : formatISO9075(parse(event.date, 'ddMMyyyyHHmm', new Date())),
  rappels: event.rappels.map((dateRappel: string) =>
    ({date: formatISO9075(parse(dateRappel, 'ddMMyyyyHHmm', new Date()))})),
});

const CreateEventScreen: React.FC = () => {
  const {current} = React.useContext(BeneficiaryContext);
  const {user} = React.useContext(UserContext);
  const {isPosting, post} = usePostData(`beneficiaries/${current?.subject_id}/events`, EventContext);

  const event: CreateEventData = {
    b_prive: user?.type_user === 'ROLE_BENEFICIAIRE',
    commentaire: '',
    date: null,
    lieu: '',
    nom: '',
    rappels: [],
  };

  return (
    <Screen>
      <View style={styles.container}>
        <EventForm
          event={event}
          isSubmitting={isPosting}
          onSubmit={(event: CreateEventData) => post(serializeEvent(event))}
        />
      </View>
    </Screen>
  );
};

export default CreateEventScreen;
