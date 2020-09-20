import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './graphql/resolvers';
import  { typeDefs } from './graphql/typeDefs';
import cors from "cors"

const SERVER_BASE_URL = "http://192.168.1.110:5000" // aka localhost:5000

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
app.use('/graphql', bodyParser.json(),
  // ((req, res) => console.log(req.body.query)),
  graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get("/", (req, res) => {
  res.send("can access server via url")
})

// Start the server
app.listen(5000, () => {
  console.log(`
    GraphQL server started at ${SERVER_BASE_URL}/graphql, 
    go to ${SERVER_BASE_URL}/graphiql to run queries!
  `);
});
