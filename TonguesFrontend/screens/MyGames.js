import React from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import {auth} from '../firebase'
import NextLineUserComponent from './myGameInlines/NextLineUserComponent'
import PicturePerfectUserComponent from './myGameInlines/PicturePerfectUserComponent'

/*
  These are the games that I am already playing.
  TODO: Make this come from the UserGameBuckets, and not from "fake data"
  Uses MyGameInlines, not PublicGameInlines
*/
const MyGames = (props) => {

  const fakeData=[
    {
      gameType: 1,
      player0:'Deez Nuts',
      player1:'nateroskelley@gmail.com',
      blurb: 'There once was a boy named michael, the ugliest boy...',
      turn:true,
      id:1
    },
    {
      gameType: 2,
      owner:'nateroskelley@gmail.com',
      comments:4,
      blurb: 'Ese wey tiene cabello negro con una...',
      unseenMessages: 2,
      id:3
    },
    {
      gameType: 1,
      player0:'nateroskelley@gmail.com',
      player1:'Vero the sexy',
      blurb: 'Oye papi, cuando me encuentras wey?',
      turn:true,
      id:2
    },
    {
      gameType: 2,
      owner:'Kento Bento',
      comments:4,
      blurb: '日本の神社がある場所だし、色々の国から人がい...',
      unseenMessages: 0,
      id:4
    },
  ]

  if(fakeData.length==0){
    return (
      <View style={styles.container}>
        You don't have any active games! Go find people to play with and come back
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {
        fakeData.map(function(data, index){
          switch(data.gameType){
            case 1:
              return <NextLineUserComponent key={index} data={data} />
            default:
              return <PicturePerfect key={index} data={data} />
          }
        })
      }
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyGames

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex:1,
    alignItems:'center'
  },
})
