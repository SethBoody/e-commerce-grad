import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { Sheet } from "@mui/joy";
import Button from "@mui/material/Button";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PlaceOrder = ({ handleSubmit }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 3,
        alignItems: "center",
      }}
    >
      <Typography
        component={Link}
        to="/cart"
        sx={{ color: "#1B4B66", flex: "50%" }}
      >
        Back to Cart
      </Typography>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#1B4B66",
          textTransform: "none",
          borderRadius: 2,
          fontSize: 18,
          boxShadow: "none",
          flex: "30%",
        }}
        startIcon={<LocalShippingOutlinedIcon />}
      >
        Place Order
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your order has been placed!
        </Alert>
      </Snackbar>
    </Sheet>
  );
};
