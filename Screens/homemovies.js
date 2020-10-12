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
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



export default class homemovies extends Component {

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

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1aa01b05a79e3e3681797f9753127627&page='+this.state.currentPage)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.results });
        this.setState({ maxPage: json.total_pages });
        this.setState({ nextPage: this.state.currentPage+1 });
        this.setState({ prevPage: this.state.currentPage-1 });
        this.setState({ currentPage: 1 });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }l;

  nextPage() {
    console.log("hello beauty"+this.state.currentPage);  
    this.setState({ isLoading: true });
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1aa01b05a79e3e3681797f9753127627&page='+this.state.nextPage)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json.results });
      this.setState({ nextPage: this.state.nextPage+1 });
      this.setState({ prevPage: this.state.prevPage+1 });
      this.setState({ currentPage: this.state.currentPage+1 });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }

  prevPage() {
    console.log("hello beauty"+this.state.currentPage);  
    this.setState({ isLoading: true });
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=1aa01b05a79e3e3681797f9753127627&page='+this.state.prevPage)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json.results });
      this.setState({ nextPage: this.state.nextPage-1 });
      this.setState({ prevPage: this.state.prevPage-1 });
      this.setState({ currentPage: this.state.currentPage-1 });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }




  render() {
    // const [refreshing, setRefreshing] = React.useState(false);

    // const onRefresh = React.useCallback(() => {
    //   setRefreshing(true);
    
    //   wait(2000).then(() => setRefreshing(false));
    // }, []);


    const { navigate } = this.props.navigation;
    
    const { data, isLoading } = this.state;
    const {currentPage, maxPage} = this.state;
    const color = 'white';
    const condprev = this.state.prevPage == 0;
    const condnext = this.state.nextPage == (this.state.maxPage + 1);
    const { navigation } = this.props;
    const iduser = navigation.getParam('userId', 'NO-ID'); 

    // const [refreshing, setRefreshing] = React.useState(false);

    // const onRefresh = React.useCallback(() => {
    //   setRefreshing(true);
    
    //   wait(2000).then(() => setRefreshing(false));
    // }, []);


    
    
    return (
      
      <View style={{height : '100%'}}>
        {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > */}
        <ImageBackground source={require('../assets/back.jpg')} style={styles.backgd}>  
        <Header navigation={this.props.navigation}>
        </Header>


      {/* <Container>
          <Navbar
              title={"Navbar Native"}
              left={{
                  icon: "ios-arrow-back",
                  label: "Back",
                  onPress: () => {alert('Go back!')}
              }}
              right={[{
                  icon: "ios-search",
                  onPress: () => {alert('Search!')}
              },{
                  icon: "ios-menu",
                  onPress: () => {alert('Toggle menu!')}
              }]}
          />
      </Container> */}


        
      {isLoading ? <ActivityIndicator/> : (
        <View style={{padding: 24, height : '98%', width : '100%',     alignItems: 'center',
        justifyContent: 'center'}}> 
        <FlatList 
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
        />

        <Text style={{padding: 24}}></Text>
        </View>
      )}
      {/* <Text style={styles.pagination}>Bouchraaaaaaaaaaaaaaaa</Text> */}
      <View style={styles.paginationInd}>
          <Text style={{color : 'white', fontSize : 12}} >{this.state.currentPage}/{this.state.maxPage}</Text>
      </View>
            <View style={styles.pagination}>
            

          <TouchableOpacity>
          {condprev ? <Text style={{color : 'white'}} onPress={() =>this.prevPage()} disabled={true}>Prev</Text>
          :<Text style={{color : 'white', marginRight : 10}} onPress={() =>this.prevPage()} >Prev</Text>} 
          
          </TouchableOpacity>
        <PaginationDot 
        activeDotColor={color} 
        curPage={this.state.nextPage -1} 
        maxPage={this.state.maxPage}
        sizeRatio={1.0}
        />
        <TouchableOpacity>
          {condnext ? <Text style={{color : 'white'}} onPress={() =>this.nextPage()} disabled={true}>Next</Text> :
          <Text style={{color : 'white', marginLeft : 10}} onPress={() =>this.nextPage()}>Next</Text>}
        
        </TouchableOpacity>
        </View>

      </ImageBackground> 
      {/* </ScrollView> */}


    </View>

    
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

