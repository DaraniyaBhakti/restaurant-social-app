import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import FloatingActionButton from '../components/FloatingActionButton';
import { auth, database } from '../config/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

function RestaurantsTab(props) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [restaurant, setRestaurant] = useState('')
    const [name, setName] = useState("") 

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    
    function mapBtnClick() {
        props.navigation.navigate("Map")
    }
    function restroSelected() {
        const userRef = doc(database, "users", auth.currentUser.uid);
        updateDoc(userRef, {
            restaurant,
            timeStamp: serverTimestamp()
        });
        schedulePushNotification();
    }

    function getRestro() {
        const userRef = doc(database, 'users', auth.currentUser.uid);
        const userSnap = getDoc(userRef);

        userSnap.then((snapShot) => {
            snapShot.data().restaurant ?
                setName(snapShot.data().restaurant)
                : setName('')

        })
    }

    useEffect(() => {
        getRestro()
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter restaurant name where you are going, and take reference from map</Text>
            <TextInput placeholder='Restaurant' onChangeText={text => setRestaurant(text)} style={styles.input} />
            <TouchableOpacity onPress={restroSelected}>
                <Text style={styles.button}>Let's Go</Text>
            </TouchableOpacity>

            <Text style={styles.text}>You are going to {name}</Text>
            <FloatingActionButton onPress={mapBtnClick} name="restaurant" />
        </View>
    )
}


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You are going to "+{restaurant},
            body: 'It will be disappeared in 12 hours.',
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default RestaurantsTab

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 17,
        marginVertical: 15,
        backgroundColor: '#d9d9d9',
        borderColor: '#FBE042',
        borderWidth: 1,
        padding: 10,
    },
    input: {
        backgroundColor: '#e3e3e3',
        margin: 20,
        padding: 18,
        fontSize: 20,
        borderWidth: 1
    },
    button: {
        backgroundColor: "#FBE042",
        width: '30%',
        padding: 15,
        alignSelf: 'center',
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        borderRadius: 30
    },
    text: {
        fontSize:18,
        textAlign:'center',
        margin:'20%',
        padding:10,
        borderWidth:2,
        borderColor:'#FBE042'
    }
})