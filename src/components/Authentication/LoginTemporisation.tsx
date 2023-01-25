import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import LoginTemporisationContext from '../../context/LoginTemporisationContext';
import { colors } from '../../style';
import t from '../../services/translation';

const LoginTemporisation = () => {
  const { setAttempts, setIsTemporarlyBlocked } = React.useContext(LoginTemporisationContext);
  const resetAttempts = () => {
    setAttempts(0);
    setIsTemporarlyBlocked(false);
  };
  return (
    <View style={styles.wrapper}>
      <CountDown
        until={2 * 60}
        onFinish={() => resetAttempts()}
        size={20}
        timeToShow={['M', 'S']}
        timeLabels={{ m: '', s: '' }}
        digitStyle={{ backgroundColor: colors.white }}
      />
      <Text style={styles.text}>{t.t('too_many_login_attempts')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 80,
  },
});
export default LoginTemporisation;
