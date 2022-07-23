import React from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import {auth} from '../firebase'

/*
  This will be depreciated as the "chat" will become just a game as the navigation is restructured.
  However, we keep it in because the code is still looking for it.
*/
const Chat = (props) => {

  const fakeData=[
    {
      user:'Another boy',
      blurb: 'There once was a boy named michael, the ugliest boy in town',
      unseenMessages: 0,
      id:1
    },
    {
      user:'nateroskelley@gmail.com',
      blurb: 'Ese wey tiene cabello negro con un chingon de mujeres',
      unseenMessages: 2,
      id:3
    },
    {
      user:'Vero the sexy',
      blurb: '"Oye papi, cuando me chingas wey?" dijo el wero jalo',
      unseenMessages: 1,
      id:2
    },
    {
      user:'Kento Bento',
      blurb: '日本の神社がある場所だし、色々の国から人がい...',
      unseenMessages: 0,
      id:4
    },
  ]

  if(fakeData.length==0){
    return (
      <View style={styles.container}>
        You have no chats! Play a game with someone and become their friend!
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
         {
           fakeData.map(function(data, index){
           })
         }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  scroll:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
})
