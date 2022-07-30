import React, { useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Words from './Words'

const WordsWrapper = (props) => {
  const [tab, setTab] = useState('')

  const setTabFromLink=(newTab)=>{
    console.log(newTab);
    setTab(newTab)
  }

  const renderSwitch = (tab) => {
    switch(tab){
      default:
        return <Words user = {props.user} language={props.learningLanguage.language} />
      }
  }

  return(
    <View style={styles.container}>
      <View style={styles.navigationBackground}>
        <View style={styles.navigation}>
        <TouchableOpacity onPress={()=>setTabFromLink("Words")}
          style={[styles.navButton, (tab=="Words"||tab=="")?styles.activeTab:styles.inactiveTab]}>
          <Text style={styles.navText}>WORDS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setTabFromLink("Packs")}
          style={[styles.navButton, (tab=="Words")?styles.activeTab:styles.inactiveTab]}>
          <Text style={styles.navText}>GET PACKS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setTabFromLink("Class")}
          style={[styles.navButton, (tab=="Words")?styles.activeTab:styles.inactiveTab]}>
          <Text style={styles.navText}>CLASSES</Text>
        </TouchableOpacity>
        </View>
      </View>
      {renderSwitch(tab)}
    </View>
  )
}

export default WordsWrapper
// const handleSignOut = () => {
//   auth.signOut()
//   .then(()=>{
//     props.setUserLoginFunction(null)
//   })
// }

const styles=StyleSheet.create({
  container:{
      flexGrow:1
  },
  navigationBackground:{
    backgroundColor:"teal",
    height:100,
    justifyContent:"flex-end",
    paddingBottom:20
  },
  navigation:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  navButton:{
    width:'25%',
    height:30,
    textAlgin:'center',
    padding:5
  },
  inactiveTab:{
    backgroundColor:'grey'
  },
  activeTab:{
    backgroundColor:'blue'
  },
  navText:{
    color:'white',
    textAlign:'center'
  }
})
