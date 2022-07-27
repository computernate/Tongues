import React from 'react'
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'


/*
  This is called the footer, but it really contains the basic overlay for the home page.
  TODO: Add the langauge pull out menu
*/
const Footer = (props) => {

  const coins = 100
  const avatarImage = "../avatars/testavatar.png"

  const navigation = useNavigation()



  return (
    <View style={styles.container}>

      <View style={styles.profile.parentContainer}>
        <View style={styles.profile.container}>
          <TouchableOpacity onPress={()=>navigation.navigate('MyProfile')} >
            <Image source={require(avatarImage)} style={styles.profile.picture} />
          </TouchableOpacity>
            <View style={styles.profile.coinContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate('Store')} style={styles.profile.coinButton}>
              <Image source={require('../images/coin.png')} style={styles.profile.coin} />
              <Text>{coins}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.navContainer}>

        <TouchableOpacity onPress={()=>props.setTabFunc('PublicGames')} style={[styles.button, (props.tab=="PublicGames")?styles.active:null]}>
          <Image source={require("../images/PublicGamesNav.png")} style={styles.img} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.setTabFunc('MyGames')} style={[styles.button,(props.tab=="MyGames")?styles.active:null]}>
          <Image source={require("../images/MyGamesNav.png")} style={styles.img} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.setTabFunc('Chats')} style={[styles.button,(props.tab=="Chats")?styles.active:null]}>
          <Image source={require("../images/ChatsNav.png")} style={styles.img} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.setTabFunc('Words')} style={[styles.button, (props.tab=="Words")?styles.active:null]}>
          <Image source={require("../images/WordsNav.png")} style={styles.img} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container:{
    width:'100%',
    position:'absolute',
    bottom:0
  },
  navContainer:{
    width:'100%',
    flexDirection:'row',
    height:80,
  },
  profile:{
    parentContainer:{
      justifyContent:'space-between',
      flexDirection:'row'
    },
    container:{
      justifyContent:'flex-start',
      flexDirection:'row',
    },
    picture:{
      height:100,
      width:100,
      borderTopRightRadius:30
    },
    coinContainer:{
      justifyContent:'flex-end',
    },
    coinButton:{
      flexDirection:'row',
      backgroundColor:'#FFF',
      padding:5
    },
  },
  button:{
    flex:1,
    height:'100%',
    backgroundColor:'#ffe6e6',
    borderWidth:1
  },
  img:{
    height:'100%',
    width:'100%',
    backgroundColor:'#ffe6e6'
  },
  active:{
    borderColor:'red',
  }
});
