import { compareAsc, format } from 'date-fns';
import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import Separator from '../../components/UI/Separator';
import Text from '../../components/UI/Text';
import TogglePrivacySwitch from '../../components/UI/TogglePrivacySwitch';
import EventContext from '../../context/EventContext';
import { getDateColour, getReadableDate } from '../../helpers/dateHelpers';
import { useDeleteData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import { EventInterface, ReminderInterface } from '../../types/Event';
import Section from '../../components/UI/Section';
import Divider from '../../components/UI/Divider';
import { EventScreenProps } from '../../routing/routes/types/Event';
import Icon from '../../components/UI/Icon';

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  dateText: { fontSize: 14 },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
});

const sortEvents = (a: ReminderInterface, b: ReminderInterface) => compareAsc(new Date(a.date), new Date(b.date));

const EventScreen: React.FC<EventScreenProps> = ({ route, navigation }) => {
  const { list } = React.useContext(EventContext);
  const { eventId } = route.params;
  const { isDeleting, deleteItem } = useDeleteData(EventContext, `events/${eventId}`, eventId);
  if (!list) {
    return null;
  }
  const event = list.find((event: EventInterface) => event.id === eventId);
  if (!event) {
    return null;
  }
  const date = !event.date ? new Date() : new Date(event.date);

  return (
    <Screen>
      <ScrollView>
        <Section>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TogglePrivacySwitch
              Context={EventContext}
              isPrivate={event.b_prive}
              itemId={eventId}
              endpoint={`events/${eventId}`}
            />
          </View>
          <View style={{ margin: 8 }}>
            <Text style={styles.title}>{event?.nom}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            <Icon style={styles.icon} name="calendar-day" color={getDateColour(date)} />
            <Text style={{ ...styles.dateText, color: colors.darkGray }}>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
            <Separator width={1} />
            <Text style={{ ...styles.dateText, color: getDateColour(date) }}>{getReadableDate(date)}</Text>
          </View>
          {!event.commentaire ? null : (
            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
              <Icon style={styles.icon} name="comment-alt" color={colors.gray} />
              <Text style={{}}>{event.commentaire}</Text>
            </View>
          )}
          {!event.lieu ? null : (
            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
              <Icon style={styles.icon} name="map-pin" color={colors.gray} />
              <Text>{event.lieu}</Text>
            </View>
          )}
          <Separator height={1} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkGray }}>Rappels: </Text>
          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            {!event.rappels || event.rappels.length === 0 ? null : (
              <>
                <Icon style={{ ...styles.icon, marginTop: 8, marginRight: 0 }} name="bell" color={colors.gray} />
                <View style={{ flex: 1 }} />
                <View>
                  {event.rappels.sort(sortEvents).map((reminder: ReminderInterface) => (
                    <Text key={reminder.id} style={{ color: colors.gray }}>
                      {format(new Date(reminder.date), 'dd/MM/yyyy HH:mm')}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditEvent', { eventId: event.id })}>
              <Icon style={styles.icon} name="pen" color={colors.darkGray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(true)} disabled={isDeleting}>
              {isDeleting ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Icon style={styles.icon} name="trash" color={colors.red} />
              )}
            </TouchableOpacity>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
};

export default EventScreen;
