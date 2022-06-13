import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Button, HStack, Pressable, View, VStack } from 'native-base'
import * as React from 'react'
import { ActivityIndicator, Linking, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Screen from '../components/Screen'
import Text from '../components/UI/Text'
import TogglePrivacySwitch from '../components/UI/TogglePrivacySwitch'
import ContactContext from '../context/ContactContext'
import { useDeleteData } from '../hooks/DataHooks'
import { colors } from '../style'
import { ContactInterface } from '../types/Contact'

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
})

type ContactScreenParams = {
  Contact: { contactId: number; beneficiaryId: number }
}
type Props = {
  route: RouteProp<ContactScreenParams, 'Contact'>
  navigation: NavigationProp<any, any>
}

const FieldContent: React.FC<{ value: string; icon: string }> = ({ value, icon }) => (
  <>
    <Icon style={styles.icon} name={icon} color={colors.gray} />
    <Text>{value}</Text>
  </>
)

const Field: React.FC<{ value?: string; action?: () => void; icon: string }> = ({ value, action, icon }) => {
  if (!value) return null

  return (
    <HStack my='2'>
      {!action ? (
        <FieldContent value={value} icon={icon} />
      ) : (
        <Pressable style={styles.actions} onPress={action}>
          <FieldContent value={value} icon={icon} />
        </Pressable>
      )}
    </HStack>
  )
}

const ContactScreen: React.FC<Props> = ({ route, navigation }) => {
  const { list } = React.useContext(ContactContext)
  const { contactId } = route.params
  const { isDeleting, deleteItem } = useDeleteData(ContactContext, `contacts/${contactId}`, contactId)
  if (!list) return null
  const contact = list.find((contact: ContactInterface) => contact.id === contactId)
  if (!contact) return null

  const openEmail = () => {
    if (contact && contact.email && Linking.canOpenURL(contact.email)) Linking.openURL(`mailto: ${contact.email}`)
  }
  const openPhone = () => {
    if (contact && contact.telephone && Linking.canOpenURL(`tel:${contact.telephone}`))
      Linking.openURL(`tel:${contact.telephone}`)
  }

  const fields = [
    { value: contact.email, action: openEmail, icon: 'at' },
    { value: contact.telephone, action: openPhone, icon: 'phone' },
    { value: contact.association, icon: 'hotel' },
    { value: contact.commentaire, icon: 'comment-alt' },
  ]

  return (
    <Screen>
      <VStack justifyContent='center' rounded='2xl' bg={colors.white} shadow={3} m='2' p='4'>
        <HStack justifyContent='flex-end'>
          <TogglePrivacySwitch
            Context={ContactContext}
            isPrivate={contact.b_prive}
            itemId={contactId}
            endpoint={`contacts/${contactId}`}
          />
        </HStack>
        <HStack my='2'>
          <Text style={styles.title}>{`${contact?.prenom} ${contact?.nom}`}</Text>
        </HStack>
        {fields.map(({ value, action, icon }) => (
          <Field value={value} action={action} icon={icon} key={value} />
        ))}
        <HStack justifyContent='space-between'>
          <View>
            <Button onPress={() => navigation.navigate('EditContact', { contactId: contact.id })}>
              <Icon style={styles.icon} name='pen' color={colors.darkGray} />
            </Button>
          </View>
          <View>
            <Button onPress={() => deleteItem(true)} disabled={isDeleting}>
              {isDeleting ? (
                <ActivityIndicator size='small' color={colors.primary} />
              ) : (
                <Icon style={styles.icon} name='trash' color={colors.red} />
              )}
            </Button>
          </View>
        </HStack>
      </VStack>
    </Screen>
  )
}

export default ContactScreen
