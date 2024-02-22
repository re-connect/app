import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import { UseBooleanActions } from 'react-hanger/array';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface DocumentCardActionsProps {
  document: DocumentInterface;
  openModalActions?: UseBooleanActions;
  setCurrentDocument?: (document: DocumentInterface) => void;
}

const DocumentCardActions: React.FC<DocumentCardActionsProps> = ({
  document,
  openModalActions,
  setCurrentDocument,
}) => {
  const onPress = () => {
    if (setCurrentDocument) {
      setCurrentDocument(document);
    }
    if (openModalActions) {
      openModalActions.setTrue();
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={onPress} style={styles.icon}>
        <Icon style={{ fontSize: 20 }} color={colors.black} name='ellipsis-vertical' />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentCardActions;
