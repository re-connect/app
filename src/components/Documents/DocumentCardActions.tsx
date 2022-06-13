import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import DocumentActionsModal from './DocumentActionsModal';

const styles = StyleSheet.create({
  content: {
    position: 'relative',
  },
  icon: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface DocumentCardActionsProps {
  document: DocumentInterface;
}

const DocumentCardActions: React.FC<DocumentCardActionsProps> = ({ document }) => {
  const [isModalOpen, openModalACtions] = useBoolean(false);

  return (
    <View style={styles.content}>
      <Modal transparent visible={isModalOpen} animationType="fade">
        <DocumentActionsModal document={document} close={openModalACtions.setFalse} />
      </Modal>
      <TouchableOpacity onPress={openModalACtions.setTrue} style={styles.icon}>
        <Icon style={{ fontSize: 20 }} color={colors.black} name="ellipsis-v" />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentCardActions;
