import {StyleSheet} from "react-native"
import {colors} from "../config/colors"

export const global = StyleSheet.create({
  // ---- Container Styles
  container_centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  container_inner_80: {
    width: "80%"
  },
  container_inner_90: {
    width: "90%"
  },

  // ---- Text Styles
  logo_text: {
    fontWeight: "900",
  },
  text_black: {
    color: colors.black
  },

  // ---- Text Sizes
  text_xl: {
    fontSize: 45,

  },
  text_lg: {
    fontSize: 35,
  },
  text_md: {
    fontSize: 20,
  },
  text_sm: {
    fontSize: 14,
  },
  text_xs: {
    fontSize: 10,
  },
})
