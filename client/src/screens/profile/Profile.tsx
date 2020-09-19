import * as React from "react"
import {SafeAreaView, Text} from "react-native"
import {dispatchPropsMapperFactory, statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE, LOGOUT_USER} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import * as Haptics from "expo-haptics";
import Button from "../../shared/Button";
import {SpotifyAuthenticationHandler} from "../../util/SpotifyAuthenticationHandler";

const Profile = (props: any) => {
  React.useEffect(() => {
    const tabPressListener = props.navigation.addListener('tabPress', async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    });

    return () => {
      tabPressListener()
    }
  }, [])

  const onLogout = async () => {
    await SpotifyAuthenticationHandler.signOutAsync(props.tokens.accessToken!);
    props.logoutUser()
  }

  return (
    <SafeAreaView>
      <Button
        onPress={onLogout}
        title={"LOGOUT"}
        width={"fill"}
        letterSpacing={4}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])
const mapDispatchToProps = dispatchPropsMapperFactory([LOGOUT_USER])

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
