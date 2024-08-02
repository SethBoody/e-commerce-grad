import { Card } from "@mui/joy";
import { Link } from "react-router-dom";
import { styled } from "@mui/joy/styles";

const Image = styled("img")(({ theme }) => ({
  maxWidth: "200px",
  padding: "0",
  border: 0,
}));

const StyleCard = styled(Card)(({ theme }) => ({
  width: "200px",
  height: "200px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "var(--accent)",
  radius: "16px",
  border: 0,
}));

const BrandCard = ({ brand }) => {
  return (
    <StyleCard>
      <Link to={`/category?brandName=${brand.name}`}>
        <Image src={brand.imageUrl} alt={brand.name} />
      </Link>
    </StyleCard>
  );
};

export default BrandCard;