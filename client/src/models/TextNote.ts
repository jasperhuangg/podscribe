import {Note} from "./Note";

export class TextNote extends Note {

  text: string

  constructor(readonly id: string|null, timestamp: number, text: string) {
    super(id, timestamp);
    this.text = text
  }
}
