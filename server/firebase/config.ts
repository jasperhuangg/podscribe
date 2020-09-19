import * as firebase from "firebase/app";
import "firebase/firestore";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

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
// ---- Utility

export type ID = string

export function dataWithID(snapshot: DocumentSnapshot|QueryDocumentSnapshot) {
  return {
    ...snapshot.data(),
    id: snapshot.id
  }
}

// ----------------------------------------------------------------------------------
// ---- Reference shortcuts

export const firestoreEpisodes = () =>
  firebase.firestore().collection("episodes")

export const firestoreEpisodeNotes = (episodeID: ID) =>
  firestoreEpisodes().doc(episodeID).collection("notes")

