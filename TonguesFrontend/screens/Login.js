import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../firebase';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import {config} from '../config.js';
import {colors} from '../baseColors.js'
import * as Font from 'expo-font';
//AAAAAAAAAAAAAAAAAAAAAGOYegEAAAAAXS%2BmSCVGtq4JRL0X7Iqa11K8kmw%3DT5iLB8R546LdBODDHdx5es9rLgQeoJUdarrvetwU53anpqVEBs

/*
  This page is the login page
  The buttons and functions exist for other sign in methods, but I can't get them to work.
  I'll give 34 story points to anyone who can
*/
const Login = (props) => {
  var pre_loading = true;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const navigation = useNavigation()

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials =>{
        navigation.replace("Home")
    })
    .catch(error =>alert(error.message))
  }

  const handleLogin = () =>{
    console.log("Log in");
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials =>{
        navigation.replace("Home");
    })
    .catch(error =>alert(error.message))
  }

  async function onAppleButtonPress() {
    // Start the sign-in request
    /*const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);*/
  }

  async function onFacebookButtonPress() {
    /*const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    var signIn = auth().signInWithCredential(facebookCredential);
    console.log(auth);
    console.log(signIn);
    return signIn;*/
  }

  async function handleSignUpGoogle(){
    console.log("Sign up");
    //GoogleSignin.configure({
    //  webClientId: '949342787380-ul8fo3nv45kjbkm5vevamk400tl87jl2.apps.googleusercontent.com',
    //});
      console.log("Configured");
    //const { idToken } = await GoogleSignin.signIn();
      console.log("Sign in");
    //const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("Credential");
    //return auth().signInWithCredential(googleCredential);
      console.log("Auth");
  }

  const storeUser = async (response) => {
    try {
      await AsyncStorage.setItem('@userData', response)
    } catch (e) {
      // saving error
    }
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        user.getIdToken().then(function(token) {
        fetch(config.api_base_url+'/Users/'+user.email,{
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
        })
        .then((response) =>
          response.json()
        )
        .then((responseJson) => {
          storeUser(JSON.stringify(responseJson))
          navigation.replace("Home")
        })
        .catch(error => {
          console.log(error);
        })
        });
      }
      else{
        pre_loading = false;
      }
    })
    return unsubscribe
  }, [])

  Font.loadAsync({
    'Sublima-ExtraBold': require('../assets/fonts/Sublima-ExtraBold.otf'),
  }).then(()=>{
    setIsLoaded(true);
  })
  //navigation.replace("Home")
  if(!isLoaded){
    return null;
  }
  else{
    return (
      <View
        style={styles.container}
        behavior="padding"
      >
      <LinearGradient colors={[colors.bg1, colors.bg2]}
        style={styles.gradient}
        start={[0, 0.5]}
        end={[1, 0.5]}>
        <View style={styles.help}>
          <TouchableOpacity
            onPress={handleLogin}>
            <Text style={{...styles.helpText,fontFamily:'Sublima-ExtraBold'}}>Help</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("../images/logo.png")} style={styles.img} />
          <Text style={styles.betweenText2}>Login</Text>
          <TextInput
            placeholder="Email:"
            placeholderTextColor="#FFF"
            value={email}
            onChangeText = {text=> setEmail(text)}
            style={{...styles.input,fontFamily:'Sublima-ExtraBold'}}
          />
          <TextInput
            placeholder="Password:"
            placeholderTextColor="#FFF"
            value={password}
            onChangeText = {text=> setPassword(text)}
            style={{...styles.input,fontFamily:'Sublima-ExtraBold'}}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleLogin}>
            <Text style={{...styles.betweenText1,fontFamily:'Sublima-ExtraBold'}}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.button, styles.loginButton]}>
            <Text style={[styles.buttonText, styles.loginButtonText, {fontFamily:'Sublima-ExtraBold'}]}>Start</Text>
          </TouchableOpacity>
          <Text style={{...styles.betweenText2, fontFamily:'Sublima-ExtraBold'}}>Sign in/up with</Text>
          <TouchableOpacity
            onPress={()=>onFacebookButtonPress()}
            style={[styles.button, styles.loginFacebook]}>
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>handleSignUpGoogle()}
            style={[styles.button, styles.loginGoogle]}>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>onAppleButtonPress()}
            style={[styles.button, styles.loginApple]}>
            <Text style={styles.buttonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>
        </LinearGradient>
      </View>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  gradient:{
    justifyContent:'flex-end',
    alignItems:'center',
    width:"100%",
    height:"100%",
    paddingBottom:50
  },
  help:{
    position:'absolute',
    top:0,
    right:0,
    backgroundColor:colors.a1,
    borderBottomLeftRadius:100
  },
  helpText:{
    fontSize:30,
    padding:10,
    paddingVertical:15,
    color:colors.a2
  },
  img:{
    width:'100%',
    height:45
  },
  inputContainer:{
    width:'80%',
    alignItems:'center'
  },
  input:{
    backgroundColor:colors.a1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    width:'100%',
    marginTop:10
  },
  betweenText1:{
    color:'white',
    marginVertical:10,
    fontSize:15,
  },
  betweenText2:{
    color:colors.a2,
    marginVertical:15,
    fontSize:20
  },
  buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:'100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop:5,
    alignItems:'center',
  },
  loginButton:{
    backgroundColor:colors.a1,
    width:'50%'
  },
  loginButtonText:{
    color:colors.a2,
    fontSize:20,
    fontWeight:'bold',
  },
  loginFacebook:{
    backgroundColor:"#2638d8"
  },
  loginGoogle:{
    backgroundColor:"#e25050"
  },
  loginTwitter:{
    backgroundColor:"#57e7ff"
  },
  loginApple:{
    backgroundColor:"#999999"
  },
  buttonText:{
    color:'white',
    fontSize:15,
    fontWeight:'bold'
  },
})
