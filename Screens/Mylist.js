//This is an example code for Navigator// 
import React, { Component } from 'react';
import {useState} from 'react';
import { Linking } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';

import Header from '../Components/Header';
// import { Container, Navbar } from 'navbar-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import PaginationDot from 'react-native-animated-pagination-dot'




//import react in our code. 
import { ActivityIndicator,RefreshControl, FlatList, StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
//import all the components we are going to use.




export default class Mylist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      currentPage :1,
      nextPage : 1,
      prevPage : 0,
      maxPage:0,
    };
  }

  getAllList = () => {

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



    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM lists where userId ='+global.MyVar, [], (tx, results) => {
        console.log("nrmlm yekteb");
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          console.log(results.rows.item(i));
      });
    });
  };

  componentDidMount() {

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


    
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM lists where userId ='+global.MyVar, [], (tx, results) => {
        console.log("nrmlm yekteb");
        const temp = [];
        const tempmovies = [];

        const id = results.rows.item(0).movieId;

          fetch('http://api.themoviedb.org/3/movie/'+id+'?api_key=1aa01b05a79e3e3681797f9753127627')
          .then((response) => response.json())
          .then((json) => {
            this.setState({ data: json.adult});
            
            console.log("hawlik json wech fih",json);
          })
          .catch((error) => console.error(error))
          .finally(() => {
            
          });

          console.log("hawlik data wech fiha",this.state.data);

        // for (let i = 0; i < results.rows.length; ++i){
        //   const id = results.rows.item(i).movieId;
          
        //   fetch('http://api.themoviedb.org/3/movie/'+id+'?api_key=1aa01b05a79e3e3681797f9753127627')
        //   .then((response) => response.json())
        //   .then((json) => {
        //     console.log("hawlik json wech fih",json);
        //     // tempmovies.push(json);
        //     // const tempmovies = json ;
        //     // this.setState({ data: json});
        //     console.log("bouchraaa"+tempmovies);
        //   })
        //   .catch((error) => console.error(error))
        //   .finally(() => {
            
        //   });

        //   temp.push(results.rows.item(i).movieId);
        //   console.log(results.rows.item(i));
        // }


        // this.setState({ data: tempmovies });
        // console.log(temp);
        // console.log(tempmovies);
      });
      
    });
    
    
    



  }l;








  render() {


    // const { navigate } = this.props.navigation;
    
    const { data } = this.state;
    // const {currentPage, maxPage} = this.state;
    // const color = 'white';
    // const condprev = this.state.prevPage == 0;
    // const condnext = this.state.nextPage == (this.state.maxPage + 1);
    // const { navigation } = this.props;
    // const iduser = navigation.getParam('userId', 'NO-ID'); 
    const { navigation } = this.props;



    
    
    return (
      
      <View style={{height : '100%'}}>

        <Header navigation={this.props.navigation}>
        </Header>
        {/* <TouchableOpacity style={styles.buttonstyle} 
        onPress={() => this.getAllList()} 
        ><Text style={styles.textButton} >See all</Text></TouchableOpacity> */}

<View style={{padding: 24, height : '98%', width : '100%',     alignItems: 'center',
        justifyContent: 'center'}}> 
        {/* <FlatList 
          numColumns={2}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
          <View style={styles.espace}>
            <TouchableOpacity activeOpacity = { .5 } onPress={() => navigate("DetailsMovie", {idMovie : item.id, idUser : iduser})}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'http://image.tmdb.org/t/p/w185'+item.poster_path,
            }}
          />
            <Text style={{color : 'white', width : '80%',   marginLeft : 'auto', marginRight : 'auto'}}>{item.title}</Text>
          </TouchableOpacity>
            </View>
          )}
        /> */}

        <Text style={{padding: 24}}></Text>
        </View>

      </View>
       

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
tinyLogo: {
  height: 140,
  width: '80%',
  borderRadius:10,
  borderWidth: 1,
  marginLeft : 'auto',
  marginRight : 'auto'


},
espace : {
  width : '50%',
  height : 190,

  
},
paginationInd :{
  flexDirection: 'row',
  padding : 24,
  position : 'absolute',
  // color : 'white',
  top : '88.5%',
  width : '100%',
  alignItems: 'center',
  justifyContent: 'center',

},
pagination :{
    flexDirection: 'row',
    padding : 24,
    position : 'absolute',
    // color : 'white',
    top : '91.5%',
    width : '100%',
    alignItems: 'center',
    justifyContent: 'center',
}
});

