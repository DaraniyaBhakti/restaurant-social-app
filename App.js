import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RestaurantsTab from './src/screens/RestaurantsTab';
import FriendsTab from './src/screens/FriendsTab';
import MapScreen from './src/MapScreen';

// const insets = useSafeAreaInsets()
const Tabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants App">
          {() => (
            <Tabs.Navigator
              initialRouteName='Restaurant'
              screenOptions={{
                tabBarStyle: { backgroundColor: '#FBE042' },
                tabBarLabelStyle : {fontSize: 15,fontWeight:'600'}
              }}
            >
              <Tabs.Screen name='Restaurants' component={RestaurantsTab} />
              <Tabs.Screen name='Friends' component={FriendsTab} />
            </Tabs.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name='Map' component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '20%'
  },
});
