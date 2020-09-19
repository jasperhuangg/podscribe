"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const config_1 = require("../firebase/config");
exports.resolvers = {
    Query: {
        episode: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const episodeSnapshot = yield config_1.firestoreEpisode(args.episode_id)
                .get();
            return config_1.dataWithID(episodeSnapshot);
        }),
        episodes: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const episodesSnapshots = yield config_1.firestoreEpisodes()
                .where("owner_id", "==", args.owner_id)
                .get();
            return episodesSnapshots.docs
                .map(snapshot => config_1.dataWithID(snapshot));
        })
    },
    Episode: {
        notes: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const notesSnapshots = yield config_1.firestoreEpisodeNotes(parent.id)
                .get();
            return notesSnapshots.docs
                .map(snapshot => config_1.dataWithID(snapshot));
        })
    }
};
//# sourceMappingURL=resolvers.js.map