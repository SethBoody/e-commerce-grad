import * as React from "react";
import Box from "@mui/joy/Box";
import { Sheet } from "@mui/joy";
import { ProductCard } from "./ProductCard";
import { styled } from "@mui/joy/styles";
import { NavigateButton } from "./NavigateButton";
import Typography from "@mui/joy/Typography";

const ComponantNavigater = styled(Sheet)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "var(--bright)",
  padding: "0 20px",
}));

export const SlideShowComponent = ({ products }) => {
  return (
    <>
      <ComponantNavigater>
        <Typography
          level="h2"
          fontSize="title-lg"
          sx={{ fontWeight: 500, mb: 2, py: 5 }}
        >
          New Arrivals
        </Typography>

        <NavigateButton to={"/category?newArrivals=true"} text={"View All"} />
      </ComponantNavigater>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          py: 1,
          px: 2,
          mb: 3,
          overflow: "auto",
          width: "100vw",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <ProductCard products={products} />
      </Box>
    </>
  );
};
