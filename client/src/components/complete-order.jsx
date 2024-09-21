'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiClient } from '../lib/api-client'
import { PAYMENT } from '../utils/constant'
import { ShoppingBag, CreditCard, Truck } from "lucide-react"
import { Link } from 'react-router-dom';
import shoe1 from "../assets/shoe2.png";
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store'
import ClipLoader from "react-spinners/ClipLoader";
export function CompleteOrderComponent() {
  const { userInfo } = useAppStore();
  const [loader, setloader] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloader(true)
    const { fullName, email, address, city, country, zipCode } = formData;
    const paymentData = {
      email: email, // Customer's email
      fullName,
      address,
      productName: 'NIKE DUNK HIGH RETRO', // Product name
      priceAmount: 300, // Product price
    };

    try {
      // Check if token exists
      if (!userInfo || !userInfo.token) {
        console.log('User is not logged in or token is missing');
        // Redirect to login page if no token is found
        window.location.href = '/login';
        return;
      }

      const token = userInfo.token;
      console.log('User token:', token);

      const response = await apiClient.post(PAYMENT, paymentData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in Authorization header
        },
      });

      if (response && response.status === 200) {
        // Redirect to the Stripe checkout session URL returned from the backend
        window.location.href = response.data.url;
      } else {
        console.log('Payment initiation failed:', response);
      }
    } catch (error) {
      // Handle unauthorized or other errors
      if (error.response && error.response.status === 401) {
        window.location.href = '/login'; // Redirect to login page if unauthorized
      } else {
        console.error('Error submitting order:', error);
      }
    }

    console.log('Order submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md">
        <Link to="/" className="text-2xl font-bold text-white">SNKRS</Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <ShoppingBag className="h-8 w-8 mr-2 text-orange-500" />
            Complete Your Order
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-orange-500" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-orange-500" />
                    Price : $300
                  </h2>
                </div>
              </div>

              <div>
                <img src={shoe1} alt="Shoe" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              {loader?<ClipLoader color="#ffffff" />:"Complete Order"}
            </Button>
          </form>
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md p-4 text-center text-white">
        <p>&copy; 2023 SNKRS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CompleteOrderComponent;
