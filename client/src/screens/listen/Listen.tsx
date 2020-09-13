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
import NewNote from "./NewNote"


const SYNC_INTERVAL_MS = 20000

const Listen = (props: any) => {

  const [loaded, setLoaded] = React.useState(false)
  const [syncInterval, setSyncInterval] = React.useState<any>(null)
  const [onBlur, setOnBlur] = React.useState(null)
  const [appState, setAppState] = React.useState("active")
  const [modalShowing, setModalShowing] = React.useState(false)


  React.useEffect(() => {

    const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log("AppState changed", appState, nextAppState)
      if (
        nextAppState === "active"
      ) {
        await getPlayback()
      }

      setAppState(nextAppState)
    }

    AppState.addEventListener("change", _handleAppStateChange);

    props.navigation.addListener('focus', async () => {
      console.log(">>>> Listen focus event")
      await getPlayback()
      const syncInterval = setInterval(async () => await getPlayback(), SYNC_INTERVAL_MS)
      setSyncInterval(syncInterval)
    })

    props.navigation.addListener('blur', () => {
      console.log(">>>> Listen blur event")
      clearTimeout(syncInterval!)
    })

    return () => {
      console.log(">>>> Listen unmounting")
      clearTimeout(syncInterval!)
      AppState.removeEventListener("change", _handleAppStateChange)
    }
  }, [])



  return (
    <SafeAreaView style={global.container_centered}>
      <NewNote
        hide={() => setModalShowing(false)}
        showing={modalShowing}
      />
      {loaded ?
        (props.syncEvent && props.syncEvent.deviceId ?
          <Player
            accessToken={props.tokens.accessToken}
            navigation={props.navigation}
            showModal={() => setModalShowing(true)}
          /> :
          <NoPlaybackPrompt/>
        ) :
        <ActivityIndicator size={"small"}/>
      }
    </SafeAreaView>
  )

  async function getPlayback() {
    // TODO: rewrite this with then/catch,
    //       handle case where access token expires (need to refresh and reset access token)
    const response = await SpotifySyncPlayback.get(props.tokens.accessToken)

    console.log(">>>> Listen.getPlayback", response)

    setLoaded(true)

    updatePlayback(response)
  }

  function updatePlayback(nextSync: SyncEvent | null) {
    const currSync = props.syncEvent

    if(
      (!currSync && !!nextSync && nextSync.deviceId) ||
      (!!currSync && !nextSync) ||
      (!!currSync && !!nextSync && nextSync.deviceId && (
        currSync.id !== nextSync.id ||                // podcast changed
        currSync.isPlaying !== nextSync.isPlaying ||  // playback status changed
        currSync.progress !== nextSync.progress       // progress changed
      ))
    )
      props.setPlaybackState(nextSync)
  }
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(Listen)
