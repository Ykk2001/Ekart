import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "../redux/productSlice.js";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const {
    cart,
    addresses = [],
    selectedAddress,
  } = useSelector((store) => store.product);

  const [showForm, setShowForm] = useState(addresses.length === 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE ADDRESS
  // =========================
  const handleSave = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.country
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const newAddress = {
      ...formData,
      id: Date.now(),
    }; //here we are adding id to each Address

    const newAddressIndex = addresses.length; //here newAddressIndex length -1

    dispatch(addAddress(newAddress)); //here we are saving the address  in redux store not in
    dispatch(setSelectedAddress(newAddressIndex));

    setShowForm(false); //after subting the address from do not show  and it should be reset back

    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });

    toast.success("Address saved successfully!");
  };

  //handlePayment logic -----------
  // async function handlePayment() {
  //   const accessToken = localStorage.getItem("accessToken");
  //   try {
  //     const {data} = await axios.post(
  //       `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
  //       {
  //         products: cart?.items?.map((item) => ({
  //           productId: item.productId._id,
  //           quantity: item.quantity,
  //         })),
  //         tax,
  //         shipping,
  //         amount: total,
  //         currency: "INR",
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       },
  //     );

  //     if (!data.success) {
  //       return toast.error("Something went wrong");
  //     }

  //     console.log("Razorpay data:", data);

  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //       amount: data.order.amount,
  //       currency: data.order.currency,
  //       order_id: data.order.id, //order ID from backend
  //       name: "Ekart",
  //       description: "Order Payment",
  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await axios.post(
  //             `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
  //             response,
  //             {
  //               headers: { Authorization: `Bearer ${accessToken}` },
  //             },
  //           );

  //           if (verifyRes.data.success) {
  //             toast.success("✅ Payment Successful!");
  //             dispatch(setCart({ items: [], totalPrice: 0 }));
  //             navigate("/order-success");
  //           } else {
  //             toast.error("❌ Payment Verification failed");
  //           }
  //         } catch (error) {
  //           toast.error("Error verifying payment", error);
  //         }
  //       },
  //       modal: {
  //         ondismiss: async function () {
  //           await axios.post(
  //             `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
  //             {
  //               razorpay_order_id: data.order.id,
  //               paymentFailed: true,
  //             },
  //             { headers: { Authorization: `Bearer ${accessToken}` } },
  //           );
  //           toast.error("Payment cancelled");
  //           // setLoading(false);
  //         },
  //       },
  //       prefill: {
  //         name: addresses[selectedAddress]?.fullName || formData.fullName,
  //         email: addresses[selectedAddress]?.email || formData.email,
  //         contact: addresses[selectedAddress]?.phone || formData.phone,
  //       },
  //       theme: { color: "#F472B6" },
  //     }; //options

  //     const rzp = new window.Razorpay(options);

  //     //Listen for payment failures
  //     rzp.on("payment.failed", async function () {
  //       await axios.post(
  //         `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
  //         {
  //           razorpay_order_id: data.order.id,
  //           paymentFailed: true,
  //         },
  //         { headers: { Authorization: `Bearer ${accessToken}` } },
  //       );
  //       toast.error("Payment Failed. Please try again.");
  //       // setLoading(false);
  //     });

  //     rzp.open();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while processing payment");
  //     // setLoading(false);
  //   }
  // }

 
  // =========================
  // PRICING
  // =========================
  const subtotal = Number(cart?.totalPrice || 0);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 10;

  const tax = Number((subtotal * 0.05).toFixed(2));

  const total = Number((subtotal + shipping + tax).toFixed(2));

   async function handlePayment() {
    const accessToken = localStorage.getItem("accessToken");

    try {
      // ---------------------------------------
      // 1. Check authentication
      // ---------------------------------------
      if (!accessToken) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      // ---------------------------------------
      // 2. Check cart
      // ---------------------------------------
      if (!cart?.items || cart.items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // ---------------------------------------
      // 3. Check selected address
      // ---------------------------------------
      const selectedAddr = addresses?.[selectedAddress];

      if (!selectedAddr) {
        toast.error("Please select a delivery address");
        return;
      }

      // ---------------------------------------
      // 4. Prepare products safely
      // ---------------------------------------
      const products = cart.items
        .filter((item) => {
          // Remove cart items whose product no longer exists
          if (!item?.productId) {
            console.warn("Invalid cart item:", item);
            return false;
          }

          return true;
        })
        .map((item) => ({
          productId:
            typeof item.productId === "object"
              ? item.productId._id
              : item.productId,

          quantity: item.quantity,
        }));

      // ---------------------------------------
      // 5. Check if valid products exist
      // ---------------------------------------
      if (products.length === 0) {
        toast.error(
          "Some products in your cart are no longer available. Please refresh your cart.",
        );
        return;
      }

      // ---------------------------------------
      // 6. Check for invalid product IDs
      // ---------------------------------------
      const invalidProduct = products.some(
        (item) => !item.productId || !item.quantity,
      );

      if (invalidProduct) {
        toast.error("Invalid product information in cart");
        return;
      }

      console.log("Products being sent:", products);

      // ---------------------------------------
      // 7. Create Razorpay order
      // ---------------------------------------
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
        {
          products,
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("Create order response:", data);

      // ---------------------------------------
      // 8. Check backend response
      // ---------------------------------------
      if (!data?.success || !data?.order) {
        toast.error(data?.message || "Unable to create payment order");
        return;
      }

      // ---------------------------------------
      // 9. Check Razorpay
      // ---------------------------------------
      if (!window.Razorpay) {
        toast.error("Razorpay failed to load. Please refresh the page.");
        return;
      }

      // ---------------------------------------
      // 10. Razorpay options
      // ---------------------------------------
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency || "INR",

        order_id: data.order.id,

        name: "Ekart",

        description: "Order Payment",

        // ---------------------------------------
        // Payment successful
        // ---------------------------------------
        handler: async function (response) {
          try {
            console.log("Razorpay payment response:", response);

            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            console.log("Payment verification response:", verifyRes.data);

            if (verifyRes.data?.success) {
              toast.success("✅ Payment Successful!");

              // Clear cart
              dispatch(
                setCart({
                  items: [],
                  totalPrice: 0,
                }),
              );

              // Go to success page
              navigate("/order-success");
            } else {
              toast.error(
                verifyRes.data?.message || "❌ Payment verification failed",
              );
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error.response?.data || error,
            );

            toast.error(
              error.response?.data?.message || "Error verifying payment",
            );
          }
        },

        // ---------------------------------------
        // Razorpay modal cancelled
        // ---------------------------------------
        modal: {
          ondismiss: async function () {
            try {
              await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
                {
                  razorpay_order_id: data.order.id,
                  paymentFailed: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                },
              );
            } catch (error) {
              console.error(
                "Payment cancellation API error:",
                error.response?.data || error,
              );
            }

            toast.error("Payment cancelled");
          },
        },

        // ---------------------------------------
        // Prefill customer details
        // ---------------------------------------
        prefill: {
          name: selectedAddr?.fullName || formData?.fullName || "",

          email: selectedAddr?.email || formData?.email || "",

          contact: selectedAddr?.phone || formData?.phone || "",
        },

        // ---------------------------------------
        // Razorpay theme
        // ---------------------------------------
        theme: {
          color: "#F472B6",
        },
      };

      // ---------------------------------------
      // 11. Create Razorpay instance
      // ---------------------------------------
      const rzp = new window.Razorpay(options);

      // ---------------------------------------
      // 12. Payment failed
      // ---------------------------------------
      rzp.on("payment.failed", async function (response) {
        console.error("Razorpay payment failed:", response);

        try {
          await axios.post(
            `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
            {
              razorpay_order_id: data.order.id,
              paymentFailed: true,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        } catch (error) {
          console.error(
            "Payment failure API error:",
            error.response?.data || error,
          );
        }

        toast.error("Payment Failed. Please try again.");
      });

      // ---------------------------------------
      // 13. Open Razorpay
      // ---------------------------------------
      rzp.open();
    } catch (error) {
      console.error("Payment processing error:", error.response?.data || error);
      console.log("Error in HandlePayment",error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/login");
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while processing payment",
      );
    }
  }

  // =========================
  // INPUT ICON STYLE
  // =========================
  const inputIcon = {
    color: "text.secondary",
    fontSize: 22,
  };

  // =========================
  // TEXT FIELD STYLE
  // =========================
  const textFieldSx = {
    "& .MuiInputLabel-root": {
      fontSize: "0.95rem",
    },

    "& .MuiInputBase-input": {
      fontSize: "1rem",
      py: 1.6,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#fafbfc",

      "&:hover": {
        backgroundColor: "#fff",
      },

      "&.Mui-focused": {
        backgroundColor: "#fff",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #f4f7fb 0%, #eef3f8 50%, #f8fafc 100%)",

        px: {
          xs: 1.5,
          sm: 3,
          md: 5,
        },

        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1250,
          mx: "auto",
        }}
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2.5,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "linear-gradient(135deg, #1565c0, #42a5f5)",

                color: "#fff",

                boxShadow: "0 8px 24px rgba(21,101,192,0.25)",
              }}
            >
              <LocationOnIcon sx={{ fontSize: 29 }} />
            </Box>

            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "1.55rem",
                    sm: "1.8rem",
                  },
                  letterSpacing: "-0.3px",
                }}
              >
                Checkout
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: "0.98rem",
                  color: "text.secondary",
                }}
              >
                Select or add your delivery address
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <Grid container spacing={3} alignItems="flex-start">
          {/* =================================================
              LEFT SIDE
          ================================================= */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "#e2e8f0",
                overflow: "hidden",

                backgroundColor: "#fff",

                boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
              }}
            >
              {showForm ? (
                /* =================================================
                   ADDRESS FORM
                ================================================= */
                <Box
                  component="form"
                  onSubmit={handleSave}
                  sx={{
                    p: {
                      xs: 2.5,
                      sm: 4,
                    },
                  }}
                >
                  {/* FORM HEADER */}
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        backgroundColor: "rgba(25,118,210,0.08)",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        color: "primary.main",
                      }}
                    >
                      <LocationOnIcon />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 750,
                        }}
                      >
                        Shipping Information
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.92rem",
                          color: "text.secondary",
                          mt: 0.2,
                        }}
                      >
                        Enter your delivery details
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 3 }} />

                  {/* FORM FIELDS */}
                  <Grid container spacing={2.2}>
                    {/* FULL NAME */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    {/* PHONE */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="+91 9543526475"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    {/* EMAIL */}
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        required
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    {/* ADDRESS */}
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        required
                        label="Address"
                        name="address"
                        placeholder="123 Street area"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        minRows={2}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{
                                  alignSelf: "flex-start",
                                  mt: 1,
                                }}
                              >
                                <HomeIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    {/* CITY */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="City"
                        name="city"
                        placeholder="Pune"
                        value={formData.city}
                        onChange={handleChange}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationCityIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>

                    {/* STATE */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="State"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Grid>

                    {/* ZIP */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="ZIP / Postal Code"
                        name="zip"
                        placeholder="411001"
                        value={formData.zip}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Grid>

                    {/* COUNTRY */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Country"
                        name="country"
                        placeholder="India"
                        value={formData.country}
                        onChange={handleChange}
                        sx={textFieldSx}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PublicIcon sx={inputIcon} />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* BUTTONS */}
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={1.5}
                    sx={{ mt: 3.5 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        px: 3.5,
                        py: 1.35,

                        borderRadius: 2,

                        textTransform: "none",

                        fontSize: "1rem",
                        fontWeight: 700,

                        boxShadow: "0 7px 18px rgba(25,118,210,0.25)",

                        "&:hover": {
                          boxShadow: "0 9px 22px rgba(25,118,210,0.3)",
                        },
                      }}
                    >
                      Save & Continue
                    </Button>

                    {addresses.length > 0 && (
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => setShowForm(false)}
                        sx={{
                          px: 3,
                          py: 1.35,

                          borderRadius: 2,

                          textTransform: "none",

                          fontSize: "1rem",
                          fontWeight: 650,
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Stack>
                </Box>
              ) : (
                /* =================================================
                   SAVED ADDRESSES
                ================================================= */
                <Box
                  sx={{
                    p: {
                      xs: 2.5,
                      sm: 4,
                    },
                  }}
                >
                  {/* HEADER */}

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    justifyContent="space-between"
                    alignItems={{
                      xs: "stretch",
                      sm: "center",
                    }}
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    {/* LEFT - TITLE */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          backgroundColor: "rgba(25,118,210,0.08)",
                          color: "primary.main",

                          flexShrink: 0,
                        }}
                      >
                        <LocationOnIcon />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: 750,
                            color: "#172033",
                          }}
                        >
                          Saved Addresses
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.92rem",
                            color: "text.secondary",
                            mt: 0.2,
                          }}
                        >
                          Choose your delivery address
                        </Typography>
                      </Box>
                    </Stack>

                    {/* RIGHT - ACTION BUTTONS */}
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      spacing={1.2}
                      width={{
                        xs: "100%",
                        sm: "auto",
                      }}
                    >
                      {/* ADD ADDRESS */}
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setShowForm(true)}
                        sx={{
                          minHeight: 42,

                          borderRadius: 2,

                          textTransform: "none",

                          fontSize: "0.92rem",
                          fontWeight: 700,

                          px: 2,

                          borderColor: "#cbd5e1",

                          "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: "rgba(25,118,210,0.04)",
                          },
                        }}
                      >
                        Add Address
                      </Button>

                      {/* PROCEED TO CHECKOUT */}
                      <Button
                        variant="contained"
                        disabled={selectedAddress === null}
                        onClick={() => handlePayment()}
                        sx={{
                          minHeight: 42,

                          borderRadius: 2,

                          textTransform: "none",

                          fontSize: "0.92rem",
                          fontWeight: 700,

                          px: 2.2,

                          boxShadow: "none",

                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(25,118,210,0.22)",
                          },

                          "&.Mui-disabled": {
                            backgroundColor: "#e5e7eb",
                            color: "#9ca3af",
                          },
                        }}
                      >
                        Proceed to Checkout
                      </Button>
                    </Stack>
                  </Stack>

                  <Divider sx={{ mb: 2.5 }} />

                  {/* ADDRESS LIST */}

                  <Stack spacing={2}>
                    {addresses.map((addr, index) => {
                      const isSelected = selectedAddress === index;

                      return (
                        <Card
                          key={addr.id || index}
                          onClick={() => dispatch(setSelectedAddress(index))}
                          elevation={0}
                          sx={{
                            position: "relative",
                            overflow: "hidden",
                            cursor: "pointer",

                            border: "1px solid",
                            borderColor: isSelected
                              ? "primary.main"
                              : "#e2e8f0",

                            borderRadius: 3,

                            backgroundColor: isSelected
                              ? "rgba(25, 118, 210, 0.04)"
                              : "#fff",

                            boxShadow: isSelected
                              ? "0 4px 18px rgba(25,118,210,0.12)"
                              : "0 2px 8px rgba(15,23,42,0.04)",

                            transition: "all 0.2s ease",

                            "&:hover": {
                              borderColor: isSelected
                                ? "primary.main"
                                : "#b8c2cc",

                              boxShadow: isSelected
                                ? "0 6px 22px rgba(25,118,210,0.16)"
                                : "0 6px 18px rgba(15,23,42,0.08)",

                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          {/* SELECTED LEFT INDICATOR */}
                          {isSelected && (
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 5,
                                backgroundColor: "primary.main",
                              }}
                            />
                          )}

                          <CardContent
                            sx={{
                              p: { xs: 2, sm: 2.5 },

                              "&:last-child": {
                                pb: { xs: 2, sm: 2.5 },
                              },
                            }}
                          >
                            {/* HEADER */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              spacing={2}
                            >
                              {/* USER INFO */}
                              <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  flexWrap="wrap"
                                >
                                  <Typography
                                    sx={{
                                      fontSize: { xs: "1rem", sm: "1.05rem" },
                                      fontWeight: 700,
                                      color: "#172033",
                                    }}
                                  >
                                    {addr.fullName}
                                  </Typography>

                                  {isSelected && (
                                    <Chip
                                      icon={
                                        <CheckCircleIcon
                                          sx={{
                                            fontSize: "16px !important",
                                          }}
                                        />
                                      }
                                      label="Selected"
                                      color="primary"
                                      size="small"
                                      sx={{
                                        height: 25,
                                        borderRadius: 1.5,
                                        fontSize: "0.75rem",
                                        fontWeight: 700,

                                        "& .MuiChip-icon": {
                                          ml: 0.7,
                                        },
                                      }}
                                    />
                                  )}
                                </Stack>

                                {/* PHONE + EMAIL */}
                                <Typography
                                  sx={{
                                    mt: 0.6,
                                    fontSize: "0.88rem",
                                    color: "text.secondary",
                                    lineHeight: 1.5,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {addr.phone}

                                  {addr.email && (
                                    <>
                                      <Box
                                        component="span"
                                        sx={{
                                          mx: 0.8,
                                          color: "#c5cbd3",
                                        }}
                                      >
                                        •
                                      </Box>
                                      {addr.email}
                                    </>
                                  )}
                                </Typography>
                              </Box>

                              {/* DELETE BUTTON */}
                              <IconButton
                                aria-label="Delete address"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  dispatch(deleteAddress(index));

                                  if (isSelected) {
                                    dispatch(setSelectedAddress(null));
                                  }

                                  toast.success(
                                    "Address deleted successfully!",
                                  );
                                }}
                                sx={{
                                  flexShrink: 0,

                                  width: 38,
                                  height: 38,

                                  borderRadius: 2,

                                  color: "#dc2626",

                                  border: "1px solid",
                                  borderColor: "#fecaca",

                                  backgroundColor: "#fff",

                                  transition: "all 0.2s ease",

                                  "&:hover": {
                                    color: "#b91c1c",
                                    backgroundColor: "#fef2f2",
                                    borderColor: "#fca5a5",

                                    transform: "scale(1.05)",
                                  },
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: 20 }} />
                              </IconButton>
                            </Stack>

                            <Divider
                              sx={{
                                my: 2,
                                borderColor: "#edf0f3",
                              }}
                            />

                            {/* ADDRESS */}
                            <Stack
                              direction="row"
                              spacing={1.3}
                              alignItems="flex-start"
                            >
                              {/* LOCATION ICON */}
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,

                                  flexShrink: 0,

                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",

                                  borderRadius: 2,

                                  backgroundColor: isSelected
                                    ? "rgba(25,118,210,0.09)"
                                    : "#f5f7fa",

                                  color: isSelected
                                    ? "primary.main"
                                    : "text.secondary",
                                }}
                              >
                                <HomeIcon sx={{ fontSize: 20 }} />
                              </Box>

                              {/* ADDRESS TEXT */}
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  sx={{
                                    mb: 0.3,
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    color: "#7a8491",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  Delivery Address
                                </Typography>

                                <Typography
                                  sx={{
                                    fontSize: "0.93rem",
                                    color: "#4b5563",
                                    lineHeight: 1.65,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {addr.address}, {addr.city}, {addr.state},{" "}
                                  {addr.zip}, {addr.country}
                                </Typography>
                              </Box>
                            </Stack>

                            {/* SELECTED FOOTER */}
                            {isSelected && (
                              <Box
                                sx={{
                                  mt: 2,

                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.8,

                                  px: 1.5,
                                  py: 1,

                                  borderRadius: 2,

                                  backgroundColor: "rgba(25,118,210,0.07)",
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    fontSize: 18,
                                    color: "primary.main",
                                  }}
                                />

                                <Typography
                                  sx={{
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: "primary.main",
                                  }}
                                >
                                  This address will be used for delivery
                                </Typography>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* EMPTY STATE */}
                    {addresses.length === 0 && (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: { xs: 5, sm: 7 },
                          px: 2,

                          border: "1px dashed",
                          borderColor: "#d7dee7",
                          borderRadius: 3,

                          backgroundColor: "#fafbfc",
                        }}
                      >
                        <Box
                          sx={{
                            width: 72,
                            height: 72,

                            mx: "auto",
                            mb: 2,

                            borderRadius: "50%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            backgroundColor: "rgba(25,118,210,0.07)",
                          }}
                        >
                          <LocationOnIcon
                            sx={{
                              fontSize: 38,
                              color: "primary.main",
                              opacity: 0.65,
                            }}
                          />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "#172033",
                          }}
                        >
                          No saved addresses
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.6,
                            fontSize: "0.9rem",
                            color: "text.secondary",
                          }}
                        >
                          Add an address to continue with checkout.
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* =================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================= */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,

                border: "1px solid",
                borderColor: "#e2e8f0",

                p: {
                  xs: 2.5,
                  sm: 3,
                },

                position: {
                  md: "sticky",
                },

                top: 20,

                backgroundColor: "#fff",

                boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
              }}
            >
              {/* HEADER */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2.5 }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,

                    borderRadius: 2,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    backgroundColor: "rgba(25,118,210,0.08)",

                    color: "primary.main",
                  }}
                >
                  <LocalShippingIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 750,
                    }}
                  >
                    Order Summary
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "text.secondary",
                    }}
                  >
                    Your order details
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 2.5 }} />

              <Stack spacing={2}>
                {/* SUBTOTAL */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ display: "flex", gap: "12px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.secondary",
                    }}
                  >
                    Subtotal ({cart?.items?.length || 0} items)
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                    }}
                  >
                    ₹{subtotal.toLocaleString("en-IN")}
                  </Typography>
                </Stack>

                {/* SHIPPING */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ display: "flex", gap: "12px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.secondary",
                    }}
                  >
                    Shipping
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "success.main",
                    }}
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </Typography>
                </Stack>

                {/* TAX */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ display: "flex", gap: "12px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.secondary",
                    }}
                  >
                    Tax (5%)
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.98rem",
                      fontWeight: 700,
                    }}
                  >
                    ₹{tax.toFixed(2)}
                  </Typography>
                </Stack>

                <Divider />

                {/* TOTAL */}
                <Box
                  sx={{
                    p: 1.8,
                    borderRadius: 2,

                    backgroundColor: "rgba(25,118,210,0.045)",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ display: "flex", gap: "12px" }}
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                      }}
                    >
                      Total
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "primary.main",
                      }}
                    >
                      ₹{total.toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* =================================================
                  BENEFITS
              ================================================= */}
              <Box
                sx={{
                  mt: 3,

                  p: 2.2,

                  borderRadius: 2.5,

                  background:
                    "linear-gradient(135deg, rgba(46,125,50,0.055), rgba(46,125,50,0.025))",

                  border: "1px solid rgba(46,125,50,0.14)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.92rem",
                    fontWeight: 750,
                    mb: 1.5,
                    color: "success.dark",
                  }}
                >
                  Checkout Benefits
                </Typography>

                <Stack spacing={1.5}>
                  {/* FREE SHIPPING */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalShippingIcon
                      sx={{
                        fontSize: 20,
                        color: "success.main",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.84rem",
                        color: "success.dark",
                        fontWeight: 600,
                      }}
                    >
                      Free shipping on orders over ₹50
                    </Typography>
                  </Stack>

                  {/* RETURNS */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AssignmentReturnIcon
                      sx={{
                        fontSize: 20,
                        color: "success.main",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.84rem",
                        color: "success.dark",
                        fontWeight: 600,
                      }}
                    >
                      30-day return policy
                    </Typography>
                  </Stack>

                  {/* SECURITY */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SecurityIcon
                      sx={{
                        fontSize: 20,
                        color: "success.main",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.84rem",
                        color: "success.dark",
                        fontWeight: 600,
                      }}
                    >
                      Secure checkout with SSL encryption
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddressForm;
