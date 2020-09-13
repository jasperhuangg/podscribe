import * as React from "react";
import {View} from "react-native";
import {global} from "../../shared/GlobalStyles";
import {CurrentlyPlayingSection} from "./CurrentlyPlayingSection";
import {SCREEN_WIDTH} from "../../util/Dimensions";
import {colors} from "../../config/colors";
import {PlaybackControls} from "./PlaybackControls";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import Button from "../../shared/Button";
import * as Progress from "react-native-progress";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";
import {connect} from "react-redux";
import {AUTH_STATE} from "../../util/redux/auth/types";

const Player = (props: any) =>
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
          .then(_ => props.setPlaybackState(props.syncEvent!.cloneTogglePause()))
          .catch(e => console.error(e))
      }}
      onPlay={() => {
        SpotifySyncPlayback.play(props.accessToken, props.syncEvent)
          .then(_ => props.setPlaybackState(props.syncEvent!.cloneTogglePlay()))
          .catch(e => console.log(e))
      }}
      onSkipBack={() => {
        SpotifySyncPlayback.skip30(props.accessToken, false)
          .then(() => props.setPlaybackState(props.syncEvent!.cloneSkipBackward())
          )
      }}
      onSkipAhead={() => {
        SpotifySyncPlayback.skip30(props.accessToken, true)
          .then(() => props.setPlaybackState(props.syncEvent!.cloneSkipAhead()))
      }}
    />
    <Button title={"+ MAKE A NOTE"}
            onPress={() => {
              // TODO: need to update syncEvent to current timestamp here
              if (props.syncEvent.isPlaying)
                SpotifySyncPlayback.pause(props.tokens.accessToken)
                  .then(_ => {
                    props.setPlaybackState(props.syncEvent.cloneTogglePause())
                    props.showModal()
                  })
              else
                props.showModal()
            }}
            width={"fill"}
            letterSpacing={4}
            fontSize={15}
            padding={11}
    />
  </View>

const mapStateToProps = statePropsMapperFactory([PLAYBACK_STATE, AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(Player)
