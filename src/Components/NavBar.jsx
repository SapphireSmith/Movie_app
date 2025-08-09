import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function NavItem({ label, href, isActive }) {
  return (
    <Link
      to={href}
      className={`relative px-4 py-2 text-lg font-medium ${
        isActive ? "text-blue-600 font-bold" : "text-gray-700"
      } hover:text-blue-600`}
    >
      {label}
    </Link>
  );
}

function NavList({ currentPath }) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Favorites", href: "/favorites" },
  ];

  return (
    <div className="relative flex space-x-6">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          label={item.label}
          href={item.href}
          isActive={currentPath === item.href}
        />
      ))}
    </div>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    // Simulate checking login status (replace with actual logic)
    const user = localStorage.getItem("movieAppProfile");
    setIsLoggedIn(!!user);

    // Set highlight position based on the active menu item
    const activeItem = navRef.current?.querySelector(
      `a[href="${currentPath}"]`
    );
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect();
      const containerRect = navRef.current.getBoundingClientRect();
      setHighlightStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [currentPath]);

  return (
    <Navbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 relative">
        <Typography
          as={Link}
          to="/"
          variant="h2"
          className="cursor-pointer text-center mb-2 font-extrabold tracking-tight"
          style={{
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
            color: "#3b3b7a",
            fontSize: "2rem",
            letterSpacing: "0.04em",
          }}
        >
          MovieBox
        </Typography>

        <div className="hidden lg:block relative" ref={navRef}>
          <NavList currentPath={currentPath} />
          {/* Simple Highlight */}
          <div
            className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300"
            style={highlightStyle}
          ></div>
        </div>

        {isLoggedIn ? (
          <IconButton
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={() => (window.location.href = "/profile")}
            className="hidden lg:inline-block"
          >
            <UserCircleIcon className="h-8 w-8" />
          </IconButton>
        ) : (
          <Button
            color="gray"
            className="hidden lg:inline-block"
            onClick={() => (window.location.href = "/login")}
          >
            Sign in
          </Button>
        )}

        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="mt-2 rounded-xl bg-white py-2">
          <NavList currentPath={currentPath} />
          {isLoggedIn ? (
            <Button
              className="mb-2"
              fullWidth
              onClick={() => (window.location.href = "/profile")}
            >
              Profile
            </Button>
          ) : (
            <Button
              className="mb-2"
              fullWidth
              onClick={() => (window.location.href = "/login")}
            >
              Sign in
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
