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
      <RoundedButton
        text={label}
        onPress={onPress}
        iconName={iconName}
        fontSize={16}
        wrapperStyle={styles.button}
        textStyle={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 30,
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default ItemModal;
