import React, {useRef, useState} from 'react'
import {StyleSheet, Image, View, TouchableOpacity, Text, Animated, ScrollView} from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { languageData } from '../languageData'



const LangTab = (props) => {

  const [isActive, setIsActive] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current

  const xscale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, -50]
  })
  const fscale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.75]
  })

  const enter = () => {
    setIsActive(true);
      Animated.spring(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver:true
      }).start();
  }

  const exit = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver:true
    }).start(()=>{
      setIsActive(false);
    });
  }

//languageData[props.language.language].flagUrl
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>enter()} style={styles.languageTab}>
        <Image source={languageData[props.language.language].flagUrl} style={{width:100, height:100}} />
      </TouchableOpacity>
      {isActive &&
        <TouchableOpacity onPress={()=>exit()}>
          <Animated.View style={{...styles.blocker, opacity: fscale}}>
          </Animated.View>
        </TouchableOpacity>
      }
      <Animated.View style={{...styles.menu,
          transform: [{
            translateX: xscale
          }]
      }}>
        <ScrollView style={styles.languageScroll}>
        {props.user.learningLanguages.map(function(data, index){
            return (<TouchableOpacity onPress={()=>{props.switchLanguage(data);exit();}} style={styles.languageMenuItem} key={index}>
              <Image source={languageData[data.language].flagUrl} style={{width:150, height:100}} />
              <Text>{data.level}</Text>
            </TouchableOpacity>)
        })}
        </ScrollView>
        <TouchableOpacity onPress={()=>{}} style={styles.settingsItem}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default LangTab

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    position:'absolute',
    backgroundColor:'black',
    width:0
  },
  menu:{
    height:'100%',
    position:'absolute',
    width:250,
    paddingLeft:50,
    backgroundColor:'white',
    justifyContent:'space-between'
  },
  languageScroll:{
    marginTop:50,
  },
  languageMenuItem:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  settingsItem:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    marginBottom:20
  },
  languageTab:{
    position:'absolute',
    top:0,
    left:0
  },
  languageImage:{
    width:100,
    height:100,
    borderBottomRightRadius:30
  },
  blocker:{
    width:1000,
    height:'100%',
    backgroundColor:'black',
  }
});
