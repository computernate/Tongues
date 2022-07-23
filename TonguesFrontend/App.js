import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import Login from './screens/Login'
import Store from './screens/Store'
import MyProfile from './screens/MyProfile'
import NextLine from './screens/gameScreens/NextLine'

const Stack = createNativeStackNavigator();

/*
Author: Nathan Roskelley
This is the basic navigation for the app. Any page that doesn't have the "home navigation" on it should be here.
*/
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="NextLine" component={NextLine} />
        <Stack.Screen options={{ headerShown: false }} name="MyProfile" component={MyProfile} />
        <Stack.Screen options={{ headerShown: false }} name="Store" component={Store} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
