import React from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {auth} from '../../firebase'
import Comment from '../importantComponents/Comment'

const PicturePerfect = (props) => {
  let displayName;
  if(props.data.owner==auth.currentUser.email){
    displayName = "YOU ARE THE HOST"
    //We use false as player 0 to save space
  }
  else{
    displayName = props.data.owner
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>{displayName}</Text>
        <Text>{props.data.blurb}</Text>
        <Comment text="I think that idea sucks"></Comment>
      </View>
      <Button styles={styles.button} title="See more comments"></Button>
    </View>
  )
}

  export default PicturePerfect

  const styles = StyleSheet.create({
    container: {
      width:'80%',
      borderBottomWidth:5,
      padding:10,
      backgroundColor:'#FFAAAA'
    },
  })
