import React from 'react'
import { useNavigation } from '@react-navigation/core'
import {Text, View, StyleSheet, Button} from 'react-native'
import {auth} from '../../firebase'
import {config} from '../../config'

const NextLine = (props) => {

  const navigation = useNavigation()

  function createGame(){
    console.log(props.data.Id);
    fetch(config.api_base_url + '/NextLine/Join/'+props.data.Id,{
      method: 'PUT',
      headers: props.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson){
        console.log("Made game");
        //After this, go to the game screen using navigation
      }
    })
    .catch((error) => {
      console.log("Error games");
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Next Line Game</Text>
        <Text>{props.data.hostId}</Text>
        <Text>{props.data.firstMessage}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Continue the story!" onPress={()=>{createGame()}}></Button>
      </View>
    </View>
  )
}

  export default NextLine

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      borderWidth:5,
      padding:10,
      backgroundColor:'#AAFFAA',
    },
    button:{
      width:'100%',
      backgroundColor:'#0000FF',
      textColor:"#000000",
      borderWidth:5,
      borderColor:"#FFFFFF",
      marginTop:10,
    }
  })
