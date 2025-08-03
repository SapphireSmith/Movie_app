import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function NavItem({ label, href }) {
  return (
    <a href={href}>
      <Typography as="li" color="blue-gray" className="p-1 font-medium">
        {label}
      </Typography>
    </a>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <NavItem label="Home" href="/" />
      <NavItem label="Movies" href="/movies" />
      <NavItem label="Favorites" href="/favorites" />
    </ul>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    // Simulate checking login status (replace with actual logic)
    const user = localStorage.getItem("movieAppProfile");
    setIsLoggedIn(!!user);

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
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

        <div className="hidden lg:block">
          <NavList />
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
          <NavList />
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
