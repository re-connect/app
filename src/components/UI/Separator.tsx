import * as React from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

const Separator: React.FC<Props> = ({ height, width }) => {
  const style = {
    height: !height ? 1 : 8 * height,
    width: !width ? 1 : 8 * width,
  };
  return <View style={[style]} />;
};

export default Separator;
