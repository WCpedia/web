export enum ToiletType {
  NONE = "NONE",
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
  SINGLE = "SINGLE",
}
export enum LocationType {
  INDOOR = "INDOOR",
  BUILDING_INSIDE = "BUILDING_INSIDE",
  OUTDOOR = "OUTDOOR",
}
export interface IPlace {
  id: number;
  kakaoId: string;
  name: string;
  detailAddress: string;
  telephone: string;
  region: IRegion;
  placeCategory: IPlaceCategory;
  stars: string;
  categoryName: string;
  accessibilityRating: number;
  facilityRating: number;
  cleanlinessRating: number;
  reviewCount: number;
  totalReviewCount: number;
  toiletInfo: IToiletInfo[];
  x: number;
  y: number;
}

export interface IPlaceCategory {
  fullCategoryIds: string;
  lastDepth: number;
  depth1: {
    id: number;
    name: string;
  };
  depth2: {
    id: number;
    name: string;
  };
  depth3: {
    id: number;
    name: string;
  };
  depth4: {
    id: number;
    name: string;
  };
  depth5: {
    id: number;
    name: string;
  };
}

interface IRegion {
  id: number;
  administrativeDistrict: string;
  district: string;
}

export interface IToiletInfo {
  description: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  placeId: number;
  type: ToiletType;
  details: {
    description: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    toiletInfoId: number;
    toiletCount: number;
    urinalCount: number;
    isAccessibleToilet: boolean;
    hasHandDryer: boolean;
    hasBabyChangingFacility: boolean;
    hasSanitizer: boolean;
    hasFeminineProductsBin: boolean;
    hasFeminineProducts: boolean;
    hasChildToilet: boolean;
    hasBabyChair: boolean;
    hasEmergencyBell: boolean;
    hasSupportBars: boolean;
    lockType: string;
    locationType: LocationType;
    locationDescription: string;
    hasPowderRoom: boolean;
    accessible: boolean;
  };
}

export interface ISearchResultItem {
  id: number;
  kakaoId: string;
  name: string;
  detailAddress: string;
  telephone: string;
  placeCategory: IPlaceCategory;
  region: IRegion;
}
