import React from 'react'
import {store} from "./src/util/redux"
import {Provider} from "react-redux"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Splash from "./src/screens/splash/Splash"
import Login from "./src/screens/login/Login"
import MainTabs from "./src/screens/MainTabs";
import { ApolloProvider} from "@apollo/client";
import { client } from "./src/util/GraphQL"

export default function App() {

  const Stack = createStackNavigator()

  return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({current: {progress}}) => ({
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
                component={MainTabs}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </Provider>
  );
}
