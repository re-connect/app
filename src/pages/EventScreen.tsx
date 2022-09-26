import { NavigationProp, RouteProp } from '@react-navigation/native';
import { compareAsc, format } from 'date-fns';
import { Box, Button, Center, Divider, Flex, HStack, View, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screen from '../components/Screen';
import Separator from '../components/UI/Separator';
import Text from '../components/UI/Text';
import TogglePrivacySwitch from '../components/UI/TogglePrivacySwitch';
import EventContext from '../context/EventContext';
import { getDateColour, getReadableDate } from '../helpers/dateHelpers';
import { useDeleteData } from '../hooks/DataHooks';
import { colors } from '../style';
import { EventInterface, ReminderInterface } from '../types/Event';

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  dateText: { fontSize: 14 },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
});

type EventScreenParams = {
  Event: { eventId: number; beneficiaryId: number };
};
type Props = {
  route: RouteProp<EventScreenParams, 'Event'>;
  navigation: NavigationProp<any, any>;
};

const sortEvents = (a: ReminderInterface, b: ReminderInterface) => compareAsc(new Date(a.date), new Date(b.date));

const EventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { list } = React.useContext(EventContext);
  const { eventId } = route.params;
  const { isDeleting, deleteItem } = useDeleteData(EventContext, `events/${eventId}`, eventId);
  if (!list) return null;
  const event = list.find((event: EventInterface) => event.id === eventId);
  if (!event) return null;
  const date = !event.date ? new Date() : new Date(event.date);

  return (
    <ScrollView>
      <Screen>
        <VStack justifyContent='center' rounded='2xl' bg={colors.white} shadow={3} m='2' p='4'>
          <HStack justifyContent='flex-end'>
            <TogglePrivacySwitch
              Context={EventContext}
              isPrivate={event.b_prive}
              itemId={eventId}
              endpoint={`events/${eventId}`}
            />
          </HStack>
          <HStack m='2'>
            <Text style={styles.title}>{event?.nom}</Text>
          </HStack>
          <HStack my='2'>
            <Icon style={styles.icon} name='calendar-day' color={getDateColour(date)} />
            <Text style={{ ...styles.dateText, color: colors.darkGray }}>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
            <Separator width={1} />
            <Text style={{ ...styles.dateText, color: getDateColour(date) }}>{getReadableDate(date)}</Text>
          </HStack>
          {!event.commentaire ? null : (
            <HStack my='2'>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={styles.icon} name='comment-alt' color={colors.gray} />
                <Center>
                  <Text style={{ maxWidth: '90%' }}>{event.commentaire}</Text>
                </Center>
              </View>
            </HStack>
          )}
          {!event.lieu ? null : (
            <HStack my='2'>
              <Icon style={styles.icon} name='map-marker-alt' color={colors.gray} />
              <Text>{event.lieu}</Text>
            </HStack>
          )}
          <Separator height={1} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkGray }}>Rappels: </Text>
          <HStack>
            {!event.rappels || event.rappels.length === 0 ? null : (
              <>
                <Icon style={{ ...styles.icon, marginTop: 8, marginRight: 0 }} name='bell' solid color={colors.gray} />
                <Flex flex='1' />
                <Box>
                  {event.rappels.sort(sortEvents).map((reminder: ReminderInterface) => (
                    <Center alignItems='center' key={reminder.id}>
                      <Text style={{ color: colors.gray }}>{format(new Date(reminder.date), 'dd/MM/yyyy HH:mm')}</Text>
                    </Center>
                  ))}
                </Box>
              </>
            )}
          </HStack>
          <Divider my='5' />
          <HStack justifyContent='space-between'>
            <Center>
              <Button onPress={() => navigation.navigate('EditEvent', { eventId: event.id })}>
                <Icon style={styles.icon} name='pen' color={colors.darkGray} />
              </Button>
            </Center>
            <Center>
              <Button onPress={() => deleteItem(true)} disabled={isDeleting}>
                {isDeleting ? (
                  <ActivityIndicator size='small' color={colors.primary} />
                ) : (
                  <Icon style={styles.icon} name='trash' color={colors.red} />
                )}
              </Button>
            </Center>
          </HStack>
        </VStack>
      </Screen>
    </ScrollView>
  );
};

export default EventScreen;
