import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject
} from '@apollo/client';
import {GRAPHQL_BASE_URL} from "../config/constants";
import {Note} from "../models/Note";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: GRAPHQL_BASE_URL,
  cache: new InMemoryCache()
});

export function createNewNote(
  note: Note,
  content: string,
  timestamp_ms: number,
) {

}

