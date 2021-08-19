import React,{useRef,useCallback} from 'react';
import { StyleSheet, Text, View,Image,Dimensions,ImageBackground } from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated ,{useSharedValue,useAnimatedStyle,withSpring,withTiming}from 'react-native-reanimated';

const imageUri="https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
const heartUri="https://image.flaticon.com/icons/png/512/535/535234.png";
const {width,height}=Dimensions.get('window')
export default function App() {

  const doubleTabRef=useRef();

  const scale=useSharedValue(0);

  const animatedStyle=useAnimatedStyle(()=>{
    return {
      transform:[{scale:scale.value}]
    }
  })

  const doubleTabHandler=useCallback(()=>{
    scale.value=withSpring(1 ,undefined,(isFinished)=>{
      if(isFinished){
        scale.value=withTiming(0,{duration:100})
      }
    })
  },[])

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTabRef} onActivated={()=>{
        console.log('Single Tap')
      }}>
      <TapGestureHandler maxDelayMs={150} ref={doubleTabRef} numberOfTaps={2} onActivated={doubleTabHandler} >

        <Animated.View>
        <ImageBackground source={{ uri:imageUri} } style={styles.image} >
        <Animated.Image source={{ uri:heartUri}} style={[styles.image2,animatedStyle]} />
        </ImageBackground>
        </Animated.View>
        <Text></Text>

     </TapGestureHandler>
     </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width:width,
    height:height/2,
    justifyContent:'center',
    alignItems:'center',

  },
  image2:{
    width:120,
    height:120,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 35,
    
  },
});
