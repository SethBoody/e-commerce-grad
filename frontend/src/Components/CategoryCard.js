import { Sheet } from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { styled } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useCallback } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToWishList,
  getWishListItems,
  removeFromWishList,
} from "../Shared/API/FetchData";
import { Box } from "@mui/material";

const CardInfo = styled(Sheet)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "var(--bright)",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "16rem",
  aspectRatio: 1 / 1,
  cursor: "pointer",
}));

const Brandname = styled("h4")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "var(--extra-light-font)",
}));

const ItemName = styled("h5")(({ theme }) => ({
  fontSize: ".9rem",
  lineHeight: 2,
  fontWeight: 600,
}));
export default function CategoryCard({ products }) {
  const [wishlist, setWishlist] = useState([]);
  const [resetState, setResetState] = useState(true);
  const userName = localStorage.getItem("user");

  const fetchWishlistItems = useCallback(async () => {
    if (userName) {
      try {
        const data = await getWishListItems();
        setWishlist(data.data.data.wishListItems);
      } catch (err) {
        console.error(err);
      }
    }
  }, [userName]);

  useEffect(() => {
    fetchWishlistItems();
  }, [resetState]);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product) => {
    if (isProductInWishlist(product.id)) {
      handleRemoveFromWishlist(product.id);
    } else {
      handleAddToWishlist(product);
    }
  };

  const handleAddToWishlist = (product) => {
    if (userName) {
      addToWishList(product.id)
        .then(() => {
          setWishlist((prevWishlist) => [...prevWishlist, product]);
          enqueueSnackbar("Product Added to Wishlist", {
            variant: "success",
          });
          setResetState(!resetState);
        })
        .catch((err) => {
          enqueueSnackbar("Product Failed to add to Wishlist", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Please Login or Register to perform this operation", {
        variant: "error",
      });
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    if (userName) {
      removeFromWishList(productId)
        .then(() => {
          setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.productId !== productId)
          );
          enqueueSnackbar("Product Removed from Wishlist", {
            variant: "warning",
          });
        })
        .catch(() => {
          enqueueSnackbar("Product Failed to remove from Wishlist", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Please Login or Register to perform this operation", {
        variant: "error",
      });
    }
  };

  return (
    <>
      {wishlist &&
        products?.map((item) => (
          <Box
            key={item.id}
            sx={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              borderRadius: "8px", // Adjust as per your design
              padding: "10px",
              width: "260px",
            }}
          >
            <Card
              key={item.id}
              variant="plain"
              sx={{
                background: "var(--bright)",
                padding: "0",
              }}
            >
              <Image
                src={item.imageUrl}
                onClick={() => (window.location.href = `/detail/${item.id}`)}
              />
              <CardInfo>
                <Sheet sx={{ background: "var(--bright)", padding: "0 " }}>
                  <ItemName>{item.title}</ItemName>
                  <Brandname>{item.brand}</Brandname>
                  <ItemName>${item.price}</ItemName>
                </Sheet>
                <Sheet
                  sx={{ background: "var(--bright)" }}
                  onClick={() => {
                    toggleWishlist(item);
                  }}
                >
                  {isProductInWishlist(item.id) ? (
                    <FavoriteIcon fontSize="medium" style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon fontSize="medium" />
                  )}
                </Sheet>
              </CardInfo>
            </Card>
          </Box>
        ))}
    </>
  );
}
