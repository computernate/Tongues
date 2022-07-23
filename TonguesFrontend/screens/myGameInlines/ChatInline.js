import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../../firebase'

const ChatInline = (props) => {

  return (
    <View style={styles.container}>
      <Text>{props.data.user}</Text>
      <Text>{props.data.blurb}</Text>
      <Text>{props.data.unseenMessages} unseen messages</Text>
    </View>
  )
}

  export default ChatInline

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      borderBottomWidth:5,
      padding:10,
      backgroundColor:'#DDD'
    },
  })
