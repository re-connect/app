import { AppRegistry, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
