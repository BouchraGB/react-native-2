import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const Header = props => {
  // export default class Header extends Component{
    
    // constructor(props) {
    //   super(props);
    //   this.state = {}
    // }

    // render() {

  const { navigate } = props.navigation;
    return (
    
        <View>
      {/* <NavBar > */}
        <NavGroup style={styles.navBar}>
          <NavButton onPress={() => navigate("homemovies")} style={styles.element}>
            <View>
            <Image source={require('../assets/home2.png')} style={styles.icon}/>
            <NavButtonText style={styles.elementtitle}>
              {"Home"}
            </NavButtonText>
            </View>
          </NavButton>
          <NavButton onPress={() => alert('Search page')} style={styles.element}>
          <Image source={require('../assets/search2.png')} style={styles.icon}/>
            <NavButtonText style={styles.elementtitle}>
              {"Search"}
            </NavButtonText>
            </NavButton>
          <NavButton onPress={() => navigate("Mylist")} style={styles.element}>
          <Image source={require('../assets/list2.png')} style={styles.icon}/>
          <Badge
              status="primary"
              value = '3'
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            />
            <NavButtonText style={styles.elementtitle}>
              {"My list"}
              {/* {global.MyVar} */}
            </NavButtonText>
          </NavButton>
          <NavButton onPress={() => alert('Profile page')} style={{justifyContent: 'center',alignItems: 'center',}}>
          <Image source={require('../assets/profile2.png')} style={styles.icon}/>
            <NavButtonText style={styles.elementtitle}>
              {"Profile"}
            </NavButtonText>
          </NavButton>
        </NavGroup>
      {/* </NavBar> */}
        </View>

    )
};
// }

const styles = StyleSheet.create({

    navBar: {
      // NavBar styles here (all view styles are valid)
   
      // default shared styles:
    //   borderTopWidth: 0,
    //   borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    //   borderBottomWidth: 1,
    //   flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   
      // default Android styles:
      backgroundColor: '#0f397b',
      // backgroundColor : 'rgba(86, 69, 146,1)' ,
      height: 60,
      paddingRight : 20
      
    },
    element : {
        marginRight : 20,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopWidth: 0,
        // borderBottomColor: 'rgba(0, 0, 0, 1)',
        // borderBottomWidth: 1,

    },
    elementtitle : {
        // color : '#797a7e',
        color : 'black',
        fontSize : 11
    },
    icon : {
      width : 35, 
      height : 35
    }
  });

  export default Header;