import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export const newNoteStyles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  noteTypeSelector: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden"
  },
  selectorTabContainer: {
    padding: 20,
    height: 70,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  selectorTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  selectorTabText: {
    color: colors.black,
    letterSpacing: 2,
    fontWeight: "800",
    fontSize: 18,
    marginLeft: 16,
    paddingBottom: 1,
  },
  modalBar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  noteEditor: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 40,
    borderRadius: 18,
  },
  noteEditorTextArea: {
    width: "100%",
    padding: 20,
  },
  noteEditorHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
    paddingTop: 10,
    paddingLeft: 20,
  },
  newNoteTimestamp: {
    marginRight: 20,
    fontWeight: "900",
    letterSpacing: 3,
  }
})
