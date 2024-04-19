import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Icon from '../../components/UI/Icon';
import { colors } from '../../style';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
});

const FullScreenImageScreen = ({ route }: any) => {
  const { uri } = route.params;
  const { goBack } = useNavigation();

  const scale = React.useRef(new Animated.Value(1)).current;
  const translateX = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;
  const panref = React.useRef(null);
  const pinchref = React.useRef(null);

  const onPanEvent = Animated.event([{ 
    nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );
  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  return (
    <PanGestureHandler
      onGestureEvent={onPanEvent}
      ref={panref}
      simultaneousHandlers={[pinchref]}
      failOffsetX={[-1000, 1000]}
      shouldCancelWhenOutside      
    >
      <Animated.View>
        <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
          <Icon color={colors.black} name='x' />
        </TouchableOpacity>
        <PinchGestureHandler
          ref={pinchref}
          onGestureEvent={onPinchEvent}
          simultaneousHandlers={[panref]}
          onHandlerStateChange={onPinchEvent}
        >
          <Animated.Image
            style={{
              height: height,
              resizeMode: 'contain',
              transform: [{ scale }, { translateX }, { translateY }]
            }}
            source={{ uri }} 
            />
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>

  );
};

export default FullScreenImageScreen;
