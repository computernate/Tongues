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
import LangTab from './LangTab'



/*
  When you first log in, this is what you see. This just includes the basic pages, and adds the footer.
*/
class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      tab:'PublicGames',
      user: false,
      learningLanguage:0,
    }
    AsyncStorage.getItem('@userData').then((value)=>{
      this.setState({user:JSON.parse(value), learningLanguage:JSON.parse(value).learningLanguages[0]});
    });
  }

  setTabFromLink = (newTab) => {
    this.setState({tab : newTab})
  }
  setLanguage = (language) => {
    this.setState({learningLanguage : language})
  }


  renderSwitch(tab, user) {
    switch(tab){
      case 'MyGames':
        return <MyGames learningLanguage = {this.state.learningLanguage} user={this.state.user} />
      case 'Chats':
        return <Chats learningLanguage = {this.state.learningLanguage} user={this.state.user} />
      case 'Words':
        return <WordsWrapper learningLanguage = {this.state.learningLanguage} user={this.state.user} />
      default:
        return <PublicGames learningLanguage = {this.state.learningLanguage} user={this.state.user} />
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
        <Footer setTabFunc = {this.setTabFromLink} tab = {this.state.tab} language = {this.state.learningLanguage} />
        <LangTab switchLanguage = {this.setLanguage} language = {this.state.learningLanguage} user={this.state.user}/>
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
