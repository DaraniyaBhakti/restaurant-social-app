import React, { useState } from 'react'
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen(props) {

    const [loginForm, setLoginForm] = useState({email:'', password:''})
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    function onLogin(){

        signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
    }
  return (
    <View style={styles.container}>
        <View style={styles.formCenter}>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(email) => setLoginForm({...loginForm,email})}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setLoginForm({...loginForm, password})}
            />

            <Button
                onPress={() => onLogin()}
                title="Sign In"
            />
        </View>


        <View style={styles.bottomButton} >
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Register")} >
                    <Text>
                Don't have an account? SignUp.
            </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    formCenter:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:'10%'
    },
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    bottomButton: {
        alignContent: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        padding: 10,
        textAlign: 'center',
    },


})
export default LoginScreen
