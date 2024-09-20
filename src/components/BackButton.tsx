import { styled } from "styled-components";
import BackIcon from "../assets/arrow.svg";
import { WindowSize } from "../constants/const";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <BackButtonContainer onClick={onClick}>
      <FeatureIcon
        style={{ marginTop: "3px", marginLeft: "6px", width: "20px", height: "20px" }}
        src={BackIcon}
      />
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.button`
  display: flex;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 42px;
  height: 40px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: calc(50% - ${WindowSize.width * 0.5}px + ${WindowSize.width * 0.03}px);
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #f0f0f0;
`;

const FeatureIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;
