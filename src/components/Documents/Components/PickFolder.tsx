import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import FolderContext from '../../../context/FolderContext';
import { useMoveDocumentInFolder } from '../../../hooks/DocumentsHooks';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import H3 from '../../UI/H3';
import Text from '../../UI/Text';
import Divider from '../../UI/Divider';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  menuIcon: { fontSize: 20, marginRight: 16 },
  text: { fontSize: 18, textAlign: 'center', color: colors.darkGrayTransparent },
  title: {
    marginVertical: 8,
  },
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 16,
    alignSelf: 'stretch',
  },
  hstack: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  cancelButton: {
    marginTop: 16,
  },
});

interface Props {
  document: DocumentInterface;
  close: () => void;
  onPick: () => void;
}

const PickFolder: React.FC<Props> = ({ document, close, onPick }) => {
  const { list: folders } = React.useContext(FolderContext);
  const { isMovingIn, triggerMoveDocumentIntoFolder, hasMoved } = useMoveDocumentInFolder();
  hasMoved && close();

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={close}>
      <View style={styles.wrapper}>
        {isMovingIn ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <>
            <H3>move_to_folder</H3>
            <Text style={[styles.text, styles.title]}>{document.nom}</Text>
            <Divider />
            {folders.map((folder: DocumentInterface) => (
              <TouchableOpacity
                key={folder.id}
                onPress={() => {
                  triggerMoveDocumentIntoFolder(document, folder);
                }}>
                <View style={styles.hstack}>
                  <Icon style={styles.menuIcon} color={colors.blue} name='folder' />
                  <Text style={styles.text}>{folder.nom}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => onPick()} style={styles.cancelButton}>
              <View style={styles.hstack}>
                <Icon style={styles.menuIcon} color={colors.darkGray} name='xmark' />
                <Text>cancel</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PickFolder;
