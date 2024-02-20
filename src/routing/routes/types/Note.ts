import { NavigationProp, RouteProp } from '@react-navigation/native';

type NoteScreenParams = { noteId: number; beneficiaryId: number };
export type NoteScreenProps = {
  route: RouteProp<{ Note: NoteScreenParams }, 'Note'>;
  navigation: NavigationProp<any, any>;
};

type EditNoteScreenParams = { noteId: number };
export type EditNoteScreenProps = {
  route: RouteProp<{ EditNote: EditNoteScreenParams }, 'EditNote'>;
};

export type NoteStackParamList = {
  NotesList: {};
  CreateNote: {};
  Note: NoteScreenParams;
  EditNote: EditNoteScreenParams;
};
