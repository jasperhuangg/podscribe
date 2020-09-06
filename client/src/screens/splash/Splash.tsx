import * as React from "react"
import {View, Text, StatusBar} from "react-native";
import {connect} from "react-redux";
import {global} from "../../shared/GlobalStyles";
import {
  dispatchPropsMapperFactory,
  statePropsMapperFactory
} from "../../util/redux";
import {AUTH_STATE, LOGIN_USER, LOGOUT_USER} from "../../util/redux/auth/types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../../config/colors";


function Splash(props: any) {

  // ---- Navigate to Login after 1500ms
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.replace("Login")
    }, 1500 )
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

