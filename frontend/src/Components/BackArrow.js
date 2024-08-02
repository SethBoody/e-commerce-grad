// BackArrow.js
import React from "react";
import { Box, IconButton, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackArrow = ({ setCartAnchorEl }) => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "24px", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
          paddingTop: "15px",
          paddingLeft: "14px",
        }}
        onClick={() => setCartAnchorEl(null)}
      >
        <IconButton size="sm">
          <ArrowBackIcon fontSize="small" style={{ color: "#1B4B66" }} />
        </IconButton>
        <Typography
          variant="h6"
          fontSize={"20px"}
          fontWeight={"600"}
          color="#1B4B66"
          component="div"
        >
          Back
        </Typography>
      </Box>
    </Box>
  );
};


export default BackArrow;

