import React, { useState } from "react";
import styled from "styled-components";
import { ISearchResultItem } from "../apis/interface/place.interface";
import { ColorPalette } from "../common/constants/const";
import Modal from "react-modal";
import { WindowSize } from "../constants/const";

const SearchResults: React.FC<{ results: ISearchResultItem[] }> = ({ results }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  const handleItemClick = (name: string) => {
    setSelectedPlace(name);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ResultsContainer>
      {results.map((result) => (
        <ResultItem key={result.id} onClick={() => handleItemClick(result.name)}>
          <PlaceNameContainer>
            <PlaceName>{result.name}</PlaceName>
            <CategoryText>{result.placeCategory.depth1.name}</CategoryText>
          </PlaceNameContainer>
          <DetailAddress>{result.detailAddress}</DetailAddress>
          <Telephone>{result.telephone}</Telephone>
        </ResultItem>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Information"
        style={customStyles}
      >
        <h2>서비스 준비 중입니다!</h2>
        <p>더 나은 서비스를 위해 열심히 준비 중이니 기대해 주세요! 😊</p>
      </Modal>
    </ResultsContainer>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: WindowSize.width * 0.75,
    height: "25%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const ResultsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${ColorPalette.LightGray};
  height: 60px;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  &:last-child {
    border-bottom: none;
  }
`;

const PlaceNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const CategoryText = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const DetailAddress = styled.div`
  font-size: 12px;
  color: gray;
  margin-bottom: 4px;
`;

const Telephone = styled.div`
  font-size: 12px;
  color: green;
`;

export default SearchResults;
