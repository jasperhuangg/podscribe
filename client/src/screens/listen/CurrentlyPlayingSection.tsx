import {SyncEvent} from "../../models/SyncEvent";
import {Image, Text, View} from "react-native";
import {playerStyles} from "./PlayerStyles";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/Dimensions";
import {global} from "../../shared/GlobalStyles";
import * as React from "react";

export function CurrentlyPlayingSection(props: {syncEvent: SyncEvent}) {
  return (
    <View style={[playerStyles.container_current, {marginBottom: SCREEN_HEIGHT * 0.02}]}>
      <View style={[
        playerStyles.container_image,
        {marginBottom: SCREEN_HEIGHT * 0.04}
        ]}>
        <Image
          source={{
            uri: props.syncEvent.imageUrl
          }}
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.8,
            borderRadius: 10,
          }}
        />
      </View>
      <Text
        style={[
          global.text_black,
          playerStyles.episodeTitleText,
          {fontSize: Math.round(SCREEN_WIDTH * 0.05)}
        ]}
        numberOfLines={2}
      >
        {props.syncEvent.title}
      </Text>
      <Text
        style={[
          global.text_black,
          playerStyles.showNameText,
          {fontSize: Math.round(SCREEN_WIDTH * 0.05) - 5}
        ]}>
        {props.syncEvent.show}
      </Text>
    </View>
  )
}
