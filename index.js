/** @format */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Login from './components/Login';
import Splash from './components/Splash';
import {name as appName} from './app.json';
import Gesture from './animation/Gesture';
import Stagger from './animation/Stagger';

let stopTimer;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Splash'
    }
    stopTimer = setTimeout(() => {
        this.setState({currentScreen: 'Login'});
        clearTimeout(stopTimer);
      }, 3000)
  }
render() {
  const { currentScreen } = this.state;
  let mainScreen = this.state.currentScreen === 'Splash'? <Splash/> : <Login/>;
  return mainScreen;
}
} 
AppRegistry.registerComponent(appName, () => Main);
