import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Breadcrums = ({ product }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb"  sx={{
                fontSize: "14px",
            }}>
            <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
            >
                Home
            </Link>

            <Link
                component={RouterLink}
                to="/products"
                underline="hover"
                color="inherit"
            >
                Products
            </Link>

            <Typography color="text.primary" sx={{
                    fontSize: "14px",
                }}>
                {product?.productName}
            </Typography>
        </Breadcrumbs>
    );
};

export default Breadcrums;