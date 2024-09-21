'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom';

export function PaymentSuccessComponent() {
  // Mock order details (in a real app, these would come from your order management system)
  const orderDetails = {
    orderNumber: "SNKRS-1234567",
    total: "$199.99",
    items: [
      { name: "Nike Air Max 90", size: "US 10", price: "$129.99" },
      { name: "SNKRS Elite Socks", size: "L", price: "$19.99" },
    ],
    estimatedDelivery: "May 15, 2023",
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
      <header
        className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md">
        <Link to="/home" className="text-2xl font-bold text-white">SNKRS</Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mt-2">Thank you for your purchase.</p>
          </div>
          
    
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-orange-500">
              <Package className="h-6 w-6 mr-2" />
              <span>Preparing your order</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Truck className="h-6 w-6 mr-2" />
              <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            
            <Link to="/home"
              className="block text-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
              <span className="inline-flex items-center">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md p-4 text-center text-white">
        <p>&copy; 2023 SNKRS. All rights reserved.</p>
      </footer>
    </div>)
  );
}

export default PaymentSuccessComponent;