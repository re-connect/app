import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
      <VStack flexDirection={'row'} justifyContent='center' rounded='md' bg={colors.primary} m='1' p='3'>
        <Icon color={colors.white} name={iconName} size={20} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </VStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 5,
    alignSelf: 'center',
  },
  label: {
    color: colors.white,
  },
});

export default ItemModal;
