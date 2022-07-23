import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../../firebase'

const PicturePerfectUserComponent = (props) => {
  let displayName;
  if(props.data.owner==auth.currentUser.email){
    displayName = "YOU ARE THE HOST"
    //We use false as player 0 to save space
  }
  else{
    displayName = props.data.owner
  }

  let hasNotification = (props.data.unseenMessages!=0)?<Text>{props.data.unseenMessages}</Text>:null;

  return (
    <View style={styles.container}>
      <Text>{displayName}</Text>
      <Text>{props.data.blurb}</Text>
      {hasNotification}
    </View>
  )
}

  export default PicturePerfectUserComponent

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      borderBottomWidth:5,
      padding:10,
      backgroundColor:'#FFAAAA'
    },
  })
