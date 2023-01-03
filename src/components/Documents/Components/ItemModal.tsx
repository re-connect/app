import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { VStack } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../style';

const ItemModal: React.FC<{ label: string; onPress: () => void; iconName: string }> = ({
  label,
  onPress,
  iconName,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack
        flexDirection={'row'}
        justifyContent='center'
        rounded='md'
        bg={colors.darkGrayMoreTransparent}
        m='1'
        p='3'>
        <Icon
          color={colors.accent}
          name={iconName}
          size={20}
          style={{ marginRight: 10, marginLeft: 5, alignSelf: 'center' }}
        />
        <Text>{label}</Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default ItemModal;
