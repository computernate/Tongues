import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Text} from 'react-native'
import {auth} from '../firebase'
import PublicGames from './PublicGames'
import MyGames from './MyGames'
import Chats from './Chats'
import WordsWrapper from './wordsScreens/WordsWrapper'
import MyProfile from './MyProfile'
import Footer from './Footer'


/*
  When you first log in, this is what you see. This just includes the basic pages, and adds the footer.
*/
class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      tab:'',
      user: false,
    }
    AsyncStorage.getItem('@userData').then((value)=>{
      this.setState({user:JSON.parse(value)});
    });
  }

  setTabFromLink = (newTab) => {
    this.setState({tab : newTab})
  }

  renderSwitch(tab, user) {
    switch(tab){
      case 'MyGames':
        return <MyGames learningLanguage = "2" user={user} />
      case 'Chats':
        return <Chats learningLanguage = "2" user={user} />
      case 'Words':
        return <WordsWrapper learningLanguage = "2" user={user} />
      default:
        return <PublicGames learningLanguage = "2" user={user} />
      }
  }

  render(){
    if(!this.state.user){
      return(
        <Text>Loading</Text>
      )
    }
    return(
      <View style={styles.container}>
        {this.renderSwitch(this.state.tab, this.state.user)}
        <Footer setTabFunc = {this.setTabFromLink} tab = {this.state.tab}/>
      </View>
    )
  }
}

export default Home

const styles=StyleSheet.create({
  container:{
      justifyContent:'space-between',
      flexGrow:1
  },
})
