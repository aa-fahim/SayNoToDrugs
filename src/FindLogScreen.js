import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import logo from './img/transparentLogo.png';
import firebase from 'firebase';

export default class FindScreen extends React.Component {
    state = {
        logId: '',
    }    

    handleLogId = (text) => {
        this.setState({logId: text})
    }

    findData = (IdVal) => {
        firebase.database().ref('users/' +IdVal+ '').once('value', (data) => {
            if(data.toJSON() === null){
                Alert.alert(
                    'Entry not found',
                    [
                        {text: 'Ok'},
                    ]
                )
            } else {
                this.props.navigation.navigate('ViewLog', {dataVal: data } )
            }
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.header}>
                    Update Entry
                </Text>
                <TextInput style={styles.textInput} placeholder="Log ID #" placeholderTextColor='#ABABAB' onChangeText = {this.handleLogId} />
                <View style={styles.submitButton}>
                    <Button
                        title='Enter'
                        onPress = {() => this.findData(this.state.logId)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4d4d4d',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        fontSize: 30,
        marginBottom: 20,
        color: '#ABABAB',
    },

    logoImg: {
        width: 100,
        height: 100,
    },

    textInput: {
        marginVertical: 10,
    },

    submitButton: {
        marginVertical: 10,
    },
    
});