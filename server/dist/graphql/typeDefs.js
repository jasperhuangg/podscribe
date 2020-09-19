"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
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
    typeDefs: exports.typeDefs
};
//# sourceMappingURL=typeDefs.js.map