import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import "../style/cartStyle.css"; //cartStyle Component
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart } = useSelector((store) => store.product); //accessing the cart store from productSlice
  console.log("cart from cart.jsx", cart);

  const subTotal = cart?.totalPrice; //total Price of the Products
  const shipping = subTotal > 299 ? 0 : 10; //shipping Charges
  const tax = subTotal * 0.05; //5%;
  const total = subTotal + shipping + tax;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = "http://localhost:5000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await axios.get(`${API}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.data.success) {
          dispatch(setCart(res.data.cart));
        }
      } catch (error) {
        console.log(error);
      }
    } //loadCart
    loadCart();
  }, [dispatch]);//load the cart from the database and set the cart inside the redux store

  async function handleUpdateQuantity(productId, type) {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  } //handleUpdate

  async function handleRemove(productId) {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          productId: productId,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart)); //after deleting the product from the cart we are updating the cart inside the redux slice
        toast.success("Product Removed From cart..");
      }
    } catch (error) {
      console.log(error);
    }
  } //handleRemove

  return (
    <Box className="cart-page">
      {cart?.items?.length > 0 ? (
        <Box className="cart-container">
          {/* Page Title */}
          <Typography className="cart-title">Shopping Cart</Typography>

          <Box className="cart-layout">
            {/* ================= CART ITEMS ================= */}
            <Box className="cart-items">
              {cart?.items?.map((product) => (
                <Card className="product-card" key={product?._id}>
                  <Box className="product-card-content">
                    {/* Product Image + Information */}
                    <Box className="product-info">
                      <img
                        src={product?.productId?.productImg?.[0]?.url}
                        alt={product?.name}
                        className="product-image"
                      />

                      <Box className="product-details">
                        <Typography className="product-name">
                          {product?.productId?.productName}
                        </Typography>

                        <Typography className="product-price">
                          ₹{product.price}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Quantity */}
                    <Box className="quantity-container">
                      <IconButton
                        className="quantity-button"
                        size="small"
                        onClick={() =>
                          handleUpdateQuantity(
                            product?.productId?._id,
                            "decrease",
                          )
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography className="quantity">
                        {product.quantity}
                      </Typography>

                      <IconButton
                        className="quantity-button"
                        size="small"
                        onClick={() =>
                          handleUpdateQuantity(
                            product?.productId?._id,
                            "increase",
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Total Price */}
                    <Typography className="item-total">
                      ₹{product.price * product.quantity}
                    </Typography>

                    {/* Remove */}
                    <Box
                      className="remove-button"
                      onClick={() => handleRemove(product?.productId?._id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                      <Typography>Remove</Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>

            {/* ================= ORDER SUMMARY ================= */}
            <Card className="summary-card">
              <CardHeader
                title={
                  <Typography className="summary-title">
                    Order Summary
                  </Typography>
                }
              />

              <CardContent className="summary-content">
                {/* Subtotal */}
                <Box className="summary-row">
                  <Typography>
                    SubTotal ({cart?.items?.length} items)
                  </Typography>

                  <Typography>₹{subTotal.toLocaleString("en-IN")}</Typography>
                </Box>

                {/* Shipping */}
                <Box className="summary-row">
                  <Typography>Shipping</Typography>

                  <Typography>₹{shipping}</Typography>
                </Box>

                {/* Tax */}
                <Box className="summary-row">
                  <Typography>Tax (5%)</Typography>

                  <Typography>₹{tax}</Typography>
                </Box>

                <Divider />

                {/* Total */}
                <Box className="summary-row total-row">
                  <Typography>Total</Typography>

                  <Typography>₹{total.toLocaleString("en-IN")}</Typography>
                </Box>

                {/* Promo Code */}
                <Box className="promo-container">
                  <TextField placeholder="Promo Code" size="small" fullWidth />

                  <Button variant="outlined" className="apply-button">
                    Apply
                  </Button>
                </Box>

                {/* Place Order */}
                <Button
                  variant="contained"
                  fullWidth
                  className="place-order-button"
                >
                  Place Order
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outlined"
                  fullWidth
                  className="continue-shopping-button"
                >
                  <Link to="/products" style={{ textDecoration: "none" }}>
                    Continue Shopping
                  </Link>
                </Button>

                {/* Policies */}
                <Box className="policies">
                  <Typography>Free Shipping on orders over 299</Typography>

                  <Typography>30-days return policy</Typography>

                  <Typography>Secure checkout with SSL encryption</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        /* ================= EMPTY CART ================= */
        <Box className="empty-cart">
          <Box className="empty-cart-icon">
            <ShoppingCartIcon />
          </Box>

          <Typography className="empty-cart-title">
            Your Cart is Empty
          </Typography>

          <Typography className="empty-cart-description">
            Looks like you haven't added anything to your cart yet
          </Typography>

          <Button
            variant="contained"
            className="start-shopping-button"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
