import axios, {AxiosResponse} from "axios";
import {SPOTIFY_API_URLS} from "../config/constants";
import {SyncEvent} from "../models/SyncEvent";
import {SECOND_MS} from "./TimestampConverter";

export class SpotifySyncPlayback {
  static async get(accessToken: string) {
    const headers = {Authorization: "Bearer " + accessToken}
    let response = await axios.get(SPOTIFY_API_URLS.currentPlayback, {headers: headers})
    return this.parse(response)
  }

  private static parse(response: AxiosResponse): SyncEvent|null {
    const _isPlaying = response.data.is_playing
    const _episode = response.data.item
    const _type = response.data.currently_playing_type
    const _progress = response.data.progress_ms

    return _episode && _type === "episode" ?
      new SyncEvent(
        _episode.id,
        _episode.name,
        _episode.show.name,
        _episode.show.images[0].url,
        _progress,
        _isPlaying,
        _episode.duration_ms
        ) :
      null
  }

  static skip30(accessToken: string, forward: boolean) {
    const headers = {Authorization: "Bearer " + accessToken}

    axios.get(SPOTIFY_API_URLS.currentPlayback, {headers: headers})
      .then(response => {
        const _progress = response.data.progress_ms
        const _length = response.data.item.duration_ms
        const _skipped = forward ?
          Math.min(_progress + 30 * SECOND_MS, _length) :
          Math.max(_progress - 30 * SECOND_MS, 0)

        console.log(_progress, _length, _skipped)

        axios.put(
          SPOTIFY_API_URLS.seekPlayback(_skipped),
          {},
          {headers: headers}
          )
          .then(response =>
            console.log(
              "++++ SpotifySyncPlayback.skip30",
              forward ? "forward" : "backward",
              response.data
            )
          )
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  }

  static pause(accessToken: string) {
    const headers = {Authorization: "Bearer " + accessToken}
    return axios.put(SPOTIFY_API_URLS.pausePlayback, {},{headers: headers})
  }

  // TODO: instead of just resuming playback, use stored spotify_uri/timestamp for podcast to resume playback
  static play(accessToken: string, lastSeenPlaybackId: string) {

    console.log(">>>>", lastSeenPlaybackId)

    const headers = {Authorization: "Bearer " + accessToken}
    const body = {
      uris: ["spotify:episode:" + lastSeenPlaybackId]
    }

    return axios.put(SPOTIFY_API_URLS.resumePlayback, {},{headers: headers})
      .catch(_ => {
        console.log("Spotify Playback error, trying with spotify_uri")
        axios.put(SPOTIFY_API_URLS.resumePlayback, body,{headers: headers})
      })
  }

  static pauseAtPosition(accessToken: string) {
    const headers = {Authorization: "Bearer " + accessToken}


  }

  static playAtPosition(accessToken: string, episodeUri: string, ms: number) {
    const headers = {Authorization: "Bearer " + accessToken}
    const body = {
      uris: [episodeUri],
      position_ms: ms
    }

    axios.put(SPOTIFY_API_URLS.resumePlayback, body, {headers: headers})
      .then(response => console.log("++++ SpotifySyncPlayback.playAtPosition", response.data))
  }
}
