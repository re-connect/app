import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import Icon from '../UI/Icon';

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
  document: DocumentInterface;
  thumbnailUrl: string;
}

const DocumentCardThumbnail: React.FC<Props> = ({ document, thumbnailUrl }) => {
  if (document.is_folder) {
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

export default DocumentCardThumbnail;
