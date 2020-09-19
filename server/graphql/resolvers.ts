import {
  firestoreEpisodes,
  firestoreEpisode,
  firestoreEpisodeNotes,
  dataWithID,
} from "../firebase/config"

export const resolvers = {
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

