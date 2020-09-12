import * as React from 'react'
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  SafeAreaView,
} from "react-native"
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {global} from "../../shared/GlobalStyles";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {SyncEvent} from "../../models/SyncEvent";
import {NoPlaybackPrompt} from "./NoPlaybackPrompt";
import Player from "./Player";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";


const SYNC_INTERVAL_MS = 20000

type ListenState = {
  loaded: boolean
  interval: NodeJS.Timeout|null
  onBlur: any
  appState: string
}

class Listen extends React.Component<any, ListenState> {

  constructor(props: any) {
    super(props)
    this.state = {
      loaded: false,
      interval: null,
      onBlur: null,
      appState: "active",
    }
  }

  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);

    this.props.navigation.addListener('focus', async () => {
      await this.getPlayback()
      const interval = setInterval(async () => await this.getPlayback(), SYNC_INTERVAL_MS)
      this.setState({interval: interval})
    })

    this.props.navigation.addListener('blur', () => {
      console.log(">>>> Listen blur event")
      clearTimeout(this.state.interval!)
    })
  }

  // shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<ListenState>): boolean {
  //   const currSync = this.state.syncEvent
  //   const nextSync = nextState.syncEvent
  //
  //   return (
  //     (!this.state.loaded && nextState.loaded) ||
  //     (!currSync && !!nextSync) ||
  //     (!!currSync && !nextSync) ||
  //     (!!currSync && !!nextSync && (
  //         currSync.id !== nextSync.id ||                // podcast changed
  //         currSync.isPlaying !== nextSync.isPlaying ||  // playback status changed
  //         currSync.progress !== nextSync.progress       // progress changed
  //     ))
  //   )
  // }

  componentWillUnmount() {
    console.log(">>>> Listen componentWillUnmount")
    clearTimeout(this.state.interval!)
    AppState.removeEventListener("change", this._handleAppStateChange)
  }

  render()
  {
    return (
      <SafeAreaView style={global.container_centered}>
        {this.state.loaded ?
          (this.props.syncEvent ?
            <Player
              accessToken={this.props.tokens.accessToken}
              navigation={this.props.navigation}
            /> :
            <NoPlaybackPrompt/>
          ) :
          <ActivityIndicator size={"small"}/>
        }
      </SafeAreaView>
    )
  }

  async getPlayback() {

    // TODO: rewrite this with then/catch,
    //       handle case where access token expires (need to refresh and reset access token)
    const response = await SpotifySyncPlayback.get(this.props.tokens.accessToken)

    console.log(">>>> Listen.getPlayback", response)

    this.setState({
      loaded: true,
    })

    this.updatePlayback(response)
  }

  updatePlayback(nextSync: SyncEvent | null) {
    const currSync = this.props.syncEvent

    if(
      (!currSync && !!nextSync) ||
      (!!currSync && !nextSync) ||
      (!!currSync && !!nextSync && (
        currSync.id !== nextSync.id ||                // podcast changed
        currSync.isPlaying !== nextSync.isPlaying ||  // playback status changed
        currSync.progress !== nextSync.progress       // progress changed
      ))
    )
      this.props.setPlaybackState(nextSync)
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

const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(Listen)
