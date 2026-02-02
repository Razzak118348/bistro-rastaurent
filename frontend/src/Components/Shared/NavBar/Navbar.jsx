import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import useTheme from "../../../hooks/useTheme";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // demo user
  const user = { name: "John Doe", photoURL: "" };
  const LogOut = () => console.log("Logged out");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= NAV ITEMS ================= */
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Menu", path: "/menu" },
    { name: "Our Shop", path: "/shop" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full font-inter z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        {/* ================= LOGO ================= */}
        <Link className="text-xl font-bold text-yellow-400 font-cinzel" to="/">
          Bistro Restaurant
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">

          {/* Links */}
          {navLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-yellow-400 transition ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Cart */}
          <Link to={"/cart"} className="relative cursor-pointer">
            <FaShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
              8
            </span>
          </Link>

          {/* ================= PROFILE ================= */}
          {user && (
            <div className="relative">
              <img
                onClick={() => setProfileOpen(!profileOpen)}
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/219/219986.png"
                }
                alt="user"
                className="w-9 h-9 rounded-full border-2 border-green-600 cursor-pointer"
              />

              <AnimatePresence>
                {profileOpen  && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-xl border"
                  >
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="text-sm font-semibold text-center">
                        {user.name}
                      </p>
                    </div>

                    <button
                      onClick={LogOut}
                      className="w-full p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ================= MOBILE BUTTONS ================= */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <ul className="flex flex-col px-6 py-5 gap-5">

              {navLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className=""
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Cart */}
              <div className="">
              <Link to={"/cart"} className="flex items-center gap-2">  <FaShoppingCart /> Cart (8)</Link>
              </div>

              {/* Profile Card */}
              {user && (
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/219/219986.png"
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>

                  <button
                    onClick={() => {
                      LogOut();
                      setMenuOpen(false);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
