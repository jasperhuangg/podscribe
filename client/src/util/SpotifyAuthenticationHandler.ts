import * as AppAuth from 'expo-app-auth';
import {SPOTIFY_API_URLS, SPOTIFY_AUTH_CONFIG, STORAGE_KEYS} from "../config/constants";
import {TokenResponse} from "expo-app-auth";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios"


export class SpotifyAuthenticationHandler {
  private static cacheAuthAsync = async (authState: TokenResponse) =>
    await AsyncStorage.setItem(STORAGE_KEYS.SPOTIFY_OAUTH, JSON.stringify(authState));

  private static checkIfTokenExpired = (accessTokenExpirationDate: string) =>
    accessTokenExpirationDate ?
    new Date(accessTokenExpirationDate) < new Date() :
    true;

  static async signInAsync() {
    let authState = await AppAuth.authAsync(SPOTIFY_AUTH_CONFIG);
    await this.cacheAuthAsync(authState);
    return authState;
  }

  static async getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(STORAGE_KEYS.SPOTIFY_OAUTH);
    let authState: TokenResponse = JSON.parse(value!);
    // console.log('getCachedAuthAsync', authState);
    if (authState) {
      if (this.checkIfTokenExpired(authState.accessTokenExpirationDate!)) {
        return this.refreshAuthAsync(authState.refreshToken!);
      } else {
        return authState;
      }
    }
    return null;
  }

  static async refreshAuthAsync(refreshToken: string) {
    let authState = await AppAuth.refreshAsync(SPOTIFY_AUTH_CONFIG, refreshToken);
    // console.log('refreshAuth', authState);
    await this.cacheAuthAsync(authState);
    return authState;
  }

  static async signOutAsync(accessToken: string) {
    try {
      await AppAuth.revokeAsync(SPOTIFY_AUTH_CONFIG, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(STORAGE_KEYS.SPOTIFY_OAUTH);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  }

  static async getUser(accessToken: string) {
    const headers = {Authorization: "Bearer " + accessToken}

    const response = await axios.get(SPOTIFY_API_URLS.me, {headers: headers})
    return response.data
  }
}

