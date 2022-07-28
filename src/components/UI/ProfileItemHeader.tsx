import { Center, Flex, HStack, Pressable } from 'native-base';
import * as React from 'react';
import { UseBooleanActions } from 'react-hanger/array';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserContext from '../../context/UserContext';
import { useUpdateUser } from '../../hooks/UserHooks';
import { colors } from '../../style';
import { ProfileItemInterface } from './ProfileItem';
import Text from './Text';

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginHorizontal: 16, color: colors.white },
  label: { fontSize: 18, color: colors.white, textAlign: 'center', fontWeight: 'bold' },
});

interface Props {
  item: ProfileItemInterface;
  handleSubmit: () => void;
  showForm: boolean;
  showFormActions: UseBooleanActions;
  userColor: string;
  isUpdating: boolean;
}

const ProfileItemHeader: React.FC<Props> = ({
  handleSubmit,
  showForm,
  showFormActions,
  item: { iconName, label, readOnly },
  userColor,
  isUpdating,
}) => {
  const onPress = showForm ? handleSubmit : showFormActions.setTrue;

  return (
    <HStack bg={userColor} opacity='0.6' p='4' roundedTop='md'>
      <Center>{!iconName ? null : <Icon style={styles.icon} name={iconName} color={colors.gray} />}</Center>
      <Flex flex='1'>
        <Center>
          <Text style={styles.label}>{label}</Text>
        </Center>
      </Flex>
      {!readOnly ? (
        <Pressable onPress={onPress} disabled={isUpdating}>
          <Center>
            {isUpdating ? (
              <ActivityIndicator size='small' color={colors.white} />
            ) : (
              <Icon style={styles.icon} name={showForm ? 'save' : 'pen'} />
            )}
          </Center>
        </Pressable>
      ) : null}
    </HStack>
  );
};

export default ProfileItemHeader;
