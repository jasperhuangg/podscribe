import React from 'react'
import { store } from "./src/util/redux"
import { Provider } from "react-redux"
import {NavigationContainer} from "@react-navigation/native"
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack"
import Splash from "./src/screens/splash/Splash"
import Login from "./src/screens/login/Login"
import Main from "./src/screens/Main";

export default function App() {

  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          lazy
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "clamp",
                }),
              },
            }),
          }}
          mode="modal"
        >
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Main"
            component={Main}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
