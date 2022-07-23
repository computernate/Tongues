import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import CorrectableText from '../importantComponents/CorrectableText'
import {auth} from '../../firebase'


// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
export default class NextLine extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.getData(),
      inputBarText: ''
    }
  }

  static navigationOptions = {
    title: 'Chat',
  };

  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  componentDidMount() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  componentDidUpdate() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  _sendMessage() {
    this.state.data.messages.push({direction: true, text: this.state.inputBarText});

    this.setState({
      messages: this.state.messages,
      inputBarText: ''
    });
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  _onInputSizeChange() {
    setTimeout(function() {
      this.scrollView.scrollToEnd({animated: false});
    }.bind(this))
  }

  getData(){
    return {
        turn:true,
        player0:'nateroskelley@gmail.com',
        player1:'Vero Hope <3',
        language0:'Spanish',
        language1:'English',
        messages:[
          {
            text:'There once was a boy named Nate who loved his girlfriend very much',
            from:true,
            timestamp:'12/2/22:1:10'
          },
          {
            text:'El hare todo para ella. Tambien... Matar',
            from:false,
            timestamp:'12/2/22:1:11'
          },
          {
            text:'One day, she tried come to canada, but there was a killer on the plane!',
            from:true,
            timestamp:'12/3/22:1:10'
          },
          {
            text:'Natan muy rapidamente aprendi como voler para protejer ella',
            from:false,
            timestamp:'12/3/22:1:10'
          },
        ]
      }
  }

  render() {
    var messages = [];
    var isPlayerZero = (this.state.data.player0==auth.currentUser.email)
    this.state.data.messages.forEach(function(message, index) {
      messages.push(
          <MessageBubble key={index} direction={message.from == isPlayerZero} text={message.text}/>
        );
    });

    return (
              <View style={styles.outer}>
                  <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                    {messages}
                  </ScrollView>
                  <InputBar onSendPressed={() => this._sendMessage()}
                            onSizeChange={() => this._onInputSizeChange()}
                            onChangeText={(text) => this._onChangeInputBarText(text)}
                            text={this.state.inputBarText}/>
                  <KeyboardSpacer/>
              </View>
            );
  }
}

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
  render() {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === true ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === true ? <View style={{width: 70}}/> : null;

    var bubbleStyles = this.props.direction === true ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === true ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {leftSpacer}
            <View style={bubbleStyles}>
              <Text style={bubbleTextStyle}>
                {this.props.text}
              </Text>
            </View>
            {rightSpacer}
          </View>
      );
  }
}


class InputBar extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    return (
          <View style={styles.inputBar}>
            <AutogrowInput style={styles.textBox}
                        ref={(ref) => { this.autogrowInput = ref }}
                        multiline={true}
                        defaultHeight={30}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        onContentSizeChange={this.props.onSizeChange}
                        value={this.props.text}/>
            <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
                <Text style={{color: 'white'}}>Send</Text>
            </TouchableHighlight>
          </View>
          );
  }
}

//TODO: separate these out. This is what happens when you're in a hurry!
const styles = StyleSheet.create({

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30'
  },

  //MessageBubble

  messageBubble: {
      borderRadius: 5,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#66db30'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})
