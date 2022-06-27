import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
const FloatingActionButton = (props) => {
    return (
        <Pressable style={styles.container}
            onPress={props.onPress}>
            {/* <Text style={styles.title}>{props.title}</Text> */}
            <Ionicons name={props.name} color="black" size={20}/>
        </Pressable>
    );
};
  
export default FloatingActionButton;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#FBE042",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        color: "black",
        fontWeight: "500",
    },
});