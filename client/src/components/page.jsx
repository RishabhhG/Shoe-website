import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, Search, ChevronDown, X } from "lucide-react";
import logo from "../assets/logo.jpeg";
import shoe1 from "../assets/shoe2.png";
import shoe3 from "../assets/shoe3.jpg";
import shoe4 from "../assets/shoe4.jpg";
import { apiClient } from '../lib/api-client'
import {LOG_OUT} from '../utils/constant'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from "@/store";
import { useAuth0 } from "@auth0/auth0-react";


function EnhancedNikeSNKRS() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth0();


  const {userInfo, setUserInfo} = useAppStore();
  useEffect(()=>{
    console.log(userInfo)
  },[userInfo]);


  const toggleQuickView = () => setIsQuickViewOpen(!isQuickViewOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  
  const logingout = async(e) => {

    logout({ returnTo: window.location.origin });
   
    setUserInfo(null); // Reset user info in the global state
    console.log("Logged out");
    
    localStorage.removeItem('userData');

    // const response = await apiClient.post(LOG_OUT, {withCredentials : true});

    //     if (response.ok && data.success) {
    //         console.log("Logout successful");

    //         // Redirect to login page or update the UI
    //         window.location.href = '/login';
    //     } else {
    //         console.log("Logout failed:")
    //     }
    // console.log(response);
    // setUserInfo(null)
    // if(response.data.success){
    //   //setUserInfo(response.data.user)
    //   navigate('/')
    // }
    // else{
    //   navigate('/home')
    // }
    // console.log("Logged out");
  };

  const handlebuy = async()=>{
    navigate('/order')
  }
  
  


  return (
    <div className="min-h-screen bg-[#f5f0e6]">
      <header className="flex items-center justify-between px-6 py-4 bg-[#f5f0e6] shadow-md">
        <div className="flex items-center space-x-1">
          <img src={logo} alt="Nike SNKRS Logo" className="w-8 h-8" />
          <span className="font-extrabold text-xl text-gray-900">SNKRS</span>
        </div>

        <div className="flex items-center space-x-4">

          <Search className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-900" />
          <Heart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500" />
          <ShoppingBag className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-900" />
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={logingout}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transform -rotate-12 shadow-lg"></div>
              <img
                src={shoe1}
                alt="Nike Dunk High Retro"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-contain"
              />
              <div className="absolute bottom-0 left-20 flex space-x-2 p-4">
                <div className="w-5 h-5 bg-yellow-300 rounded-full hover:scale-110"></div>
                <div className="w-5 h-5 bg-red-500 rounded-full hover:scale-110"></div>
                <div className="w-5 h-5 bg-black rounded-full hover:scale-110"></div>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h1 className="text-5xl font-extrabold mb-4 ml-9">
                NIKE DUNK HIGH RETRO SNKRS
              </h1>
              <p className="mb-6 text-gray-700 ml-9">
                Nike's lifestyle Dunk Retro returns with a vibrant colour
                gradient that's sure to turn heads.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleQuickView}
                  className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-900 ml-9"
                >
                  Quick View
                </button>
                <Heart className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg">
              <div className="relative">
                <img
                  src={shoe3}
                  alt="Nike Dunk High Retro SE"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-500 to-pink-500">
                <h3 className="font-bold text-white mb-2 text-2xl">
                  Nike Dunk High Retro SE
                </h3>
                <p className="text-orange-100 text-3xl font-extrabold mb-4">
                  $135
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-orange-200 font-semibold uppercase tracking-wide">
                    Limited Edition
                  </span>
                  <button
                    className="bg-white p-3 rounded-full shadow-lg hover:bg-orange-100 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-500 focus:ring-white"
                    aria-label="Add to cart"
                  >
                    
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
  <h3 className="text-4xl font-bold mb-4 text-white text-center">JUST DO IT</h3>
  <p className="mb-4 text-orange-100 text-lg">
    A revolutionary system that adjusts to the shape of your foot.
  </p>
  <p className="text-yellow-200 text-3xl font-bold mb-4 mt-9">₹300</p>
  <div className="flex space-x-4 mb-4 mt-9">
    <select
      className="border p-2 rounded text-gray-700 bg-orange-300  "
      value={selectedSize}
      onChange={(e) => setSelectedSize(e.target.value)}
    >
      <option value="">SIZE</option>  
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>
  <button className="bg-white text-orange-500 px-6 py-2 rounded-full w-full shadow hover:bg-orange-100 transition duration-300 transform hover:scale-105 mt-9" onClick={handlebuy}>
    Buy Now
  </button>
</div>

            <div className="max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg">
              <div className="relative">
                <img
                  src={shoe4}
                  alt="Nike Dunk High Jordan 1  "
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-500 to-pink-500">
                <h3 className="font-bold text-white mb-2 text-2xl">
                  Nike Dunk High Jordan 1
                </h3>
                <p className="text-orange-100 text-3xl font-extrabold mb-4">
                  $135
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-orange-200 font-semibold uppercase tracking-wide">
                    Limited Edition
                  </span>
                  <button
                    className="bg-white p-3 rounded-full shadow-lg hover:bg-orange-100 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-500 focus:ring-white"
                    aria-label="Add to cart"
                  >
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isQuickViewOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
       <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-lg">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-2xl font-bold">Nike Dunk High Retro SNKRS</h2>
           <button onClick={toggleQuickView}>
             <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
           </button>
         </div>

         
         <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
           <img
             src={shoe1}
             alt="Nike Dunk High Retro"
             className="w-[400px] h-[400px] object-cover"
           />
           <div className="text-gray-700">
             <p className="text-lg">
               Price: <span className="text-red-500 font-bold text-xl">$110</span>
             </p>
             <p className="text-lg">Sizes Available: 7, 8, 9, 10</p>
             <button className="bg-black text-white px-6 py-2 mt-4 rounded-full shadow hover:bg-gray-900 ml-7">
               Add to Bag
             </button>
           </div>
         </div>
       </div>
     </div>
     
      )}
    </div>
  );
}

export default EnhancedNikeSNKRS;
