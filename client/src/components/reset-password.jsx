'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"
import { Link } from 'react-router-dom';
import { apiClient } from '../lib/api-client'
import { CHANGE_PASSWORD } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom';


export function ResetPasswordComponent() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useParams(); // Get the token from URL params
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      // Validate password
      if (!password) {
        setError('Password cannot be empty');
        return;
      }

      // API call to reset password
      const response = await apiClient.post(`${CHANGE_PASSWORD}/${token}`, { password });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setError('');
        // Redirect to login after successful reset
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error in reset password', err);
    }
    
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
      <header
        className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md">
        <Link href="/" className="text-2xl font-bold text-white">SNKRS</Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <Link
            href="/login"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Reset Your Password</h1>
            <p className="text-gray-600 mt-2">Enter your new password below</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                  placeholder="Enter your new password" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
           
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 py-2 rounded-md transition-all duration-300 transform hover:scale-105">
              Reset Password
            </Button>
          </form>
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md p-4 text-center text-white">
        <p>&copy; 2023 SNKRS. All rights reserved.</p>
      </footer>
    </div>)
  );
}

export default ResetPasswordComponent;