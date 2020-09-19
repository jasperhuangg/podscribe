import {StyleSheet} from "react-native";
import {colors} from "../config/colors";

export const buttonStyles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "800",
    letterSpacing: 2
  },
  button: {
    backgroundColor: colors.black,
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 11,
    paddingBottom: 11,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  }
})
