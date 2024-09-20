import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CancelIcon from "../assets/close.svg";
import SearchIcon from "../assets/search.svg";
import { WindowSize } from "../constants/const";

const DummyInput: React.FC<any> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleContainerClick = () => {
    navigate("/search");
  };

  return (
    <Container>
      <InputWrapper onClick={handleContainerClick}>
        <Input ref={inputRef} placeholder="지역, 매장명, 또는 카테고리 검색" />
        <img src={SearchIcon} style={iconStyle} />
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: ${WindowSize.width * 0.8}px;
  border-color: gray;
  border-width: 0;
  padding: 0 10px;
  border-bottom-width: 1px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  font-size: 15px;
  border: none;
  outline: none;
`;

const iconStyle = {
  width: 25,
  height: 25,
};

export default DummyInput;
