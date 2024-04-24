import * as React from 'react';
import { UseBooleanActions } from 'react-hanger/array';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../style';
import { ProfileItemInterface } from './ProfileItem';
import Text from './Text';
import Icon from './Icon';

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginHorizontal: 16, color: colors.white },
  label: { fontSize: 18, color: colors.white, textAlign: 'center', fontWeight: 'bold' },
  wrapper: {
    opacity: 0.6,
    paddingVertical: 17,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
  },
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
    <View style={[styles.wrapper, { backgroundColor: userColor }]}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <>{!iconName ? null : <Icon style={styles.icon} name={iconName} color={colors.gray} />}</>
        <Text style={[styles.label, readOnly && { marginRight: '33%' }]}>{label}</Text>
        {!readOnly ? (
          <TouchableOpacity onPress={onPress} disabled={isUpdating}>
            <>
              {isUpdating ? (
                <ActivityIndicator size='small' color={colors.white} style={{ marginHorizontal: 16 }} />
              ) : (
                <Icon style={[styles.icon, showForm && { marginLeft: 18 }]} name={showForm ? 'save' : 'pen'} />
              )}
            </>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default ProfileItemHeader;
