import * as firebase from "firebase/app";
import "firebase/firestore";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export type ID = string

// ----------------------------------------------------------------------------------
// ---- Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyBQlozfIRrsTWxowdUU2_wVHROUrmn9N4I",
  authDomain: "podscribe-6b7ed.firebaseapp.com",
  databaseURL: "https://podscribe-6b7ed.firebaseio.com",
  projectId: "podscribe",
  storageBucket: "podscribe.appspot.com",
  messagingSenderId: "186863284274",
  appId: "1:186863284274:web:4c47c698abffcd5920cc2b"
};
firebase.initializeApp(firebaseConfig)

// ----------------------------------------------------------------------------------
// ---- Reference shortcuts

const firestore = firebase.firestore()

export const firestoreEpisodes = () =>
  firestore.collection("episodes")

export const firestoreEpisode = (episodeID: ID) =>
  firestoreEpisodes().doc(episodeID)

export const firestoreEpisodeNotes = (episodeID: ID) =>
  firestoreEpisode(episodeID).collection("notes")

// ----------------------------------------------------------------------------------
// ---- Utility

export const dataWithID = (snapshot: DocumentSnapshot|QueryDocumentSnapshot) =>
  snapshot.exists ?
    {
      id: snapshot.id,
      ...snapshot.data()
    }
    : null


