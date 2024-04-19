import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { navigationRef } from '../RootNavigation';
import { UserInterface } from '../types/Users';
import { Settings } from './routes/Settings';
import { getHome } from './routes/Home';
import { Auth, AuthLoading } from './routes/Auth';
import { Activation } from './routes/Activation';
import { isPro, setIsMember } from '../helpers/userHelpers';
import FullScreenImageScreen from '../pages/document/FullScreenImageScreen';

const Root = createStackNavigator();

const Router = ({ user }: { user: UserInterface | null }) => {
  setIsMember(isPro(user));

  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator initialRouteName='AuthLoadingRoot' screenOptions={{ headerShown: false }}>
        <Root.Screen name='AuthLoadingRoot' component={AuthLoading} />
        <Root.Screen name='Auth' component={Auth} />
        { user === null ? null :
          <>
            <Root.Screen name='Home' component={getHome()} />
            <Root.Screen name='Activation' component={Activation} />
            <Root.Screen name='Settings' component={Settings} />
            <Root.Screen name='Image' component={FullScreenImageScreen}/>
          </>
        }
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
