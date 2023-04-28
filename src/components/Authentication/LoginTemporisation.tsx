import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import LoginTemporisationContext from '../../context/LoginTemporisationContext';
import { colors } from '../../style';
import TranslatedText from '../UI/Text';

const LoginTemporisation = () => {
  const { setAttempts } = React.useContext(LoginTemporisationContext);

  const resetAttempts = () => {
    setAttempts(0);
  };

  return (
    <View style={styles.wrapper}>
      <CountDown
        until={2 * 60}
        onFinish={resetAttempts}
        size={20}
        timeToShow={['M', 'S']}
        timeLabels={{ m: '', s: '' }}
        digitStyle={{ backgroundColor: colors.white }}
      />
      <TranslatedText style={styles.text}>too_many_login_attempts</TranslatedText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
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
