import { Box } from "@mui/joy";
import { ImageSlider } from "../Components/ImageSlider";
import { ProductInfo } from "../Components/ProductInfo";
import { useEffect, useState } from "react";
import {
  addToCart,
  addToWishList,
  getWishListItems,
  loadProductDetails,
  removeFromWishList,
} from "../Shared/API/FetchData";
import { useParams } from "react-router-dom";
import { ProductDescription } from "../Components/ProductDescription";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { enqueueSnackbar } from "notistack";

export const Detail = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [resetState, setResetState] = useState(true);
  const userName = localStorage.getItem("user");

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    loadProductDetails(productId)
      .then((response) => {
        setDetails(response.data.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error Occured did not Fetch Product", {
          variant: "error",
        });
      });
    getWishListItems()
      .then((data) => {
        setWishlist(data.data.data.wishListItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId, resetState]);

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

  const handleAddtoCart = (product) => {
    if (userName) {
      addToCart({
        productId: product.product.id,
        quantity: count,
      })
        .then(() => {
          enqueueSnackbar("Product Add to Cart", {
            variant: "success",
          });
        })
        .catch(() => {
          enqueueSnackbar("Product Failed to add to Cart", {
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
    details && (
      <>
        <Breadcrumbs
          separator={<KeyboardArrowRight />}
          aria-label="breadcrumbs"
          sx={{ mx: 2, mt: 2, width: "fit-content" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#1B4B66" }}>
            Home
          </Link>
          <Link
            to={`/category?brandName=${details.product?.brand}`}
            style={{ textDecoration: "none", color: "#1B4B66" }}
          >
            {details.product?.brand}
          </Link>
          <Typography sx={{ color: "#626262" }}>
            {details.product?.title}
          </Typography>
        </Breadcrumbs>

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
            mb: 7,
          }}
        >
          <Box
            sx={{
              flex: "50%",
              px: 3,
              mb: {
                xs: 6,
                sm: 6,
                md: 0,
                lg: 0,
                xl: 0,
              },
            }}
          >
            <ImageSlider
              productImage={details.product?.imageUrl}
              productName={details.title}
            />
          </Box>
          <Box
            sx={{
              flex: "50%",
              pl: {
                xs: 3,
                sm: 3,
                md: 0,
                lg: 0,
                xl: 0,
              },
              pr: 3,
            }}
          >
            <ProductInfo
              count={count}
              setCount={setCount}
              details={details}
              availableInStock={details.product?.availableInStock}
              wishlist={wishlist}
              addToWishlist={handleAddToWishlist}
              removeFromWishlist={handleRemoveFromWishlist}
              setResetData={setResetState}
              resetData={resetState}
              handleAddtoCart={handleAddtoCart}
            />
          </Box>
        </Box>
        <ProductDescription
          details={details}
          resetData={resetState}
          setResetData={setResetState}
        />
      </>
    )
  );
};
