import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import pinkArrow from "../Assets/pinkArrow.svg";
import { CardActions } from "@mui/joy";
import { Link } from "react-router-dom";
import { styled } from "@mui/joy/styles";
import Banner3 from "./Banner3";
import banner3 from "../Assets/Bags-banner.png";
import Banner4 from "./Banner4";
import banner4 from "../Assets/Hat_Banner.webp";
import { enqueueSnackbar } from "notistack";
import { loadProductDetails } from "../Shared/API/FetchData";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  boxSizing: "border-box",
  m: 0,
  p: 0,
}));
function ThreeCards() {
  const [pointsData1, setPointsData1] = useState([]);
  const [pointsData2, setPointsData2] = useState([]);

  useEffect(() => {
    // Fetch products for pointsData2
    const pointsData1Ids = [11];
    const pointsData1Attributes = [{ top: "35%", left: "13%" }];

    Promise.all(pointsData1Ids.map((id) => loadProductDetails(id)))
      .then((responses) => {
        const updatedPointsData1 = responses.map((response, index) => ({
          ...response.data.data.product,
          ...pointsData1Attributes[index],
          url: "/detail/" + response.data.data.product.id,
        }));
        setPointsData1(updatedPointsData1);
      })
      .catch((error) => {
        // enqueueSnackbar("Error fetching Points Data 1", {
        //   variant: "error",
        // });
      });

    // Fetch products for pointsData2
    const pointsData2Ids = [4];
    const pointsData2Attributes = [{ top: "16%", left: "20%" }];

    Promise.all(pointsData2Ids.map((id) => loadProductDetails(id)))
      .then((responses) => {
        const updatedPointsData2 = responses.map((response, index) => ({
          ...response.data.data.product,
          ...pointsData2Attributes[index],
          url: "/detail/" + response.data.data.product.id,
        }));
        setPointsData2(updatedPointsData2);
      })
      .catch((error) => {
        // enqueueSnackbar("Error fetching Points Data 2", {
        //   variant: "error",
        // });
      });
  }, []);

  return (
    <Box sx={{ mx: 3 }}>
      {pointsData1 && pointsData2 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 6,
            height: {
              xs: 100,
              sm: 150,
              md: 170,
              lg: 200,
              xl: 230,
            },
          }}
        >
          <Card sx={{ border: 0, flex: 1 }}>
            <CardCover sx={{ objectFit: "cover" }}>
              <Banner3 src={banner3} pointsData={pointsData1} />
            </CardCover>
            <StyledLink to={"/category?discount=15"}>
              <CardContent
                sx={{
                  width: {
                    xs: "50%",
                    sm: "45%",
                    md: "45%",
                    lg: "40%",
                    xl: "40%",
                  },
                  transform: {
                    xs: "translate(90%)",
                    sm: "translate(95%)",
                    md: "translate(110%)",
                    lg: "translate(140%)",
                    xl: "translate(140%)",
                  },
                }}
              >
                <Typography
                  level="title-lg"
                  color="var(--grey)"
                  sx={{
                    fontWeight: "750",
                    textAlign: "right",
                    justifyContent: "flex-end",
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.6rem",
                      md: "2.2rem",
                      lg: "2.5rem",
                      xl: "3rem",
                    },
                  }}
                >
                  On Discounts
                </Typography>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <img src={pinkArrow} alt="arrow icon" />
                </CardActions>
              </CardContent>
            </StyledLink>
          </Card>

          <Card sx={{ border: 0, flex: 1 }}>
            <CardCover sx={{ objectFit: "cover" }}>
              <Banner4 src={banner4} pointsData={pointsData2} />
            </CardCover>
            <StyledLink to={"/category?rating=4.5&ratingType=above"}>
              <CardContent
                sx={{
                  width: {
                    xs: "50%",
                    sm: "45%",
                    md: "45%",
                    lg: "40%",
                    xl: "40%",
                  },
                  transform: {
                    xs: "translate(90%)",
                    sm: "translate(95%)",
                    md: "translate(110%)",
                    lg: "translate(140%)",
                    xl: "translate(140%)",
                  },
                }}
              >
                <Typography
                  level="title-lg"
                  color="var(--grey)"
                  sx={{
                    fontWeight: "750",
                    textAlign: "right",
                    justifyContent: "flex-end",
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.6rem",
                      md: "2.2rem",
                      lg: "2.5rem",
                      xl: "3rem",
                    },
                  }}
                >
                  Highly Rated
                </Typography>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <img src={pinkArrow} alt="arrow icon" />
                </CardActions>
              </CardContent>
            </StyledLink>
          </Card>
        </Box>
      )}
    </Box>
  );
}
export default ThreeCards;
