import {useState,useEffect} from "react";
import { useAuthStore } from '../store/authStore';
import { useProductsStore } from '../store/productsStore'; 
import {  useNavigate } from "react-router-dom";
import {  Search } from 'lucide-react';

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts } = useProductsStore();
    const { user } = useAuthStore();
  
  

  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
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
        navigate('/search'); // navigate to the search results page
             
      }
    }
  };
  const {isAuthenticated,logout}=useAuthStore();
  const onLogout=async()=>{
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    console.log(error)
  }
}
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isAuthenticated && <>
        <Typography as="li" variant="small" className="p-1 font-normal text-black">
        <button onClick={() => navigate('/cart')} className="flex items-center">Cart</button>
      </Typography>
      
      <Typography as="li" variant="small" className="p-1 font-normal text-black">
        <button onClick={() => navigate('/order')} className="flex items-center">Orders</button>
      </Typography>
      </>}
      <Typography as="li" variant="small" className="p-1 font-normal text-black">
        <button onClick={()=>navigate('/categories')} className="flex items-center">Categories</button>
      </Typography>
      {isAuthenticated && user && user.role==="seller" &&
        <Typography as="li" variant="small" className="p-1 font-normal text-black">
        <button onClick={()=>navigate('/add-Product')} className="flex items-center">Add a product</button>
      </Typography>
      }
    </ul>
  );
  const permissions=(isAuthenticated ?
          
            
           <div className="flex items-center gap-x-1">
            <Button onClick={() => navigate('/profile')} variant="text" size="sm" className="  text-black">
              <span>Account</span>
            </Button>
            
            <Button onClick={onLogout} variant="text" size="sm" className="  text-black">
              <span>Log Out</span>
            </Button>
            </div> 
            :
            <div className="flex items-center gap-x-1">
            <Button onClick={() => navigate('/login')} variant="text" size="sm" className=" text-black">
              <span>Log In</span>
            </Button>
            <Button onClick={() => navigate('/signup')} variant="gradient" size="sm" className=" text-black">
              <span>Sign Up</span>
            </Button>
            </div>
  )
  return (
    <div className="w-full">
    <Navbar className="fixed top-0 z-50 w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <Typography as="button" onClick={()=>navigate('/')} className="mr-4 cursor-pointer py-1.5 font-medium text-black">
          Store
        </Typography>

        <div className="flex items-center gap-2 w-full max-w-md lg:max-w-xs relative text-black">
          <Search className="text-black" />
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="w-full text-black bg-transparent outline-none"
      />
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center ">
          <div className="hidden lg:flex items-center gap-x-1">{permissions}</div>
                    </div>
          <IconButton
            variant="text"
            className="m-auto h-6 w-6 text-black lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        
  {isAuthenticated ? (
    <div className="flex justify-between lg:hidden mt-2 gap-2">
      <Button onClick={() => navigate('/profile')} variant="text" size="sm" className="w-full text-black">
        Account
      </Button>
      <Button onClick={onLogout} variant="text" size="sm" className="w-full text-black">
        Log Out
      </Button>
    </div>
  ) : (
    <div className="flex justify-between lg:hidden mt-2 gap-2">
      <Button onClick={() => navigate('/login')} variant="text" size="sm" className="w-full text-black">
        Log In
      </Button>
      <Button onClick={() => navigate('/signup')} variant="gradient" size="sm" className="w-full">
        Sign Up
      </Button>
    </div>
  )}

          
        
      </Collapse>
    </Navbar>
    </div>
  );
}
export default StickyNavbar