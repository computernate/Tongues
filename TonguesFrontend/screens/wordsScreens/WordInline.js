import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {auth} from '../../firebase'

const WordInline = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.text}><Text style={{paddingLeft:10}}>{props.data.term}</Text></View>
      <Text style={styles.text}>{props.data.definition}</Text>
      <Text style={styles.text}>{props.data.timesUsed} times</Text>
        {props.data.tags.map(function(data, index){
            return (
              <Text>{data}</Text>)
        })}
    </View>
  )
}

  export default WordInline

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
      width:'100%',
      borderBottomWidth:5,
      padding:10,
      backgroundColor:'#FFF',
    },
    text:{
      width:'33%',
    }
  })
