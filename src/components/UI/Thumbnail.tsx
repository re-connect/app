import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import DocumentContext from '../../context/DocumentContext';
import { findNestedDocument } from '../../helpers/documentsHelper';
import { useShowPreview } from '../../hooks/DocumentsHooks';
import { colors } from '../../style';
import Icon from './Icon';

const styles = StyleSheet.create({
  thumbnail: {
    marginRight: 8,
    borderRadius: 4,
    height: 70,
    width: 70,
  },
  folderIcon: {
    fontSize: 40,
    color: colors.darkGray,
  },
  folderIconContainer: {
    marginRight: 8,
    borderRadius: 4,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailPlaceholder: {
    marginRight: 8,
    borderRadius: 4,
    height: 70,
    width: 70,
    backgroundColor: colors.gray,
  },
});

interface Props {
  documentId: number;
}

const Thumbnail: React.FC<Props> = ({ documentId }) => {
  const { list } = React.useContext(DocumentContext);
  const document = findNestedDocument(list, documentId);
  const thumbnailUrl = useShowPreview(documentId);
  if (!document || document.is_folder) {
    return (
      <View style={styles.folderIconContainer}>
        <Icon style={{ ...styles.folderIcon }} name="folder-open" />
      </View>
    );
  } else if (!thumbnailUrl) {
    return <View style={styles.thumbnailPlaceholder} />;
  }
  return <Image style={styles.thumbnail} source={{ uri: thumbnailUrl }} />;
};

export default Thumbnail;
