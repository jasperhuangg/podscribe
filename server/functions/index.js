const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const {ApolloServer, gql} = require("apollo-server-express")

const serviceAccount = require('./podscribe-firebase-adminsdk-ri473-ba8a2c2bec.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://podscribe-6b7ed.firebaseio.com/'
})

const typeDefs = gql`
    type Hotdog {
        isKosher: Boolean
        location: String
        name: String
        style: String
        website: String
    }
    type Query {
        hotdogs: [Hotdog]
    }
`;

const resolvers = {
  Query: {
    hotdogs: () =>
      admin
        .database()
        .ref("hotdogs")
        .once("value")
        .then(snap => snap.val())
        .then(val => Object.keys(val).map(key => val[key]))
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);
