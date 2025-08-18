import { useEffect, useState } from 'react';
import { useProductsStore } from '../store/productsStore';
import { Loader } from 'lucide-react';
import AddProductCard from '../components/addProductCard'
import FlipCard from '../components/productCard'; 
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
   const { fetchProducts,allProducts,searchProducts, } = useProductsStore();
   const [showAddProduct, setShowAddProduct] = useState(false);
   
const navigate = useNavigate();
   

  useEffect(() => {
    fetchProducts();
    
  }, [fetchProducts,searchProducts]);
if(!allProducts||allProducts.length===0)return <Loader className="animate-spin" />

 
  return (
    <div >
    
       {/* Best Seller Section */}
<div className="p-5 jp-4 bg-gradient-to-r from-gray-600 via-gray-300  rounded-xl shadow-2xl flex flex-col md:flex-row items-center  relative">
  {/* Ribbon Badge */}
  

  {/* Product Image */}
  <img
    src={allProducts[2]?.image}
    alt={allProducts[2]?.name}
    className="w-150 h-100 object-contain  rounded-xl  md:mb-0 md:mr-6"
  />

  {/* Product Info */}
  <div className="text-white max-w-md">
    <h2 className="text-6xl font-bold mb-2">Best Seller</h2>
    <h3 className="text-3xl font-semibold mb-2">{allProducts[2]?.name}</h3>
    <p className="mb-4">{allProducts[2]?.description}</p>
    <p className="text-xl font-bold mb-4">${allProducts[2]?.price}</p>
    <button onClick={() => navigate(`/product/${allProducts[2]?._id}`)}
 className="bg-white text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
      Check it out
    </button>
  </div>
</div>

      
      {/* products */}
      
        <div className="p-4 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
      {allProducts.map((product) => (
        <FlipCard key={product._id} product={product} />
      ))}



      
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
