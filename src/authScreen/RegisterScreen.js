import React,{ useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { Snackbar } from 'react-native-paper';
import {auth, database} from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
function RegisterScreen(props) {

    const [ registerForm, setRegisterForm ] = useState({
        name:'',
        phone:'',
        email:'',
        password:''
    })

    function onRegister(){
        createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
            .then(() => {
                setDoc(doc(database, "users", auth.currentUser.uid), {
                    name:registerForm.name,
                    phone:registerForm.phone,
                    email:registerForm.email
                });
            })
            .catch((error) => console.log(error));
    }

  return (
    <View style={styles.container}>
    <View style={styles.formCenter}>
        <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={(name) => setRegisterForm({...registerForm, name})}
        />
         <TextInput
            style={styles.textInput}
            placeholder="Phone No."
            onChangeText={(phone) => setRegisterForm({...registerForm, phone})}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setRegisterForm({...registerForm, email})}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setRegisterForm({...registerForm, password})}
        />

        <Button
            onPress={() => onRegister()}
            title="Register"
        />
    </View>

    <View style={styles.bottomButton} >
    <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")} >
                <Text>
                Already have an account? SignIn.
        </Text>
        </TouchableOpacity>
        
    </View>
    {/* <Snackbar
        visible={isValid.boolSnack}
        duration={2000}
        onDismiss={() => { setIsValid({ boolSnack: false }) }}>
        {isValid.message}
    </Snackbar> */}
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

export default RegisterScreen
