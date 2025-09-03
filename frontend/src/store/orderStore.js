import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api/auth"
  : "/api/auth";

export const useOrderStore = create((set) => ({
  orders: [],

  // create an order
  createOrder: async () => {
    try {
      const res = await axios.post(
        `${API_URL}/create-order`,
        {}, // body
        { withCredentials: true } // config
      );
      console.log("Order created:", res.data);
      // optionally refresh orders
      // set((state) => ({ orders: [...state.orders, res.data.order] }));
    } catch (error) {
      console.error("Error creating order:", error);
    }
  },

  // fetch all orders
  getOrders: async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`, { withCredentials: true });
      set({ orders: res.data.orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
}));
