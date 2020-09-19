import * as React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Notebooks from "./notebooks/Collections";
import {colors} from "../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import {StatusBar} from "react-native";
import Listen from "./listen/Listen";
import Profile from "./profile/Profile";

const Tab = createBottomTabNavigator()

export default (props: any) =>
  <>
    <StatusBar barStyle={"dark-content"} />

    <Tab.Navigator
      initialRouteName={"Listen"}
      lazy={true}
      tabBarOptions={{
        activeBackgroundColor: colors.black,
        activeTintColor: "white",
        inactiveTintColor: colors.black,
        tabStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        labelStyle: {
          fontSize: 13,
          fontWeight: "900",
        },
        showLabel: false
      }}
    >

      <Tab.Screen
        name={"Collections"}
        component={Notebooks}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="notebook" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={"Listen"}
        component={Listen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="podcast" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="settings" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  </>
