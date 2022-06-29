import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet ,TextInput, TouchableOpacity} from 'react-native'
import FloatingActionButton from '../components/FloatingActionButton';
import {auth, database} from '../config/firebase';
import { doc, setDoc ,updateDoc} from 'firebase/firestore';
function RestaurantsTab(props) {

    const [restaurant, setRestaurant] = useState('')

    function mapBtnClick() {
        props.navigation.navigate("Map")
    }
    function restroSelected(){
        console.log(restaurant)
        const userRef = doc(database,"users",auth.currentUser.uid);
        updateDoc(userRef, {
            restaurant
        });
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Enter Restaurant' onChangeText={text => setRestaurant(text)}/>
            <TouchableOpacity onPress={restroSelected}>
            <Text>Let's Go</Text>
            </TouchableOpacity>
            <FloatingActionButton onPress={mapBtnClick} name="restaurant" />
        </View>
    )
}

export default RestaurantsTab

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})