'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { apiClient } from '../lib/api-client'
import { SIGNUP_ROUTE } from '../utils/constant'
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppStore } from '@/store'


export function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    const response = await apiClient.post(SIGNUP_ROUTE, {
      email,
      password,
      name,
      recaptchaToken,  // Include the token in the request
    }, { withCredentials: true });

    console.log(response);

    if (response.data.success) {
      setUserInfo(response.data.user)
      navigate('/home')
    } else {
      navigate('/')
    }
  }

  const handleGoogleSignup = () => {
    console.log('Google signup attempted')
  }

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  }

  return (
    <div className="min-h-screen bg-[#f5f2e8] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <Link to="/">
          <div className="flex items-center space-x-1">
            <img src={logo} alt="Nike SNKRS Logo" className="w-8 h-8" />
            <span className="font-extrabold text-xl text-gray-900">SNKRS</span>
          </div>
        </Link>
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-[#ff6b1a] to-[#ff8c4d] rounded-[60px] p-8 shadow-lg relative overflow-hidden">
          <h2 className="text-4xl font-bold text-white mb-6 relative z-10 text-center">Join SNKRS</h2>
          <Button
            onClick={handleGoogleSignup}
            className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 mb-6 relative z-10 flex items-center justify-center transition-all duration-300 hover:shadow-md">
            <GoogleIcon className="mr-2 h-5 w-5" />
            <span>Sign up with Google</span>
          </Button>
          <Separator className="my-6 bg-white/50" />
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="relative">
              <Label htmlFor="name" className="text-white mb-1 block">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white pl-10 pr-4 py-2 rounded-full"
                required />
              <UserIcon className="absolute left-3 top-[27px] h-5 w-5 text-gray-400 content-center" />
            </div>
            <div className="relative">
              <Label htmlFor="email" className="text-white mb-1 block">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white pl-10 pr-4 py-2 rounded-full"
                required />
              <MailIcon className="absolute left-3 top-[27px] h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-white mb-1 block">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white pl-10 pr-12 py-2 rounded-full"
                required />
              <LockIcon className="absolute left-3 top-[27px] h-5 w-5 text-gray-400" />
              <button
                type="button"
                className="absolute right-2 top-[22px] text-white"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOffIcon className="h-2 w-2 text-gray-400" />
                ) : (
                  <EyeIcon className="h-2 w-2 text-gray-400" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            {/* Google reCAPTCHA */}
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onRecaptchaChange}
            />
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-[#1e2630] rounded-full py-2 transition-all duration-300 hover:shadow-md">
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center relative z-10">
            <p className="text-white">Already have an account?</p>
            <a href="/login" className="text-black font-bold hover:underline">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" />
      <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.61-1.27 3.41-1.27 5.38 0 1.97.47 3.77 1.27 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}


export default SignupPage;