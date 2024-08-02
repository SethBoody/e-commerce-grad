import { Button, Divider, Sheet } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import { OrderImage } from "./OrderImage";

const FlexedContainer = styled(Sheet)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "var(--bright)",
  padding: "3px 7px",
}));

const ProductElements = styled(Sheet)(({ theme }) => ({
  width: "40%",
}));

const Options = styled(Sheet)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20%",
  background: "var(--bright)",
}));

const TableHeader = styled("p")(({ theme }) => ({
  color: "var(--type-low-emphasis)",
  fontWeight: "var(--medium-font)",
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  color: "var(--error)",
  textDecoration: "underline",
}));

const Container = styled(Sheet)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const ProductList = ({ cart, removeProductHandler }) => {
  return (
    <>
      <FlexedContainer>
        <TableHeader>Product Image</TableHeader>
        <Sheet
          sx={{
            background: "var(--bright)",
          }}
        >
          <TableHeader>Product Name</TableHeader>
        </Sheet>
        <ProductElements>
          <FlexedContainer>
            <TableHeader>Price</TableHeader>
            <TableHeader>Qty</TableHeader>
            <TableHeader>Subtotal</TableHeader>
          </FlexedContainer>
        </ProductElements>
        <Options>
          <TableHeader>Options</TableHeader>
        </Options>
      </FlexedContainer>
      <Divider />
      <Sheet sx={{ display: "flex", flexDirection: "column" }}>
        {cart.map((item, index) => (
          <FlexedContainer key={item.id}>
            <OrderImage
              imageUrl={item.product.imageUrl}
              productInfo={item.product.title}
              brand={item.product.brand}
              count={item.quantity}
              showQuantity={false}
            />
            <ProductElements>
              <Container>
                <FlexedContainer>
                  <p>${item.price}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                </FlexedContainer>
              </Container>
            </ProductElements>
            <Options>
              <RemoveButton
                onClick={() => removeProductHandler(item.id)}
                variant="plain"
              >
                Remove
              </RemoveButton>
            </Options>
          </FlexedContainer>
        ))}
      </Sheet>
    </>
  );
};
