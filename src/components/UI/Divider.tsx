import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors } from '../../style';

interface Props {
  style?: ViewStyle;
  backgroundColor?: string;
}

const Divider: React.FC<Props> = ({ style, backgroundColor }) => {
  const genericStyle = {
    height: 1,
    borderBottomColor: backgroundColor || colors.darkGrayMoreTransparent,
    borderBottomWidth: 1,
    marginVertical: 10,
  };
  return <View style={[genericStyle, style]} />;
};

export default Divider;
