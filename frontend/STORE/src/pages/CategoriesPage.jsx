import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { useCategoryStore } from "../store/categoryStore";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import FlipCard from "../components/productCard"; // your flipping card

const CategoriesPage = () => {
  const { fetchProducts, allProducts, categoryProducts, getCP } = useProductsStore();
  const { fetchCategories, categories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  if (!allProducts || allProducts.length === 0)
    return <Loader className="animate-spin text-white mx-auto mt-10" />;

  const displayedProducts = selectedCategory ? categoryProducts : allProducts;

  const handleCategoryClick = (catID) => {
    setSelectedCategory(catID);
    if (catID) {
      getCP(catID); // fetch products for this category
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex gap-8">
        {/* Sidebar Categories */}
        <div className="w-64 bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-3 py-2 rounded ${!selectedCategory ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                onClick={() => handleCategoryClick(null)}
              >
                All Products
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat._id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === cat._id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleCategoryClick(cat._id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {displayedProducts.map(product => (
            <FlipCard key={product._id} product={product}
              
              frontContent={
                <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-48 h-48 object-contain mb-4"/>
                  <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              }
              backContent={
                <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Product Details</h3>
                  <p className="text-gray-600 text-center mb-4">{product.description}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
