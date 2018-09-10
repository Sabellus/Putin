/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import { StatusBar } from 'react-native';




import DateScreen  from './Components/DateScreen'
import ResultScreen  from './Components/ResultScreen'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  
} from 'react-native';

const AppNavigator = StackNavigator(
  { 
  Home: {screen: DateScreen },
  ResultScreen: {screen: ResultScreen}, 
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default class App extends React.Component {
  constructor(props){
    super(props); 

  }    
  render() {
    return (            
        <AppNavigator
            // dispatch ={this.props.dispatch}
            // state={this.props.nav}
          />         
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
