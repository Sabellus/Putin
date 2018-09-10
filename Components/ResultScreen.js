import React from 'react';
import {View,TouchableHighlight,Text,Image,TouchableOpacity,Share,ScrollView } from 'react-native';

import { CircularProgress,AnimatedCircularProgress, } from 'react-native-circular-progress';
import Header  from './Header'

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


export default class ResultScreen extends React.Component {
  constructor(props){
    super()
    
    this.state = {
      fill: '',  
      dateToday:'',
      shareDate:100,    
    }
    
  } 
  
  componentWillMount(){    
    let tod = new Date()
    d = new Date();    
    monthA = 'ЯНВ., ФЕВ., МАР., АПР., МАЙ, ИЮН, ИЮЛ., АВГ., СЕН., ОКТ., НОЯ., ДЕК.'.split(',');
    monthA[d.getMonth()]
    dayA = 'ВОСКРЕСЕНЬЕ, ПОНЕДЕЛЬНИК, ВТОРНИК, СРЕДА, ЧЕТВЕРГ, ПЯТНИЦА, СУББОТА'.split(',');
    dayA[d.getDay()]    
    let mode = new Date(1999, 3, 18)
    this.setState({
      fill: this.props.navigation.state.year,
      dateToday:dayA[d.getDay()]+", " +d.getDate()+" "+monthA[d.getMonth()]
    })    
    let {params} = this.props.navigation.state  
    //console.warn(params.year)
    this.setState({
      shareDate: params.year
    })
  }
  _onShare(k) {
    
    Share.share({
     message: this.state.shareDate+'% моей жизни прошло при Путине! Посмотри сколько у тебя! #putin_uhodi https://play.google.com/store/apps/details?id=com.putinlife',
     title: ' https://play.google.com/store/apps/details?id=com.putinlife'
   }, {
     // Android only:
     dialogTitle: 'Куда отправить?',
     // iOS only:
     excludedActivityTypes: [
       'com.apple.UIKit.activity.PostToTwitter'
     ]
   })
  
   } 
  _nav=()=>{
    let {navigate} = this.props.navigation;
    navigate('Home') 
  }
  render() {
    const {params} = this.props.navigation.state   
    return (
      <ScrollView>
      <View style={{flex:1}}>
         <Header date={this.state.dateToday}style={{flex:0.2}}/>
         <View style={{
          backgroundColor:"white",
          flex:0.51,
          backgroundColor: "#F1F1F1",
          flexDirection: 'row',
          padding:10,
         
        }}>
          <View style={{
                  backgroundColor:"white",flex:1,flexDirection: 'row',
                  borderColor: "#F1F1F1",justifyContent: 'center',         
                  elevation:5,alignItems: 'center',
              }}>
             
            <AnimatedCircularProgress style={{}}
            
              ref='circularProgress'
              size={250}
              width={10}
              prefill={0}
              fill={params.year}
              rotation = {360}
              tintColor="#8F54A6"
              backgroundColor="#BBBBBB"
              >
              {
                (fill) => 
                <View style={{}}>
                <View>
                  <Text style={{fontSize:50,textAlign: 'center'}}>{Math.round(fill)}%</Text>                
                </View>
                <View>
                  <Text style={{textAlign: 'center',fontSize:15}}>моей жизни</Text>
                  <Text style={{textAlign: 'center',fontSize:15}}>прошло при Путине</Text>
                </View>
                </View>
              }
            </AnimatedCircularProgress> 
            </View>       
          </View>
          <View style={{flex:0.29}}>
          <View style={{alignItems: 'center',height:40}}>
          <TouchableOpacity onPress={this._nav}>
          <Image
                style={
                  {width: 35, 
                  height: 35,
                 // marginLeft:30  
                 
                 }}
              source={require('../refresh.png')}
              />   
          </TouchableOpacity>    
            </View>  
          
          <View style={{flex:1,flexDirection: 'row',marginTop:10}}>
          <View style={{flex:0.5,alignItems: 'flex-end',marginRight:5}}>
          <TouchableOpacity onPress={this._onShare.bind(this)}>
          <Image
            style={
            {width: 40, 
            height: 40,
        
            }}
            source={require('../vk.png')}
          />   
          </TouchableOpacity>   
          </View>
          <View style={{flex:0.5, alignItems: 'flex-start',marginLeft:5}}>
          <TouchableOpacity onPress={this._onShare.bind(this)}>
            <Image
              style={
              {width: 40, 
              height: 40,
              }}
              source={require('../fb.png')}
            />  
          </TouchableOpacity>
          </View>
        </View> 
        </View> 
      </View>
      <View style={{flex:1,justifyContent:'center', flexDirection:'row', marginTop:20}}>
      
        <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-7908424323715790/5520219297"
        />
      
      </View>
      </ScrollView>
    );
  }
}