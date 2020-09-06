import {Note} from "./Note";

export class Episode {
  title: string
  notes: Note[]
  createdAt: number|null

  constructor(
    readonly id: string,
    readonly show: string,
    readonly imageUrl: string,
    title: string,
    createdAt: number|null = null,
    notes: Note[] = []
  ) {
    this.title = title
    this.notes = notes
    this.createdAt = createdAt
  }
}
