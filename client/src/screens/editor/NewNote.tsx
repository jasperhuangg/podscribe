import * as React from 'react'
import {SafeAreaView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import {SpotifySyncPlayback} from "../../util/SpotifySyncPlayback";
import {newNoteStyles} from "./NewNoteStyles";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "../../util/redux/playback/types";
import Modal from "react-native-modal";
import {global} from "../../shared/GlobalStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../../config/colors";


export enum NOTE_TYPES {
  DEFINITION = "DEFINITION",
  IMAGE = "IMAGE",
  TEXT = "TEXT"
}

const NewNote = (props: any) => {
  const [noteType, setNoteType] = React.useState<string|null>(null)

  React.useEffect(() => {
    return () => {
      console.log(">>>> NewNote unmounting", props.syncEvent)
      SpotifySyncPlayback.play(props.tokens.accessToken, props.syncEvent)
        .then(_ => props.setPlaybackState(props.syncEvent.cloneTogglePlay()))
    }
  }, [])

  function hideModal() {
    props.hide()
    SpotifySyncPlayback.play(props.tokens.accessToken, props.syncEvent)
      .then(_ => props.setPlaybackState(props.syncEvent.cloneTogglePlay()))

    setTimeout(() => setNoteType(null), 300)
  }

  return (
    <Modal
      isVisible={props.showing}
      useNativeDriver={true}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
    >
      {noteType ?
        <NoteEditor type={noteType}/> :
        <NoteTypeSelector
          setNoteType={setNoteType}
        />
      }
      {!noteType &&
        <TouchableOpacity
          style={{
            width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
          }}
          onPress={hideModal}
        >
          <MaterialCommunityIcons name="chevron-down" size={40} color={'white'} />
        </TouchableOpacity>
      }
    </Modal>
  )
}

export const NoteTypeSelector = (props: {
  setNoteType: Function
}) =>
  <View style={newNoteStyles.noteTypeSelector}>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={() => props.setNoteType(NOTE_TYPES.TEXT)}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="thought-bubble"
          size={20}
          color={colors.black} />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          THOUGHTS
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={() => props.setNoteType(NOTE_TYPES.DEFINITION)}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="dictionary"
          size={20}
          color={colors.black}
        />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          DEFINITION
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={newNoteStyles.selectorTabContainer}
      onPress={() => props.setNoteType(NOTE_TYPES.IMAGE)}
      underlayColor={"rgba(0, 0, 0, 0.5)"}
    >
      <View style={newNoteStyles.selectorTab}>
        <MaterialCommunityIcons
          name="image"
          size={20}
          color={colors.black}
        />
        <Text
          style={newNoteStyles.selectorTabText}
        >
          IMAGE
        </Text>
      </View>
    </TouchableHighlight>
  </View>

export const NoteEditor = (props: {type: string}) =>
  <SafeAreaView
    style={[
      global.container_centered,
      newNoteStyles.noteEditor
    ]}
  >
    <StatusBar hidden={true} />
    <TextInput
      autoFocus={true}
      style={{
        width: "100%"
      }}
    />

  </SafeAreaView>


const mapStateToProps = statePropsMapperFactory([AUTH_STATE, PLAYBACK_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([SET_PLAYBACK_STATE])

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
