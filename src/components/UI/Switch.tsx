import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../style';
import Text from './Text';
import Icon from './Icon';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  switch: {
    marginHorizontal: 16,
    position: 'relative',
    height: 50,
    width: 150,
  },
  switchBar: {
    top: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  switchIndicatorIcon: {
    fontSize: 20,
  },
  switchIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  text: {
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

interface Props {
  isOn: boolean;
  disabled?: boolean;
  onToggle: () => void;
  isToggling?: boolean;
}

const Switch: React.FC<Props> = ({ disabled, isOn, onToggle, isToggling }) => {
  const [on, actions] = useBoolean(isOn);

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled || isToggling}
      onPress={() => {
        actions.toggle();
        onToggle();
      }}>
      <Text style={styles.text}>shared</Text>
      <View style={styles.switch}>
        <View style={styles.switchBar} />
        <View
          style={{
            ...styles.switchIndicator,
            left: !on ? 0 : 100,
            backgroundColor: !on ? colors.blue : colors.red,
          }}>
          {isToggling ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Icon style={styles.switchIndicatorIcon} color={colors.white} name={!on ? 'lock-open' : 'lock'} />
          )}
        </View>
      </View>
      <Text style={styles.text}>private</Text>
    </TouchableOpacity>
  );
};

export default Switch;
