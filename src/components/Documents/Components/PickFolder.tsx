import { Center, Divider, HStack, Pressable, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FolderContext from '../../../context/FolderContext';
import { useMoveDocumentInFolder } from '../../../hooks/DocumentsHooks';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import H3 from '../../UI/H3';
import Text from '../../UI/Text';

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
  text: { fontSize: 18 },
});

interface Props {
  document: DocumentInterface;
  close: () => void;
  onPick: () => void;
}

const PickFolder: React.FC<Props> = ({ document, close, onPick }) => {
  const { list: folders } = React.useContext(FolderContext);
  const { isMovingIn, triggerMoveDocumentIntoFolder } = useMoveDocumentInFolder(close);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={close}>
      <VStack alignSelf='stretch' justifyContent='center' rounded='2xl' bg={colors.white} shadow={3} p='4'>
        {isMovingIn ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <>
            <H3>move_to_folder</H3>
            <Center py='2'>
              <Text style={styles.text}>{document.nom}</Text>
            </Center>
            <Divider my='5' />
            {folders.map((folder: DocumentInterface) => (
              <Pressable
                key={folder.id}
                onPress={() => {
                  triggerMoveDocumentIntoFolder(document, folder);
                }}>
                <HStack py='2'>
                  <Icon style={styles.menuIcon} color={colors.blue} name='folder' solid />
                  <Text style={styles.text}>{folder.nom}</Text>
                </HStack>
              </Pressable>
            ))}
            <HStack mt='4'>
              <Pressable onPress={() => onPick()}>
                <HStack py='2'>
                  <Icon style={styles.menuIcon} color={colors.darkGray} name='times' />
                  <Text>cancel</Text>
                </HStack>
              </Pressable>
            </HStack>
          </>
        )}
      </VStack>
    </TouchableOpacity>
  );
};

export default PickFolder;
