import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import {  useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Loader } from "lucide-react";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
import HomePage from "./pages/HomePage";
import ProductsDetails from "./pages/ProductsDetails";
import Navbar from "./components/navbar";
import CartPage from "./pages/cartPage";
import OrderPage from "./pages/orderPage";

//protect routes thatrequire authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated,user}=useAuthStore();
  
  if(!isAuthenticated){
    return <Navigate to="/login"replace/>
  }
  if( !user.isVerified){
    console.log(user)
    return <Navigate to="/verify-email"replace/>
  }

  return children
}

//redirect authenticated users to the home page

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {
  const {isCheckingAuth,checkAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  if(isCheckingAuth)return <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 flex items-center justify-center text-gray-500"><Loader className=" size-10 animate-spin "/></div>
  return (
    <div className="min-h-screen bg-gradient-to-br
     from-gray-700 via-gray-400 to-gray-700 
     flex items-center justify-center relative overflow-hidden "
     >
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage/></RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
        <Route path="/verify-email" element={<EmailVerificationPage/>}/>
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>}/>
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductsDetails/>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
        <Route path="/order" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}/>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App



