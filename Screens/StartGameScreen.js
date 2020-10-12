import React, {useState} from 'react';
import { StyleSheet, View, Text , TextInput,Button, Alert } from 'react-native';


const StartGameScreen = props =>{

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText);
    };

    return (
        <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <View style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <TextInput style={styles.inputnumber}
            onChangeText={numberInputHandler}
            value={enteredValue}
            ></TextInput>
            <View style={styles.buttonsContainer}>
                <Button title='Reset' onPress={() => {}}></Button>
                <Button title='Confirm' onPress={() => {Alert.alert(enteredValue)}}></Button>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center'
    
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8 ,
        padding: 20,
        borderRadius: 20,
        borderWidth : 3,
        borderColor : '#14213d',
        
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop : '20%'
    },
    inputnumber:{
        backgroundColor : '#e5e5e5',
        width : 200,
        height : 60,
        marginTop : '20%',
        borderRadius: 20,
        borderWidth : 3,
        borderColor : '#14213d',
    },


});

export default StartGameScreen;