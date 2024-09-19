import { AuthProviderEnums } from "../constants/enum";

export interface IApiError {
  errorCode: string;
  statusCode: number;
}

export interface IUserBasicProfile {
  id: number;
  nickname: string;
  url: string;
  provider: AuthProviderEnums;
}

export interface IOAuthServerSignInResult {
  provider: AuthProviderEnums;
  accessToken: string;
}

export interface IApiServerSignInResult {
  provider: AuthProviderEnums;
  email: string;
}

export interface IApiServerResponseBody<T> {
  statusCode: Number;
  data: T;
  errorCode?: string;
}

export interface IImage {
  id: number;
  url: string;
}

export interface IKakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}
