"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const queries = `
  type Query { 
    episode(episode_id: ID!): Episode
    episodes(owner_id: ID!): [Episode]
  }
`;
const mutations = `
  type Mutation {
    create_episode(episode: create_episode_input): Episode,
    add_note(note: add_note_input): Note
    
  }
  
  input add_note_input {
    episode_id: ID!,
    type: String!,
    timestamp: Int!,
  }
  
  input create_episode_input {
    owner_id: ID!,
    show: String!,
    image_url: String,
    title: String!,
    created_at: Int!,
  }
`;
const objects = `
  type Episode { 
    id: ID!,
    owner_id: ID!,
    show: String!,
    image_url: String,
    title: String!, 
    created_at: Int!,
    notes: [Note]
  }
  
  type Note {
    id: ID!,
    type: String!,
    timestamp: Int!,
  }
`;
exports.typeDefs = `
  ${queries}
  ${mutations}
  ${objects}
`;
//# sourceMappingURL=typeDefs.js.map