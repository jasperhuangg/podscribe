import {StyleSheet} from "react-native";

export const newNoteStyles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  noteTypeSelector: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  selectorTab: {
    height: 60,
  },
  modalBar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  }
})
