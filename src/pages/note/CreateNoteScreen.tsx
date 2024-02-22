import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import NoteForm from '../../components/Notes/NoteForm';
import Screen from '../../components/Screen';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import NoteContext from '../../context/NoteContext';
import UserContext from '../../context/UserContext';
import { usePostData } from '../../hooks/DataHooks';
import { CreateNoteData } from '../../types/Note';
import { isBeneficiary } from '../../helpers/userHelpers';

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

const CreateNoteScreen: React.FC = () => {
  const { current } = React.useContext(BeneficiaryContext);
  const { user } = React.useContext(UserContext);
  const { isPosting, post } = usePostData(`beneficiaries/${current?.subject_id}/notes`, NoteContext);

  return (
    <Screen>
      <View style={styles.container}>
        <NoteForm
          note={{ b_prive: isBeneficiary(user), contenu: '', nom: '' }}
          isSubmitting={isPosting}
          onSubmit={(note: CreateNoteData) => post(note)}
        />
      </View>
    </Screen>
  );
};

export default CreateNoteScreen;
