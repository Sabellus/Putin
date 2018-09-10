import React from 'react';
import { Text,View,Image } from 'react-native';

export default class ResultScreen extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      
    }
  }
  render() {
    
    return (
        <View style={{
            backgroundColor: "#F1F1F1",
            flex:0.2,
            flexDirection: 'row',
            padding:10
          }}>
            <View style={{
              backgroundColor:"white",flex:1,flexDirection: 'row',padding:12,     
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 5,
              shadowOpacity: 1.0,
              elevation:10,
          }}>
              <View style={{  
                flex:0.8, 
                backgroundColor:"white"          
              }}>
                <View>
                  <Text style={{fontFamily:'Roboto', fontSize:14,color:"#BBBBBB"}}>{this.props.date}</Text>
                </View>
                <View style={{                        
                paddingTop:10,
                    
              }}> 
                  <Text style={{fontFamily:'Roboto',fontSize:20,color:"#8F54A6" }}>СКОЛЬКО</Text>
                  <Text style={{fontFamily:'Roboto',fontSize:20,color:"#8F54A6" }}>Я ЖИВУ ПРИ <Text style={{backgroundColor:"#8F54A6",color:"white"}}>ПУТИНЕ</Text>
                  <Text style={{}}>?</Text>
                  </Text>
                </View>
                
              </View>
              <View style={{       
                  flex:0.2,         
                  justifyContent: 'flex-end',               
                  backgroundColor:"white" 
              }}>
              <Image
                style={
                  {width: 60, 
                  height: 60,
                 // marginLeft:30  
                 
                 }}
              source={require('../putin.png')}
              />       
              </View>
            </View>
          </View>
    );
  }
}