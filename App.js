import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons} from '@expo/vector-icons';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchCountry from './screens/SearchCountry';
import SearchState from './screens/SearchState';
import HomePage from './screens/HomePage';
import LandingPage from './screens/LandingPage';
import MyLocation from './screens/MyLocation';
import MainStackNavigator from './navigation/MainStackNavigator';
import TabNavigator from './navigation/TabNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';


const App = () => {
  return (
    <NavigationContainer>

      <DrawerNavigator />
      
    </NavigationContainer>
    
  );
};

export default App;