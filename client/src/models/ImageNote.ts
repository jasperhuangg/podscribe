import {Note} from "./Note";

export class TextNote extends Note {

  description: string
  imageUrl: string

  constructor(
    readonly id: string|null,
    timestamp: number,
    description: string,
    imageUrl: string
  ) {
    super(id, timestamp)
    this.description = description
    this.imageUrl = imageUrl
  }
}
