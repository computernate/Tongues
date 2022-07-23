import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../../firebase'

/*
  This will be vital, and a bit of a challenge to make.
  Basically, we need to display the text in a normal case.
  If there is a correction, display the correction.
  When the text is tapped, show the note and suggested pack
  or the associated word. 
*/
const CorrectableText = (props) => {

  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
    </View>
  )
}

  export default CorrectableText

  const styles = StyleSheet.create({
    container: {
    },
  })
