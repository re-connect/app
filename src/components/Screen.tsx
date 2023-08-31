import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Screen: React.FC<Props> = ({ children, backgroundColor }) => {
  return (
    <View style={{ ...style.container, backgroundColor: !backgroundColor ? '#DFE3EB' : backgroundColor }}>
      {children}
    </View>
  );
};

export default Screen;
