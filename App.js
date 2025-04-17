import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated,
{
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import styles from "./styles";

export default function App() {
  const radius = useSharedValue(20)
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)
  const color = useSharedValue(0)
  
  //change the animation style of the buttons we are using by changing their color, scale, backgroundcolor, and radius
  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      color.value,
      [0, 1],
      ["orange", "red"]
    )
  
  return{
    opacity: opacity.value,
    borderRadius: radius.value,
    tranform: [{scale: scale.value }],
    backgroundColor: backgroundColor,

  }
},[])

//create our different type of presses and their associated behavior
  const onPressIn = () => {
    radius.value = withSpring(20)
    opacity.value = withSpring(0.7)
    scale.value = withSpring(0.9)
  }

  const onLongPress = () =>{
    scale.value = withSpring(0.8)
    color.value = withSpring(1)
  }
  const onPressOut = () =>{
    radius.value = withSpring(30)
    opacity.value = withSpring(1)
    scale.value = withSpring(1, {damping: 50})
    color.value = withSpring(0)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          style={styles.button}        
        >
          <Text style={styles.buttonText}>Press Me</Text>

        </Pressable>

      </Animated.View>
    
    </View>
  

  );
}


