import {StyleSheet} from "react-native";
import {global} from "../../shared/GlobalStyles";
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
    padding: 20,
    borderRadius: 10,
    height: "100%",
    width: "100%",
  }
})
