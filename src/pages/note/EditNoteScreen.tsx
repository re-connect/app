import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import NoteForm from '../../components/Notes/NoteForm';
import Screen from '../../components/Screen';
import NoteContext from '../../context/NoteContext';
import { useUpdateData } from '../../hooks/DataHooks';
import { CreateNoteData, NoteInterface } from '../../types/Note';
import { EditNoteScreenProps } from '../../routing/routes/types/Note';

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

const EditNoteScreen: React.FC<EditNoteScreenProps> = ({ route }) => {
  const { noteId } = route.params;
  const { list } = React.useContext(NoteContext);
  const { isUpdating, update } = useUpdateData(`notes/${noteId}`, noteId, NoteContext);
  const note = list.find((note: NoteInterface) => note.id === noteId);

  if (!note) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <NoteForm
          note={note}
          isSubmitting={isUpdating}
          onSubmit={(newNote: CreateNoteData) => update({ ...note, ...newNote })}
        />
      </View>
    </Screen>
  );
};

export default EditNoteScreen;
