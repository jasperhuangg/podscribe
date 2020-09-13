import {Note} from "./Note";

export class ThoughtsNote extends Note {

  text: string

  constructor(readonly id: string|null, timestamp: number, text: string) {
    super(id, timestamp);
    this.text = text
  }
}
