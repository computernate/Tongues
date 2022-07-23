import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../../firebase'

const NextLineUserComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.data.hostId}</Text>
      <Text>{props.data.firstMessage}</Text>
    </View>
  )
}

  export default NextLineUserComponent

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      borderBottomWidth:5,
      padding:10,
      backgroundColor:'#AAFFAA'
    },
  })
