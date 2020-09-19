import {SafeAreaView, Text, View} from "react-native";
import {global} from "../../../shared/GlobalStyles";
import {SCREEN_HEIGHT} from "../../../util/Dimensions";
import * as React from "react";


export const NoInternetPrompt = () =>
  <SafeAreaView style={global.container_centered}>
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
        you need an internet connection to use podscribe.
      </Text>
    </View>
  </SafeAreaView>
