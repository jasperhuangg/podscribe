import {
  firestoreEpisodes,
  firestoreEpisodeNotes,
  dataWithID
} from "../firebase/config"

export const resolvers = {
  Query: {
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

