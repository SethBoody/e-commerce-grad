import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({}) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
