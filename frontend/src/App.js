import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import { Home } from "./Pages/Home";
import { Detail } from "./Pages/Detail";
import "./Components/style.css";
import { Cart } from "./Pages/Cart";
import kitchenBanner from "./Assets/kitchen_banner.jpg";
import roomBanner from "./Assets/room_banner.jpg";
import livingRoomBanner from "./Assets/livingRoomBanner.jpg";
import SlidesContext from "./Shared/Context/SlidesContext";
import { Checkout } from "./Pages/Checkout";
import { CategoryPage } from "./Pages/CategoryPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { SnackbarProvider } from "notistack";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const user = localStorage.getItem("user");
  const slidesImages = [
    {
      imgPath: kitchenBanner,
      title: "Elevate Your Space",
      subTitle: "Stylish furniture collection for your kitchen and bedrooms",
      backgroundColor: "#1B4B66",
      mainDivClass: "tag",
      linkTo: `/category?categoryName=Furniture`,
    },
    {
      imgPath: roomBanner,
      title: "Revamp Your Bedroom",
      subTitle: "UP TO 20% OFF on Bedroom Furniture",
      backgroundColor: "#B00020",
      mainDivClass: "tag1",
      linkTo: `/category?categoryName=Furniture`,
    },
    {
      imgPath: livingRoomBanner,
      title: "Enhance Your Living Room",
      subTitle: "UP TO 20% OFF on Living Room Furniture",
      backgroundColor: "#B00020",
      mainDivClass: "tag1",
      linkTo: `/category?categoryName=Furniture`,
    },
  ];
  return (
    <SlidesContext.Provider value={slidesImages}>
      <SnackbarProvider
        autoHideDuration={3500}
        maxSnack={5}
        disableWindowBlurListener
        preventDuplicate
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/detail/:productId" element={<Detail />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<PageNotFound />} />
              {user && (
                <>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart" element={<Cart />} />
                </>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </SlidesContext.Provider>
  );
}

export default App;
