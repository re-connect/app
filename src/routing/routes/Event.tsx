import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CreateEventScreen from '../../pages/event/CreateEventScreen';
import EditEventScreen from '../../pages/event/EditEventScreen';
import EventScreen from '../../pages/event/EventScreen';
import EventsScreen from '../../pages/event/EventsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeader } from '../helpers';
import { EventStackParamList } from './types/Event';

const EventsStack = createStackNavigator<EventStackParamList>();

const Event = () => {
  const { t } = useTranslation();

  return (
    <EventsStack.Navigator initialRouteName='EventsList'>
      <EventsStack.Screen name='EventsList' component={EventsScreen} options={getHeader(t('events'))} />
      <EventsStack.Screen name='CreateEvent' component={CreateEventScreen} options={getHeader(t('new_event'))} />
      <EventsStack.Screen name='Event' component={EventScreen} options={getHeader(t('event'))} />
      <EventsStack.Screen name='EditEvent' component={EditEventScreen} options={getHeader(t('update_event'))} />
    </EventsStack.Navigator>
  );
};

export default Event;
