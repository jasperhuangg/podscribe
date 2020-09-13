import * as React from 'react'
import {TouchableOpacity} from "react-native";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {NOTE_TYPES, NoteTypeSelector} from "./NoteTypeSelector";
import {ThoughtsNoteEditor} from "./ThoughtsNoteEditor";


const NewNote = (props: any) => {
  const [noteType, setNoteType] = React.useState<string|null>(null)

  function hideModal() {
    props.hide()
    // SpotifySyncPlayback.play(props.tokens.accessToken, props.syncEvent)
    //   .then(_ => props.setPlaybackState(props.syncEvent.cloneTogglePlay()))

    setTimeout(() => setNoteType(null), 300)
  }

  console.log(props.syncEvent)

  return (
    <Modal
      isVisible={props.showing}
      useNativeDriver={true}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
    >
      {noteType ?
        (
          noteType === NOTE_TYPES.THOUGHTS &&
            <ThoughtsNoteEditor
              type={noteType}
              syncEvent={props.syncEvent}
            />
        ):
        <NoteTypeSelector
          setNoteType={setNoteType}
        />
      }
      {!noteType &&
        <TouchableOpacity
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={hideModal}
        >
          <MaterialCommunityIcons name="chevron-down" size={40} color={'white'} />
        </TouchableOpacity>
      }
    </Modal>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
