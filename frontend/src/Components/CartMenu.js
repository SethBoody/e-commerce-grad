import React, { useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { styled } from "@mui/material/styles";
import { Sheet, Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import OrderDetails from "./OrderDetails";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "./BackArrow";
import CartMenuItem from "./CartMenuItem";
import { OrderSummary } from "./OrderSummary";
const Content = styled("div")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  borderRadius: `0px`,
  display: `flex`,
  position: `relative`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  margin: `10px`,
  boxSizing: `content-box`,
  overflow: `hidden`,
  height: "auto",
  width: "370px",
});
const CartMenu = ({ setCartAnchorEl }) => {
  const [cart, setCart] = useState([]);
  const [counts, setCounts] = useState({});
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    const initialCounts = {};
    storedCart.forEach((item) => {
      initialCounts[item.productId] = item.count || 1;
    });
    setCounts(initialCounts);
  }, []);
  const updateCount = (productId, newCount) => {
    const updatedCounts = {
      ...counts,
      [productId]: newCount,
    };
    setCounts(updatedCounts);
    updateLocalStorage(productId, updatedCounts);
  };
  const updateLocalStorage = (productId, updatedCounts) => {
    const updatedCart = cart.map((item) => ({
      ...item,
      count: updatedCounts[item.productId],
    }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeProductHandler = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setCartAnchorEl(false);
    navigate("/cart");
  };
  return (
    <Content>
      <BackArrow setCartAnchorEl={setCartAnchorEl} />
      {cart.map((item, index) => (
        <CartMenuItem
          key={index}
          item={item}
          counts={counts}
          updateCount={updateCount}
          removeProductHandler={removeProductHandler}
        />
      ))}
      <Sheet sx={{ width: "100%" }}>
        <OrderSummary showButtons={false} sx={{ width: "100%" }} />
      </Sheet>
      <Button
        sx={{
          backgroundColor: "#1B4B66",
          color: "white",
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 40px",
          width: "98%",
          display: "flex",
          marginTop: "24px",
        }}
        onClick={handleButtonClick}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "500", lineHeight: "20px", fontSize: "16px" }}
        >
          Place Order
        </Typography>
      </Button>
      <Box sx={{ textDecoration: "none" }}>
        <Link
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          onClick={() => setCartAnchorEl(null)}
        >
          <Typography
            sx={{
              marginTop: "34px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "underline",
              color: "#1B4B66",
            }}
          >
            Continue Shopping
          </Typography>
        </Link>
      </Box>
    </Content>
  );
};
export default CartMenu;
