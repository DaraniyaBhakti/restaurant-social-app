import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingActionButton from '../components/FloatingActionButton'
import { auth, database } from '../config/firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

function FriendsTab(props) {
  const [friendsList, setFriendsList] = useState()
  const [users,setUsers] = useState()
  
  async function fetchdata() {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const friendsRef = collection(userRef, "friends");
    onSnapshot(friendsRef, (snapshot) => {
      const friends = [], oneContact=[];
      snapshot.forEach((doc) => {
        friends.push({ name: doc.data().friendName, phone: doc.data().id });
        oneContact.push(doc.data().phoneNumber.map(data => data))
      });
      console.log('friends', oneContact.join(", "));
      setFriendsList(friends)
    })

    const user = collection(database,'users');
    // const userSnap = getDocs(user)
    onSnapshot(user,(snapshot) =>{
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data().phone);
      });
      console.log('user', users.join(", "))
      setUsers(user)
    })


  }
  useEffect(() => {
    fetchdata();
  }, [])

  function friendsbtnClick() {
    props.navigation.navigate("Contacts")
  }
  const keyExtractor = (item, idx) => {
    return item?.num?.toString() || idx.toString();
  }
  const renderItem = ({ item }) => {
    return(
      <View>
      <View style={styles.item}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name='restaurant' size={15} color="black" style={styles.icon}/>
        <Text style={styles.itemData}>xyz restaurant</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={keyExtractor} 
      />
      <FloatingActionButton onPress={friendsbtnClick} name="person-add" />
    </View>
  )
}

export default FriendsTab
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:'3%',
    backgroundColor:'white'
  },
  line:{
    height:2,
    backgroundColor:'#d9d9d9',
  },
  item:{
    paddingVertical:'3%',

  },
  itemName:{
    fontSize:18,
    fontWeight:'400'
  },
  itemData:{
    fontSize:15,
    fontWeight:'300'
  },
  icon:{
    paddingVertical:8,
    paddingHorizontal:5
    
  }
})