import React from "react";
import styled from "styled-components";

interface DividerProps {
  margin?: string;
  color?: string;
}

const DividerLine = styled.hr<DividerProps>`
  border: none;
  border-top: 1px solid ${(props) => props.color || "#e0e0e0"};
  margin: ${(props) => props.margin || "15px 0"};
`;

const Divider: React.FC<DividerProps> = ({ margin, color }) => {
  return <DividerLine margin={margin} color={color} />;
};

export default Divider;
