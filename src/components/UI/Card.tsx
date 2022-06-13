import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import Text from '../UI/Text';
import Thumbnail from './Thumbnail';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderLeftColor: colors.white,
    borderRightColor: colors.white,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    minHeight: 80,
    marginLeft: 0,
    marginVertical: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    borderLeftWidth: 4,
  },
  content: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 16,
  },
});

interface Props {
  onPress: (itemId: number) => void;
  title: string;
  itemId: number;
  iconName?: string;
  hasThumbnail?: boolean;
  isPrivate: boolean;
  RightComponent: React.FC | null;
  Subtitle: React.FC | null;
}

const Card: React.FC<Props> = ({
  itemId,
  onPress,
  hasThumbnail,
  title,
  iconName,
  isPrivate,
  RightComponent,
  Subtitle,
}) => (
  <TouchableHighlight
    onPress={() => onPress(itemId)}
    underlayColor={colors.secondary}
    style={{ ...styles.container, borderLeftColor: isPrivate ? colors.red : colors.blue }}
  >
    <>
      {!iconName ? null : <Icon style={styles.icon} solid color={colors.darkGray} name={iconName} />}
      {!hasThumbnail ? null : <Thumbnail documentId={itemId} />}
      <View
        style={styles.content}
      >
        <Text>{title}</Text>
        {Subtitle === null ? null : <Subtitle />}
      </View>
      {RightComponent === null ? null : <RightComponent />}
    </>
  </TouchableHighlight>
);

export default Card;
