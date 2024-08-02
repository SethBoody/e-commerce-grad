import { FooterContent } from "../Components/FooterContent";
import { TabsBottomNavExample } from "../Components/MobileBottomNavigation";
import { Sheet } from "@mui/joy";
import { AccordionComponent } from "../Components/AccordionComponent";

export const Footer = () => {
  return (
    <>
      <Sheet
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <FooterContent />
      </Sheet>
      <Sheet
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
          mb: "60px",
          mt: 4,
        }}
      ></Sheet>
      <Sheet
        sx={{
          display: {
            xs: "inline",
            sm: "inline",
            md: "none",
            lg: "none",
            xl: "none",
          },
          position: "fixed",
          bottom: "0",
          zIndex: "1",
          width: "100vw",
        }}
      >
        <TabsBottomNavExample />
      </Sheet>
    </>
  );
};
