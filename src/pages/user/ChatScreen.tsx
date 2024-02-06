import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { WebView } from 'react-native-webview';
import { crispUri } from '../../appConstants';

const ChatScreen: React.FC = () => (
  <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid={true}>
    <WebView source={{ uri: crispUri }} />
  </KeyboardAwareScrollView>
);

export default ChatScreen;
