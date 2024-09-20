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

export const ColorPalette = {
  DarkGray: "#c0c0c0",
  Gray: "#ddd",
  LightGray: "#f0f0f0",
};
