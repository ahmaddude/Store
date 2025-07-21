import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
import { AlignJustify, Search } from 'lucide-react';
import { useState } from 'react';
import { useProductsStore } from '../store/productsStore'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts } = useProductsStore();
  const {user}=useAuthStore();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value); // call store method
  };
   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value.trim();
      if (term !== '') {
        searchProducts(term); // filters the products in the store
        navigate('/');        // go to the homepage
      }
    }
  };
  const {isAuthenticated,logout}=useAuthStore();
  const onLogout=async()=>{
  try {
    await logout();
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='flex items-center justify-between bg-gray-900 p-4 w-screen fixed top-0 left-0   '>
      {user && (<div>
        { console.log({user})}
        <Link to={"/profile"}>
        <img
              src={ user.profilePic||"/avatar.png"}
              alt="Profile"
              className="size-15 rounded-full object-cover border-4 "
            />
            </Link>
            </div>)}
        <div className="flex items-center space-x-4">
      <Search className="text-white" />
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-full text-white bg-transparent outline-none"
      />
    </div>
    <div>
      <Link to={"/"}><h2 className='text-3xl font-bold  text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>STORE</h2></Link>
    </div>
      <div className='flex items-center space-x-4'>
       <div className="relative group inline-block">
  <button className="cursor-pointer">
    <AlignJustify className="text-white" />
  </button>

  {isAuthenticated ?(<ul className="absolute right-0  z-10 hidden group-hover:block bg-white p-2 rounded shadow-lg space-y-2">
    <li>
      <Link to="/cart">
        <motion.button
          className="w-full py-2 px-20  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cart
        </motion.button>
      </Link>
    </li>

    <li>
      <Link to="/order">
        <motion.button
          className="w-full py-2 px-20  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Orders
        </motion.button>
      </Link>
    </li>
<li>
      
       <button
        onClick={() => setShowAddProduct(true)}
          className="w-full py-2 px-30  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200"
      >
        Add Product?
      </button>
    
    </li>
    <li>
      <motion.button
        onClick={onLogout}
          className="w-full py-2 px-20  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Logout
      </motion.button>
    </li>
    
  </ul>):(
    <ul className="absolute right-0  z-10 hidden group-hover:block bg-white p-2 rounded shadow-lg space-y-2">
    <li >
<button onClick={() => navigate('/signup')} className="w-full py-2 px-20  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200">
  SignUp
</button>
    </li>
     <li >
<button onClick={() => navigate('/login')} className="w-full py-2 px-20  font-bold rounded-lg shadow-lg hover:bg-gray-400 border-b-2 transition duration-200">
  LogIn
</button>
    </li>
    </ul>
  )}
</div>


        
        </div>
      
    </div>
  )
}

export default Navbar
