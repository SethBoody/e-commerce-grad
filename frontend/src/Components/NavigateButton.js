import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

export const NavigateButton = ({ text, onClick, to }) => {
  return (
    <Link to={to}>
      <Button
        endDecorator={<KeyboardArrowRight color="neutral" fontSize="lg" />}
        variant="plain"
        onClick={onClick}
        sx={{
          color: "var(--primary)",
          fontWeight: "var(--light-text)",
          fontSize: "12px",
        }}>
        {text}
      </Button>
    </Link>
  );
};
