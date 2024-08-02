import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";

export default function UserMenu() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {!user ? (
        <>
          <ListItemButton component={Link} to="/signin">
            <ListItemText primary="Sign in" />
          </ListItemButton>
          <ListItemButton component={Link} to="/signup">
            <ListItemText primary="Sign up" />
          </ListItemButton>
        </>
      ) : (
        <>
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary="profile" />
          </ListItemButton>
          <ListItemButton onClick={handleSignout}>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </>
      )}
    </List>
  );
}
