import * as React from "react";
import { Divider, TextField } from "@mui/material";
import { Sheet } from "@mui/joy";
import { InputWithLabel } from "./InputWithLabel";
import { styled } from "@mui/joy/styles";
import { Stack } from "@mui/system";

const FormRaw = styled(Sheet)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  background: "var(--bright)",
}));

const RightSide = styled(Sheet)(({ theme }) => ({
  width: "55%",
  background: "var(--bright)",
}));

const LeftSide = styled(Sheet)(({ theme }) => ({
  width: "40%",
  background: "var(--bright)",
}));

const StyledForm = styled("form")(({ theme }) => ({
  background: "var(--bright)",
  padding: "15px 0 0 15px",
}));

const StyledLabel = styled("label")(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 500,
}));

export const PaymentForm = ({ payment, setPayment }) => {
  const handleCardNumberChange = (event) => {
    setPayment({ ...payment, cardNumber: event.target.value });
  };

  const handleExpiryDateChange = (event) => {
    setPayment({ ...payment, expiryDate: event.target.value });
  };

  const handleCVVChange = (event) => {
    let inputCVV = event.target.value;
    // Limit input to maximum 4 digits
    inputCVV = inputCVV.slice(0, 4);
    // Validate and update CVV
    if (/^\d{0,4}$/.test(inputCVV)) {
      setPayment({ ...payment, cvv: inputCVV });
    }
  };

  return (
    <>
      <Divider />
      <StyledForm>
        <FormRaw>
          <LeftSide>
            <InputWithLabel
              label={"Card Number"}
              placeholder={"Enter Card Number"}
              value={payment?.cardNumber}
              onChange={handleCardNumberChange}
            />
          </LeftSide>
          <RightSide>
            <Stack>
              <StyledLabel>{"Expiry Date"}</StyledLabel>
              <TextField
                type="date"
                variant="standard"
                placeholder={"MM/YYYY"}
                value={payment?.expiryDate}
                onChange={handleExpiryDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: {
                    color: "#636B74",
                    backgroundColor: "#F1F1F1",
                    height: "44px",
                    mb: 2,
                    padding: 8,
                  },
                }}
              />
            </Stack>
          </RightSide>
        </FormRaw>
        <FormRaw>
          <LeftSide>
            <InputWithLabel
              label={"CVV"}
              placeholder={"CVV"}
              value={payment?.cvv}
              onChange={handleCVVChange}
            />
          </LeftSide>
        </FormRaw>
      </StyledForm>
    </>
  );
};
