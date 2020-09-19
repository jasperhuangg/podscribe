"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataWithID = exports.firestoreEpisodeNotes = exports.firestoreEpisode = exports.firestoreEpisodes = void 0;
const firebase = __importStar(require("firebase/app"));
require("firebase/firestore");
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
firebase.initializeApp(firebaseConfig);
// ----------------------------------------------------------------------------------
// ---- Reference shortcuts
const firestore = firebase.firestore();
exports.firestoreEpisodes = () => firestore.collection("episodes");
exports.firestoreEpisode = (episodeID) => exports.firestoreEpisodes().doc(episodeID);
exports.firestoreEpisodeNotes = (episodeID) => exports.firestoreEpisode(episodeID).collection("notes");
// ----------------------------------------------------------------------------------
// ---- Utility
exports.dataWithID = (snapshot) => snapshot.exists ? Object.assign({ id: snapshot.id }, snapshot.data()) : null;
//# sourceMappingURL=config.js.map