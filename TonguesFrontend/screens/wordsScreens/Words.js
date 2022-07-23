import React, { useEffect, useState } from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native'
import {auth} from '../../firebase'
import WordInline from './WordInline'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../../config.js';

class Words extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      word:'',
      translation:'',
      loading:true,
      words:[],
      headBucket:"",
      nextBucket:"",
      message:""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    var headBucket = this.props.user.wordBuckets.filter(bucket => bucket.language2 == 1)[0].id;
    this.setState({headBucket: headBucket});
    this.setState({nextBucket: headBucket.nextBucketId});
    this.getBucket(headBucket);
  }


  getBucket(id){
    if(id=="") return
    fetch(config.api_base_url + '/Words/'+id,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      for(word in responseJson.word){
        word.bucketId = responseJson.id;
      }
      this.setState({loading:false, nextBucket:responseJson.nextBucketId});
      this.setState(state => {
        var words = [...state.words, ...responseJson.words];
        return{words};
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  refresh(){
    this.setState({words:[]});
    this.getBucket(this.state.headBucket);
  }

  handleNewWord(){
    this.setState({loading:true});
    console.log(this.state.headBucket);
    fetch(config.api_base_url + '/Words/'+this.state.headBucket,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'Term': this.state.word,
        'Definition': this.state.translation
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({headBucket:responseJson.id,loading:false,
      word:"", translation:""});
      this.refresh();
    })
    .catch((error) => {
      console.error(error);
    });

  }

  handleInputChange(text, element) {
    this.setState({
      [element]: text
    });
  }

  render(){

    return (
      <View style={styles.container}>
         <View style={styles.addWord}>
           <View style={styles.inputHolder}>
            <TextInput
              placeholder="Word"
              name = "word"
              style = {styles.input}
              value = {this.state.word}
              onChangeText = {newText => this.handleInputChange(newText, 'word')} />
          </View>
           <View style={styles.inputHolder}>
            <TextInput
              placeholder="Translation"
              name = "translation"
              style = {styles.input}
              value = {this.state.translation}
              onChangeText = {newText => this.handleInputChange(newText, 'translation')} />
          </View>
           <View style={styles.inputHolder}>
             <TouchableOpacity
               onPress={()=>this.handleNewWord()}>
               <Text style={styles.buttonText}>Submit</Text>
             </TouchableOpacity>
          </View>
         </View>
         {this.state.message!=""?(<Text>{this.state.message}</Text>):null}
         {this.state.loading ? <Text>LOADING</Text> : null}
          <SafeAreaView style={styles.cardsHolder}>
            <FlatList
              data={this.state.words}
              listEmptyComponent={(<Text>You have no words! Add one below</Text>)}
              renderItem={({ item, index }) => (
                <WordInline key={item.id+":"+index} data={item}/>
              )}
              horizontal="true"
              numColums="4"
              onEndReached={()=>this.getBucket(this.state.nextBucket)}
              onEndThreshold={0}
            />
          </SafeAreaView>
      </View>
    )
  }
}


export default Words

const styles = StyleSheet.create({
  container:{
    justifyContent:'flex-start'
  },
  addWord:{
    flexDirection:'row',
    width:'100%',
    borderBottomWidth:5,
    paddingVertical:10,
    justifyContent: 'space-evenly'
  },
  input:{
    backgroundColor:'#FFF',
    width:"100%",
  },
  buttonText:{
    width:'100%',
    backgroundColor:'teal',
  },
  inputHolder:{
    width:'30%',
    justifyContent:'space-evenly',
  },
  cardsHolder:{
    overflow:"scroll",
    flexGrow:1,
    height:600
  }
})
