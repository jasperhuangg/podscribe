export class Note {
  timestamp: number
  content: string

  constructor(readonly id: string, timestamp: number, content: string) {
    this.timestamp = timestamp
    this.content = content
  }
}
