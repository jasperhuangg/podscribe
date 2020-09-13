import {StyleSheet} from "react-native";

export const listenStyles = StyleSheet.create({
  container_current: {
  },

  container_playback_controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  container_image: {
    backgroundColor: "rgba(30, 30, 30, 0.3)",
    borderRadius: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  episodeTitleText: {
    fontWeight: "900",
    fontStyle: "italic",
    marginBottom: 20,
  },

  showNameText: {
    fontWeight: "400",
  },
})
