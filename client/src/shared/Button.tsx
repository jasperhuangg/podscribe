import * as React from "react"
import {TouchableOpacity, Text, GestureResponderEvent} from "react-native"
import {global} from "./GlobalStyles";
import {buttonStyles} from "./ButtonStyles";
import * as Haptics from "expo-haptics";

// TODO: Refactor to use Pressable: https://reactnative.dev/docs/pressable

export default (props: {
  title: string,
  onPress: (event: GestureResponderEvent) => void,
  width: number|string,
  letterSpacing: number,
  fontSize?: number,
  padding?: number,
  child?: any
}) => {

  return <TouchableOpacity
    onPress={async (e) => {
      props.onPress(e)
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }}
    style={[
      buttonStyles.button,
      {
        width: typeof props.width === "string" ? "100%" : props.width,
        ...(props.padding ? {paddingTop: props.padding} : {}),
        ...(props.padding ? {paddingBottom: props.padding} : {})
      }
    ]}
  >
    {props.title.length ?
      <Text style={[
        buttonStyles.text,
        global.text_md,
        {
          letterSpacing: props.letterSpacing,
          ...(props.fontSize ? {fontSize: props.fontSize} : {})
        }
      ]}
      >{props.title}</Text> :
      props.child
    }

  </TouchableOpacity>
}
