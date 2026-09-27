
import React, { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

export default function Navbar() {
  const { User } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const admin = User?.role === "admin";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  // --------------------------------
  // Logout
  // --------------------------------

  async function logoutHandler() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data) {
        toast.success(res.data.message);

        dispatch(setUser(null));

        setMobileOpen(false);

        navigate("/login");
      }
    } catch (error) {
      console.log("Error while logout", error);

      toast.error(error?.response?.data?.message || "Logout failed");
    }
  }

  // --------------------------------
  // Close mobile drawer
  // --------------------------------

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // --------------------------------
  // Logo
  // --------------------------------

  const logo = (
    <Box
      component={Link}
      to="/"
      onClick={closeMobileMenu}
      sx={{
        display: "flex",
        alignItems: "center",

        gap: 0.8,

        textDecoration: "none",

        color: "#de628f",

        flexShrink: 0,

        minWidth: 0,
      }}
    >
      <ShoppingCartIcon
        sx={{
          fontSize: {
            xs: 32,
            sm: 35,
            md: 38,
          },

          flexShrink: 0,
        }}
      />

      <Typography
        sx={{
          fontSize: {
            xs: 24,
            sm: 26,
            md: 29,
          },

          fontWeight: 800,

          letterSpacing: 1.2,

          whiteSpace: "nowrap",
        }}
      >
        KART
      </Typography>
    </Box>
  );

  // --------------------------------
  // Desktop navigation style (Font size increased for better visibility)
  // --------------------------------

  const navLinkStyle = {
    textDecoration: "none",

    color: "#374151",

    fontWeight: 600, // Slightly bolder for better visibility

    fontSize: "16.5px", // Increased from 15px

    whiteSpace: "nowrap",

    transition: "0.2s",

    "&:hover": {
      color: "#de628f",
    },
  };

  return (
    <>
      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",

          boxSizing: "border-box",

          backgroundColor: "rgba(252, 228, 236, 0.96)",

          color: "#374151",

          borderBottom: "1px solid #f3c5d5",

          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            boxSizing: "border-box",

            minHeight: {
              xs: 64,
              sm: 70,
              md: 76,
            },

            px: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
            },

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2.5,

            overflow: "visible",
          }}
        >
          {/* ================================= */}
          {/* LOGO */}
          {/* ================================= */}

          {logo}

          {/* ================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",

              justifyContent: "flex-end",

              gap: {
                md: 2.5,
                lg: 3,
              },

              minWidth: 0,

              flexShrink: 1,
            }}
          >
            {/* Home */}

            <Box component={Link} to="/" sx={navLinkStyle}>
              Home
            </Box>

            {/* Products */}

            <Box component={Link} to="/products" sx={navLinkStyle}>
              Products
            </Box>

            {/* Profile */}

            {User && (
              <Box
                component={Link}
                to={`/profile/${User._id}`}
                sx={navLinkStyle}
              >
                Hello, {User.firstName}
              </Box>
            )}

            {/* Dashboard */}

            {admin && (
              <Box component={Link} to="/dashboard/sales" sx={navLinkStyle}>
                Dashboard
              </Box>
            )}

            {/* Cart */}

            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: "#374151",

                flexShrink: 0,

                "&:hover": {
                  color: "#de628f",

                  backgroundColor: "#fce4ec",
                },
              }}
            >
              <Badge
                badgeContent={cart?.items?.length || 0}
                color="error"
                max={99}
              >
                <AddShoppingCartIcon sx={{ fontSize: "24px" }} />
              </Badge>
            </IconButton>

            {/* Login / Logout */}

            {User ? (
              <Button
                onClick={logoutHandler}
                variant="contained"
                sx={{
                  backgroundColor: "#de628f",

                  textTransform: "none",

                  borderRadius: 2,

                  px: 3,
                  py: 0.8,

                  fontWeight: 700,
                  fontSize: "16px", // Increased button text size

                  whiteSpace: "nowrap",

                  flexShrink: 0,

                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#c94f7c",

                    boxShadow: "none",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                sx={{
                  backgroundColor: "#8e44ad",

                  textTransform: "none",

                  borderRadius: 2,

                  px: 3,
                  py: 0.8,

                  fontWeight: 700,
                  fontSize: "16px", // Increased button text size

                  whiteSpace: "nowrap",

                  flexShrink: 0,

                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#74368f",

                    boxShadow: "none",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* ================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================= */}

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              color: "#374151",

              flexShrink: 0,

              "&:hover": {
                backgroundColor: "#fce4ec",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ========================================= */}
      {/* MOBILE DRAWER */}
      {/* ========================================= */}

      <Drawer anchor="right" open={mobileOpen} onClose={closeMobileMenu}>
        <Box
          sx={{
            width: {
              xs: 280,
              sm: 320,
            },

            maxWidth: "100vw",

            height: "100%",

            backgroundColor: "#fff",

            boxSizing: "border-box",
          }}
        >
          {/* Drawer Header */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              px: 2,

              py: 2,

              backgroundColor: "#fce4ec",
            }}
          >
            {logo}

            <IconButton
              onClick={closeMobileMenu}
              sx={{
                color: "#374151",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Navigation */}

          <List
            sx={{
              px: 1,
              py: 2,
            }}
          >
            {/* Home */}

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={closeMobileMenu}
                sx={{
                  borderRadius: 2,
                  py: 1.2,

                  "&:hover": {
                    backgroundColor: "#fce4ec",
                  },
                }}
              >
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "16px", // Larger font for mobile list items
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Products */}

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/products"
                onClick={closeMobileMenu}
                sx={{
                  borderRadius: 2,
                  py: 1.2,

                  "&:hover": {
                    backgroundColor: "#fce4ec",
                  },
                }}
              >
                <ListItemText
                  primary="Products"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Profile */}

            {User && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/profile/${User._id}`}
                  onClick={closeMobileMenu}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,

                    "&:hover": {
                      backgroundColor: "#fce4ec",
                    },
                  }}
                >
                  <ListItemText
                    primary={`Hello, ${User.firstName}`}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            {/* Dashboard */}

            {admin && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/dashboard/sales"
                  onClick={closeMobileMenu}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,

                    "&:hover": {
                      backgroundColor: "#fce4ec",
                    },
                  }}
                >
                  <ListItemText
                    primary="Dashboard"
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            {/* Cart */}

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/cart"
                onClick={closeMobileMenu}
                sx={{
                  borderRadius: 2,
                  py: 1.2,

                  "&:hover": {
                    backgroundColor: "#fce4ec",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 2,
                  }}
                >
                  <Badge badgeContent={cart?.items?.length || 0} color="error">
                    <AddShoppingCartIcon />
                  </Badge>

                  <ListItemText
                    primary="Cart"
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          {/* Login / Logout */}

          <Box
            sx={{
              p: 2,
            }}
          >
            {User ? (
              <Button
                fullWidth
                variant="contained"
                onClick={logoutHandler}
                sx={{
                  backgroundColor: "#de628f",

                  textTransform: "none",

                  borderRadius: 2,

                  fontWeight: 700,
                  fontSize: "16px",

                  py: 1.2,

                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#c94f7c",

                    boxShadow: "none",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  closeMobileMenu();

                  navigate("/login");
                }}
                sx={{
                  backgroundColor: "#8e44ad",

                  textTransform: "none",

                  borderRadius: 2,

                  fontWeight: 700,
                  fontSize: "16px",

                  py: 1.2,

                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#74368f",

                    boxShadow: "none",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}