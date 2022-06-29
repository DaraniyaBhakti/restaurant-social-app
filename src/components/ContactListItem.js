import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, database } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const ContactListItem = ({contact, navigation}) => {
    const {name,phoneNumber,id} = contact
    
    const contactSelected = async() => {
        const userRef = doc(database, "users" , auth.currentUser.uid);
        const friendsRef = doc(userRef, "friends",id)

        await setDoc(friendsRef,{
            id:id,
            friendName:name,
            phoneNumber:phoneNumber
        })
        navigation.navigate("Friends")

        
    }
    return (
        <View style={styles.contactCon}>
            <View style={styles.imgCon}>
                <View style={styles.placeholder}>
                    <Text style={styles.txt}>
                        {name[0]}
                    </Text>
                </View>
            </View>
            <View style={styles.contactDat}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phoneNumber}>
                    {phoneNumber}
                </Text>

            </View>
            <View style={styles.addIcon}>
                <TouchableOpacity onPress={()=>contactSelected()}>
                <Ionicons name="person-add" color="black" size={20}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
    },
    imgCon: {},
    placeholder: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#FBE042",
        alignItems: "center",
        justifyContent: "center",
        marginVertical:'12%',
        marginHorizontal:'3%'
    },
    contactDat: {
        flex: 1,
        justifyContent: "center",
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: "#888",
    },
    addIcon:{
        justifyContent:'center',
        alignContent:'flex-end',
        paddingRight:'5%',
    }
});
export default ContactListItem;