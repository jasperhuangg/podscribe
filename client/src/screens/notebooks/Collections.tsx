import * as React from 'react'
import {SafeAreaView, View, Text} from "react-native"
import {statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import * as Haptics from "expo-haptics";

function Collections(props: any) {

  // ---- Query Firebase for this user's notebooks
  React.useEffect(() => {
    const tabPressListener = props.navigation.addListener('tabPress', async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    });

    return () => {
      tabPressListener()
    }
  }, [props.navigation])

  return (
    <SafeAreaView>
      <Text>{"COLLECTIONS"}</Text>
    </SafeAreaView>
  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])

export default connect(mapStateToProps)(Collections)
