'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Key } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpeg";
import { apiClient } from '../lib/api-client'
import { FORGOT_PASSWORD } from '../utils/constant'

export function ForgotPasswordComponent() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make the API call to request password reset
      const response = await apiClient.post(FORGOT_PASSWORD, { email }, { withCredentials: true });
  
      // Check if the response indicates success
      if (response.data.success) {
        navigate('/reset');  // Redirect to reset page if the email exists
      }
  
    } catch (error) {
      // Check if the error response is 404, which means no account was found
      if (error.response && error.response.status === 404) {
        alert("No account found with this email address");
        navigate('/login');  // Redirect to login if no account found
      } else {
        console.error('An error occurred:', error);
        alert('An error occurred while processing your request');
      }
    }
  };

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
       <Link to="/">
          <div className="flex items-center space-x-1">
            <img src={logo} alt="Nike SNKRS Logo" className="w-8 h-8" />
            <span className="font-extrabold text-xl text-gray-900">SNKRS</span>
          </div>
        </Link>
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">

          <Link to="/"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <Key className="h-8 w-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password?</h1>
            <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions.</p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300" />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 py-2 rounded-md transition-all duration-300 transform hover:scale-105">
                <Send className="h-4 w-4 mr-2" />
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4 bg-green-50 p-6 rounded-lg">
              <div className="inline-block p-2 bg-green-100 rounded-full">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-600 font-semibold">Password reset link sent!</p>
              <p className="text-gray-600">Check your email for further instructions.</p>
              <Link
                href="/login"
                className="inline-block mt-4 text-orange-500 hover:text-orange-600 underline transition-colors duration-300">
                Return to login
              </Link>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md p-4 text-center text-white">
        <p>&copy; 2023 SNKRS. All rights reserved.</p>
      </footer>
    </div>)
  );
}

export default ForgotPasswordComponent;