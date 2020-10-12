//This is an example code for Navigator// 
import React, { Component } from 'react';
import {useState} from 'react';
import { Linking } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';


//import react in our code. 
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
//import all the components we are going to use.



export default class FirstPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username : ' ',
      password : ' '
    };
  }


  /**
   *  Example Of Insert Rows on SQLite
   */

   

   login_user = (navigate) => {

    var username = this.state.username;
    var password = this.state.password;

    var db = openDatabase(
      {
        name: 'sqlitedatabase.db',
        // createFromLocation: '~database.db',
        location: 'default',
      },
      () => { console.log("Database opened "); },
      error => {
        console.log("ERROR: " + error);
      }
    );


    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM accounts WHERE username = "'+ username + '" and password = "' + password + '";',
        [],
        (tx, results) => {
          console.log("hhhhhhhhhhhh" + results.rows.length);
          if(results.rows.length > 0){
            // for (let i = 0; i < results.rows.length; ++i)
              console.log(results.rows.item(0).userId);
            // const { navigate } = this.props.navigation;
            console.log("nrmlm yrouh hna");
            global.MyVar = results.rows.item(0).userId;
            navigate('homemovies', {  
              userId: results.rows.item(0).userId,   
          });
            
          }
          else{
            Alert.alert(
              'Error',
              'Incorrect username or password !',
              [
                { text: 'OK'}
              ],
              { cancelable: false }
            );
          }
          // var temp = [];
          // for (let i = 0; i < results.rows.length; ++i)
          //   console.log(results.rows.item(i));
        },
        error => {
          console.log("Transaction error"+ error.message);
        }
      );
    });


  }

  render() {
    
    const { navigate } = this.props.navigation;
    
    return (
        <ImageBackground source={require('../assets/login.jpg')} style={styles.backgd}>  

        
   
        <View style={styles.bodystart}>

        <Text style={styles.textstyle}>Welcome to </Text>
        <Text style={styles.textstyle2}>"My Movies"</Text>
        <View>
        <Image source={require('../assets/iconlogin.png')} style={styles.imageicon}/>
        </View>
          <View style={styles.SectionStyle}>
            <Image source={require('../assets/user.png')} style={styles.ImageStyle}/>
            <TextInput style={styles.inputstyle} placeholder="User Name" placeholderTextColor="white" 
            onChangeText={(username) => this.setState({ username })} >
            </TextInput>
            </View>

            <View style={styles.SectionStyle}>
            <Image source={require('../assets/password.png')} style={styles.ImageStyle}/>
            <TextInput style={styles.inputstyle}  placeholder="Pass Word" placeholderTextColor="white"
            onChangeText={(password) => this.setState({ password })}>
            </TextInput>
            </View>
            
            <TouchableOpacity style={styles.buttonstyle} 
        onPress={() => this.login_user(navigate)} 
         
        //onPress={() =>InsertQuery()   navigate('SecondPage')
        ><Text style={styles.textButton} >LOGIN</Text></TouchableOpacity>

        <Text style={{color: 'blue'}}
              onPress={() => navigate("Register")}>
          You don't have an acount? SIGN IN
        </Text>
           
        </View>
        </ImageBackground> 

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodystart : {
    height : "90%",
    width : "75%",
    backgroundColor : "rgba(0,0,0,0.4)",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth : 3,
    borderColor : 'rgba(106, 4, 15,0.7)',
    padding: 8,
    borderRadius : 7,

},
textstyle : {
    fontFamily: 'Roboto',
    color : 'white',
    fontSize: 33,
    fontWeight: "bold"
},
textstyle2 : {
  fontFamily: 'sans-serif-condensed',

  color : 'white',
  fontSize: 30,

},
inputstyle : {
    marginLeft : 10,
    width : 190,
    height : 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    borderWidth : 2,
    borderColor : 'rgba(106, 4, 15,0.7)',
    padding: 7,
    borderRadius : 7,
    marginBottom : 20,
    color : 'white'
    
},
buttonstyle : {
    backgroundColor : '#6A040F',
    width :200,
    height : 50, 
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 20,
    marginBottom : 15,
},
backgd : {
    height : '100%',
    width : '100%',
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
},
textButton : {
    color : 'white',

},
imageicon : {
  marginTop : 10,
  marginBottom : 25,
  width: 80, 
  height: 80 
},
ImageStyle: {
  padding: 10,
  margin: 5,
  height: 25,
  width: 25,
  resizeMode : 'stretch',
  alignItems: 'center',
  marginLeft : -15,
},
SectionStyle: {
  flexDirection: 'row',
  justifyContent: 'center',
},
});