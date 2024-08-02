import { styled } from "@mui/joy/styles";

const Title = styled("h3")(({ theme }) => ({
  fontSize: "1.05rem",
  fontWeight: "var(--semi-bold-font)",
  padding: "4px  0",
}));

export const SectionTitle = ({ text }) => {
  return <Title>{text}</Title>;
};
