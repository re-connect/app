import * as React from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import FAIcon, { FontAwesome5IconProps } from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';

type Props =  Omit<FontAwesome5IconProps, 'name'> & {
  style?: StyleProp<any>;
  color?: string;
  name?: string;
}

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginHorizontal: 16 },
});


const Icon: React.FC<Props> = ({ style, color, name }) => !name
    ? null
    : <FAIcon style={[styles.icon, style]} color={!color ? colors.white : undefined} name={name}/>
  ;

export default Icon;
