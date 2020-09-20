import {
  firestoreEpisodes,
  firestoreEpisode,
  firestoreEpisodeNotes,
  dataWithID,
} from "../firebase/config"

export const resolvers = {

  // ---------------------------------------------------------------------------------------
  // ---- Queries

  Query: {
    episode: async (parent: any, args: any) => {
      const episodeSnapshot = await firestoreEpisode(args.episode_id)
        .get()
      return dataWithID(episodeSnapshot)
    },

    episodes: async (parent: any, args: any) => {
      const episodesSnapshots = await firestoreEpisodes()
        .where("owner_id", "==", args.owner_id)
        .get()
      return episodesSnapshots.docs
        .map(snapshot =>
          dataWithID(snapshot)
        )
    }
  },


  // ---------------------------------------------------------------------------------------
  // ---- Mutations

  Mutation: {
    create_episode: async (parent: any, args: any) => {
      const episode = args.episode

      const newEpisodeRef = firestoreEpisodes()
        .doc()
      await newEpisodeRef
        .set(episode)
      const newEpisodeSnapshot = await newEpisodeRef
        .get()
      return dataWithID(newEpisodeSnapshot)
    }
  },
  add_note: async (parent: any, args: any) => {
    const note = args.note
    const episode_id = note.episode_id

    const newNoteRef = firestoreEpisodeNotes(episode_id)
      .doc()
    await newNoteRef
      .set({
        type: note.type,
        timestamp: note.timestamp
        // other fields (figure out extending GraphQL types)
      })
    const newNoteSnapshot = await newNoteRef
      .get()
    return dataWithID(newNoteSnapshot)

  },


  // ---------------------------------------------------------------------------------------
  // ---- Object types

  Episode: {
    notes: async (parent: any) => {
      const notesSnapshots = await firestoreEpisodeNotes(parent.id)
        .get()
      return notesSnapshots.docs
        .map(snapshot =>
          dataWithID(snapshot)
        )
    }
  }
}

