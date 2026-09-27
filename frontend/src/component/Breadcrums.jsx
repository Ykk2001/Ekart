
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Breadcrums = ({ product }) => {
    return (
        <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{
                fontSize: "16px",
                mb: 2,
                px: { xs: 1, md: 0 }, // Slight padding alignment for mobile/desktop container
                "& .MuiBreadcrumbs-separator": {
                    color: "text.disabled",
                },
            }}
        >
            <Link
                component={RouterLink}
                to="/"
                underline="hover"
                sx={{ color: "text.secondary", "&:hover": { color: "#db2777" } }}
            >
                Home
            </Link>

            <Link
                component={RouterLink}
                to="/products"
                underline="hover"
                sx={{ color: "text.secondary", "&:hover": { color: "#db2777" } }}
            >
                Products
            </Link>

            <Typography 
                sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#1f2937",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: { xs: "180px", sm: "350px", md: "550px" },
                }}
            >
                {product?.productName}
            </Typography>
        </Breadcrumbs>
    );
};

export default Breadcrums;