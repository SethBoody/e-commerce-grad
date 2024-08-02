import React from "react";
import { Sheet, Box, IconButton, Typography, Button, Divider } from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const BrandName = styled("p")(({ theme }) => ({
  fontWeight: "var(--semi-bold-font)",
}));

const ItemDesc = styled("p")(({ theme }) => ({
  color: "var(--type-low-emphasis)",
  paddingBottom: "7px",
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  color: "var(--type-low-emphasis)",
  fontSize: "1.0rem",
  padding: "0px 0px 35px 0px",
  display: `flex`,
  justifyContent: `flex-end`,
  alignItems: `flex-start`,
}));

const Price = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: "black",
}));

const Container = styled(Sheet)(({ theme }) => ({
  background: "var(--bright)",
  width: "100%",
  margin: "0 auto",
  padding: "7px",
  borderRadius: "8px",
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `center`,
}));

const ProductInfo = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "17px",
  padding: "20px 0px",
  background: "var(--bright)",
  width: "80%",
}));

const Image = styled("img")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
}));

const LeftSide = styled("div")(({ theme }) => ({
  display: `flex`,
  position: `relative`,
  width: "20%",
  flexDirection: `column`,
  justifyContent: `space-between`,
  alignItems: `flex-end`,
}));

const CartMenuItem = ({ item, counts, updateCount, removeProductHandler }) => {
  return (
    <>
      <Container>
        <ProductInfo>
          <Image src={item.productImage} alt="" />
          <Sheet sx={{ background: "var(--bright)" }}>
            <BrandName>{item.productInfo.brand}</BrandName>
            <ItemDesc>{item.productInfo.title}</ItemDesc>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "#1B4B66",
                borderRadius: 4,
                width: "75px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <IconButton
                  size="sm"
                  onClick={() =>
                    updateCount(
                      item.productId,
                      counts[item.productId] > 1
                        ? counts[item.productId] - 1
                        : 1
                    )
                  }
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography
                  fontWeight="md"
                  color="text.secondary"
                  fontSize="small"
                >
                  {counts[item.productId]}
                </Typography>
                <IconButton
                  size="sm"
                  onClick={() =>
                    updateCount(item.productId, counts[item.productId] + 1)
                  }
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Sheet>
        </ProductInfo>
        <LeftSide>
          <RemoveButton
            onClick={() => removeProductHandler(item.productId)}
            variant="plain"
          >
            <CloseIcon fontSize="small" />
          </RemoveButton>
          <Price>${item.productInfo.price}</Price>
        </LeftSide>
      </Container>
      <Divider />
    </>
  );
};
export default CartMenuItem;

