import { Grid, Sheet } from "@mui/joy";
import BrandCard from "./BrandCard";
import Typography from "@mui/joy/Typography";

export const Brands = ({ brands }) => {
  return (
    <>
      <Sheet
        sx={{
          pl: 5,
          py: 5,
          background: "var(--bright)",
        }}
        id="brands"
      >
        <Typography level="h2" fontSize="title-lg" sx={{ fontWeight: 500 }}>
          Shop by Brands
        </Typography>
      </Sheet>
      <Grid
        container
        columns={{ lg: 2, sm: 3 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          py: 3,
          px: 0,
          pb: 6,
          justifyContent: "space-evenly",
        }}
      >
        {brands.map((brand) => {
          return (
            <Grid key={brand.id}>
              <BrandCard brand={brand} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
