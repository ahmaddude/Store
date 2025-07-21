import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { Loader } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";


const ProductsDetails = () => {
  const {id}=useParams();
  const {addToCart}=useCartStore();
  const [quantity, setQuantity] = useState(1);
  const {product,getProductById,deleteProduct}=useProductsStore(); 
  const {user}=useAuthStore();
  useEffect(() => {
    getProductById(id);
  }, [id,getProductById]);

  const navigate=useNavigate();
  if(!product){
    return <Loader className=" size-10 animate-spin "/>
  }
    

    const handleAddToCart = () => {

    try {
      addToCart(product._id, quantity);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  };
  return (<>
    
    <div className="p-4 flex gap-8">
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover" />
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl text-emerald-700 mt-4">${product.price}</p>
        
      <input
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min={1}
        className='border p-1'
      />

      <button onClick={handleAddToCart} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>
        Add to Cart
      </button>
      {user.role==="seller"&&<button onClick={async()=>await deleteProduct(product._id) + navigate("/")} className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600'>delete product</button>}
      </div>
    </div>
    </>
  )
}

export default ProductsDetails
