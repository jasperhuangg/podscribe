import * as React from 'react'
import {SafeAreaView, Text, View} from "react-native";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {newNoteStyles} from "./NewNoteStyles";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";

export enum NOTE_TYPES {
  DEFINITION,
  IMAGE,
  TEXT
}

const NewNote = (props: any) => {
  const [noteType, setNoteType] = React.useState(null)

  React.useEffect(() => {
    SpotifySyncPlayback.pause(props.tokens.accessToken)

    return () => {
      SpotifySyncPlayback.play(props.tokens.accessToken)
      props.setPlaybackState(props.syncEvent.cloneTogglePlayback())
    }
  }, [])

  return (
    <SafeAreaView>
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

export const NoteEditor = (props: {type: NOTE_TYPES}) =>
  <View>

  </View>


const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
