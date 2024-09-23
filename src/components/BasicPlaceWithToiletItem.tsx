import React from "react";
import styled from "styled-components";
import {
  IPlace,
  ToiletType,
  IToiletInfo,
  IPlaceCategory,
  LocationType,
} from "../apis/interface/place.interface";

interface PlaceInfoProps {
  place: IPlace | null;
  onClick: () => void;
}

const BasicPlaceWithToiletItem: React.FC<PlaceInfoProps> = ({ place, onClick }) => {
  if (!place) return <LoadingText>시설 정보를 불러오는 중...</LoadingText>;

  const getCategoryText = (category: IPlaceCategory | null): string => {
    if (!category) return "";

    const depths = [
      category.depth1,
      category.depth2,
      category.depth3,
      category.depth4,
      category.depth5,
    ].filter((depth) => depth && depth.name);

    return depths[depths.length > 1 ? depths.length - 2 : 0].name;
  };

  const getToiletTypeText = (toiletInfos: IToiletInfo[] | null): string => {
    if (!toiletInfos || toiletInfos.length === 0) return "화장실 정보 없음";

    const types = toiletInfos
      .map((info) => info.type)
      .filter((type): type is ToiletType => type !== null);
    const uniqueTypes = Array.from(new Set(types));

    const hasMale = uniqueTypes.includes(ToiletType.MALE);
    const hasFemale = uniqueTypes.includes(ToiletType.FEMALE);
    const hasUnisex = uniqueTypes.includes(ToiletType.UNISEX);
    const hasSingle = uniqueTypes.includes(ToiletType.SINGLE);
    const hasNone = uniqueTypes.includes(ToiletType.NONE);

    if (hasNone) return "화장실 없음";

    const typeTexts: string[] = [];

    if (hasMale || hasFemale) typeTexts.push("남녀 구분");
    if (hasUnisex) typeTexts.push("남녀 공용");
    if (hasSingle) typeTexts.push("1인용");

    return typeTexts.length > 0 ? typeTexts.join(", ") : "알 수 없는 유형";
  };
  const renderToiletInfo = (toiletInfos: IToiletInfo[] | null) => {
    if (!toiletInfos || toiletInfos.length === 0) return <InfoText>화장실 정보 없음</InfoText>;

    const getLocationTypeText = (locationType: LocationType | undefined): string | false => {
      switch (locationType) {
        case LocationType.INDOOR:
          return "실내";
        case LocationType.BUILDING_INSIDE:
          return "상가 내부";
        case LocationType.OUTDOOR:
          return "실외";
        default:
          return false;
      }
    };

    const toiletCount = toiletInfos.reduce((sum, info) => {
      const count = info.details?.toiletCount;
      return count !== null && count !== undefined ? sum + count : sum;
    }, 0);

    const urinalCount = toiletInfos.reduce((sum, info) => {
      const count = info.details?.urinalCount;
      return count !== null && count !== undefined ? sum + count : sum;
    }, 0);

    const trueFeatures = [
      toiletInfos.some((info) => info.details?.isAccessibleToilet) && "장애인 화장실",
      toiletInfos.some((info) => info.details?.hasHandDryer) && "핸드 드라이어",
      toiletInfos.some((info) => info.details?.hasBabyChangingFacility) && "기저귀 교환대",
      toiletInfos.some((info) => info.details?.hasSanitizer) && "손세정제",
      toiletInfos.some((info) => info.details?.hasFeminineProductsBin) && "여성용품 수거함",
      toiletInfos.some((info) => info.details?.hasFeminineProducts) && "여성용품 비치",
      toiletInfos.some((info) => info.details?.hasChildToilet) && "유아용 변기",
      toiletInfos.some((info) => info.details?.hasBabyChair) && "유아용 의자",
      toiletInfos.some((info) => info.details?.hasEmergencyBell) && "비상벨",
      toiletInfos.some((info) => info.details?.hasSupportBars) && "안전 손잡이",
      toiletInfos.some((info) => info.details?.hasPowderRoom) && "파우더룸",
      toiletInfos.some((info) => info.details?.accessible) && "접근 가능",
    ].filter(Boolean);

    return (
      <ToiletInfoContainer>
        <InfoText>{getLocationTypeText(toiletInfos[0].details?.locationType)}</InfoText>
        <InfoText>{getToiletTypeText(toiletInfos)}</InfoText>
        {trueFeatures.map((feature, index) => (
          <InfoText key={index}>{feature}</InfoText>
        ))}
        {/* {toiletCount > 0 && <InfoText>좌변기 {toiletCount}</InfoText>}
        {urinalCount > 0 && <InfoText>소변기 {urinalCount}</InfoText>} */}
      </ToiletInfoContainer>
    );
  };

  return (
    <PlaceInfoContainer onClick={onClick}>
      <PlaceNameContainer>
        <PlaceName>{place.name}</PlaceName>
        <CategoryText>{getCategoryText(place.placeCategory)}</CategoryText>
      </PlaceNameContainer>

      <AddressText>
        {place.region.administrativeDistrict +
          " " +
          place.region.district +
          " " +
          place.detailAddress}
      </AddressText>

      {renderToiletInfo(place.toiletInfo)}
    </PlaceInfoContainer>
  );
};

export default BasicPlaceWithToiletItem;

const PlaceInfoContainer = styled.div`
  border-bottom: 0.5px solid #f0f0f0;
  padding: 8px 0;
`;

const PlaceNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceName = styled.p`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const CategoryText = styled.p`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const AddressText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const ToiletInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const InfoText = styled.span`
  font-size: 12px;
  background-color: #febe98;
  color: #555;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #666;
`;
