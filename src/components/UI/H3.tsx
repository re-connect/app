import { Heading } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TextProps } from 'react-native';

const H3: React.FC<TextProps> = (props) => {
  const { t } = useTranslation();
  if (!props || !props.children) {
    return null;
  }
  const text = props.children;
  if  (!(typeof text === 'string' || text instanceof String)) return null;
  const stringText = text as string;
  return(
    <Heading size="lg" {...props}>{stringText.includes(':') ? stringText : t(stringText)}</Heading>
  )};

export default H3;
