import { ProductCard } from "./ProductCard";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import User from "../Assets/user.png";
import Box from "@mui/joy/Box";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { createReveiw } from "../Shared/API/FetchData";
import { enqueueSnackbar } from "notistack";

export const ProductDescription = ({ details, resetData, setResetData }) => {
  const productInfo = details.product;
  const productReview = details.ratingReviews;
  const relatedProducts = details.relatedProducts;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(details);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createReveiw({
      title: title,
      description: description,
      rating: rating,
      userId: user.id,
      productId: details.product.id,
    })
      .then((response) => {
        enqueueSnackbar(response.data.message, {
          variant: "success",
        });
        setResetData(!resetData);
      })
      .catch((error) => {
        enqueueSnackbar("Failed to Add Review Please Try Again Later!", {
          variant: "error",
        });
      })
      .finally(() => {
        setTitle("");
        setRating("");
        setDescription("");
        setLoading(false);
      });
  };

  return (
    <>
      <Tabs
        aria-label="Basic tabs"
        defaultValue={0}
        sx={{ px: 3, textDecoration: "none" }}
      >
        <TabList
          sx={{
            backgroundColor: "#F1F1F1",
            borderRadius: 9,
            border: "none",
            boxShadow: "none",
            color: "#626262",
            "& .Mui-selected": {
              backgroundColor: "#1B4B66 !important",
              borderRadius: 10,
              m: 1,
              color: "white",
            },
            "& .Mui-selected::after": {
              display: "none",
              backgroundColor: "#1B4B66",
            },
          }}
        >
          <Tab>Product Description</Tab>
          <Tab>Related Products</Tab>
          <Tab>Ratings and Reviews</Tab>
        </TabList>

        <TabPanel value={0} sx={{ mb: 10, ml: -2, mt: 2 }}>
          <Typography level="body-lg">{productInfo?.description}</Typography>
        </TabPanel>

        <TabPanel value={1}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              py: 1,
              mb: 3,
              overflow: "auto",
              scrollSnapType: "x mandatory",
              "& > *": {
                scrollSnapAlign: "center",
              },
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ProductCard products={relatedProducts} />
          </Box>
        </TabPanel>

        <TabPanel value={2}>
          {productReview?.map((review) => (
            <List sx={{ width: "100%", maxWidth: 460 }} key={review.id}>
              <ListItem key={review.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={User} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {" "}
                      <Typography sx={{ fontWeight: 600 }}>
                        {review.title}
                      </Typography>{" "}
                      <Typography>Rating: {review.rating}/5</Typography>{" "}
                    </>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
          {user && !loading ? (
            <Box sx={{ maxWidth: 400, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add a Review
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  inputProps={{ min: "1", max: "5", step: "1" }}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "var(--primary)",
                    borderRadius: "8px",
                  }}
                >
                  Add Review
                </Button>
              </form>
            </Box>
          ) : (
            <Stack
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              className="circular-progress"
            >
              <CircularProgress />
            </Stack>
          )}
        </TabPanel>
      </Tabs>
    </>
  );
};
