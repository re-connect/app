import { Center, Divider, HStack, Pressable, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useOpenItem } from '../../../hooks/DocumentsHooks';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import H3 from '../../UI/H3';
import Text from '../../UI/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  menuIcon: { fontSize: 20 },
  text: { fontSize: 16 },
});

interface Props {
  document: DocumentInterface;
  close: () => void;
  isLoading: boolean;
  actions: {
    pickFolder: () => void;
    delete: () => void;
    moveOut: () => void;
    showRenameForm: () => void;
    showSendEmailForm: () => void;
  };
}
interface ActionItemProps {
  action: () => void;
  color?: string;
  label: string;
  icon: string;
  condition?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ action, label, icon, color = colors.blue, condition = true }) => {
  if (!condition) return null;

  return (
    <Pressable onPress={action}>
      <HStack alignItems='center'>
        <Center m='2' p='2'>
          <Icon style={styles.menuIcon} color={color} name={icon} solid />
        </Center>
        <Text style={styles.text}>{label}</Text>
      </HStack>
    </Pressable>
  );
};

const ActionsModalContent: React.FC<Props> = ({ document, close, isLoading, actions }) => {
  const onOpenItem = () => {
    openItem(document);
    close();
  };

  const items = [
    { action: onOpenItem, label: 'view', icon: 'eye' },
    { action: actions.pickFolder, label: 'move_to_folder', icon: 'folder', condition: !document.is_folder },
    { action: actions.moveOut, label: 'move_out_of_folder', icon: 'folder', condition: !!document.folder_id },
    { action: actions.showSendEmailForm, label: 'send_by_email', icon: 'paper-plane', condition: !document.is_folder },
    { action: actions.showRenameForm, color: colors.green, label: 'rename', icon: 'pen' },
    { action: actions.delete, color: colors.red, label: 'delete', icon: 'trash' },
    { action: close, color: colors.black, label: 'cancel', icon: 'times' },
  ];

  const openItem = useOpenItem();

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={close}>
      <VStack alignSelf='stretch' justifyContent='center' rounded='2xl' bg={colors.white} shadow={3} m='2' p='4'>
        {isLoading ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <>
            <Center>
              <H3>{document.nom}</H3>
            </Center>
            <Divider my='4' />
            {items.map(({ action, color, label, icon, condition }) => (
              <ActionItem action={action} color={color} label={label} icon={icon} condition={condition} key={label} />
            ))}
          </>
        )}
      </VStack>
    </TouchableOpacity>
  );
};

export default ActionsModalContent;
