import * as React from 'react'
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  SafeAreaView,
} from "react-native"
import {statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {global} from "../../shared/GlobalStyles";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {SyncEvent} from "../../models/SyncEvent";
import {NoPlaybackPrompt} from "./NoPlaybackPrompt";
import * as Haptics from 'expo-haptics';
import {PlayerWithPlayback} from "./PlayerWithPlayback";


const SYNC_INTERVAL_MS = 20000

type CreateState = {
  loaded: boolean
  syncEvent: SyncEvent|null
  interval: NodeJS.Timeout|null
  onBlur: any
  appState: string
  tabPressListener: any
}

class MainPlayer extends React.Component<any, CreateState> {

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
        {this.state.loaded ?
          (this.state.syncEvent ?
            <PlayerWithPlayback
              syncEvent={this.state.syncEvent}
              accessToken={this.props.tokens.accessToken}
              setSyncEvent={(syncEvent => this.setState({syncEvent: syncEvent}))}
            /> :
            <NoPlaybackPrompt/>
          ) :
          <ActivityIndicator size={"small"}/>
        }
      </SafeAreaView>
    )
  }

  async getPlayback() {
    const response = await SpotifySyncPlayback.get(this.props.tokens.accessToken)

    console.log(">>>> Create.getPlayback", response)

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

export default connect(mapStateToProps)(MainPlayer)
