import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingActionButton from '../components/FloatingActionButton'
import { auth, database } from '../config/firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

function FriendsTab(props) {
  const [friendsList, setFriendsList] = useState([])
  const [users, setUsers] = useState()
  const [restaurant, setRestaurant] = useState([])

  function fetchFriendsData() {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const friendsRef = collection(userRef, "friends");
    onSnapshot(friendsRef, (snapshot) => {
      const friends = [];
      snapshot.forEach((doc) => {
        friends.push({ name: doc.data().friendName, phoneNumber: doc.data().phoneNumber, id: doc.data().id });
      });
      setFriendsList(friends)
    })
  }
  function fetchUerData(){
    const user = collection(database, 'users');
    onSnapshot(user, (snapshot) => {
      const usersArray = [];
      snapshot.forEach((doc) => {
        usersArray.push({ phoneNumber: doc.data().phone, restaurant: doc.data().restaurant });
      });
      setUsers(usersArray)
    })
  
  }
  function getRestaurantData(){
    const restaurantArray = []
    let flag = false;
    for (let j = 0; j < friendsList.length; j++) {
      let index;
      for (let i = 0; i < users.length; i++) {
        if (friendsList[j].phoneNumber === users[i].phoneNumber) {
          flag = true
          index = i;
          break;
        }
      }
      if(flag){
        restaurantArray.push({ name: friendsList[j].name, phoneNumber: friendsList[j].phoneNumber, restaurant: users[index].restaurant })
      }else{
        restaurantArray.push({ name: friendsList[j].name, phoneNumber: friendsList[j].phoneNumber, restaurant:"" })
      }
    }
    setRestaurant(restaurantArray)
    console.log("restro",restaurant)
  
  }

  useEffect(() => {
    fetchFriendsData();
    fetchUerData();
  },[])
  useEffect(()=>{
    getRestaurantData();
  },[])

  function friendsbtnClick() {
    props.navigation.navigate("Contacts")
  }
  const keyExtractor = (item, idx) => {
    return item?.num?.toString() || idx.toString();
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='restaurant' size={15} color="black" style={styles.icon} />
            if(item.restaurant == "") {
            <Text style={styles.itemData}>Not going anywhere</Text>  
            }else{
              <Text style={styles.itemData}>{item.restaurant}</Text>
            }
            
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurant}
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
    padding: '3%',
    backgroundColor: 'white'
  },
  line: {
    height: 2,
    backgroundColor: '#d9d9d9',
  },
  item: {
    paddingVertical: '3%',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '400'
  },
  itemData: {
    fontSize: 15,
    fontWeight: '300'
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 5

  }
})