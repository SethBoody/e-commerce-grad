import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = ({ value, onKeyPress, onChange }) => {
  return (
    <>
      <Input
        sx={{
          width: "30vw",
        }}
        variant="solid"
        color="--type-low-emphasis"
        startDecorator={<SearchIcon />}
        placeholder="Search for products or brands....."
        value={value}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </>
  );
};