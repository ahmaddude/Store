import { useEffect, useState } from 'react';
import { useProductsStore } from '../store/productsStore';
import { useCategoryStore } from '../store/categoryStore';
import { Loader, Mail, Paperclip, User } from 'lucide-react';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddProductCard from '../components/addProductCard'



const HomePage = () => {
   const { fetchProducts,allProducts,getCP,searchProducts } = useProductsStore();
   const {fetchCategories,categories}=useCategoryStore();
   const [showAddProduct, setShowAddProduct] = useState(false);
   

   

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
  }, [fetchProducts,fetchCategories,searchProducts]);
if(!allProducts||allProducts.length===0)return <Loader className="animate-spin" />



  return (
    <div >
    
       <div className="flex flex-auto justify-between ">
      {/* categories */}
      <div className="min-h-screen bg-gray-900 p-4  absolute left-0 top-0 mt-20 ">
        <h2 className="text-3xl font-bold   bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text mb-5">Categories</h2>
        <div>
        <ul>{categories.map((category) => (
          <li><motion.button key={category._id}
        onClick={()=>getCP(category._id)}
        className=' text-white font-bold  rounded mb-2 '
        >
          {category.name}
          
        </motion.button>
        <hr  className='text-gray-400'/></li>
        ))}</ul>
      </div>
      </div>

      {/* products */}
      <div className=" p-4 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {allProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div key={product._id} className="bg-gray-800 p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <h2 className="text-white font-semibold">{product.name}</h2>
          </div>
          </Link>
        ))}
      </div>
    </div>
   
     {showAddProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur flex justify-center items-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative z-50">
            {/* Close button */}
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
            >
              ✕
            </button>
            <AddProductCard />
          </div>
        </div>
      )}
    </div>
  )
  
}

export default HomePage
