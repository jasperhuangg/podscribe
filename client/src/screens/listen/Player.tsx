import * as React from 'react'
import {
  ActivityIndicator, AppState, AppStateStatus,
  SafeAreaView,
  View,
} from "react-native"
import {statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {global} from "../../shared/GlobalStyles";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import Button from "../../shared/Button";
import {SyncEvent} from "../../models/SyncEvent";
import {CurrentlyPlayingSection} from "./CurrentlyPlayingSection";
import {PlaybackControls} from "./PlaybackControls";
import {NoPlaybackPrompt} from "./NoPlaybackPrompt";
import * as Progress from 'react-native-progress'
import {SCREEN_WIDTH} from "../../util/Dimensions";
import {colors} from "../../config/colors";
import * as Haptics from 'expo-haptics';



const SYNC_INTERVAL_MS = 20000

type CreateState = {
  loaded: boolean
  syncEvent: SyncEvent|null
  interval: NodeJS.Timeout|null
  onBlur: any
  appState: string
  tabPressListener: any
}


class Player extends React.Component<any, CreateState> {

  constructor(props: any) {
    super(props)
    this.state = {
      loaded: false,
      syncEvent: null,
      interval: null,
      onBlur: null,
      appState: "active",
      tabPressListener: null
    }
  }

  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);

    const tabPressListener = this.props.navigation.addListener('tabPress', async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    });

    this.setState({tabPressListener: tabPressListener})

    this.props.navigation.addListener('focus', async () => {
      await this.getPlayback()
      const interval = setInterval(async () => await this.getPlayback(), SYNC_INTERVAL_MS)
      this.setState({interval: interval})
    })

    this.props.navigation.addListener('blur', () => {
      console.log(">>>> Create blur event")
      clearTimeout(this.state.interval!)
    })
  }

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<CreateState>): boolean {
    const currSync = this.state.syncEvent
    const nextSync = nextState.syncEvent

    return (
      (!this.state.loaded && nextState.loaded) ||
      (!currSync && !!nextSync) ||
      (!!currSync && !nextSync) ||
      (!!currSync && !!nextSync && (
          currSync.id !== nextSync.id ||                // podcast changed
          currSync.isPlaying !== nextSync.isPlaying ||  // playback status changed
          currSync.progress !== nextSync.progress       // progress changed
      ))
    )
  }

  componentWillUnmount() {
    console.log(">>>> Create componentWillUnmount")
    clearTimeout(this.state.interval!)
    AppState.removeEventListener("change", this._handleAppStateChange)
    this.state.tabPressListener()
  }

  render()
  {
    return (
      <SafeAreaView style={global.container_centered}>
        {this.state.loaded &&
        <View style={global.container_inner_80}>
          {this.state.syncEvent ?
            <>
              <CurrentlyPlayingSection
                syncEvent={this.state.syncEvent}
              />
              <Progress.Bar
                progress={this.state.syncEvent.progress / this.state.syncEvent.length}
                width={SCREEN_WIDTH * 0.8}
                color={colors.black}
              />
              <PlaybackControls
                accessToken={this.props.tokens.accessToken}
                isPlaying={this.state.syncEvent.isPlaying}
                onPause={() => {
                  SpotifySyncPlayback.pause(this.props.tokens.accessToken)
                  this.setState({syncEvent: this.state.syncEvent!.cloneTogglePlayback()})
                }}
                onPlay={() => {
                  SpotifySyncPlayback.play(this.props.tokens.accessToken)
                  this.setState({syncEvent: this.state.syncEvent!.cloneTogglePlayback()})
                }}
                onSkipBack={() => {
                  SpotifySyncPlayback.skip30(this.props.tokens.accessToken, false)
                  this.setState({syncEvent: this.state.syncEvent!.cloneSkipBackward()})
                }}
                onSkipAhead={() => {
                  SpotifySyncPlayback.skip30(this.props.tokens.accessToken, true)
                  this.setState({syncEvent: this.state.syncEvent!.cloneSkipAhead()})
                }}
              />
              <Button title={"+ MAKE A NOTE"}
                      onPress={() => alert("+ MAKE A NOTE")}
                      width={"fill"}
                      letterSpacing={4}
                      fontSize={15}
                      padding={11}
              />
            </> :
            <NoPlaybackPrompt />
          }
        </View>
        }
        {
          !this.state.loaded &&
          <ActivityIndicator size={"small"}/>
        }
      </SafeAreaView>
    )
  }

  async getPlayback() {
    const response = await SpotifySyncPlayback.get(this.props.tokens.accessToken)

    this.setState({
      loaded: true,
      syncEvent: response
    })
  }

   _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    )
      await this.getPlayback()

    this.setState({appState: nextAppState})
  };
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])

export default connect(mapStateToProps)(Player)
