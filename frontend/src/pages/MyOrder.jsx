import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "@/component/OrderCard";

const MyOrder = () => {
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
      setUserOrder([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return <OrderCard userOrder={userOrder} loading={loading} />;
};

export default MyOrder;