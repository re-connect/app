import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import DocumentsBottomActions from '../../components/Documents/DocumentsBottomActions';
import DocumentsListWrapper from '../../components/Documents/DocumentsListWrapper';
import Screen from '../../components/Screen';
import FolderContext from '../../context/FolderContext';
import { findById, getTruncatedText } from '../../helpers/dataHelper';
import { FolderScreenProps } from '../../routing/routes/types/Document';

const FolderScreen: React.FC<FolderScreenProps> = ({ route }) => {
  const navigation = useNavigation<any>();
  const { folderId } = route.params;
  const { list } = React.useContext(FolderContext);
  const folder = findById(list, folderId);

  React.useEffect(() => {
    navigation.setOptions({ title: !folder ? 'Dossier' : getTruncatedText(folder?.nom) });
  });

  return (
    <Screen backgroundColor='#97A3CF'>
      <DocumentsBottomActions folderId={folderId} />
      <DocumentsListWrapper folderId={folderId} />
    </Screen>
  );
};

export default FolderScreen;
