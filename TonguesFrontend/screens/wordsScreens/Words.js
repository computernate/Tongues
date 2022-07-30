import React, { useEffect, useState } from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native'
import {auth} from '../../firebase'
import WordInline from './WordInline'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../../config.js';
import {languageData} from '../../languageData'
import MultiSelect from 'react-native-multiple-select';

class Words extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      word:'',
      translation:'',
      selectedItems:[],
      loading:true,
      words:[],
      headBucket:"",
      nextBucket:"",
      message:""
    }
  }

  componentDidMount() {
    this.handleInputChange = this.handleInputChange.bind(this);
    var lang = this.props.language
    console.log("LANG: "+lang);
    var headBucket = this.props.user.wordBuckets.filter(bucket => bucket.language2 == lang)[0].id;
    console.log(headBucket);
    this.setState({headBucket: headBucket});
    this.setState({nextBucket: headBucket.nextBucketId});
    console.log(this.state);
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
    fetch(config.api_base_url + '/Words/'+this.state.headBucket,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'Term': this.state.word,
        'Definition': this.state.translation,
        'Tags':this.state.selectedItems
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


  onSelectedItemsChange = tags => {
    this.setState({ selectedItems:tags });
  };

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
           <MultiSelect
              hideTags
              items={languageData[this.props.language].tags.map((data) => {return {name:data}})}
              uniqueKey="name"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              selectText="Tags"
              searchInputPlaceholderText="Search Tags..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Enter"
           />
           <View>
            {this.state.selectedItems.map((data) => {return (<Text>{data}</Text>)})}
           </View>
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
          <View style={styles.cardsHolder}>
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
          </View>
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
