import React from 'react'
import {
  createStackNavigator,
} from "@react-navigation/stack"
import NewNote from "./NewNote";
import * as Haptics from "expo-haptics";
import Listen from "./Listen";

export const Stack = (props: any) => {
  const Stack = createStackNavigator()

  React.useEffect(() => {
    const unsubscribeFromTabPresses = props.navigation.addListener('tabPress', async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    });

    return () => unsubscribeFromTabPresses()
  }, [])

  return (
    <Stack.Navigator
      initialRouteName={"Listen"}
      screenOptions={{
        headerShown: false,
      }}
      mode={'modal'}
    >
      <Stack.Screen
        name={"Listen"}
        component={Listen}
      />
      <Stack.Screen
        name={"NewNote"}
        component={NewNote}
      />

    </Stack.Navigator>
  )
}
