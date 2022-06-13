import { Text } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TextProps } from 'react-native';

const TranslatedText: React.FC<TextProps> = (props) => {
  const { t } = useTranslation();
  if (!props || !props.children) {
    return null;
  }
  const text = props.children;
  if  (!(typeof text === 'string' || text instanceof String)) return null;
  const stringText = text as string;
  return(
    <Text {...props}>{stringText.includes(':') ? stringText : t(stringText)}</Text>
  )};

export default TranslatedText;
