import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject
} from '@apollo/client';
import {GRAPHQL_SERVER_BASE_URL} from "../config/constants";
import {Note} from "../models/Note";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: GRAPHQL_SERVER_BASE_URL,
  cache: new InMemoryCache()
});

export const EPISODES_QUERY = (ownerID: string) => `
  {
    episodes(owner_id: ${ownerID}) {
      show
      notes {
        timestamp
      }
    }
  }
`

