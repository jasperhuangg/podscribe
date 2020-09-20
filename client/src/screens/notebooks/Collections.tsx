import * as React from 'react'
import {SafeAreaView, View, Text, ActivityIndicator} from "react-native"
import {statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import * as Haptics from "expo-haptics";
import {EPISODES_QUERY } from "../../util/GraphQL";
import {useLazyQuery} from "@apollo/client";
import {global} from "../../shared/GlobalStyles";
import {Episode} from "../../models/Episode";

const Collections = (props: any) => {

  const [episodes, setEpisodes] = React.useState<Episode[]>([])
  const [getEpisodes, { loading, error, data }] = useLazyQuery(
    EPISODES_QUERY(props.uid),
  )
  console.log(error)

  console.log(">>>>", data)

  React.useEffect(() => {
    onFocus()

    const tabPressListener = props.navigation.addListener('tabPress', async () => {
      console.log(">>>> Collections focus event")
      await asyncOnFocus()
    });

    props.navigation.addListener('blur', () => {
      console.log(">>>> Collections blur event")
    })

    return () => {
      tabPressListener()
    }
  }, [props.navigation])

  function onFocus() {
    getEpisodes()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  async function asyncOnFocus() {
    await getEpisodes()
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }


  return (
    loading || !data ?
      <View style={global.container_centered}>
        <ActivityIndicator size={"small"} />
      </View> :
      <SafeAreaView>
        <Text>{`episodes: ${JSON.stringify(data?.episodes)}`}</Text>
      </SafeAreaView>

  )
}

const mapStateToProps = statePropsMapperFactory([AUTH_STATE])

export default connect(mapStateToProps)(Collections)
