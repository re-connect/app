import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { DocumentInterface } from '../../types/Documents';
import Text from '../UI/Text';
import DocumentCardActions from './DocumentCardActions';
import DocumentCardThumbnail from './DocumentCardThumbnail';

const styles = StyleSheet.create({
  content: { flexDirection: 'row', alignItems: 'center' },
  name: { flex: 1 },
});

interface DocumentCardContentProps {
  document: DocumentInterface;
  thumbnailUrl: string;
}

const DocumentCardContent = ({ document, thumbnailUrl }: DocumentCardContentProps): React.ReactElement => (
  <View style={styles.content}>
    <DocumentCardThumbnail document={document} thumbnailUrl={thumbnailUrl} />
    <Text style={styles.name}>{document.nom}</Text>
    <DocumentCardActions document={document} />
  </View>
);

export default DocumentCardContent;
