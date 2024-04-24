import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../style';
import ErrorText from './ErrorText';
import Text from './Text';
import Icon from './Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderColor: colors.darkGray,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
  text: {
    color: colors.darkGray,
    paddingLeft: 16,
    fontSize: 18,
  },
  leftIcon: {
    fontSize: 15,
    marginLeft: 16,
  },
  rightIcon: {
    marginRight: 16,
  },
  okIconContainer: {
    position: 'absolute',
    borderRadius: 10,
    padding: 3,
    right: 10,
    top: 16,
  },
});

interface Props {
  onPress?: () => void;
  value: string;
  iconName: string;
  touched?: boolean;
  error?: string | null;
}

const FakeTextField: React.FC<Props> = ({ iconName, onPress, value, touched, error }) => {
  const showErrors = touched && error;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.fieldContainer,
          ...(showErrors ? { borderColor: colors.red } : {}),
        }}>
        <Icon style={styles.leftIcon} color={colors.darkGray} name={iconName} />
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{value}</Text>
        </View>
        {!!value && touched ? (
          <Icon
            color={showErrors ? colors.red : colors.primary}
            name={showErrors ? 'xmark' : 'check'}
            style={{ ...styles.rightIcon, color: showErrors ? colors.red : colors.green }}
          />
        ) : null}
      </TouchableOpacity>
      {showErrors ? <ErrorText text={error} /> : null}
    </View>
  );
};
export default FakeTextField;
