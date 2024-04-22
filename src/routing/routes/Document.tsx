import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentScreen from '../../pages/document/DocumentScreen';
import DocumentsScreen from '../../pages/document/DocumentsScreen';
import FolderScreen from '../../pages/document/FolderScreen';
import { getHeader } from '../helpers';
import { DocumentStackParamList } from './types/Document';
import FullScreenImageScreen from '../../pages/document/FullScreenImageScreen';

const DocumentsStack = createStackNavigator<DocumentStackParamList>();

const Document = () => {
  const { t } = useTranslation();

  return (
    <DocumentsStack.Navigator initialRouteName='DocumentsList'>
      <DocumentsStack.Screen name='DocumentsList' component={DocumentsScreen} options={getHeader(t('documents'))} />
      <DocumentsStack.Screen name='Folder' component={FolderScreen} options={getHeader(t('folders'))} />
      <DocumentsStack.Screen name='Document' component={DocumentScreen} options={getHeader(t('documents'))} />
    </DocumentsStack.Navigator>
  );
};

export default Document;
