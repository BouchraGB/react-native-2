//This is an example code for Navigator// 
import React, { Component } from 'react';
import {useState} from 'react';
import { Linking } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import { YellowBox } from 'react-native';


//import react in our code. 
import { ActivityIndicator, FlatList, ListItem, StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView , SafeAreaView } from 'react-native';
//import all the components we are going to use.
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default class DetailsMovie extends Component {
  

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const idmovie = navigation.getParam('idMovie', 'NO-ID'); 
    const iduser = navigation.getParam('idUser', 'NO-ID'); 
    console.log("choufiiiii bich"+idmovie);
    console.log("choufiiiii bich"+iduser);
    fetch('https://api.themoviedb.org/3/movie/'+ idmovie +'?api_key=1aa01b05a79e3e3681797f9753127627')
      .then((response) => response.json())
      .then((json) => {
        console.log("hawlik json wech fih",json);
        this.setState({ data: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  openUrlMovie(homepage) {
    if(homepage != ''){Linking.openURL(homepage)}
    else {alert('Sorry! path not available')}
  }

  addMovie() {

    const { navigation } = this.props;
    const idmovie = navigation.getParam('idMovie', 'NO-ID'); 
    const iduser = navigation.getParam('idUser', 'NO-ID'); 

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
        'INSERT INTO lists (userId, movieId) VALUES (?,?)',
        [iduser, idmovie],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("c booon");

            Alert.alert(
              'Done',
              'Movie added !',
              [
                { text: 'OK'}
              ],
              { cancelable: false }
            );
          } else {console.log('Operation Failed');
          Alert.alert(
            'Error',
            'Operation failed !',
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
  }

  // getAllUsers = () => {

  //   var db = openDatabase(
  //     {
  //       name: 'sqlitedatabase.db',
  //       // createFromLocation: '~database.db',
  //       location: 'default',
  //     },
  //     () => { console.log("Database opened "); },
  //     error => {
  //       console.log("ERROR: " + error);
  //     }
  //   );



  //   db.transaction((tx) => {
  //     tx.executeSql('SELECT * FROM accounts', [], (tx, results) => {
  //       console.log("nrmlm yekteb");
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i)
  //         console.log(results.rows.item(i));
  //     });
  //   });
  // };


  render() {
    const { navigate } = this.props.navigation;
    const { data, isLoading } = this.state;
    const { navigation } = this.props;
    const idmovie = navigation.getParam('idMovie', 'NO-ID'); 
    const title = data.title;
    const poster = data.poster_path;
    const overview = data.overview;
    const genres = data.genres;
    console.log("bbbbbbbbbbbbbb",genres);
    const lang = data.original_language;
    const date = data.release_date;
    const voteavg = data.vote_average;
    const votecnt = data.vote_count;
    const homepage = data.homepage
    
    return (
      <ImageBackground source={require('../assets/detailsbg.jpg')} style={styles.backgd}>  
      <View style={styles.viewStyle}>
       
      {isLoading ? <ActivityIndicator/> : (
        <ScrollView>
          <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Image
          style={styles.posterStyle}
          source={{
            uri: 'http://image.tmdb.org/t/p/w185'+poster,
          }}
        />
        <View style={{justifyContent : 'flex-start'}}>
        <Text style={styles.overviewTitleStyle}>OVERVIEW : </Text>
        <Text style={styles.overviewStyle}>{overview}</Text>
        <View style={{  alignItems: 'center', marginTop : 10}}>
        <Text style={styles.overviewTitleStyle}>More info</Text>
        </View>
        <View style = {styles.cadre}>
        <Text style={styles.overviewStyle}>Title : {title}</Text>
        
        <View style={{flexDirection : 'row'}}>
        <Text style={styles.overviewStyle}>Genres : </Text>
        <FlatList numColumns={2} data={genres} keyExtractor={({ id }, index) => id} renderItem={
            ({item}) => (
            <Text style={styles.overviewStyle}>{item.name} </Text>)
          }
        />

        </View>
        



         
        <Text style={styles.overviewStyle}>Langage : {lang}</Text>
        <Text style={styles.overviewStyle}>Release date : {date}</Text>
        <Text style={styles.overviewStyle}>Votes average : {voteavg}</Text>
        <Text style={styles.overviewStyle}>Votes count : {votecnt}</Text>
        </View>
        </View>

        {/* <TouchableOpacity 
        onPress={() => this.openUrlMovie()} 
        ><Text style={styles.lien}>Go to the movie's home page</Text></TouchableOpacity> */}
      <View style={styles.buttonspart}>
      <TouchableOpacity style={styles.buttonstyle} 
        onPress={() => this.addMovie()} 
        ><Text style={styles.textButton} >Add to list</Text></TouchableOpacity>

      <TouchableOpacity style={styles.buttonstyle} 
        onPress={() => this.openUrlMovie(homepage)} 
        ><Text style={styles.textButton} >Movie's page</Text></TouchableOpacity>
      </View>
          </View>
          </ScrollView>
      )}

    </View>
    </ImageBackground>
    
        // <ImageBackground  style={styles.backgd}>  

        // <TouchableOpacity style={styles.buttonstyle} 
        // onPress={this.getAllUsers} 
         
        // //onPress={() =>InsertQuery()   navigate('SecondPage')
        // ><Text style={styles.textButton} >Submit</Text></TouchableOpacity>
   
        
        // </ImageBackground> 

    );
  }
}
const styles = StyleSheet.create({
viewStyle :{
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1, padding: 8 ,
  // backgroundColor : '#3f3f44'
},
cadre : {
borderWidth : 3,
borderColor : '#0f397b',
padding : 15,
borderRadius : 25
},
titleStyle : {
  fontSize : 30,
  color : 'white',
  fontFamily : 'AlNile-Bold'
},
posterStyle : {
  height : 200,
  width : 200,
  margin : 25,
  borderRadius:10,
  borderWidth: 1,
},
overviewStyle : {
  fontSize :18,
  color : 'white'
},
overviewTitleStyle : {
  fontSize :19,
  color : 'white',
  fontWeight: "bold",
  textAlign: 'left'
},
lien : {
  fontSize :18,
  color : 'blue'
},
backgd : {
  height : '100%',
  width : '100%',
},
buttonstyle : {
  backgroundColor : '#006d77',
  width : '40%',
  height : 50, 
  alignItems : 'center',
  justifyContent : 'center',
  // borderRadius : 20,
  margin : 20

},
textButton : {
  color : 'white',
  fontSize : 18
},
buttonspart : {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}
});