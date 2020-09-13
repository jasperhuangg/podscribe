import {Note} from "./Note";

export class DefinitionNote extends Note {
  word: string
  definition: string

  constructor(
    readonly id: string|null,
    timestamp: number,
    word: string,
    definition: string
  ) {
    super(id, timestamp)
    this.word = word
    this.definition = definition
  }
}
