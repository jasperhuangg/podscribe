import {Text, TouchableHighlight, View} from "react-native";
import {newNoteStyles} from "./NewNoteStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../config/colors";
import * as React from "react";
import * as Haptics from "expo-haptics";

export enum NOTE_TYPES {
  DEFINITION = "DEFINITION",
  IMAGE = "IMAGE",
  THOUGHTS = "THOUGHTS"
}

export const NoteTypeSelector = (props: {
  setNoteType: Function
}) =>
  <View style={newNoteStyles.noteTypeSelector}>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        props.setNoteType(NOTE_TYPES.THOUGHTS)
      }}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="thought-bubble"
          size={20}
          color={colors.black} />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          THOUGHTS
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        props.setNoteType(NOTE_TYPES.DEFINITION)
      }}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="dictionary"
          size={22}
          color={colors.black}
        />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          DEFINITION
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        props.setNoteType(NOTE_TYPES.IMAGE)
      }}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="image"
          size={20}
          color={colors.black}
        />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          IMAGE
        </Text>
      </View>
    </TouchableHighlight>
  </View>
