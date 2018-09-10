import React from 'react';
import { Text,Button,View,TouchableOpacity,StyleSheet,Image, Share,StatusBar,ScrollView, } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from "react-native-modal";
import Header  from './Header'

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


//import Icon from 'react-native-vector-icons/FontAwesome';

export default class DateScreen extends React.Component {
  constructor(props){
    
    super()
  this.state = {
    isDateTimePickerVisible: false,
    daate: '100',  
    isModalVisible:false,  
    dateCalend:'',
    dateToday:''    
  };
  this.onDateChange = this.onDateChange.bind(this);
  }
  static navigationOptions = {
    title: "Hello1",
  }
  _onShare() {
   Share.share({
    message: this.state.daate+'% моей жизни прошло при Путине! Посмотри сколько у тебя! #putin_uhodi https://play.google.com/store/apps/details?id=com.putinlife',
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
  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.log(error));
  }
  componentWillMount(){
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-7908424323715790/3816201487');

    AdMobInterstitial.addEventListener('adLoaded',
      () => console.log('AdMobInterstitial adLoaded')
    );
    AdMobInterstitial.addEventListener('adFailedToLoad',
      (error) => console.log(error)
    );
    AdMobInterstitial.addEventListener('adOpened',
      () => console.log('AdMobInterstitial => adOpened')
    );
    AdMobInterstitial.addEventListener('adClosed',
      () => {
        console.log('AdMobInterstitial => adClosed');
        AdMobInterstitial.requestAd().catch(error => console.log(error));
      }
    );
    AdMobInterstitial.addEventListener('adLeftApplication',
      () => console.log('AdMobInterstitial => adLeftApplication')
    );

    AdMobInterstitial.requestAd().catch(error => console.log(error));
    

    let tod = new Date()
    d = new Date();    
    monthA = 'ЯНВ., ФЕВ., МАР., АПР., МАЙ, ИЮН, ИЮЛ., АВГ., СЕН., ОКТ., НОЯ., ДЕК.'.split(',');
    monthA[d.getMonth()]
    dayA = 'ВОСКРЕСЕНЬЕ, ПОНЕДЕЛЬНИК, ВТОРНИК, СРЕДА, ЧЕТВЕРГ, ПЯТНИЦА, СУББОТА'.split(',');
    dayA[d.getDay()]    
    let mode = new Date(1999, 3, 18)
    this.setState({
      dateCalend:this._formatDate(mode),
      dateToday:dayA[d.getDay()]+", " +d.getDate()+" "+monthA[d.getMonth()]
    })
    this._handleDatePicked(mode)
  };
  _getProcent=(date)=>{    
    let srok = new Date(2000, 4, 7);
    let today = new Date();
    let daysToday =(today.getTime())/1000
    let daysSrok = (srok.getTime())/1000
    let daysDate = (date.getTime())/1000
    let k = 0;    
    if(daysSrok<=daysDate){
      k=100
    }
    else{
     k = ((daysToday-daysSrok)/(daysToday-daysDate))*100     
    }
    return k
  }
  _formatDate=(date)=>{    
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    //if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }
  _resultScreen = () => {
    this.showInterstitial()
    this._toggleModal()
    let {navigate} = this.props.navigation;
    if(!this.state.daate=='')
    navigate('ResultScreen',{year:this.state.daate}) 
  };

  _showDateTimePicker = () => {    
    this.setState({ 
    isDateTimePickerVisible: true 
  })};

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
 
  _hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false})
    let data = this.state.daate      
  };
 
  _handleDatePicked = (date) => {
    let dFat = this._formatDate(date)
    let k = Math.round(this._getProcent(date))   
    this.setState({ daate: k,dateCalend:dFat })
    this._hideDateTimePicker();  
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    
    let {navigate} = this.props.navigation;
    //const myIcon = <Icon name="rocket" size={30} color="#900" />
    
    return (
      <ScrollView>
      <View style={styles.general}>
      <StatusBar
     backgroundColor="#8F54A6"
      barStyle="light-content"
   />
        <Header date={this.state.dateToday}/>        
        <View style={{
          backgroundColor:"white",
          flex:0.51,
          backgroundColor: "#F1F1F1",
          flexDirection: 'row',
          padding:10
        }}>
       <View style={{
              backgroundColor:"white",flex:1,flexDirection: 'row',padding:12,
              borderColor: "#F1F1F1",justifyContent: 'center',           
              elevation:5,
          }}>
          <Image
            style={
            {
            width: 240, 
            height: 242.5,
        
            }}
            source={require('../box.png')}
          />  

        </View>       
        </View>
        <View style={{
          backgroundColor:"#F1F1F1",
          flex:0.29,
          flexDirection: 'column',
                    
        }}>
        <View style={{flexDirection: 'column'}}>
          <View  style={{alignItems: 'center',justifyContent: 'center',height:40,}}>
            <TouchableOpacity onPress={this._toggleModal}>
                <Text style={{backgroundColor:"#8F54A6",padding:10,fontSize:20,color:"white",}}>Начать игру</Text>
            </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />  
            <ScrollView>                  
            <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal}>
                <View style={{ backgroundColor:"white",padding:20}}> 
                <View>
                <Text style={{fontSize:20}}>Совсем скоро пройдут выборы в президенты РФ. Сколько вы уже живете при Путине? Сейчас узнаем. (Перерыв на Медведева не считается!)</Text> 
                </View> 
                <View style={{alignItems: 'center',justifyContent: 'flex-end',backgroundColor:"#F1F1F1",marginTop:10}}>               
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text style={{textAlign: 'center',fontSize:13}}>Выбрать дату рождения</Text>
                    <Text style={{textAlign: 'center',fontSize:25,color:"#4F4F4F"}}>{this.state.dateCalend}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center',justifyContent: 'center',height:40,marginTop:20}}>
                   <TouchableOpacity onPress={this._resultScreen}>
                    <Text style={{backgroundColor:"#8F54A6",padding:10,fontSize:20,color:"white",}}>Рассчитать</Text>
                   </TouchableOpacity>
                </View>
                </View>
                {/* <View style={{flex:0.5, backgroundColor:"red"}}></View> */}
            </Modal>
            </ScrollView>
            
          </View>
        </View>
        <View style={{flex:1,flexDirection: 'row',marginTop:20,justifyContent: 'center'}}>
          <TouchableOpacity onPress={this._onShare.bind(this)}>
          <View style={{flex:0.5, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          {/* <Image
            style={
            {
            width: 20, 
            height: 20,
        
            }}
            source={require('../share.png')}
          />   */}
          <Text style={{color:"#8F54A6",fontSize:15}}>ПОДЕЛИТЬСЯ</Text>
          </View>
          </TouchableOpacity>           
        </View>
        </View>
      </View>
      <View style={{flex:1,justifyContent:'center', flexDirection:'row'}}>
      
      <AdMobBanner
        adSize="banner"
        adUnitID="ca-app-pub-7908424323715790/8337954322"
      />
      
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  general :{
    backgroundColor: "white",
    flex:1,
    
  },
  container:{
    // flex: 1,
    // backgroundColor:"red",
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },

});