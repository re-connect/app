import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import Text from '../../UI/Text';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  menuIcon: {
    fontSize: 20,
    paddingRight: 10,
    width: 30,
    textAlign: 'center',
  },
  text: { fontSize: 16, color: '#666666' },
  documentName: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapper: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    padding: 10,
  },
  wrapperItems: {
    borderBottomWidth: 0.5,
    borderColor: '#cecece',
    marginVertical: 8,
  },
});

interface Props {
  document: DocumentInterface;
  close: () => void;
  isLoading: boolean;
  actions: {
    pickFolder: () => void;
    delete: () => void;
    view: () => void;
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

const ActionItem: React.FC<ActionItemProps> = ({ action, label, icon, color = colors.blue, condition = true }) =>
  !condition ? null : (
    <TouchableOpacity onPress={action}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Icon style={styles.menuIcon} color={color} name={icon} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

const ActionsModalContent: React.FC<Props> = ({ document, close, isLoading, actions }) => {
  const items: ActionItemProps[] = [
    { action: actions.showSendEmailForm, label: 'send_by_email', icon: 'paper-plane', condition: !document.is_folder },
    // { action: actions.download, color: colors.yellow, label: 'download', icon: 'download' },
    { action: actions.pickFolder, label: 'move_to_folder', icon: 'folder', condition: !document.is_folder },
    { action: actions.moveOut, label: 'move_out_of_folder', icon: 'folder', condition: !!document.folder_id },
    { action: actions.showRenameForm, color: colors.green, label: 'rename', icon: 'pen' },
    { action: actions.delete, color: colors.red, label: 'delete', icon: 'trash' },
    { action: close, color: colors.black, label: 'cancel', icon: 'xmark' },
  ];

  if (!document.is_folder) {
    items.push({ action: actions.view, color: colors.yellow, label: 'Download', icon: 'download' });
  }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={close}>
      <View style={styles.wrapper}>
        {isLoading ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <>
            <Text style={[styles.text, styles.documentName]}>{document.nom}</Text>
            <View style={styles.wrapperItems} />
            {items.map(({ action, color, label, icon, condition }) => (
              <ActionItem action={action} color={color} label={label} icon={icon} condition={condition} key={label} />
            ))}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ActionsModalContent;
