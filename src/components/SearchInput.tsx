import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CancelIcon from "../assets/close.svg";
import SearchIcon from "../assets/search.svg";
import BackIcon from "../assets/arrow.svg"; // 뒤로가기 아이콘 추가
import { WindowSize } from "../constants/const";
import { PlaceApi } from "../apis/place-api";
import { ColorPalette } from "../common/constants/const";

const SearchInput: React.FC<any> = ({ setResults }) => {
  // setResults prop 추가
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearClick = () => {
    setSearchTerm("");
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    try {
      const response = await PlaceApi.searchPlacesByTerm(searchTerm);
      setResults(response.data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <img src={BackIcon} style={iconStyle} onClick={handleBackClick} />
      <InputWrapper>
        <Input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="지역, 매장명, 또는 카테고리 검색"
        />
        {searchTerm && <img src={CancelIcon} style={iconStyle} onClick={handleClearClick} />}
      </InputWrapper>
      <img src={SearchIcon} style={iconStyle} onClick={handleSearch} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: ${WindowSize.width}px;
  cursor: pointer;
  border-bottom-width: 1px;
  border-bottom: 1px solid ${ColorPalette.DarkGray};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  font-size: 15px;
  border: none;
  outline: none;
  width: 100%;
`;

const iconStyle = {
  padding: "0 10px",
  width: 20,
  height: 20,
  cursor: "pointer",
};

export default SearchInput;
