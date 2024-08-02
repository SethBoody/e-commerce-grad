import { styled } from "@mui/joy/styles";
import Input from "@mui/joy/Input";

const StyledLabel = styled("label")(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 500,
}));

export const InputWithLabel = ({ placeholder, label, value, onChange }) => {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <Input
        sx={{
          color: "var(--type-low-emphasis)",
          backgroundColor: "#F1F1F1",
          fontSize: 14,
          mb: 2,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="solid"
        color="neutral"
        size="lg"
      />
    </>
  );
};
