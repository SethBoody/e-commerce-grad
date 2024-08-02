import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import ImageCard from "./ImageCard";
import livingRoom from "../Assets/living_room.jpg";
import bedRoom from "../Assets/bedroom.jpg";
import kitchen from "../Assets/kitchen_banner.jpg";
import stollers from "../Assets/Stollers.jpg";

const ComponantNavigater = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "var(--bright)",
  padding: "0 20px",
  marginTop: "10px",
}));

export default function SlideShowImagesComponent() {
  const images = [
    {
      imgPath: livingRoom,
      title: "Living Room",
      pointsData: [
        {
          id: 69,
          top: "60%",
          left: "50%",
          details: "Shintenchi 47' Small Modern Loveseat Couch Sofa",
          price: "229.90",
        },
        {
          id: 66,
          top: "10%",
          left: "40%",
          details: "Contemporary Style Accent Mirror with Sun Burst",
          price: "157.10",
        },
        {
          id: 67,
          top: "48%",
          left: "95%",
          details: 'Side Table 18" X 24" 20" Gold Green Glam',
          price: "59.99",
        },
        {
          id: 70,
          top: "40%",
          left: "90%",
          details: '1471AB 29" Metal Table Lamp, Antique Brass',
          price: "27.55",
        },
        {
          id: 68,
          top: "40%",
          left: "10%",
          details: "Quiet Living Room with Drawer Solid Wood Sofa Side",
          price: "134.70",
        },
      ],
    },
    {
      imgPath: bedRoom,
      title: "Bedroom",
      pointsData: [
        {
          id: 61,
          top: "45%",
          left: "40%",
          details: "Modern Glass Table Lamps Set of 2, 3-Way Dimmable",
          price: "83.99",
        },
        {
          id: 62,
          top: "60%",
          left: "45%",
          details: "Feonase Full Bed Frame with Luxury Wingback",
          price: "266.98",
        },
      ],
    },

    {
      imgPath: kitchen,
      title: "Kitchen Accessories",
      pointsData: [
        {
          id: 63,
          top: "58%",
          left: "58%",
          details:
            "Cuisinart 17-Piece Cookware Set, Chef's Classic Steel Collection 77-17N",
          price: "175.24",
        },
        {
          id: 64,
          top: "61%",
          left: "79%",
          details:
            "Wooden Pepper Mill Set Salt Black Pepper Grinder Kit Manual Mills Solid with Strong Adjustable Ceramic Grinders 2 Piece",
          price: "25.99",
        },
        {
          id: 65,
          top: "61%",
          left: "90%",
          details:
            "24pcs Cutting Board Bulk 11 x 5 Inch Wood Chopping Board Blank Small Laser Engraving Serving Board Mini Charcuterie Boards for Mother's Day Wedding Housewarming Gift (Bamboo)",
          price: "63.99",
        },
      ],
    },
    {
      imgPath: stollers,
      title: "Kitchen Stollers",
      pointsData: [
        {
          id: 59,
          top: "47%",
          left: "61%",
          details: "Bar Stools Set of 2 Counter Height Adjustable",
          price: "239.99",
        },
        {
          id: 59,
          top: "47%",
          left: "88%",
          details: "Bar Stools Set of 2 Counter Height Adjustable",
          price: "239.99",
        },
        {
          id: 59,
          top: "47%",
          left: "36%",
          details: "Bar Stools Set of 2 Counter Height Adjustable",
          price: "239.99",
        },
        {
          id: 59,
          top: "47%",
          left: "10%",
          details: "Bar Stools Set of 2 Counter Height Adjustable",
          price: "239.99",
        },
        {
          id: 60,
          top: "33%",
          left: "29%",
          details: "Cyan Design 06909 Abracadabra Vase, Large",
          price: "125.91",
        },
        {
          id: 71,
          top: "35%",
          left: "83%",
          details: "Undermount Kitchen Sink",
          price: "200",
        },
      ],
    },
  ];

  return (
    <>
      <ComponantNavigater>
        <Typography
          variant="h2"
          fontSize="title-lg"
          sx={{ fontWeight: 500, mb: 2, py: 5 }}
        >
          Check Out Our Collections
        </Typography>
      </ComponantNavigater>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          py: 1,
          px: 2,
          mb: 3,
          overflow: "auto",
          width: "100vw",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            imgPath={image.imgPath}
            title={image.title}
            pointsData={image.pointsData}
          />
        ))}
      </Box>
    </>
  );
}
