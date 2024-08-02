import { Button, Divider, Sheet } from "@mui/joy";
import { styled } from "@mui/joy/styles";

const Container = styled(Sheet)(({ theme }) => ({
  background: "white",
  width: "100%",
  margin: "0 auto",
  padding: "7px",
  borderRadius: "8px",
  marginBottom: 12,
}));

const ProductInfo = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "17px",
  padding: "20px 10px",
  background: "var(--bright)",
  width: "100%",
}));

const Image = styled("img")(({ theme }) => ({
  width: "130px",
  height: "130px",
  borderRadius: "8px",
}));

const ItemDesc = styled("p")(({ theme }) => ({
  color: "var(--type-low-emphasis)",
  fontSize: 18,
}));

const BrandName = styled("p")(({ theme }) => ({
  fontWeight: "var(--semi-bold-font)",
  fontSize: 18,
}));

const QtySelect = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  background: "var(--grey)",
  padding: "7px",
  borderRadius: "8px",
  width: "fit-content",
  margin: "8px 0px",
}));

const DiscountedPrice = styled("p")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "var(--bold-font)",
}));

const PriceDetail = styled(Sheet)(({ theme }) => ({
  fontWeight: "var(--semi-bold-font)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "var(--bright)",
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: "var(--primary)",
  fontSize: "1.1rem",
  padding: "10px 0px",
  backgroundColor: "white",
  fontWeight: 600,
}));

export const CartItemCard = ({ cart, removeProductHandler }) => {
  console.log(cart);
  return (
    <>
      {cart.map((item) => {
        return (
          <Container key={item.id}>
            <ProductInfo>
              <Image src={item.product.imageUrl} alt={item.product.title} />
              <Sheet sx={{ background: "var(--bright)" }}>
                <BrandName>{item.product.brand}</BrandName>
                <ItemDesc>{item.product.title}</ItemDesc>
                <QtySelect>
                  <ItemDesc>Qty: {item.quantity}</ItemDesc>
                </QtySelect>
                <PriceDetail>
                  <DiscountedPrice>${item.price}</DiscountedPrice>
                </PriceDetail>
              </Sheet>
            </ProductInfo>
            <Divider />
            <RemoveButton
              onClick={() => removeProductHandler(item.id)}
              variant="plain"
            >
              Remove
            </RemoveButton>
          </Container>
        );
      })}
    </>
  );
};
