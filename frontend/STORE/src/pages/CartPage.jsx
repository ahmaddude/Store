import { useEffect } from "react";
import { useCartStore } from "../store/cartStore"
import {  Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useOrderStore } from "../store/orderStore";

const CartPage = () => {
    const { cartProducts,getCartProducts,checkout,url } = useCartStore();
    const { order } = useOrderStore();
    useEffect(() => {
    getCartProducts();
  }, [getCartProducts]); 
     if (!cartProducts || cartProducts.length === 0) {return <div className="text-white text-center">Your cart is empty</div>;}

  
  const handleCheckout = async () => {
    try {
       checkout();
       order();
      if(url){window.location.href = url; }else{
        console.error('URL not found');
      }     
    } catch (error) {
      console.error('Error during checkout:', error);
      
    }
  }

  return (
    <div >
    <div className=" p-4 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {cartProducts.map((product) => (
          <Link to={`/product/${product.product._id}`} key={product.product._id}>
            <div key={product.product._id} className="bg-gray-800 p-4 rounded">
            <img src={product.product.image} alt={product.product.name} className="w-full h-full object-cover" />
            <h2 className="text-white font-semibold">{product.product.name}</h2>
          </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <motion.button  onClick={ handleCheckout} className=" w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-blue-600to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600
            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2 transition duration-200">Chickout!</motion.button>
      </div>
      </div>
  )
}

export default CartPage
