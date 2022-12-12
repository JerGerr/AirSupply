import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import MainStackNavigator from "./MainStackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Main" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;