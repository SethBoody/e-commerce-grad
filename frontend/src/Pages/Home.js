import { SlideShowComponent } from "../Components/SlideShowComponent";
import { Brands } from "../Components/Brands";
import ThreeCards from "../Components/ThreeCards";
import { CircularProgress, Sheet } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import { useEffect, useState } from "react";
import {
  loadNewArrivals,
  loadBrands,
  loadProductDetails,
} from "../Shared/API/FetchData";
import Carousel from "../Components/Carousel";
import "../Components/style.css";
import Banner from "../Components/Banner1";
import banner1 from "../Assets/Black-Friday_web_banner_10.jpg";
import banner2 from "../Assets/2_31012023010628_13_Eye-Wear,-Watches-Clocks_App.webp";
import Banner2 from "../Components/Banner2";
import { enqueueSnackbar } from "notistack";
import { Stack } from "@mui/system";
import SlideShowImagesComponent from "../Components/SlideShowImagesComponent";

const Container = styled(Sheet)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: "var(--bright)",
  paddingBottom: "50px",
}));

export const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pointsData1, setPointsData1] = useState([]);
  const [pointsData2, setPointsData2] = useState([]);

  useEffect(() => {
    loadNewArrivals()
      .then((response) => {
        setNewArrivals(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching New Arrivals", {
          variant: "error",
        });
      });

    loadBrands()
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching Brands", {
          variant: "error",
        });
      });

    // Fetch products for pointsData2
    const pointsData1Ids = [19, 39, 10];
    const pointsData1Attributes = [
      { top: "54%", left: "37%" },
      { top: "50%", left: "20%" },
      { top: "45%", left: "8%" },
    ];

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
    const pointsData2Ids = [25, 56, 10];
    const pointsData2Attributes = [
      { top: "7%", left: "25%" },
      { top: "40%", left: "15%" },
      { top: "45%", left: "3%" },
    ];

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

  const sliderNewArrivals = newArrivals.slice(0, 10);
  const sixBrands = brands.slice(0, 6);

  return (
    <>
      {pointsData1 && pointsData2 ? (
        <Container>
          <Carousel />
          <SlideShowImagesComponent />
          <Banner2 src={banner2} pointsData={pointsData2} />
          <SlideShowComponent products={sliderNewArrivals} />
          <Banner src={banner1} pointsData={pointsData1} />
          <Brands brands={sixBrands} />
          <ThreeCards />
        </Container>
      ) : (
        <Stack
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          className="circular-progress"
        >
          <CircularProgress />
        </Stack>
      )}
    </>
  );
};
