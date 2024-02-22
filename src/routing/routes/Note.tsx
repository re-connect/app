import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CreateNoteScreen from '../../pages/note/CreateNoteScreen';
import EditNoteScreen from '../../pages/note/EditNoteScreen';
import NoteScreen from '../../pages/note/NoteScreen';
import NotesScreen from '../../pages/note/NotesScreen';
import { getHeader } from '../helpers';
import { NoteStackParamList } from './types/Note';

const NotesStack = createStackNavigator<NoteStackParamList>();

const Note = () => {
  const { t } = useTranslation();

  return (
    <NotesStack.Navigator initialRouteName='NotesList'>
      <NotesStack.Screen name='NotesList' component={NotesScreen} options={getHeader(t('notes'))} />
      <NotesStack.Screen name='CreateNote' component={CreateNoteScreen} options={getHeader(t('new_note'))} />
      <NotesStack.Screen name='Note' component={NoteScreen} options={getHeader(t('note'))} />
      <NotesStack.Screen name='EditNote' component={EditNoteScreen} options={getHeader(t('update_note'))} />
    </NotesStack.Navigator>
  );
};

export default Note;
