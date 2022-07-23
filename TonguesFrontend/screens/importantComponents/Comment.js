import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

const Comment = (props) => {

    return (
      <View style={styles.container}>
        <Text>{props.text}</Text>
      </View>
    )
  }

  export default Comment

  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
  })
