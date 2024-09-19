import React from "react";
import styled from "styled-components";
import { IPlace, IToiletInfo, LocationType, ToiletType } from "../apis/interface/place.interface";
import AccessibleIcon from "../assets/accessible200.svg";
import HandDryerIcon from "../assets/dry200.svg";
import BabyChangingIcon from "../assets/babyChangeStation200.svg";
import SanitizerIcon from "../assets/sanitizer200.svg";
import FeminineProductsIcon from "../assets/bucket200.svg";
import ChildToiletIcon from "../assets/child200.svg";
import EmergencyBellIcon from "../assets/emergency-bell.svg";
// import SupportBarsIcon from "../assets/support_bars.svg";
import PowderRoomIcon from "../assets/powderRoom200.svg";
import BackIcon from "../assets/arrow.svg";
import Divider from "./Divider";

// 다른 아이콘들도 비슷하게 임포트하세요
interface PlaceDetailProps {
  place: IPlace;
  onClose: () => void;
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ place, onClose }) => {
  const getToiletTypeText = (type: ToiletType): string => {
    switch (type) {
      case ToiletType.MALE:
        return "남자";
      case ToiletType.FEMALE:
        return "여자";
      case ToiletType.UNISEX:
        return "남녀공용";
      case ToiletType.SINGLE:
        return "1인용";
      default:
        return "알 수 없음";
    }
  };

  const getLocationTypeText = (type: LocationType): string => {
    switch (type) {
      case LocationType.INDOOR:
        return "실내";
      case LocationType.BUILDING_INSIDE:
        return "건물 내부";
      case LocationType.OUTDOOR:
        return "실외";
      default:
        return "알 수 없음";
    }
  };

  const renderToiletInfo = (toiletInfo: IToiletInfo) => {
    const { type, details } = toiletInfo;
    const features = [
      { condition: details.isAccessibleToilet, icon: AccessibleIcon, label: "장애인 화장실" },
      { condition: details.hasHandDryer, icon: HandDryerIcon, label: "핸드 드라이어" },
      {
        condition: details.hasBabyChangingFacility,
        icon: BabyChangingIcon,
        label: "기저귀 교환대",
      },
      { condition: details.hasSanitizer, icon: SanitizerIcon, label: "손세정제" },
      {
        condition: details.hasFeminineProductsBin || details.hasFeminineProducts,
        icon: FeminineProductsIcon,
        label: "여성용품",
      },
      { condition: details.hasChildToilet, icon: ChildToiletIcon, label: "유아용 변기" },
      { condition: details.hasEmergencyBell, icon: EmergencyBellIcon, label: "비상벨" },
      // { condition: details.hasSupportBars, icon: SupportBarsIcon, label: "안전 손잡이" },
      { condition: details.hasPowderRoom, icon: PowderRoomIcon, label: "파우더룸" },
    ];

    return (
      <ToiletInfoContainer>
        <ToiletTypeText>{getToiletTypeText(type)} 화장실</ToiletTypeText>
        <LocationTypeText>
          {getLocationTypeText(details.locationType)} {details.locationDescription}
        </LocationTypeText>
        {(details.toiletCount !== null || details.urinalCount !== null) && (
          <ToiletCountText>
            {details.toiletCount !== null &&
              details.toiletCount > 0 &&
              `좌변기 ${details.toiletCount}개`}
            {details.toiletCount === 0 && "좌변기 없음"}
            {details.toiletCount !== null &&
              details.urinalCount !== null &&
              details.toiletCount > 0 &&
              details.urinalCount > 0 &&
              ", "}
            {details.urinalCount !== null &&
              details.urinalCount > 0 &&
              `소변기 ${details.urinalCount}개`}
            {details.urinalCount === 0 && "소변기 없음"}
          </ToiletCountText>
        )}
        <FeaturesContainer>
          {features.map(
            (feature, index) =>
              feature.condition && (
                <FeatureItem key={index}>
                  <FeatureIcon src={feature.icon} alt={feature.label} />
                  <FeatureLabel>{feature.label}</FeatureLabel>
                </FeatureItem>
              )
          )}
        </FeaturesContainer>
      </ToiletInfoContainer>
    );
  };

  return (
    <Container id="place-detail">
      <BackButton onClick={onClose}>
        <FeatureIcon
          style={{ marginTop: "2px", marginLeft: "5px", width: "20px", height: "20px" }}
          src={BackIcon}
        />
      </BackButton>
      <Title>{place.name}</Title>
      <CategoryText>
        {place.placeCategory.depth1.name} &gt; {place.placeCategory.depth2.name}
      </CategoryText>
      <Address>
        {place.region.administrativeDistrict} {place.region.district} {place.detailAddress}
      </Address>
      <Divider margin="10px -20px" color="#d0d0d0" />
      {place.toiletInfo.map((info, index) => (
        <React.Fragment key={index}>
          {renderToiletInfo(info)}
          {index < place.toiletInfo.length - 1 && <Divider margin="10px 0" />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default PlaceDetail;

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #f0f0f0;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0px 0px;
`;

const CategoryText = styled.p`
  font-size: 14px;
  color: #666;
`;

const Address = styled.p`
  font-size: 14px;
  color: #666;
`;

const ToiletInfoContainer = styled.div`
  padding: 0px 0px;
`;

const ToiletTypeText = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0px;
`;

const LocationTypeText = styled.p`
  font-size: 14px;
  color: #666;
`;

const ToiletCountText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  margin: 5px;
`;

const FeatureIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;

const FeatureLabel = styled.span`
  font-size: 12px;
  color: #555;
  text-align: center;
`;
