"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./graphql/resolvers");
const typeDefs_1 = require("./graphql/typeDefs");
const cors_1 = __importDefault(require("cors"));
const SERVER_BASE_URL = "http://192.168.1.110:5000"; // aka localhost:5000
// Put together a schema
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
// Initialize the app
const app = express_1.default();
// CORS setup
app.use(cors_1.default());
// The GraphQL endpoint
app.use('/graphql', body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({ schema }));
// GraphiQL, a visual editor for queries
app.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
app.get("/", (req, res) => {
    res.send("can access server via url");
});
// Start the server
app.listen(5000, () => {
    console.log(`
    GraphQL server started at ${SERVER_BASE_URL}/graphql, 
    go to ${SERVER_BASE_URL}/graphiql to run queries!
  `);
});
//# sourceMappingURL=index.js.map