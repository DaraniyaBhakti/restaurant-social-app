import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import * as Contacts from 'expo-contacts'
import ContactListItem from '../components/ContactListItem'

function ContactsScreen(props) {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.PHONE_NUMBERS]
                })
                if (data.length > 0) {
                    setContacts(data)
                    // data.forEach(element => console.log(element));
                }
            }
        })();
    }, [])

    const keyExtractor = (item, idx) => {
        return item?.id?.toString() || idx.toString();
    }

    const renderItem = ({ item, index }) => {

        if (item.phoneNumbers) {
            let phoneNumber = (item.phoneNumbers[0].number).replace(/\s+/g, '').replace(/\-+/g, '').replace(/\(+/g, '').replace(/\)+/g, '')
            phoneNumber.length > 10 ? phoneNumber = phoneNumber.slice(3,13) : phoneNumber;
            return <ContactListItem contact={{ name: item.name, phoneNumber: phoneNumber, id: item.id }} navigation={props.navigation} />
        }

    }

    return (
        <View>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            // style={styles.list}
            />
        </View>
    )
}

export default ContactsScreen
const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})