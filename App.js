/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Home from './components/home'



class App extends React.Component{
  render(){
    return (
      <View>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default App;
