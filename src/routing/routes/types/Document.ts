import { NavigationProp, RouteProp } from '@react-navigation/native';

type FolderScreenParams = { folderId: number; beneficiaryId: number };
export type FolderScreenProps = {
  route: RouteProp<{ Folder: FolderScreenParams }, 'Folder'>;
};

type DocumentScreenParams = { id: number };
export type DocumentScreenProps = {
  route: RouteProp<{ Document: DocumentScreenParams }, 'Document'>;
  navigation: NavigationProp<any>;
};

export type DocumentStackParamList = {
  DocumentsList: {};
  Document: DocumentScreenParams;
  Folder: FolderScreenParams;
};
