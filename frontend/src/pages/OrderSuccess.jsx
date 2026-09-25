import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Container,
  Divider,
  Paper,
} from "@mui/material";
import {
  CheckCircle,
  ShoppingBag,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ffffff 0%, #f8fafc 55%, #fdf2f8 100%)",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent
            sx={{
              px: { xs: 3, sm: 6 },
              py: { xs: 5, sm: 7 },
              textAlign: "center",
            }}
          >
            {/* Success Icon */}
            <Box
              sx={{
                width: 110,
                height: 110,
                mx: "auto",
                mb: 3,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                boxShadow: "0 10px 30px rgba(34,197,94,0.18)",
              }}
            >
              <CheckCircle size={68} strokeWidth={1.8} color="#16a34a" />
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              color="text.primary"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem" },
                mb: 1.5,
              }}
            >
              Payment Successful 🎉
            </Typography>

            {/* Message */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 430,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Thank you for your purchase! Your order has been placed
              successfully and is being prepared for delivery.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Order Status */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 4,
                borderRadius: 3,
                backgroundColor: "#f8fafc",
                border: "1px solid",
                borderColor: "#e2e8f0",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1.5}
              >
                <PackageCheck size={24} color="#16a34a" />

                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  Your order is confirmed
                </Typography>
              </Stack>
            </Paper>

            {/* Buttons */}
            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingBag size={20} />}
                endIcon={<ArrowRight size={18} />}
                onClick={() => navigate("/products")}
                sx={{
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
                  boxShadow: "0 8px 20px rgba(219,39,119,0.25)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #be185d 0%, #9d174d 100%)",
                    boxShadow: "0 10px 25px rgba(219,39,119,0.3)",
                  },
                }}
              >
                Continue Shopping
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => navigate("/myorder")}
                sx={{
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#be185d",
                  borderColor: "#db2777",
                  "&:hover": {
                    borderColor: "#be185d",
                    backgroundColor: "#fdf2f8",
                  },
                }}
              >
                View My Orders
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OrderSuccess;
