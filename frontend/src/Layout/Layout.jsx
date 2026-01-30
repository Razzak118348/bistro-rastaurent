import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/NavBar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";


const Layout = () => {
    return (
        <div  className="
        min-h-screen transition-colors duration-300 ease-in-out
        bg-white text-black
        dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 dark:text-white
      ">
            <Navbar></Navbar>
<main  className="
        pt-20 lg:pt-16 mx-auto
    w-full
    min-h-[calc(100vh-240px)]
    px-4 sm:px-6 md:px-8 lg:px-10
    2xl:max-w-screen-2xl
    3xl:max-w-[1650px]
        ">
    <Outlet

></Outlet>
</main>
<Footer></Footer>
        </div>
    );
};

export default Layout;