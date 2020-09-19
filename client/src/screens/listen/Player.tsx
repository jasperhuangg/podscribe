import * as React from "react";
import {SafeAreaView, View} from "react-native";
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
import {animated} from "react-spring";
import {useSpring} from "react-spring/native";

const Player = (props: any) => {
  const AnimatedView = animated(View)
  const fadeRiseInProps = useSpring({
    translateY: 0,
    opacity: 1,
    from: {
      translateY: 150,
      opacity: 0
    }
  })
  const fadeInRiseStyle = {
    transform: [{
      translateY: fadeRiseInProps.translateY
    }],
    opacity: fadeRiseInProps.opacity
  }

  return (
    <AnimatedView
      style={[
        global.container_inner_80,
        fadeInRiseStyle
      ]}
    >
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
              onPress={async () => {
                // if (props.syncEvent.isPlaying)
                //   SpotifySyncPlayback.pause(props.tokens.accessToken)
                //     .then(async ()  => {
                //       props.setPlaybackState(props.syncEvent.cloneTogglePause())
                //       await props.getPlayback()
                //       props.showModal()
                //     })
                // else
                await props.getPlayback()
                props.showModal()
              }}
              width={"fill"}
              letterSpacing={4}
              fontSize={15}
              padding={11}
      />
    </AnimatedView>
  )
}

const mapStateToProps = statePropsMapperFactory([PLAYBACK_STATE, AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(Player)
