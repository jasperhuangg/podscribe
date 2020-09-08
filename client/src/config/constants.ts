import {OAuthBaseProps, OAuthProps} from "expo-app-auth";

export const SPOTIFY_AUTH_CONFIG: OAuthProps = {
  clientId: "2d68824f3adf435995d4b8262c68212b",
  issuer: "https://accounts.spotify.com",
  // clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  scopes: [
    'user-read-playback-state',
    'user-modify-playback-state',
  ],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token"
  }
}

export const SPOTIFY_API_URLS = {
  currentPlayback: "https://api.spotify.com/v1/me/player?additional_types=episode",
  seekPlayback: (ms: number) => "https://api.spotify.com/v1/me/player/seek?position_ms=" + ms,
  pausePlayback: "https://api.spotify.com/v1/me/player/pause",
  resumePlayback: "https://api.spotify.com/v1/me/player/play"
}

const STORAGE_PREFIX = "@PodcastCompanion:"
export const STORAGE_KEYS = {
  SPOTIFY_OAUTH: STORAGE_PREFIX + "SpotifyOAuthKey"
}