import React from "react";
import { Grid, Box } from "@mui/material";
import notFoundImg from "../Assets/404.gif";
export default function PageNotFound() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Box
          component="img"
          src={notFoundImg}
          alt="Page Not Found"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
}
