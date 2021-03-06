import {Note} from "./Note";
import {SECOND_MS} from "../util/TimestampConverter";

export class SyncEvent {
  constructor(readonly id: string,
              readonly title: string,
              readonly show: string,
              readonly imageUrl: string,
              readonly progress: number,
              readonly isPlaying: boolean,
              readonly length: number,
              readonly deviceId: string|null,
) {}
  cloneTogglePlay(): SyncEvent {
    return new SyncEvent(
      this.id,
      this.title,
      this.show,
      this.imageUrl,
      this.progress,
      true,
      this.length,
      this.deviceId
    )
  }

  cloneTogglePause(): SyncEvent {
    return new SyncEvent(
      this.id,
      this.title,
      this.show,
      this.imageUrl,
      this.progress,
      false,
      this.length,
      this.deviceId
    )
  }

  cloneSkipAhead(): SyncEvent {
    return new SyncEvent(
      this.id,
      this.title,
      this.show,
      this.imageUrl,
      Math.min(this.progress + 30 * SECOND_MS, this.length),
      this.isPlaying,
      this.length,
      this.deviceId
    )
  }

  cloneSkipBackward(): SyncEvent {
    return new SyncEvent(
      this.id,
      this.title,
      this.show,
      this.imageUrl,
      Math.max(this.progress - 30 * SECOND_MS, 0),
      this.isPlaying,
      this.length,
      this.deviceId
    )
  }
}
