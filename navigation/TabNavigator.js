import 'react-native-gesture-handler';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import MyLocation from '../screens/MyLocation';
import Bookmark from '../screens/Bookmark';
import MainStackNavigator from './MainStackNavigator';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'md-home' : 'md-home-outline';
    } else if (route.name === 'Location') {
      iconName = focused ? 'md-earth' : 'md-earth-outline';
    } else if (route.name === 'Favorites') {
      iconName = focused ? 'md-star' : 'md-star-outline';
    } else if (route.name === 'Search') {
      iconName = focused ? 'md-search' : 'md-search-outline';
    }

    if (focused) {
      return <Ionicons name={iconName} size={30} color={color}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: 60,
          width: 60,
          borderRadius: 80,
          backgroundColor: '#63C5DA',
          paddingTop: 15
        }} />
    } else {
      return <Ionicons name={iconName} size={size} color={color} />
    }
  }
});

const customTabBarStyle = {
  activeTintColor: '#fff',
  inactiveTintColor: 'black',
  style: {
    backgroundColor: '#63C5DA',
  }
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={customTabBarStyle} >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={MainStackNavigator} />
      <Tab.Screen name="Favorites" component={Bookmark} />
      <Tab.Screen name="Location" component={MyLocation} />
    </Tab.Navigator>
  );
};

export default TabNavigator;