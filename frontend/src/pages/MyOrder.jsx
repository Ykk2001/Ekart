import axios from "axios";
import {
  X,
  Package,
  ShoppingBag,
  Mail,
  User,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Chip,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyOrder = ({ onClose }) => {
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data?.success) {
        setUserOrder(res.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  const navigate=useNavigate();

  const getStatusConfig = (status) => {
    const currentStatus = status || "Paid";

    if (currentStatus === "Paid") {
      return {
        label: "Paid",
        color: "success",
        bgcolor: "#ecfdf5",
        textColor: "#047857",
        icon: <CheckCircle2 size={18} color="#047857" />,
      };
    }

    if (currentStatus === "Failed") {
      return {
        label: "Failed",
        color: "error",
        bgcolor: "#fef2f2",
        textColor: "#b91c1c",
        icon: <XCircle size={18} color="#b91c1c" />,
      };
    }

    return {
      label: currentStatus,
      color: "warning",
      bgcolor: "#fffbeb",
      textColor: "#b45309",
      icon: <Clock3 size={18} color="#b45309" />,
    };
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: { xs: 2.5, sm: 4 },
        border: "1px solid",
        borderColor: "grey.200",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: { xs: 2, sm: 3.5, md: 4.5 },
          py: { xs: 2.5, sm: 3.5 },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "grey.100",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2.5 }} sx={{ minWidth: 0, flex: 1 }}>
          <Avatar
            sx={{
              width: { xs: 46, sm: 58 },
              height: { xs: 46, sm: 58 },
              bgcolor: "primary.50",
              color: "primary.main",
              border: "1px solid",
              borderColor: "grey.200",
              flexShrink: 0,
            }}
          >
            <ShoppingBag size={24} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                letterSpacing: "-0.4px",
                fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.55rem" },
                lineHeight: 1.25,
              }}
            >
              Order History
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                mt: 0.25,
                lineHeight: 1.35,
              }}
            >
              Track and review details of your previous purchases
            </Typography>
          </Box>
        </Stack>

        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 2,
              p: { xs: 0.75, sm: 1 },
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ p: { xs: 1.5, sm: 3, md: 4 } }}>
        {loading ? (
          <Box
            sx={{
              minHeight: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
              py: 4,
            }}
          >
            <CircularProgress size={38} thickness={4} />
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1rem" }}>
              Retrieving your orders...
            </Typography>
          </Box>
        ) : userOrder?.length === 0 ? (
          <Box
            sx={{
              py: { xs: 6, sm: 9 },
              px: 2,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "grey.300",
              borderRadius: 3,
              backgroundColor: "grey.50",
            }}
          >
            <Package size={44} color="#94a3b8" style={{ marginBottom: 12 }} />
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.15rem" }}>
              No orders found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.5, fontSize: "0.95rem" }}
            >
              You haven't completed any purchases yet.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {userOrder.map((order) => {
              const status = getStatusConfig(order.status);

              return (
                <Paper
                  key={order._id}
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3, md: 3.5 },
                    borderRadius: { xs: 2.5, sm: 3.5 },
                    border: "1px solid",
                    borderColor: "grey.200",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      borderColor: "grey.300",
                      transform: { sm: "translateY(-4px)" },
                      boxShadow: {
                        xs: "0 6px 18px rgba(15, 23, 42, 0.08)",
                        sm: "0 20px 38px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.06)",
                      },
                    },
                  }}
                >
                  {/* Row 1: Order ID, Total Amount & Status Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "stretch", sm: "center" },
                      gap: { xs: 2, sm: 2.5 },
                      mb: { xs: 2, sm: 2.5 },
                    }}
                  >
                    {/* Left: Order ID */}
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          p: { xs: 1, sm: 1.25 },
                          borderRadius: 2,
                          bgcolor: "grey.100",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Package size={20} color="#475569" />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            display: "block",
                          }}
                        >
                          ORDER ID
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{
                            fontFamily: "monospace",
                            letterSpacing: "0.5px",
                            fontSize: { xs: "0.95rem", sm: "1.05rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          #{order._id}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Right: Amount & Status */}
                    <Stack
                      direction="row"
                      spacing={{ xs: 2, sm: 3 }}
                      alignItems="center"
                      justifyContent={{ xs: "space-between", sm: "flex-end" }}
                    >
                      <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            display: "block",
                          }}
                        >
                          TOTAL AMOUNT
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        >
                          <IndianRupee size={16} />
                          {Number(order.amount || 0).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </Typography>
                      </Box>

                      <Chip
                        icon={status.icon}
                        label={status.label}
                        size="medium"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          py: 2,
                          px: 1,
                          bgcolor: status.bgcolor,
                          color: status.textColor,
                          border: "1px solid transparent",
                          flexShrink: 0,
                        }}
                      />
                    </Stack>
                  </Box>

                  {/* Row 2: Customer Meta Info */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      flexWrap: "wrap",
                      gap: { xs: 1.25, sm: 3, md: 4 },
                      py: 1.5,
                      px: 2,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                      mb: { xs: 2, sm: 2.5 },
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <User size={16} color="#64748b" style={{ flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem", flexShrink: 0 }}>
                        Customer:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                        sx={{
                          fontSize: "0.9rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.user?.firstName || "Rohit"} {order.user?.lastName || "Singh"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <Mail size={16} color="#64748b" style={{ flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem", flexShrink: 0 }}>
                        Email:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                        sx={{
                          fontSize: "0.9rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.user?.email || "rohitsingh280504@gmail.com"}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Row 3: Items Grid */}
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{
                      display: "block",
                      mb: 1.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontSize: "0.8rem",
                    }}
                  >
                    Items Purchased ({order.products?.length || 0})
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr",
                        md: "repeat(2, 1fr)",
                      },
                      gap: { xs: 1.5, sm: 2 },
                    }}
                  >
                    {order.products?.map((product, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 2 },
                          p: { xs: 1.25, sm: 1.75 },
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "grey.200",
                          backgroundColor: "#fafafa",
                          minWidth: 0,
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Responsive Image Thumbnail */}
                        <Box
                          component="img"
                          src={
                            product.productId?.productImg?.[0]?.url ||
                            "/placeholder.png"
                          }
                          alt={product.productId?.productName || "Product"}
                          sx={{
                            width: { xs: 56, sm: 66 },
                            height: { xs: 56, sm: 66 },
                            minWidth: { xs: 56, sm: 66 },
                            borderRadius: 1.75,
                            objectFit: "cover",
                            bgcolor: "#e2e8f0",
                            border: "1px solid",
                            borderColor: "grey.200",
                            flexShrink: 0,
                          }}
                          onClick={()=>navigate(`/product/${product?.productId?._id}`)}
                        />

                        {/* Title & Metadata with Auto Wrap */}
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            title={product.productId?.productName || "Product Name"}
                            sx={{
                              fontSize: { xs: "0.92rem", sm: "0.98rem" },
                              lineHeight: 1.3,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              wordBreak: "break-word",
                              mb: 0.5,
                            }}
                          >
                            {product.productId?.productName || "Product Name"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.82rem", sm: "0.88rem" } }}
                          >
                            Quantity: <strong>{product.quantity || 1}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default MyOrder;