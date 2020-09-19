export const typeDefs = `
  type Query { 
    episodes(owner_id: ID!, collection: String): [Episode]
  }
  type Episode { 
    id: ID!,
    show: String!,
    imageUrl: String,
    title: String!, 
    createdAt: Int!,
    notes: [Note]
  }
  type Note {
    id: ID!,
    type: String!,
    timestamp: Int!,
  }
`;

module.exports = {
  typeDefs: typeDefs
}
