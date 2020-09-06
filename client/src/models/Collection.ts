import {Episode} from "./Episode";

export class Collection {
  episodes: Episode[]
  name: string




  constructor(readonly id: string, episodes: Episode[], name: string) {
    this.name = name
    this.episodes = episodes
  }
}
