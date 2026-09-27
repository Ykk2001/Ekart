import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const accessToken = localStorage.getItem("accessToken");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/orders/all",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (data.success) {
        setOrders(data.orders || []);
        console.log("All orders in AdminOrders Component",data,data.orders)
      }
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [accessToken]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChip = (status) => {
    const s = status?.toLowerCase();
    if (s === "paid" || s === "completed" || s === "delivered") {
      return (
        <Chip
          label={status}
          size="medium"
          sx={{
            fontWeight: 700,
            fontSize: "0.875rem",
            px: 0.5,
            py: 0.25,
            bgcolor: "#ecfdf5",
            color: "#059669",
            border: "1px solid #a7f3d0",
          }}
        />
      );
    }
    if (s === "pending" || s === "processing") {
      return (
        <Chip
          label={status}
          size="medium"
          sx={{
            fontWeight: 700,
            fontSize: "0.875rem",
            px: 0.5,
            py: 0.25,
            bgcolor: "#fffbeb",
            color: "#d97706",
            border: "1px solid #fde68a",
          }}
        />
      );
    }
    if (s === "failed" || s === "cancelled") {
      return (
        <Chip
          label={status}
          size="medium"
          sx={{
            fontWeight: 700,
            fontSize: "0.875rem",
            px: 0.5,
            py: 0.25,
            bgcolor: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          }}
        />
      );
    }
    return (
      <Chip
        label={status || "Unknown"}
        size="medium"
        sx={{
          fontWeight: 700,
          fontSize: "0.875rem",
          px: 0.5,
          py: 0.25,
          bgcolor: "#f3f4f6",
          color: "#4b5563",
          border: "1px solid #e5e7eb",
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#fafbfc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 1 } }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#1e293b"
              letterSpacing="-0.5px"
            >
              Orders Management
            </Typography>
            <Typography
              variant="body1"
              color="#64748b"
              mt={0.5}
              fontSize="1.05rem"
            >
              Monitor customer transactions, order status, and details in
              real-time.
            </Typography>
          </Box>

          <Tooltip title="Refresh Orders">
            <IconButton
              onClick={fetchOrders}
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                p: 1.25,
                "&:hover": { bgcolor: "#f8fafc" },
              }}
            >
              <RefreshIcon fontSize="medium" color="action" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Orders Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
          }}
        >
          <CardHeader
            sx={{ px: 3.5, py: 3, bgcolor: "#ffffff" }}
            title={
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "primary.50",
                    color: "primary.main",
                  }}
                >
                  <ReceiptLongOutlinedIcon fontSize="medium" />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#1e293b"
                  fontSize="1.25rem"
                >
                  All Orders
                </Typography>
                <Chip
                  label={orders.length}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    bgcolor: "#f1f5f9",
                    color: "#475569",
                    height: 26,
                  }}
                />
              </Stack>
            }
          />
          <Divider />

          {loading ? (
            <Box sx={{ p: 4 }}>
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={64}
                  sx={{ my: 1.5, borderRadius: 1.5 }}
                />
              ))}
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 12 }}>
              <ReceiptLongOutlinedIcon
                sx={{ fontSize: 72, color: "#cbd5e1", mb: 2 }}
              />
              <Typography
                variant="h6"
                fontWeight={600}
                color="#475569"
                fontSize="1.2rem"
              >
                No orders found
              </Typography>
              <Typography variant="body1" color="#94a3b8" mt={0.5}>
                There are no placed customer orders to display.
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 800 }} aria-label="admin orders table">
                  <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        ORDER ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        USER
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        PRODUCTS
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        AMOUNT
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        STATUS
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.875rem",
                          py: 2.2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        DATE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((order) => (
                        <TableRow
                          key={order._id}
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            transition: "background-color 0.15s ease-in-out",
                          }}
                        >
                          {/* Order ID */}
                          <TableCell sx={{ py: 2.5 }}>
                            <Typography
                              fontFamily="monospace"
                              fontWeight={700}
                              fontSize="1rem"
                              color="#4338ca"
                            >
                              #{order._id?.slice(-8) || order._id}
                            </Typography>
                          </TableCell>

                          {/* Customer */}
                          <TableCell sx={{ py: 2.5 }}>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  fontSize: "1rem",
                                  fontWeight: 600,
                                  bgcolor: "#e0e7ff",
                                  color: "#4338ca",
                                }}
                              >
                                {order.user?.firstName ? (
                                  order.user.firstName.charAt(0).toUpperCase()
                                ) : (
                                  <PersonOutlineOutlinedIcon fontSize="medium" />
                                )}
                              </Avatar>
                              <Box>
                                <Typography
                                  fontWeight={600}
                                  color="#1e293b"
                                  fontSize="0.95rem"
                                >
                                  {order.user?.firstName || "Unknown User"}
                                </Typography>
                                <Typography
                                  color="#64748b"
                                  fontSize="0.85rem"
                                  display="block"
                                >
                                  {order.user?.email || "—"}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          {/* Products */}
                          <TableCell sx={{ py: 2.5 }}>
                            <Stack spacing={0.6}>
                              {order.products?.map((p, idx) => {
                                const productName =
                                  p.productName ||
                                  p.title ||
                                  p.name ||
                                  p.productId?.title ||
                                  p.productId?.name ||
                                  "Product";
                                return (
                                  <Typography
                                    key={idx}
                                    color="#64748b"
                                    fontSize="0.95rem"
                                  >
                                    <Box
                                      component="span"
                                      fontWeight={600}
                                      color="#1e293b"
                                    >
                                      {productName}
                                    </Box>{" "}
                                    <Box
                                      component="span"
                                      color="#94a3b8"
                                      fontSize="0.9rem"
                                    >
                                      × {p.quantity || 1}
                                    </Box>
                                  </Typography>
                                );
                              })}
                            </Stack>
                          </TableCell>

                          {/* Total Amount */}
                          <TableCell sx={{ py: 2.5 }}>
                            <Typography
                              fontWeight={700}
                              color="#0f172a"
                              fontSize="1.05rem"
                            >
                              ₹{order.amount?.toLocaleString("en-IN") || 0}
                            </Typography>
                          </TableCell>

                          {/* Status */}
                          <TableCell sx={{ py: 2.5 }}>
                            {getStatusChip(order.status)}
                          </TableCell>

                          {/* Date */}
                          <TableCell sx={{ py: 2.5 }}>
                            <Typography color="#64748b" fontSize="0.95rem">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )
                                : "—"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: "1px solid #f1f5f9",
                  color: "#475569",
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                  ".MuiTablePagination-select": {
                    fontSize: "0.9rem",
                  },
                }}
              />
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AdminOrders;
