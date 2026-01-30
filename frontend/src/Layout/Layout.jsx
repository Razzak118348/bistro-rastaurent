import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Components/Shared/NavBar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import useTheme from "../hooks/useTheme";

const Layout = () => {
  const theme = useTheme();

  // Apply dark mode to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-300 ease-in-out font-inter">
      <Navbar />

      <main
        className="
          pt-20 lg:pt-16 mx-auto
          w-full
          min-h-[calc(100vh-240px)]
          px-4 sm:px-6 md:px-8 lg:px-10
          2xl:max-w-screen-2xl
          3xl:max-w-[1650px]
        "
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
