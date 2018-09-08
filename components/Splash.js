import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text, TouchableOpacity,
    View, Animated, Image,
    Easing, Dimensions
  } from 'react-native';
  var { width, height } = Dimensions.get('window');

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fadeValue: new Animated.Value(0),
          xValue: new Animated.Value(0),
          springValue: new Animated.Value(0.5),
          rotateValue: new Animated.Value(0)
        }
      }
      _moveAnimation = () => { // TODO:left to right animation
        Animated.timing(this.state.xValue, {
          toValue: width - 100,
          duration: 1000,
          easing: Easing.linear,      
        //   easing: Easing.back(),     
          // easing: Easing.cubic,      
        }).start(() => {
          //Call after finish this animation !
          Animated.timing(this.state.xValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            // easing: Easing.back(),     
            // delay: 1000,//run after 1 seconds
          }).start(() => {
            this._moveAnimation();
          });
        });
      }
    //   _springAnimation = () => { //TODO: Like Popup animation
    //     Animated.spring(this.state.springValue,{
    //         toValue: 1.5,
    //         friction: 1
    //       }).start();
    //   }
      _rotateAnimation = () => { // TODO: Rotate animation
        Animated.sequence([
          Animated.timing(this.state.rotateValue, {
            toValue: 100,
            duration: 1000,//1000 miliseconds = 1 second
            easing: Easing.linear,
          }),
          Animated.timing(this.state.rotateValue, {
            toValue: 0,
            duration: 0,
          }),
        ]).start(() => {
          this._rotateAnimation();//rotate infinitely 
        }); 
      }
      _moveAndRotateAnimation = () => {
        Animated.parallel([
          //This contains Animations which run at the same time !
          this._moveAnimation(),
          this._rotateAnimation()
        ]).start();
      }
    render() {
        // this._springAnimation();
        // this._moveAnimation(); // TODO: left to right animation
        const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg'],
          });
          this._moveAndRotateAnimation();
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require('../images/emoji.png')}
                    style={[styles.imageView, 
                        { left: this.state.xValue }, // TODO:left to right animation
                        // { transform: [{ scale: this.state.springValue }], alignSelf: 'center' } //TODO: Like Popup animation
                        { transform: [{ rotate: interpolatedRotateAnimation }] },
                    ]}>
                </Animated.Image>
                <Text style={styles.title}>Welcome to awesomooo!</Text>
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    animatedView: {
        height: 12,
        width: 12,  
        borderRadius: 6,     
        // backgroundColor: 'red',
        backgroundColor: 'steelblue',
        margin: 3
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 20
    },
    logo: {
    },
    animationView: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',    
      },
      button: {
        backgroundColor: "steelblue",
        height: 45,
        marginTop: 20,    
        alignSelf: "center"
      },
      buttonText: {
        color: 'white',
        padding: 12,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 18
      },
      imageView: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
      }
})












// Animated link video
// https://www.youtube.com/watch?v=CX3hV9lA2yY&index=69&list=PLWBrqglnjNl2yaCcp0HEAWp6zBIfingZ-

// Github Link
// https://github.com/sunlight3d/react_native_v0.49/tree/master/69-React%20Native%20Animations%234.%20Use%20Gesture%20Responder%20to%20pan%20a%20View%20and%20animation%20with%20Spring/code/ReactNativeProject