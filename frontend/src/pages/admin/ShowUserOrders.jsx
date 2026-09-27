import OrderCard from '@/component/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowUserOrders = () => {
  const params = useParams()
  const [userOrder, setUserOrder] = useState([])
  const [loading, setLoading] = useState(true)

  const getUserOrders = async () => {
    try {
      setLoading(true)
      const accessToken = localStorage.getItem("accessToken")
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/user-order/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      if (res.data?.success) {
        setUserOrder(res.data.orders || [])
        console.log("Orders in ShowUserOrders Component",res.data)
      }
    } catch (error) {
      console.error("Failed to fetch user orders:", error)
      setUserOrder([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.userId) {
      getUserOrders()
    }
  }, [params.userId])

  return <OrderCard userOrder={userOrder} loading={loading} />
}

export default ShowUserOrders;