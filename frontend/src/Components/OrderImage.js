import { Sheet } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import { Typography } from "@mui/material";

const ProductInfo = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  padding: "20px 0px 0px",
  background: "var(--bright)",
  marginBottom: 5,
}));

const Image = styled("img")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
}));

const ItemDesc = styled("p")(({ theme }) => ({
  color: "var(--type-low-emphasis)",
}));

const BrandName = styled("p")(({ theme }) => ({
  fontWeight: "var(--semi-bold-font)",
}));

const Price = styled("p")(({ theme }) => ({}));

const PriceDetail = styled(Sheet)(({ theme }) => ({
  fontWeight: "var(--semi-bold-font)",
}));

export const OrderImage = ({
  imageUrl,
  productInfo,
  brand,
  price,
  quantity,
  showQuantity = true,
}) => {
  return (
    <>
      <ProductInfo>
        <Image src={imageUrl} alt="" />
        <Sheet sx={{ background: "var(--bright)" }}>
          <BrandName>{productInfo}</BrandName>
          <ItemDesc>{brand}</ItemDesc>
          <PriceDetail>
            <Price>{price}</Price>
            <Typography
              fontWeight="md"
              color="text.secondary"
              fontSize="small"
            >
              {showQuantity && `Qty: ${quantity}`}
            </Typography>
          </PriceDetail>
        </Sheet>
      </ProductInfo>
    </>
  );
};
