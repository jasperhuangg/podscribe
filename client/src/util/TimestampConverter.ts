export const SECOND_MS = 1000
export const MINUTE_MS = SECOND_MS * 60
export const HOUR_MS = MINUTE_MS * 60


export class TimestampConverter {
  static msToTimestamp(ms: number) {
    const hours = Math.floor(ms / HOUR_MS)
    const minutes = Math.floor((ms - hours * HOUR_MS) / MINUTE_MS)
    const seconds = Math.floor((ms - hours * HOUR_MS - minutes * MINUTE_MS) / SECOND_MS)

    return this.format(hours, minutes, seconds)
  }

  private static format(hours: number,
                        minutes: number,
                        seconds: number) {
    return ((hours ? hours + ":" : "") +
            (minutes + ":") +
            (seconds < 10 ? "0" + seconds : seconds))
  }
}
