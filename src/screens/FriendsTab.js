import React,{useEffect} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import FloatingActionButton from '../components/FloatingActionButton'


function FriendsTab(props) {

  function friendsbtnClick(){
    props.navigation.navigate("Contacts")
  }
  return (
    <View style={styles.container}>
    
      <FloatingActionButton onPress={friendsbtnClick} name="person-add" />
    </View>
  )
}

export default FriendsTab
const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})