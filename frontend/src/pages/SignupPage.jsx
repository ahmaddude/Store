import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { Loader, Lock, Mail, User } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignupPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="w-full max-w-xl bg-gray-900 text-white rounded-2xl shadow-xl p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-400 mt-2">Sign up to start shopping</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <PasswordStrengthMeter password={password} />


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
  );
};

export default SignupPage;
