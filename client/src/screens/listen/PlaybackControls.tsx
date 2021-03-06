import {TouchableOpacity, View} from "react-native";
import {listenStyles} from "./ListenStyles";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/Dimensions";
import {FontAwesome, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../config/colors";
import * as React from "react";

export const PlaybackControls = (props: {
  accessToken: string,
  isPlaying: boolean
  onPause: () => void
  onPlay: () => void
  onSkipAhead: () => void,
  onSkipBack: () => void
}) =>
  <View style={[listenStyles.container_playback_controls, {
    paddingTop: SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.04,
  }]}>
    <TouchableOpacity
      onPress={props.onSkipBack}
    >
      <MaterialCommunityIcons
        name="rewind-30"
        size={Math.round(SCREEN_WIDTH * 0.05)}
        color={colors.black}
      />
    </TouchableOpacity>
    {props.isPlaying ?
      <TouchableOpacity
        onPress={props.onPause}
      >
        <FontAwesome5
          name="pause"
          size={Math.round(SCREEN_WIDTH * 0.07)}
          color={colors.black}
        />
      </TouchableOpacity> :
      <TouchableOpacity
        onPress={props.onPlay}
      >
        <FontAwesome
          name="play"
          size={Math.round(SCREEN_WIDTH * 0.07)}
          color={colors.black}
        />
      </TouchableOpacity>}
    <TouchableOpacity
      onPress={props.onSkipAhead}
    >
      <MaterialCommunityIcons
        name="fast-forward-30"
        size={Math.round(SCREEN_WIDTH * 0.05)}
        color={colors.black}
      />
    </TouchableOpacity>
  </View>
