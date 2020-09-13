import {Text, View} from "react-native";
import {SCREEN_HEIGHT} from "../../../util/Dimensions";
import {global} from "../../../shared/GlobalStyles";
import Button from "../../../shared/Button";
import * as Linking from "expo-linking";
import * as React from "react";

export const NoPlaybackPrompt= () =>
  <View style={{
    height: SCREEN_HEIGHT,
    display: "flex",

    justifyContent: "center",
  }}>
    <Text
      style={[
        global.text_lg,
        global.text_black,
        {
          fontWeight: "900",
          marginBottom: 40,
        }
      ]}
    >
      no playback detected.
    </Text>
    <Button title={"OPEN SPOTIFY"}
            onPress={() => Linking.openURL('spotify://app')}
            width={"fill"}
            letterSpacing={4}
    />
  </View>
