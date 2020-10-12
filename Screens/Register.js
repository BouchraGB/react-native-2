//This is an example code for Navigator// 
import React, { Component } from 'react';
import {useState} from 'react';
import { Linking } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';


//import react in our code. 
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
//import all the components we are going to use.

export default class Register extends Component {  


  constructor(props) {
    super(props);
    this.state = {
      username : ' ',
      password : ' ',
      password0 : ' '
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  //   alert('Un essai a été envoyé : ' + event.target.value);
  // }

  // handleSubmit(event) {
  //   alert('Le nom a été soumis : ' + this.state.value);
  //   event.preventDefault();
  // }

  // begin  = () => {
  //   console.log("haw darha");
  //   const [text, setText] = React.useState('');
  // }

  register_user = (navigate) => {
    

    var username = this.state.username;
    var password = this.state.password;
    var password0 = this.state.password0;

    if(password != password0){
      Alert.alert(
        'Error',
        'Passwords had to be the same !',
        [
          { text: 'OK'}
        ],
        { cancelable: false }
      );
      return;
    }

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

    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
    //     [],
    //     function (tx, res) {
    //       console.log('item:', res.rows.length);
    //       if (res.rows.length == 0) {
    //         txn.executeSql('DROP TABLE IF EXISTS table_user', []);
    //         txn.executeSql(
    //           'CREATE TABLE IF NOT EXISTS table_user(username	TEXT, password	TEXT, test	INTEGER)',
    //           [],
    //           (txn, results) => {
    //             console.log(results);
    //         },
    //         error => {
    //           console.log("Transaction error"+ error.message);
    //         }
    //         );
    //       }
    //     },
    //     error => {
    //       console.log("Transaction error"+ error.message);
    //     }
    //   );
    // });

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO accounts (username, password) VALUES (?,?)',
        [username, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("c booon");


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
                    navigate('homemovies', {  
                      userId: results.rows.item(0).userId,   
                  });
                    
                  }
                },
                error => {
                  console.log("Transaction error"+ error.message);
                }
              );
            });


          //   navigate('homemovies', {  
          //     userName: username,  
          //     otherParam: password,  
          // });
            Alert.alert(
              'Done',
              'profile registred !',
              [
                { text: 'OK'}
              ],
              { cancelable: false }
            );
          } else {console.log('Registration Failed');
          Alert.alert(
            'Error',
            'registration failed !',
            [
              { text: 'OK'}
            ],
            { cancelable: false }
          );
        }
        },
        error => {
          console.log("Transaction error"+ error.message);
        }
      );
    });
  };


  render() {

    const { navigate } = this.props.navigation;
    
    return (
      
        <ImageBackground source={require('../assets/login.jpg')} style={styles.backgd}>  

        
   
        <View style={styles.bodystart}>

        <Text style={styles.textstyle2}>Register</Text>
          <View >
            <TextInput style={styles.inputstyle} placeholder="User Name" placeholderTextColor="white"         
             onChangeText={(username) => this.setState({ username })} >
            </TextInput>
            </View>

            <View >
            <TextInput style={styles.inputstyle} secureTextEntry={true}  placeholder="Pass Word" placeholderTextColor="white"
            onChangeText={(password0) => this.setState({ password0 })}>
            </TextInput>
            </View>

            <View >
            <TextInput style={styles.inputstyle} secureTextEntry={true}  placeholder="Confirm Pass Word" placeholderTextColor="white"
            onChangeText={(password) => this.setState({ password })}>
            </TextInput>
            </View>

            {/* <View>
            <DropDownPicker

              label='Placeholder text...'
            
              items={[
                  {label: 'Male', value: 'Male'},
                  {label: 'Female', value: 'Female'},
              ]}
              // defaultValue={this.state.gender}
              containerStyle={{height: 40}}
              style={styles.inputstyle}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}

              
              // onChangeItem={item => this.setState({
              //     country: item.value
              // })}
          />
            </View> */}

            {/* <View>
            <DatePicker style={styles.datestyle}/>
            </View> */}
            
            {/* <TouchableOpacity style={styles.buttonstyle} 
        onPress={() =>navigate('homemovies')} 
         
        //onPress={() =>InsertQuery()   navigate('SecondPage')
        ><Text style={styles.textButton} >Submit</Text></TouchableOpacity> */}

<TouchableOpacity style={styles.buttonstyle} 
        onPress={() => this.register_user(navigate)} 
         
        //onPress={() =>InsertQuery()   navigate('SecondPage')
        ><Text style={styles.textButton} >Submit</Text></TouchableOpacity>
           
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
  paddingBottom : 20,
  color : 'white',
  fontSize: 30,

},
inputstyle : {

    width : 210,
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
datestyle : {

  width : 210,
  height : 60,
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