import React from "react";
import { Box, Typography } from "@mui/material";

import {
    DashboardOutlined,
    AddBoxOutlined,
    Inventory2Outlined,
    PeopleOutlineOutlined,
    EditOutlined,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <Box
            sx={{
                display: {
                    xs: "none",
                    md: "block",
                },

                width: 300,

                height: "100vh",

                boxSizing: "border-box",

                borderRight: "1px solid #f3b6c8",

                backgroundColor: "#fdf2f8",

                p: 4,

                flexShrink: 0,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,

                    mt: 10,

                    px: 1,
                }}
            >
                {/* ================= Dashboard ================= */}
                <NavLink
                    to="/dashboard/sales"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: 2,

                                p: 1.5,

                                width: "100%",

                                boxSizing: "border-box",

                                borderRadius: 2,

                                cursor: "pointer",

                                color: isActive
                                    ? "#ffffff"
                                    : "#6b21a8",

                                backgroundColor: isActive
                                    ? "#db2777"
                                    : "transparent",

                                transition: "0.2s",

                                "&:hover": {
                                    backgroundColor: isActive
                                        ? "#db2777"
                                        : "#fce7f3",
                                },
                            }}
                        >
                            <DashboardOutlined
                                sx={{
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Dashboard
                            </Typography>
                        </Box>
                    )}
                </NavLink>

                {/* ================= Add Product ================= */}
                <NavLink
                    to="/dashboard/add-product"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: 2,

                                p: 1.5,

                                width: "100%",

                                boxSizing: "border-box",

                                borderRadius: 2,

                                cursor: "pointer",

                                color: isActive
                                    ? "#ffffff"
                                    : "#6b21a8",

                                backgroundColor: isActive
                                    ? "#db2777"
                                    : "transparent",

                                transition: "0.2s",

                                "&:hover": {
                                    backgroundColor: isActive
                                        ? "#db2777"
                                        : "#fce7f3",
                                },
                            }}
                        >
                            <AddBoxOutlined
                                sx={{
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Add Product
                            </Typography>
                        </Box>
                    )}
                </NavLink>

                {/* ================= Products ================= */}
                <NavLink
                    to="/dashboard/products"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: 2,

                                p: 1.5,

                                width: "100%",

                                boxSizing: "border-box",

                                borderRadius: 2,

                                cursor: "pointer",

                                color: isActive
                                    ? "#ffffff"
                                    : "#6b21a8",

                                backgroundColor: isActive
                                    ? "#db2777"
                                    : "transparent",

                                transition: "0.2s",

                                "&:hover": {
                                    backgroundColor: isActive
                                        ? "#db2777"
                                        : "#fce7f3",
                                },
                            }}
                        >
                            <Inventory2Outlined
                                sx={{
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Products
                            </Typography>
                        </Box>
                    )}
                </NavLink>

                {/* ================= Users ================= */}
                <NavLink
                    to="/dashboard/users"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: 2,

                                p: 1.5,

                                width: "100%",

                                boxSizing: "border-box",

                                borderRadius: 2,

                                cursor: "pointer",

                                color: isActive
                                    ? "#ffffff"
                                    : "#6b21a8",

                                backgroundColor: isActive
                                    ? "#db2777"
                                    : "transparent",

                                transition: "0.2s",

                                "&:hover": {
                                    backgroundColor: isActive
                                        ? "#db2777"
                                        : "#fce7f3",
                                },
                            }}
                        >
                            <PeopleOutlineOutlined
                                sx={{
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Users
                            </Typography>
                        </Box>
                    )}
                </NavLink>

                {/* ================= Orders ================= */}
                <NavLink
                    to="/dashboard/orders"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: 2,

                                p: 1.5,

                                width: "100%",

                                boxSizing: "border-box",

                                borderRadius: 2,

                                cursor: "pointer",

                                color: isActive
                                    ? "#ffffff"
                                    : "#6b21a8",

                                backgroundColor: isActive
                                    ? "#db2777"
                                    : "transparent",

                                transition: "0.2s",

                                "&:hover": {
                                    backgroundColor: isActive
                                        ? "#db2777"
                                        : "#fce7f3",
                                },
                            }}
                        >
                            <EditOutlined
                                sx={{
                                    fontSize: 24,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Orders
                            </Typography>
                        </Box>
                    )}
                </NavLink>
            </Box>
        </Box>
    );
}