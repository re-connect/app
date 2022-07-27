import * as React from 'react';
import EventForm from '../components/Events/EventForm';
import Screen from '../components/Screen';
import BeneficiaryContext from '../context/BeneficiaryContext';
import EventContext from '../context/EventContext';
import UserContext from '../context/UserContext';
import { usePostData } from '../hooks/DataHooks';
import { CreateEventData } from '../types/Event';

const CreateEventScreen: React.FC = () => {
  const { current } = React.useContext(BeneficiaryContext);
  const { user } = React.useContext(UserContext);
  const { isPosting, post } = usePostData(`beneficiaries/${current?.subject_id}/events`, EventContext);

  const event: CreateEventData = {
    b_prive: user?.type_user === 'ROLE_BENEFICIAIRE',
    commentaire: '',
    date: '',
    lieu: '',
    nom: '',
    rappels: [],
  };

  return (
    <Screen>
      <EventForm event={event} isSubmitting={isPosting} onSubmit={post} />
    </Screen>
  );
};

export default CreateEventScreen;
