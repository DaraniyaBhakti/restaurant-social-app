import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';
import * as Location from 'expo-location';
import { PATHS,STRINGS } from '../utils/Constants';
function MapScreen() {
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
            console.log(position)
        })();
    }, []);

    const apiCall = async() => {
        try{
            let params = {
              location: position.latitude + ',' + position.longitude,
              radius: 2500,
              key: API_KEY,
              type: STRINGS.restaurant,
            };
            if(nextPgToken) params.pagetoken = nextPgToken;
            if(value) params.keyword = value;

            const result = await axios.get(PATHS.nearBy,{params})
            console.log(result);

            if(result.data?.results?.length) setData([...data, ...result.data?.results])
            setNextPgToken(result.data?.next_page_token);

          }catch(err){
            console.log(err)
          }
    }


    return (
        <View style={styles.container}>
            <Text>Restaurants Tab </Text>
            <MapView
                style={StyleSheet.absoluteFillObject}
                provider={MapView.PROVIDER_GOOGLE}
                region={position}
                showsUserLocation={true}>
                <Marker
                    coordinate={position}></Marker>
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default MapScreen
