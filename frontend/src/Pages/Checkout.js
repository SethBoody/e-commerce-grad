import { Box } from "@mui/joy";
import { AddressForm } from "../Components/AddressForm";
import { SectionTitle } from "../Components/SectionTitle";
import {
  Divider,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { OrderImage } from "../Components/OrderImage";
import { styled } from "@mui/joy/styles";
import { OrderSummary } from "../Components/OrderSummary";
import { AccordionComponent } from "../Components/AccordionComponent";
import { PlaceOrder } from "../Components/PlaceOrder";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  createAddress,
  createOrders,
  loadCart,
  getAddress,
} from "../Shared/API/FetchData";
import { enqueueSnackbar } from "notistack";
import { PaymentForm } from "../Components/PaymentForm";

const RightSide = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "50px",
}));

export const Checkout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [cart, setCart] = useState();
  const [cartId, setCartId] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [address, setAddress] = useState({
    street: "",
    postalCode: "",
    state: "",
    city: "",
    country: "",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(true);

  useEffect(() => {
    loadCart()
      .then((data) => {
        setCartId(data.data.data.id);
        setCart(data.data.data.cartItems);
        setTotalPrice(data.data.data.totalPrice);
      })
      .catch(() => {
        enqueueSnackbar("Please Try Again, Something went wrong!", {
          variant: "error",
        });
      });

    getAddress()
      .then((data) => {
        setSavedAddresses(data.data.data.addresses);
      })
      .catch(() => {
        enqueueSnackbar("Failed to load saved addresses!", {
          variant: "error",
        });
      });
  }, [user.id]);
  
  const handleSubmit = () => {
    if (
      (useNewAddress &&
        (address.street.trim() === "" ||
          address.postalCode.trim() === "" ||
          address.city.trim() === "" ||
          address.country.trim() === "")) ||
      payment.cardNumber.trim() === "" ||
      payment.expiryDate.trim() === "" ||
      payment.cvv.trim() === ""
    ) {
      enqueueSnackbar("Please Fill all the Required Data!", {
        variant: "error",
      });
      return;
    } else {
      if (useNewAddress) {
        createAddress({
          street: address.street,
          postalCode: address.postalCode,
          state: address.country,
          city: address.city,
          userId: user.id,
        })
          .then((data) => {
            createOrders({
              totalPrice: totalPrice,
              date: formatDate(new Date()),
              status: "Delivered",
              cartId: cartId,
              userId: user.id,
              addressId: data.data.data.id,
            }).then(() => {
              enqueueSnackbar("Order Placed Successfully!", {
                variant: "success",
              });
              navigate("/");
            });
          })
          .catch(() => {
            enqueueSnackbar("Something Went Wrong Please Try Again Later!", {
              variant: "error",
            });
          });
      } else {
        createOrders({
          totalPrice: totalPrice,
          date: formatDate(new Date()),
          status: "Delivered",
          cartId: cartId,
          userId: user.id,
          addressId: selectedAddress,
        })
          .then(() => {
            enqueueSnackbar("Order Placed Successfully!", {
              variant: "success",
            });
            navigate("/");
          })
          .catch(() => {
            enqueueSnackbar("Something Went Wrong Please Try Again Later!", {
              variant: "error",
            });
          });
      }
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    if (event.target.value) {
      setUseNewAddress(false);
    } else {
      setUseNewAddress(true);
    }
  };

  return (
    <Box sx={{ p: 3, m: 0 }}>
      <Breadcrumbs
        separator={<KeyboardArrowRight />}
        aria-label="breadcrumbs"
        sx={{ m: 0, p: 0 }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#1B4B66" }}
        >
          Home
        </Typography>
        <Typography sx={{ color: "#626262" }}>My Cart</Typography>
      </Breadcrumbs>

      <Typography
        level="h2"
        sx={{ color: "#1B4B66", my: 2.8, fontWeight: 500 }}
      >
        Checkout
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          gap: {
            xs: 0,
            sm: 0,
            md: 16,
            lg: 20,
            xl: 20,
          },
        }}
      >
        <Box sx={{ flex: "62%" }}>
          <RightSide>
            <AccordionComponent
              Content={
                <>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="address"
                      name="address"
                      value={useNewAddress ? "new" : "existing"}
                      onChange={(e) =>
                        setUseNewAddress(e.target.value === "new")
                      }
                    >
                      <FormControlLabel
                        value="new"
                        control={<Radio />}
                        label="Create New Address"
                      />
                      <FormControlLabel
                        value="existing"
                        control={<Radio />}
                        label="Select Existing Address"
                      />
                    </RadioGroup>
                  </FormControl>
                  {useNewAddress ? (
                    <AddressForm address={address} setAddress={setAddress} />
                  ) : (
                    <Select
                      value={selectedAddress}
                      onChange={handleAddressChange}
                      displayEmpty
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">
                        <em>Select an Address</em>
                      </MenuItem>
                      {savedAddresses.map((addr) => (
                        <MenuItem key={addr.id} value={addr.id}>
                          {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.postalCode}`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </>
              }
              title={<SectionTitle text={"Add Address"} />}
            />
            <AccordionComponent
              Content={
                <PaymentForm payment={payment} setPayment={setPayment} />
              }
              title={<SectionTitle text={"Add Payment"} />}
            />
            <AccordionComponent
              Content={<PlaceOrder handleSubmit={handleSubmit} />}
              title={<SectionTitle text={"Place Order"} />}
            />
          </RightSide>
        </Box>
        <Box sx={{ flex: "38%" }}>
          <Box sx={{ background: "var(--bright)", mb: 7 }}>
            <SectionTitle text={"Order Summary"} />
            <Divider sx={{ mb: 2 }} />
            {cart?.map((item) => {
              return (
                <OrderImage
                  key={item.id}
                  imageUrl={item.product.imageUrl}
                  brand={item.product.brand}
                  productInfo={item.product.title}
                  count={item.quantity}
                  price={item.price * item.quantity}
                  quantity={item.quantity}
                />
              );
            })}
          </Box>
          <Box sx={{ background: "var(--bright)" }}>
            <SectionTitle text={"Order Details"} />
            <OrderSummary showButtons={false} totalPrice={totalPrice} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
