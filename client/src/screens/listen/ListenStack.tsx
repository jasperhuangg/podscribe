import React from 'react'
import {
  createStackNavigator,
} from "@react-navigation/stack"
import MainPlayer from "./MainPlayer";
import {NewNote} from "./NewNote";
import * as Haptics from "expo-haptics";

export const ListenStack = (props: any) => {
  const Stack = createStackNavigator()

  React.useEffect(() => {
    const unsubscribeFromTabPresses = props.navigation.addListener('tabPress', async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    });

    return () => unsubscribeFromTabPresses()
  }, [])

  return (
    <Stack.Navigator
      initialRouteName={"Player"}
      screenOptions={{
        headerShown: false,
      }}
      mode={'modal'}
    >
      <Stack.Screen name={"Player"} component={MainPlayer} />
      <Stack.Screen name={"NewNote"} component={NewNote} />

    </Stack.Navigator>
  )
}
