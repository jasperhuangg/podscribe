import * as React from "react"
import {ActivityIndicator, Animated, StatusBar, Text, View} from "react-native";
import {SpotifyAuthenticationHandler} from "../../util/SpotifyAuthenticationHandler";
import {connect} from "react-redux"
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE, LOGIN_USER, LOGOUT_USER} from "../../util/redux/auth/types";
import {global} from "../../shared/GlobalStyles";
import {animated, useSpring} from 'react-spring/native'

const AnimatedText = animated(Text)

function Login(props: any) {

  const fadeRiseInProps = useSpring({
    translateY: 0,
    opacity: 1,
    from: {
      translateY: 200,
      opacity: 0
    }
  })

  const fadeInRiseStyle = {
    transform: [{
      translateY: fadeRiseInProps.translateY
    }],
    opacity: fadeRiseInProps.opacity
  }

  // const fadeInAnim = React.useRef(new Animated.Value(0)).current
  // const riseAnim = React.useRef(new Animated.Value(15)).current

  React.useEffect(() => {
    // ---- Prompt Spotify login after 800ms
    setTimeout(async () => {
      await onLogin()
    }, 800)
  }, [])

  const [isLoggingIn, setIsLoggingIn] = React.useState(false)

  const onLogin = async () => {

    const _authState = await SpotifyAuthenticationHandler.signInAsync();

    if (!_authState) setIsLoggingIn(false)
    else {
      props.loginUser(_authState)
      props.navigation.replace("Main")
    }
  }

  const onLogout = async () => {
    await SpotifyAuthenticationHandler.signOutAsync(props.tokens.accessToken!);
    props.logoutUser()
  }

  return (
    <View
      style={global.container_centered}
    >
      <StatusBar hidden={true} barStyle={"dark-content"}/>
      {isLoggingIn ?
        <ActivityIndicator/> :
        <View style={global.container_inner_80}>
          <AnimatedText
            style={[
              global.text_xl,
              global.text_black, {fontWeight: "900",},
              fadeInRiseStyle
              ]}>logging in...</AnimatedText>
        </View>
      }
    </View>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([LOGIN_USER, LOGOUT_USER])

export default connect(mapStateToProps, mapDispatchToProps)(Login);
