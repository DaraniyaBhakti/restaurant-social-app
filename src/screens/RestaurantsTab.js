import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FloatingActionButton from '../components/FloatingActionButton';

function RestaurantsTab(props) {

    function mapBtnClick() {
        props.navigation.navigate("Map")
    }

    return (
        <View style={styles.container}>
            <FloatingActionButton onPress={mapBtnClick} title="Add" />
        </View>
    )
}

export default RestaurantsTab

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})