import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../style';

const ChatButton = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.chatIconContainer}>
      <IconButton
        iconName='comment-alt'
        onPress={() => navigation.navigate('Chat')}
        size={60}
        backgroundColor={colors.chat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    zIndex: 2,
  },
});

export default ChatButton;
