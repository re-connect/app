import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../style';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.white,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    margin: 4,
    padding: 16,
  },
});

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => <View style={styles.wrapper}>{children}</View>;

export default Section;
