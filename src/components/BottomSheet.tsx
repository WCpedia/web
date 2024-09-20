import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { WindowSize } from "../constants/const";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  preventClose?: boolean;
  minHeight?: number;
  maxHeight?: number;
  startHeight?: number;
  onHeightChange?: (height: number) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  preventClose = false,
  minHeight = WindowSize.height * 0.3,
  maxHeight = WindowSize.height * 0.7,
  startHeight = WindowSize.height * 0.3,
  onHeightChange,
}) => {
  const [sheetHeight, setSheetHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSheetHeight(isOpen ? startHeight : 0);
  }, [isOpen, startHeight]);

  useEffect(() => {
    if (onHeightChange) {
      onHeightChange(sheetHeight);
    }
  }, [sheetHeight, onHeightChange]);

  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    const deltaY = startY - clientY;
    const newHeight = sheetHeight + deltaY;

    setSheetHeight(Math.max(minHeight, Math.min(newHeight, maxHeight)));
    setStartY(clientY);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!preventClose && sheetHeight < minHeight) {
      onClose();
      setSheetHeight(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.target === sheetRef.current?.querySelector("#bottom-sheet-header")) {
      handleStart(e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientY);
  const handleTouchEnd = () => handleEnd();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === sheetRef.current?.querySelector("#bottom-sheet-header")) {
      handleStart(e.clientY);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientY);
  const handleMouseUp = () => handleEnd();

  useEffect(() => {
    const sheet = sheetRef.current;
    if (sheet) {
      const preventDefault = (e: TouchEvent) => {
        if (isDragging) {
          e.preventDefault();
        }
      };
      sheet.addEventListener("touchmove", preventDefault, { passive: false });
      return () => sheet.removeEventListener("touchmove", preventDefault);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <BottomSheetContainer
      id="bottom-sheet"
      ref={sheetRef}
      height={sheetHeight}
      minHeight={minHeight}
      maxHeight={maxHeight}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <BottomSheetHeader id="bottom-sheet-header">
        <BottomSheetHandle />
      </BottomSheetHeader>

      <BottomSheetContent ref={contentRef}>{children}</BottomSheetContent>
    </BottomSheetContainer>
  );
};

export default BottomSheet;

const BottomSheetContainer = styled.div<{ height: number; minHeight: number; maxHeight: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: ${(props) => (props.height === props.maxHeight ? "0" : "16px 16px 0 0")};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: ${(props) => Math.min(props.height, props.maxHeight)}px;
  max-height: ${(props) => props.maxHeight}px;
  touch-action: none;
  user-select: none;
  max-width: 480px;
  margin: 0 auto;
`;
const BottomSheetHeader = styled.div`
  padding: 10px;
  text-align: center;
  cursor: grab;
`;

const BottomSheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
  border-radius: 2px;
  margin: 0 auto;
`;

const BottomSheetContent = styled.div`
  overflow-y: auto;
  height: calc(100% - 44px);
`;
