export class Note {
  timestamp: number

  constructor(readonly id: string|null, timestamp: number) {
    this.timestamp = timestamp
  }
}
