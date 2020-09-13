import * as React from 'react'
import {Button, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {newNoteStyles} from "./NewNoteStyles";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";
import {SyncEvent} from "../../models/SyncEvent";
import { Ionicons } from '@expo/vector-icons';
import {colors} from "../../config/colors";
import Modal from "react-native-modal";

export enum NOTE_TYPES {
  DEFINITION,
  IMAGE,
  TEXT
}

// TODO: Let's rewrite with react-native-modal (https://www.npmjs.com/package/react-native-modal)

const NewNote = (props: any) => {
  const [noteType, setNoteType] = React.useState<string|null>(null)
  const [currentPlayback, setCurrentPlayback] = React.useState<SyncEvent|null>(null)

  // TODO: playing doesn't work after a certain amount of time
  // React.useEffect(() => {
  //   SpotifySyncPlayback.pause(props.tokens.accessToken)
  //     .then(_ => props.setPlaybackState(props.syncEvent.cloneTogglePause()))
  //
  //   return () => {
  //     console.log(">>>> NewNote unmounting", props.syncEvent)
  //     SpotifySyncPlayback.play(props.tokens.accessToken, props.syncEvent)
  //       .then(_ => props.setPlaybackState(props.syncEvent.cloneTogglePlay()))
  //   }
  // }, [])

  return (
    <Modal
      isVisible={props.showing}
      useNativeDriver={true}
    >
      <NoteTypeSelector />
    </Modal>
  )
}

export const NoteTypeSelector = (props: {}) =>
  <View style={newNoteStyles.noteTypeSelector}>
    <View>
      <Text>Note</Text>
    </View>
    <View>
      <Text>Definition</Text>
    </View>
    <View>
      <Text>Image</Text>
    </View>
  </View>

export const NoteEditor = (props: {type: string}) =>
  <View>

  </View>


const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
