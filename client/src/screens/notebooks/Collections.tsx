import * as React from 'react'
import {SafeAreaView, View, Text} from "react-native"
import {statePropsMapperFactory} from "../../util/redux";
import {AUTH_STATE} from "../../util/redux/auth/types";
import {connect} from "react-redux";
import * as Haptics from "expo-haptics";
import { client, EPISODES_QUERY } from "../../util/GraphQL";
import {Episode} from "../../models/Episode";
import {gql} from "@apollo/client";

function Collections(props: any) {

  const [episodes, setEpisodes] = React.useState<Episode[]>([])

  React.useEffect(() => {
    const tabPressListener = props.navigation.addListener('tabPress', async () => {

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      const episodesResult = await client
        .query({
          query: gql`${EPISODES_QUERY(props.uid)}`,
        })

      setEpisodes(episodesResult.data)
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
