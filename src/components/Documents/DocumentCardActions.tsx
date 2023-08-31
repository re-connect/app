import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import { UseBooleanActions } from 'react-hanger/array';

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
  openModalActions: UseBooleanActions;
  setCurrentDocument: (document: DocumentInterface) => void;
}

const DocumentCardActions: React.FC<DocumentCardActionsProps> = ({
  document,
  openModalActions,
  setCurrentDocument,
}) => {
  const onPress = async () => {
    setCurrentDocument(document);
    openModalActions.setTrue();
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={onPress} style={styles.icon}>
        <Icon style={{ fontSize: 20 }} color={colors.black} name='ellipsis-v' />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentCardActions;
