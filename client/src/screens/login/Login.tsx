import * as React from "react"
import {ActivityIndicator, SafeAreaView, StatusBar, Text, View} from "react-native";
import {SpotifyAuthenticationHandler} from "../../util/SpotifyAuthenticationHandler";
import {connect} from "react-redux"
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE, LOGIN_USER, LOGOUT_USER} from "../../util/redux/auth/types";
import {global} from "../../shared/GlobalStyles";
import Button from "../../shared/Button"
import {useEffect} from "react";

function Login(props: any) {

  useEffect(() => {
    setTimeout(async () => {
      await onLogin()
    }, 800)
  }, [])

  const [isLoggingIn, setIsLoggingIn] = React.useState(false)

  const onLogin = async () => {
    setIsLoggingIn(true)

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
    <View style={global.container_centered}>
      <StatusBar hidden={true} barStyle={"dark-content"}/>
      {isLoggingIn ?
        <ActivityIndicator/> :
        <View style={global.container_inner_80}>
          <Text style={[global.text_xl, global.text_black, {fontWeight: "900"}]}>login...</Text>
          {/*<View style={{padding: 30}}/>*/}
          {/*<Button*/}
          {/*  title="TO SPOTIFY"*/}
          {/*  letterSpacing={3}*/}
          {/*  onPress={onLogin}*/}
          {/*  width={"fill"}*/}
          {/*/>*/}
        </View>
      }
    </View>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([LOGIN_USER, LOGOUT_USER])

export default connect(mapStateToProps, mapDispatchToProps)(Login);
