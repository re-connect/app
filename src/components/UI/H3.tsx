import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../../style';

const H3: React.FC<TextProps> = props => {
  const { t } = useTranslation();
  if (!props || !props.children) {
    return null;
  }
  const text = props.children;
  if (!(typeof text === 'string' || text instanceof String)) {
    return null;
  }
  const stringText = text as string;
  return (
    <Text style={[h3Styles.text, props.style]} {...props}>
      {stringText.includes(':') ? stringText : t(stringText)}
    </Text>
  );
};

const h3Styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontFamily: 'HelveticaCondensed',
    fontWeight: 'bold',
    color: colors.darkGrayTransparent,
  },
});

export default H3;
