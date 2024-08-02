import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import UserMenu from "../Components/UserMenu";
import { Sheet } from "@mui/joy";
import { SearchInput } from "../Components/SearchInput";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { styled } from "@mui/joy/styles";
import { Link } from "react-router-dom";
import { DrawerMobileNavigation } from "../Components/MobileNavigation";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Divider } from "@mui/material";
import { getWishListItems } from "../Shared/API/FetchData";

const NavbarContainer = styled(Sheet)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 22px",
  background: "var(--bright)",
}));

const SideContainer = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  background: "var(--bright)",
}));

const StoreName = styled("h1")(({ theme }) => ({
  color: "#17494D",
}));

const AppTitle = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

const NavbarLinksContainer = styled(Sheet)(({ theme }) => ({
  gap: "12px",
  alignItems: "center",
  marginLeft: "10px",
  background: "var(--bright)",
}));

const NavbarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "var(--type-high-emphasis)",
  fontWeight: "var(--medium-font)",
}));

const IconContainer = styled(Sheet)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  alignItems: "bottom",
  background: "var(--bright)",
}));

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistAnchorEl, setWishlistAnchorEl] = useState(null);
  const userName = localStorage.getItem("user");
  let navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      getWishListItems()
        .then((data) => {
          setWishlist(data.data.data.wishListItems);
        })
        .catch((err) => {});
    }
  }, [userName]);

  const handleNavigation = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNavigation(e);
      navigate(`/category?keyword=${searchValue}`);
      setSearchValue("");
    }
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const isUserMenuOpen = Boolean(anchorEl);

  const handleCartMenuClick = (event) => {
    navigate("/cart");
  };

  const handleWishlistClick = (event) => {
    getWishListItems()
      .then((data) => {
        setWishlist(data.data.data.wishListItems);
      })
      .catch((err) => {});
    setWishlistAnchorEl(event.currentTarget);
  };

  const handleWishlistClose = () => {
    setWishlistAnchorEl(null);
  };

  const isWishlistOpen = Boolean(wishlistAnchorEl);

  return (
    <>
      <NavbarContainer>
        <SideContainer>
          <DrawerMobileNavigation />
          <AppTitle to={"/"}>
            <StoreName>E-Commerce</StoreName>
          </AppTitle>
          <NavbarLinksContainer
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
              },
            }}
          >
            <NavbarLink to={"/category?categoryName=Furniture"}>
              Furniture
            </NavbarLink>
            <NavbarLink to={"/category?categoryName=Apparels"}>
              Apparels
            </NavbarLink>
            <NavbarLink to={"/category?categoryName=Watches"}>
              Watches
            </NavbarLink>
            <NavbarLink to={"/category?categoryName=Jewellery"}>
              Jewellery
            </NavbarLink>
            <NavbarLink to={"/category?categoryName=Handbags"}>
              Handbags
            </NavbarLink>
          </NavbarLinksContainer>
        </SideContainer>
        <SideContainer>
          <SearchInput
            onKeyPress={handleKeyPress}
            onChange={handleNavigation}
            value={searchValue}
          />
          <IconContainer>
            {userName && (
              <FavoriteBorderOutlinedIcon
                onClick={handleWishlistClick}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "inline",
                    xl: "inline",
                  },
                }}
              />
            )}
            <PersonOutlineOutlinedIcon
              onClick={handleUserMenuClick}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "inline",
                  xl: "inline",
                },
              }}
            />
            {userName && (
              <Badge
                color="primary"
                onClick={handleCartMenuClick}
                style={{ cursor: "pointer" }}
              >
                <LocalMallOutlinedIcon />
              </Badge>
            )}
          </IconContainer>
        </SideContainer>
      </NavbarContainer>
      <Popover
        open={isUserMenuOpen}
        anchorEl={anchorEl}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <UserMenu />
      </Popover>

      {userName && (
        <Popover
          open={isWishlistOpen}
          anchorEl={wishlistAnchorEl}
          onClose={handleWishlistClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Sheet sx={{ padding: "10px" }}>
            {wishlist?.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  <div
                    style={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                      gap: "10px",
                      height: "50px",
                    }}
                  >
                    <Link
                      to={`/detail/${item.productId}`}
                      style={{
                        display: "flex",
                        direction: "row",
                        textDecoration: "none",
                        color: "inherit",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        style={{ width: "80px", height: "80px" }}
                      />
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            width: "200px",
                          }}
                        >
                          {item.product.title}
                        </p>
                        <p style={{ margin: 0, color: "gray" }}>
                          ${item.product.price}
                        </p>
                      </div>
                    </Link>
                  </div>
                </li>
                {index < wishlist.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Sheet>
        </Popover>
      )}
    </>
  );
};
