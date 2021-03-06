import {Text, View} from "react-native";
import {SCREEN_HEIGHT} from "../../../util/Dimensions";
import {global} from "../../../shared/GlobalStyles";
import Button from "../../../shared/Button";
import * as Linking from "expo-linking";
import * as React from "react";
import {animated} from "react-spring";
import {useSpring} from "react-spring/native";


export const NoPlaybackPrompt = (props: any) => {
  const AnimatedView = animated(View)
  const fadeRiseInProps = useSpring({
    translateY: 0,
    opacity: 1,
    from: {
      translateY: 150,
      opacity: 0
    }
  })
  const fadeInRiseStyle = {
    transform: [{
      translateY: fadeRiseInProps.translateY
    }],
    opacity: fadeRiseInProps.opacity
  }

  return (
    <AnimatedView style={[
      fadeInRiseStyle,
      {
        height: SCREEN_HEIGHT,
        display: "flex",
        justifyContent: "center",

      }
    ]}>
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
      <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button title={"REFRESH"}
                onPress={() => props.getPlayback()}
                width={"fill"}
                letterSpacing={4}
        />
        <View style={{padding: 20}}/>
        <Button title={"OPEN SPOTIFY"}
                onPress={() => Linking.openURL('spotify://app')}
                width={"fill"}
                letterSpacing={4}
        />
      </View>



    </AnimatedView>
  )
}
