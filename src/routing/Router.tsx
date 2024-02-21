import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { navigationRef } from '../RootNavigation';
import { UserInterface } from '../types/Users';
import { Settings } from './routes/Settings';
import { UserHome } from './routes/Home';
import { Auth, AuthLoading } from './routes/Auth';
import { Activation } from './routes/Activation';
import { isPro } from '../helpers/userHelpers';

export let isMember = false;
const Root = createStackNavigator();

const Router = ({ user }: { user: UserInterface | null }) => {
  isMember = isPro(user);

  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator initialRouteName='AuthLoadingRoot' screenOptions={{ headerShown: false }}>
        <Root.Screen name='AuthLoadingRoot' component={AuthLoading} />
        <Root.Screen name='Auth' component={Auth} />
        <Root.Screen name='Home' component={UserHome} />
        <Root.Screen name='Activation' component={Activation} />
        <Root.Screen name='Settings' component={Settings} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
