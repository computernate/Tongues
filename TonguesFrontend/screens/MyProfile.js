import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'


/*
  Currently only exists to host a logout button.
  Should be expanded to include...other stuff I guess
*/
const MyProfile = (props) => {

  const navigation = useNavigation()
  const handleSignOut = () => {
    auth.signOut()
    .then(()=>{
      navigation.replace("Login")
    })
  }


  return (
    <View style={styles.container}>
      <Text>Welcome {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>handleSignOut()}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{

      width:'60%',
      backgroundColor:'#666',
      paddingVertical:20,
      marginTop:100,
      alignItems:'center',
      borderRadius:10
  }
})
