import * as Formik from 'formik';
import { Box, Center, Flex, HStack, Pressable, View, VStack } from 'native-base';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { ActivityIndicator, StyleSheet, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserContext from '../../context/UserContext';
import userShape from '../../helpers/forms/userShape';
import { formatPhoneForApi } from '../../helpers/userHelpers';
import { useUpdateUser } from '../../hooks/UserHooks';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import Text from './Text';
import TextField from './TextField';

const styles = StyleSheet.create({
  container: { borderRadius: 15 },
  icon: { fontSize: 20, marginHorizontal: 16, color: colors.white },
  label: { fontSize: 18, color: colors.white, textAlign: 'center' },
  phoneIndicator: {
    fontSize: 17,
    top: 16,
    left: 40,
    position: 'absolute',
    color: colors.darkGray,
  },
});

interface Props {
  value?: string | null;
  label?: string | null;
  field: UserField;
  readOnly?: boolean;
  iconName?: string | null;
  beneficiaryField?: boolean;
}

const ProfileItem: React.FC<Props> = ({ field, iconName, label, readOnly, value, beneficiaryField }) => {
  const { user } = React.useContext(UserContext);
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';
  const userColor = isMember ? colors.blue : colors.primary;
  const [showForm, actions] = useBoolean(false);
  const { isUpdating, update } = useUpdateUser();
  const initialValues: Record<string, string> = {};
  const style: TextStyle = { color: colors.darkGray };
  initialValues[field] = !value ? '' : value;

  if (isMember && beneficiaryField) return null;

  const onSave = (values: Record<UserField, string>) => {
    if (values.telephone) {
      values.telephone = formatPhoneForApi(values.telephone);
    }
    update(values);
    actions.setFalse();
  };

  return (
    <Box>
      <Formik.Formik
        onSubmit={(values: Record<UserField, string>) => onSave(values)}
        initialValues={initialValues}
        validationSchema={userShape}
      >
        {(props: Formik.FormikProps<Record<UserField, string>>) => {
          return (
            <VStack justifyContent='center' rounded='md' bg={colors.white} shadow={3} mb='2'>
              <HStack bg={userColor} opacity='0.6' p='4' roundedTop='md'>
                <Center>{!iconName ? null : <Icon style={styles.icon} name={iconName} color={colors.gray} />}</Center>
                <Flex flex='1'>
                  <Center>
                    <Text style={{ ...styles.label, fontWeight: 'bold' }}>{label}</Text>
                  </Center>
                </Flex>
                {!readOnly ? (
                  <Pressable
                    onPress={() => {
                      showForm ? props.handleSubmit() : actions.setTrue();
                    }}
                    disabled={isUpdating || readOnly}
                  >
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
              <HStack p='4' bg={colors.white}>
                <View style={{ flex: 1 }}>
                  {isUpdating ? (
                    <Center>
                      <ActivityIndicator size='small' color={userColor} />
                    </Center>
                  ) : (
                    <>
                      {showForm ? (
                        <>
                          {field !== 'telephone' ? null : <Text style={styles.phoneIndicator}>+33 </Text>}
                          <TextField
                            error={props.errors[field]}
                            touched={!!props.touched[field]}
                            fieldLabel={!label ? '' : label}
                            handleChange={props.handleChange(field)}
                            handleBlur={props.handleBlur(field)}
                            iconName={!iconName ? 'question' : iconName}
                            okIcon
                            style={style}
                            iconSyle={{ color: colors.darkGray }}
                            value={props.values[field]}
                          />
                        </>
                      ) : (
                        <Text style={{ ...styles.label, color: colors.darkGray }}>
                          {field === 'reponse_secrete' ? '*******' : value}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </HStack>
            </VStack>
          );
        }}
      </Formik.Formik>
    </Box>
  );
};

export default ProfileItem;
