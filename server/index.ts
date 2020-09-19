import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './graphql/resolvers';
import  { typeDefs } from './graphql/typeDefs';
import cors from "cors"

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// CORS setup
app.use(cors())

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');
});
