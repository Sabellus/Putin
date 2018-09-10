import React from 'react';
import {View,TouchableHighlight,Text } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Header  from './Header'

export default class ResultScreen extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      fill: this.props.navigation.state.year,      
    }
  }  
  render() {
    const {params} = this.props.navigation.state
    return (
      <View>
      <AnimatedCircularProgress
        size={300}
        width={5}
        fill={params.year}
        tintColor="#00e0ff"
        backgroundColor="#3d5875">
        {
          (fill) => <Text>{fill}</Text>
        }
      </AnimatedCircularProgress>      
      </View>
    );
  }
}