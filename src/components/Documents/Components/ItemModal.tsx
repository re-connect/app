import React from 'react';
import { StyleSheet, View } from 'react-native';
import RoundedButton from '../../UI/RoundedButton';

const ItemModal: React.FC<{ label: string; onPress: () => void; iconName: string }> = ({
  label,
  onPress,
  iconName,
}) => {
  return (
    <View style={styles.wrapper}>
      <RoundedButton text={label} onPress={onPress} iconName={iconName} fontSize={17} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
});

export default ItemModal;
