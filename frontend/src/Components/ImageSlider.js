import { Box } from "@mui/joy";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/joy/styles";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CircularSpinner from "./CircularSpinner";

const SliderContainer = styled(Box)(({ theme }) => ({
  width: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const DisplyedPic = styled("img")(({ theme }) => ({
  width: "100%",
  aspectRatio: "5/4",
  borderRadius: "16px",
}));

const ThumbnailStack = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const PreviewPic = styled("img")(({ theme }) => ({
  maxWidth: "80px",
  maxHeight: "80px",
  aspectRatio: 1 / 1,
  borderRadius: "8px",
}));

export const ImageSlider = ({ productImage, productName }) => {
  return (
    <SliderContainer>
      <DisplyedPic src={productImage} alt={`${productName}`} />
    </SliderContainer>
  );
};
