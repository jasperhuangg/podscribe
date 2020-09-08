import * as React from "react";
import {SyncEvent} from "../../models/SyncEvent";
import {View} from "react-native";
import {global} from "../../shared/GlobalStyles";
import {CurrentlyPlayingSection} from "./CurrentlyPlayingSection";
import {SCREEN_WIDTH} from "../../util/Dimensions";
import {colors} from "../../config/colors";
import {PlaybackControls} from "./PlaybackControls";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import Button from "../../shared/Button";
import * as Progress from "react-native-progress";

export const PlayerWithPlayback = (props: {
  syncEvent: SyncEvent
  accessToken: string
  setSyncEvent: (syncEvent: SyncEvent) => void
}) =>
  <View style={global.container_inner_80}>
    <CurrentlyPlayingSection
      syncEvent={props.syncEvent}
    />
    <Progress.Bar
      progress={props.syncEvent.progress / props.syncEvent.length}
      width={SCREEN_WIDTH * 0.8}
      color={colors.black}
    />
    <PlaybackControls
      accessToken={props.accessToken}
      isPlaying={props.syncEvent.isPlaying}
      onPause={() => {
        SpotifySyncPlayback.pause(props.accessToken)
        props.setSyncEvent(props.syncEvent!.cloneTogglePlayback())
      }}
      onPlay={() => {
        SpotifySyncPlayback.play(props.accessToken)
        props.setSyncEvent(props.syncEvent!.cloneTogglePlayback())
      }}
      onSkipBack={() => {
        SpotifySyncPlayback.skip30(props.accessToken, false)
        props.setSyncEvent(props.syncEvent!.cloneSkipBackward())
      }}
      onSkipAhead={() => {
        SpotifySyncPlayback.skip30(props.accessToken, true)
        props.setSyncEvent(props.syncEvent!.cloneSkipAhead())
      }}
    />
    <Button title={"+ MAKE A NOTE"}
            onPress={() => alert("+ MAKE A NOTE")}
            width={"fill"}
            letterSpacing={4}
            fontSize={15}
            padding={11}
    />
  </View>
