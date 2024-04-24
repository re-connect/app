import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import IconButton from '../../components/UI/IconButton';
import List from '../../components/UI/List';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import ContactContext from '../../context/ContactContext';
import { useFetchData } from '../../hooks/DataHooks';
import { useSetTitleToBenefName } from '../../hooks/UserHooks';
import { colors } from '../../style';
import { AnyDataInterface } from '../../types/Data';
import Icon from '../../components/UI/Icon';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' },
  contactInfo: { flexDirection: 'row', alignItems: 'flex-start' },
  contactInfos: {
    flex: 1,
    marginTop: 8,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  icon: { fontSize: 20, marginHorizontal: 16 },
});

type Props = {
  navigation: StackNavigationProp<any>;
};

const getContactDetails =
  (contact: AnyDataInterface): React.FC =>
  () => (
      <View style={styles.contactInfos}>
        {!contact.telephone ? null : (
        <TouchableOpacity
          style={styles.contactInfo}
          onPress={() => {
            if (contact && contact.telephone) {
              Linking.canOpenURL(`tel:${contact.telephone}`).then(() => Linking.openURL(`tel:${contact.telephone}`));
            }
          }}>
            <Icon style={styles.icon} name='phone' color={colors.gray} />
        </TouchableOpacity>
        )}
      {!contact.email ? null : (
          <View style={styles.contactInfo}>
            <Icon style={styles.icon} name="at" color={colors.gray} />
          </View>
        )}
    </View>
    );

const getContactName = (contact: AnyDataInterface) => `${contact.prenom} ${contact.nom}`;
const getEndpoint = () => 'contacts';

const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const { isFetching, triggerFetch } = useFetchData(ContactContext, `beneficiaries/${current?.subject_id}/contacts`);
  const { list } = React.useContext(ContactContext);
  useSetTitleToBenefName();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: 'absolute', right: 5, bottom: 5, zIndex: 1 }}>
          <IconButton size={60} iconName='plus' onPress={() => navigation.navigate('CreateContact')} />
        </View>
        <List
          data={list}
          onItemPress={(item: AnyDataInterface) => navigation.navigate('Contact', { contactId: item.id })}
          isFetchingData={isFetching}
          triggerFetchData={triggerFetch}
          itemIconName='user-large'
          getName={getContactName}
          getItemRightComponent={getContactDetails}
          getDataContext={() => ContactContext}
          getLeftActionEndpoint={getEndpoint}
          getRightActionEndpoint={getEndpoint}
        />
      </View>
    </Screen>
  );
};

export default ContactsScreen;
