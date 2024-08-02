import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import HandpickedCard from "./HandpickedCard";
function Handpicked({ handpicked }) {
  return (
    <Box sx={{ background: "#1B4B66", mb: 5 }}>
      <Typography
        level="h2"
        fontSize="2rem"
        sx={{ color: "white", pl: 3, pt: 3 }}
      >
        Handpicked Collections
      </Typography>
      <Grid
        container
        sx={{
          gap: 3,
          width: 1 / 1,
          justifyContent: "space-evenly",
          py: 5,
        }}
      >
        {handpicked.map((product) => {
          return <HandpickedCard key={product.id} product={product} />;
        })}
      </Grid>
    </Box>
  );
}
export default Handpicked;
