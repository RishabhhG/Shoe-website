'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus, ArrowRight } from "lucide-react";
import shoe1 from "../assets/shoe2.png";
import logo from "../assets/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";


export function Homepage2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => setIsLoggedIn(false);
  const handleSignup = () => {
    navigate('/signup');
  };


  return (
    <div className="min-h-screen bg-orange-50">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link to="/">
      <div className="flex items-center space-x-1">
          <img src={logo} alt="Nike SNKRS Logo" className="w-8 h-8" />
          <span className="font-extrabold text-xl text-gray-900">SNKRS</span>
        </div>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleLogin}
                className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleSignup}
                className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </>
          )}
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-orange-400 to-orange-500 rounded-[2rem] overflow-hidden shadow-xl">
          <div className="w-full md:w-1/2 p-8 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_10%,_transparent_70%)]"></div>
            <img
              alt="Stylized sneaker"
              className="w-full h-auto relative z-10 transform rotate-[-20deg] hover:rotate-0 transition-transform duration-500"
              height="400"
              src={shoe1}
              style={{ aspectRatio: "400/400", objectFit: "contain" }}
              width="400"
            />
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div className="w-4 h-4 rounded-full bg-black"></div>
            </div>
          </div>

          {/* White Section: Improved Home Page Layout */}
          <div className="w-full md:w-1/2 p-8 bg-white rounded-l-[2rem]">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Welcome to SNKRS</h1>
            <p className="text-xl text-gray-600 mb-6">
              Explore our latest collection of sneakers and find your perfect match.
              Join the SNKRS community to stay updated on all the latest drops!
            </p>

            {/* CTA Section for the Homepage */}
            <div className="flex items-center space-x-4 mb-8">
              <Button className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-orange-600 transition-colors">
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition-colors">
                Learn More
              </Button>
            </div>
         
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage2;
