import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/reducers';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';

const store = createStore(reducer);

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;


