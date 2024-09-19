export enum AuthErrorEnums {
  NO_AUTH_TOKEN = "NoAuthToken",
  INVALID_TOKEN = "InvalidToken",
  JWT_EXPIRED = "JwtExpired",
  UNAUTHORIZED = "Unauthorized",
}

export interface IFacilityFeature {
  key: string;
  label: string;
  icon: JSX.Element;
  exclusiveWith?: string;
}
