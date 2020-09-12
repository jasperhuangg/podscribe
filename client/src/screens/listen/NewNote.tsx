import * as React from 'react'
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {newNoteStyles} from "./NewNoteStyles";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";
import {SyncEvent} from "../../models/SyncEvent";
import { Ionicons } from '@expo/vector-icons';
import {colors} from "../../config/colors";

export enum NOTE_TYPES {
  DEFINITION,
  IMAGE,
  TEXT
}

// TODO: Let's rewrite with react-native-modal

const NewNote = (props: any) => {
  const [noteType, setNoteType] = React.useState<string|null>(null)
  const [currentPlayback, setCurrentPlayback] = React.useState<SyncEvent|null>(null)

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
    <SafeAreaView
      style={newNoteStyles.container}
    >
      <TouchableOpacity
        style={newNoteStyles.modalBar}
        onPress={() => props.navigation.navigate("Listen")}
      >
        <Ionicons name="ios-arrow-down" size={30} color={colors.black} />
      </TouchableOpacity>
    {!noteType ?
      <NoteTypeModal/> :
      <NoteEditor type={noteType!}/>
    }
    </SafeAreaView>
  )
}

export const NoteTypeModal = (props: {}) =>
  <View style={newNoteStyles.noteTypeModal}>
    <Text>
      Modal
    </Text>
  </View>

export const NoteEditor = (props: {type: string}) =>
  <View>

  </View>


const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
