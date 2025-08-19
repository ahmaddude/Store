import { create } from 'zustand';
import axios from 'axios';
const API_URL =import.meta.env.MODE==="development"? 'http://localhost:5000/api/auth': '/api/auth'; 

export const useOrderStore = create((set) => ({
    orders:[],
    order:async()=>{
    try {
      await axios.post(`${API_URL}/create-order`,{withCredentials:true});
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  },
     getOrders:async()=>{
    try {
        const res=await axios.get(`${API_URL}/orders`,{withCredentials:true});
        set({orders:res.data.orders})
        console.log(res.data.orders)
    } catch (error) {
      console.error('Error fetching cart products:', error);
        
    }
  }
}))