import { create } from 'zustand';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth'; 


export const useCartStore = create((set) => ({
  cart: null,
  cartProducts: [],
  url: null,
  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${API_URL}/add-to-cart`,
        { productId, quantity },
        { withCredentials: true } 
      );
      set({ cart: res.data.cart });
      console.log('added to cart', res.data.cart);
    } catch (err) {
      console.error(err);
    }
  },
  getCartProducts:async()=>{
    try {
      const res=await axios.get(`${API_URL}/view-cart`,{withCredentials:true});
      set({cartProducts:res.data.cart.items})
      console.log('cart products',res.data.cart.items)
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  },
  checkout:async()=>{
    try {
      const res=await axios.post(`${API_URL}/create-payment`,{withCredentials:true});
      set({url:res.data.url})
      console.log('checkout',res.data);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }
}));
