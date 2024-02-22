import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableHighlight, View } from 'react-native';
import { colors } from '../../style';
import Text from '../UI/Text';
import Thumbnail from './Thumbnail';
import { useBoolean } from 'react-hanger/array';
import { AnyDataInterface } from '../../types/Data';
import Icon from './Icon';

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
  onPress: (item: AnyDataInterface) => void;
  title: string;
  item: AnyDataInterface;
  iconName?: string;
  hasThumbnail?: boolean;
  disabled?: boolean;
  isPrivate: boolean;
  RightComponent: React.FC | null;
  Subtitle: React.FC | null;
}

const Card: React.FC<Props> = ({
  item,
  disabled,
  onPress,
  hasThumbnail,
  title,
  iconName,
  isPrivate,
  RightComponent,
  Subtitle,
}) => {
  const [isLoading, isLoadingActions] = useBoolean(false);
  const onItemPress = () => {
    isLoadingActions.setTrue();
    onPress(item);
    setTimeout(() => {
      isLoadingActions.setFalse();
    }, 1000);
  };

  if (disabled) {
    return null;
  }

  return (
    <TouchableHighlight
      disabled={isLoading}
      onPress={() => onItemPress()}
      underlayColor={colors.secondary}
      style={{ ...styles.container, borderLeftColor: isPrivate ? colors.red : colors.blue }}>
      {isLoading ? (
        <ActivityIndicator size='large' color={colors.black} />
      ) : (
        <>
          <Icon style={styles.icon} color={colors.darkGray} name={iconName} />
          {!hasThumbnail ? null : <Thumbnail documentId={item.id} />}
          <View style={styles.content}>
            <Text>{title}</Text>
            {Subtitle === null ? null : <Subtitle />}
          </View>
          {RightComponent === null ? null : <RightComponent />}
        </>
      )}
    </TouchableHighlight>
  );
};

export default Card;
