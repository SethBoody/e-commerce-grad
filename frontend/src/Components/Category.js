import React from "react";
import base from "../Assets/base.svg";
import { Box } from "@mui/system";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { KeyboardArrowRight } from "@mui/icons-material";
import Pagination from "./Pagination";
import { Stack } from "@mui/material";
import CategoryCard from "./CategoryCard";
import Grid from "@mui/joy/Grid";
import ProductSkeleton from "./ProductSkeleton";
function Category({
  loading,
  categoryTitle,
  categoryProduct,
  onNext,
  totalPages,
  currentPage,
  pageChangeHandler,
}) {
  return (
    <Stack sx={{ m: 3 }}>
      <Breadcrumbs
        separator={<KeyboardArrowRight />}
        aria-label="breadcrumbs"
        sx={{ m: 0, p: 0 }}
      >
        {["Home"].map((item) => (
          <Link
            to="/"
            key={item}
            style={{ textDecoration: "none", color: "#1B4B66" }}
          >
            {item}
          </Link>
        ))}
        <Typography sx={{ color: "#626262" }}> {categoryTitle} </Typography>
      </Breadcrumbs>
      <Typography
        level="h2"
        sx={{ color: "#1B4B66", my: 2.8, fontWeight: 500 }}
      >
        {categoryTitle}
      </Typography>
      <Grid
        container
        sx={{
          gap: 5,
          width: 1 / 1,
          py: 5,
        }}
      >
        {loading ? (
          <ProductSkeleton />
        ) : (
          <CategoryCard products={categoryProduct} />
        )}
      </Grid>
      <Pagination
        onNext={onNext}
        totalPages={totalPages > 0 ? totalPages : Pagination.hideNextButton}
        currentPage={currentPage}
        pageChangeHandler={pageChangeHandler}
      />
    </Stack>
  );
}
export default Category;
