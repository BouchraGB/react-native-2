//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import FirstPage from './Screens/FirstPage';
import SecondPage from './Screens/SecondPage';
import Register from './Screens/Register';
import homemovies from './Screens/homemovies';
import DetailsMovie from './Screens/DetailsMovie';
import Mylist from './Screens/Mylist';

import StartGameScreen from './Screens/StartGameScreen';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'sqlitedatabase.db' });

db.transaction(function (tx) {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS accounts(userId INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50), password VARCHAR(50))',
    [],
    (tx, results) => {
      console.log("hhhhhhhhhhhh" + results.rows.length);
    },
    error => {
      console.log("Transaction error"+ error.message);
    }
  );
});

db.transaction(function (tx) {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS lists(userId integer, movieId integer)',
    [],
    (tx, results) => {
      console.log("hhhhhhhhhhhh" + results.rows.length);
    },
    error => {
      console.log("Transaction error"+ error.message);
    }
  );
});



//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    FirstPage: { screen: FirstPage }, 
    //First entry by default be our first screen if we do not define initialRouteName
    SecondPage: { screen: StartGameScreen }, 
    Register: { screen: Register },
    homemovies: { screen: homemovies },
    DetailsMovie: { screen: DetailsMovie },
    Mylist: { screen: Mylist },
  },
  {
    initialRouteName: 'FirstPage',
    headerMode: 'none',
  }
);
export default createAppContainer(App);