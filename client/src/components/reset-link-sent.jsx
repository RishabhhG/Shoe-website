'use client'

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, Home } from "lucide-react"

export function ResetLinkSentComponent() {
  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
      <header
        className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md">
        <Link to="/" className="text-2xl font-bold text-white">SNKRS</Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Mail className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Check Your Email</h1>
            <p className="text-gray-600 mt-4">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md p-4 text-center text-white">
        <p>&copy; 2023 SNKRS. All rights reserved.</p>
      </footer>
    </div>)
  );
}

export default ResetLinkSentComponent;