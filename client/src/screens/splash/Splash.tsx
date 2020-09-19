import * as React from "react"
import {View, Text, StatusBar} from "react-native";
import {connect} from "react-redux";
import {global} from "../../shared/GlobalStyles";
import {
  dispatchPropsMapperFactory,
  statePropsMapperFactory
} from "../../util/redux";
import {AUTH_STATE, LOGIN_USER, LOGOUT_USER} from "../../util/redux/auth/types";
import {SpotifyAuthenticationHandler} from "../../util/SpotifyAuthenticationHandler";
import {TokenResponse} from "expo-app-auth/build/AppAuth.types";

function Splash(props: any) {

  React.useEffect(() => {
    // ---- Try to use the refresh token in AsyncStorage
    SpotifyAuthenticationHandler.getCachedAuthAsync()
      .then((authState: TokenResponse|null) => {
        console.log(authState)
        if (!authState) {
          // ---- Navigate to Login after 1500ms
          setTimeout(() => {
            props.navigation.replace("Login")
          }, 1500 )
        }
        else {
          const refreshToken = authState.refreshToken
          // ---- TODO: handle if refresh token fails
          if (refreshToken) {
            SpotifyAuthenticationHandler.refreshAuthAsync(refreshToken)
              .then((_authState) => {
                props.loginUser(_authState)
                props.navigation.replace("Main")
              })
          }
        }
      })


  }, [])

  return (
      <View style={global.container_centered}>
        <View style={global.container_inner_80}>
          <StatusBar hidden/>
          <Text style={[global.logo_text, global.text_black, global.text_xl]}>podscribe.</Text>
        </View>
      </View>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([LOGIN_USER, LOGOUT_USER])

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

