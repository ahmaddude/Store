import { useState, useEffect } from "react";
import { Lock, Mail, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, isLoading,  isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await Login(email, password);
  };

  return (
      <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-xl p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Log in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mb-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
  );
};

export default LoginPage;
