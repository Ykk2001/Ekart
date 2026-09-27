
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminSales() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/orders/sales`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setStats({
            totalUsers: response.data.totalUsers,
            totalProducts: response.data.totalProducts,
            totalOrders: response.data.totalOrders,
            totalSales: response.data.totalSales,
            sales: response.data.sales,
          });
        }
      } catch (err) {
        console.error("Error fetching admin sales data:", err);
        setError(err.response?.data?.message || "Failed to load sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val || 0);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          width: "100%",
        }}
      >
        <CircularProgress sx={{ color: "#ec4899" }} />
      </Box>
    );
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Products", value: stats.totalProducts },
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Total Sales", value: formatCurrency(stats.totalSales) },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Horizontally centers the inner wrapper
        bgcolor: "#f8fafc",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", // Constrains width so it sits cleanly centered
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
        }}
      >
        {error && (
          <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Stats Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
  
          }}
        >
          {statCards.map((card, idx) => (
            <Card
              key={idx}
              sx={{
                background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                color: "#ffffff",
                borderRadius: 3,
                boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 20px -3px rgba(236, 72, 153, 0.35)",
                },
              }}
            >
              <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "rgba(255, 255, 255, 0.85)",
                    mb: 1,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Sales Chart Card */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9",
            p: 2,
          }}
        >
          <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1e293b" }}
            >
              Sales Overview (Last 30 Days)
            </Typography>
          </Box>

          <CardContent sx={{ height: 350, p: 0, "&:last-child": { pb: 0 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.sales}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(val) => `₹${val.toLocaleString("en-IN")}`}
                />
                <Tooltip
                  formatter={(val) => [formatCurrency(val), "Sales"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                  itemStyle={{ color: "#db2777", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#ec4899"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}