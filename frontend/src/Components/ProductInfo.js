import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Button from "@mui/material/Button";
import { Box } from "@mui/joy";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
export const ProductInfo = ({
  details,
  count,
  setCount,
  availableInStock,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  setResetData,
  resetData,
  handleAddtoCart,
}) => {
  const productInfo = details.product;
  const isAddDisabled = count >= availableInStock;
  const isInWishlist = wishlist.some(
    (item) => item.productId === productInfo.id
  );

  return (
    <Box sx={{ width: "100%", backgroundColor: "none" }}>
      <Typography level="h2" sx={{ fontWeight: 600 }}>
        {productInfo?.title}
      </Typography>
      <Typography level="h4" sx={{ fontWeight: 400, color: "#626262" }}>
        {productInfo?.brand}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Rating
          icon={<StarRateRoundedIcon fontSize="inherit" />}
          emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
          name="read-only"
          precision={0.1}
          value={productInfo?.totalRating ? productInfo?.totalRating : 0}
          readOnly
          sx={{
            color: "#FF8C4B",
            my: 2,
            mx: -0.6,
            fontSize: {
              xs: 28,
              sm: 30,
              md: 32,
              lg: 34,
              xl: 36,
            },
          }}
        />
        <Typography level="h2title-md" sx={{ color: "#B6B6B6" }}>
          ({productInfo?.ratingCount}) Ratings
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography level="h1">${productInfo?.price}</Typography>
      </Box>
      <hr style={{ width: "100%", border: "0.1px solid #B6B6B6" }}></hr>
      <Box sx={{ display: "flex", alignItems: "center", my: 5, gap: 2 }}>
        <Typography level="title-lg" sx={{ fontWeight: 600 }}>
          Quantity:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: 1,
            borderColor: "#1B4B66",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            <IconButton
              size="sm"
              onClick={() => setCount((c) => (c > 1 ? c - 1 : c))}
            >
              <Remove />
            </IconButton>
            <Typography fontWeight="md" color="text.secondary">
              {count}
            </Typography>
            <IconButton
              disabled={isAddDisabled}
              size="sm"
              onClick={() => setCount((c) => c + 1)}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          variant="contained"
          onClick={() => handleAddtoCart(details)}
          sx={{
            flex: "55%",
            backgroundColor: "#1B4B66",
            textTransform: "none",
            borderRadius: 2,
            fontSize: 18,
            boxShadow: "none",
          }}
          startIcon={<LocalMallOutlinedIcon />}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          onClick={
            isInWishlist
              ? () => removeFromWishlist(productInfo.id)
              : () => addToWishlist(productInfo)
          }
          sx={{
            flex: "45%",
            textTransform: "none",
            borderRadius: 2,
            borderColor: "#1B4B66",
            color: "#1B4B66",
            fontSize: 18,
            boxShadow: "none",
          }}
          startIcon={
            isInWishlist ? (
              <FavoriteIcon fontSize="medium" style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )
          }
        >
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </Box>
    </Box>
  );
};
