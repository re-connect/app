import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../pages/user/ChatScreen';

const ChatStack = createStackNavigator();

export const Chat = () => (
  <ChatStack.Navigator initialRouteName='ChatIndex'>
    <ChatStack.Screen name='ChatIndex' component={ChatScreen} options={{ headerShown: false }} />
  </ChatStack.Navigator>
);
