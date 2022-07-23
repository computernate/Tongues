import React from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, FlatList,TouchableOpacity} from 'react-native'
import {auth} from '../firebase'
import NextLine from './publicGameInlines/NextLine'
import PicturePerfect from './publicGameInlines/PicturePerfect'
import {config} from '../config'
/*
  These are all the games that exist under my filters.
  It should take the inlines from PUBLIC game inlines
*/
class PublicGames extends React.Component {

  constructor(props){
    super(props);
    this.state={
      games:[],
      bucketStart: 0,
      nextLineMessage: '',
      nativeLanguages: props.user.nativeLanguages.map(x => x.language).join(","),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AuthToken':props.user.id+";"+props.user.email,
        "Language":props.learningLanguage
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getNextGames();
  }

  getNextGames(){
    fetch(config.api_base_url + '/Games/?start='+this.state.bucketStart+'&nativeLanguages='+
    this.props.user.nativeLanguages.map(x => x.language).join(",")+"&learningLanguage="+this.props.learningLanguage,{
      method: 'GET',
      headers: this.state.headers
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson){
        this.setState({games: [...this.state.games, ...responseJson], bucketStart : this.state.bucketStart + responseJson.length});
      }
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

  submitNextLine(){
    fetch(config.api_base_url + '/NextLine',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AuthToken':this.props.user.id+":"+this.props.user.email,
        "Language":this.props.learningLanguage
      },
      body: {
        'firstMessage':this.state.nextLineMessage,
        'openInvitations':1
      }
    })
    .then((response) => {
      this.setState(nextLineMessage => "")
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Next Line"
          name = "nextLineMessage"
          style = {styles.input}
          value = {this.state.nextLineMessage}
          onChangeText = {newText => this.handleInputChange(newText, 'nextLineMessage')} />
          <TouchableOpacity
            onPress={()=>this.submitNextLine()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
         <FlatList
           data={this.state.games}
           listEmptyComponent={(<Text>There are no games with your filters! Why not start one?</Text>)}
           renderItem={({ item, index }) => (
             <RenderParent key={item.id} data={item} headers = {this.state.headers} />
           )}
           onEndReached={()=>this.getNextGames()}
           onEndThreshold={0}
         />
       </SafeAreaView>
    )
  }
}


const RenderParent = (props) => {
  switch(props.data.Type){
    case 1:
      return (
        <View style={styles.gamepod}>
          <NextLine data={props.data} headers={props.headers} />
        </View>
      )
    default:
      return (
        <View style={styles.gamepod}>
          <PicturePerfect data={props.data} headers={props.headers} />
        </View>
      )
  }
}
export default PublicGames

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
  },
  scroll:{
    width:'100%',
  },
  gamepod:{
    marginTop:40,
    justifyContent:'center',
    alignItems:'center',
  },

  bottomPadding:{
    height:90
  },
  input:{
    backgroundColor:'white',
    width:'90%',
    height:40
  }
})
