import {
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client';
import {GRAPHQL_SERVER_BASE_URL} from "../config/constants";

export const client = new ApolloClient({
  uri: GRAPHQL_SERVER_BASE_URL,
  cache: new InMemoryCache()
});

// export const EPISODES_QUERY = gql`
//   query GetUserEpisodes($owner_id: String!) {
//     episodes(owner_id: $owner_id) {
//       show
//       notes {
//         timestamp
//       }
//     }
//   }
// `

export const EPISODES_QUERY = (owner_id: string) => gql`
{
  episodes(owner_id: "${owner_id}") {
    show
    id
    notes {
      timestamp
    }
  }
}
`
