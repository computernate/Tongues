import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../firebase'

const Store = (props) => {

    return (
      <View style={styles.container}>
        <Text>Store</Text>
      </View>
    )
  }

  export default Store

  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
  })
