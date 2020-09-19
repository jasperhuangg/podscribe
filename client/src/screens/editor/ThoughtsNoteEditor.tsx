import {SafeAreaView, StatusBar, TextInput, View, Text, KeyboardAvoidingView, TouchableOpacity} from "react-native";
import {newNoteStyles} from "./NewNoteStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../config/colors";
import * as React from "react";
import {SyncEvent} from "../../models/SyncEvent";
import {TimestampConverter} from "../../util/TimestampConverter";
import {useSpring, animated} from 'react-spring'

const AnimatedSafeAreaView = animated(SafeAreaView)

export const ThoughtsNoteEditor = (
  props: {
    type: string
    syncEvent: SyncEvent
    hide: () => void
  }) => {

  const growInProps = useSpring({
    config: {
      duration: 200
    },
    scale: 1,
    opacity: 1,
    from: {
      scale: 0.5,
      opacity: 0
    }
  })

  const growInStyle = {
    transform: [{
      scale: growInProps.scale
    }],
    opacity: growInProps.opacity
  }


  return (
    <AnimatedSafeAreaView
      style={[newNoteStyles.noteEditor, growInStyle]}
    >
      <StatusBar hidden={true}/>
      <TouchableOpacity
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={props.hide}
      >
        <MaterialCommunityIcons name="chevron-down" size={30} color={colors.black} />
      </TouchableOpacity>
      <View style={newNoteStyles.noteEditorHeader}>
        <Text style={newNoteStyles.newNoteTimestamp}>
          {TimestampConverter.msToTimestamp(props.syncEvent.progress)}
        </Text>
        <MaterialCommunityIcons
          name="thought-bubble"
          size={30}
          color={colors.black}
        />
      </View>
      <TextInput
        autoFocus={true}
        style={newNoteStyles.noteEditorTextArea}
        placeholder={"Start typing here..."}
        multiline={true}
      />
    </AnimatedSafeAreaView>
  )
}
