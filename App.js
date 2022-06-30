import React, { useState, createContext, useContext, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';

import LoginScreen from './src/authScreen/LoginScreen';
import RegisterScreen from './src/authScreen/RegisterScreen';
import RestaurantsTab from './src/screens/RestaurantsTab';
import FriendsTab from './src/screens/FriendsTab';
import MapScreen from './src/screens/MapScreen';
import ContactsScreen from './src/screens/ContactsScreen';

const Tabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function logout(){
  auth.signOut();
}

function HomeStack() {
  return(
    <Stack.Navigator>
    <Stack.Screen name="Restaurants App"
      options={{
        headerRight:()=>(
          <TouchableOpacity onPress={logout}>
            <Text style={{fontSize:15,borderColor:'#d9d9d9',borderWidth:1,padding:8,elevation:2,fontWeight:'500'}}>
              Logout
            </Text>
          </TouchableOpacity>
        )
      }}
    >
      {() => (
        <Tabs.Navigator
          initialRouteName='Restaurant'
          screenOptions={{
            tabBarStyle: { backgroundColor: '#FBE042' },
            tabBarLabelStyle: { fontSize: 15, fontWeight: '600' },
            
          }}
        >
          <Tabs.Screen name='Restaurants' component={RestaurantsTab} />
          <Tabs.Screen name='Friends' component={FriendsTab} />
        </Tabs.Navigator>
      )}
    </Stack.Screen>
    <Stack.Screen name='Map' component={MapScreen} />
    <Stack.Screen name='Contacts' component={ContactsScreen} />
  </Stack.Navigator>
  )
}

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) =>{
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>

  );
}





