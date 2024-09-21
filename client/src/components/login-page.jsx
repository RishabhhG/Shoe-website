'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { apiClient } from '../lib/api-client'
import { LOGIN_ROUTE } from '../utils/constant'
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppStore } from '@/store'
import { useAuth0 } from "@auth0/auth0-react";

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const { loginWithRedirect, isAuthenticated, user, error, getAccessTokenSilently, isLoading } = useAuth0();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }
    try {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password, captchaValue }, { withCredentials: true });
      if (response.data.success) {
        setUserInfo(response.data.user);
        navigate('/home');
      } else {
        alert(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
        navigate('/');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const handleGoogleLogin = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  useEffect(() => {
    const handleAuth0Authentication = async () => {
      if (!isLoading) {
        if (isAuthenticated && user) {
          try {
            const token = await getAccessTokenSilently();
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Send user info to your backend
            const response = await apiClient.post('/api/auth/auth0-callback', { user });
            setUserInfo(response.data.user);
            localStorage.setItem("userData",response.data.user)
            navigate('/home');
          } catch (err) {
            console.error("Error processing Auth0 login:", err);
            alert('Error logging in. Please try again.');
          }
        } else {
          setLoading(false);
        }
      }
    };

    handleAuth0Authentication();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
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
        <div className="flex space-x-2"></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#ff6b1a] rounded-[60px] p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#ff8c4d] rounded-full"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] bg-[#ff8c4d] rounded-full"></div>

          <h2 className="text-3xl font-bold text-white mb-6 relative z-10 text-center">Login to SNKRS</h2>

          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 mb-4 relative z-10 flex items-center justify-center">
            <GoogleIcon className="mr-2 h-4 w-4" />
            <span>Continue with Google</span>
          </Button>

          <Separator className="my-4 bg-white/50" />

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
                required />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
                required />
            </div>

            {/* Google reCAPTCHA */}
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}  // Replace with your actual reCAPTCHA site key
              onChange={handleCaptchaChange}
            />

            <Button type="submit" className="w-full bg-black text-white hover:bg-[#1e2630]">
              Log In
            </Button>
          </form>

          <div className="mt-4 text-center relative z-10">
            <a href="/forgot-password" className="text-white hover:underline">Forgot password?</a>
          </div>
          <div className="mt-6 text-center relative z-10">
            <p className="text-white">Don't have an account?</p>
            <a href="/signup" className="text-black font-bold hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-black"></div>
      </div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff8c4d] rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path
        fill="#34A853"
        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.94l-3.86-3c-1.07.71-2.42 1.14-4.07 1.14-3.13 0-5.79-2.12-6.74-4.98H1.515v3.09c1.98 3.93 6.03 6.69 10.74 6.69z" />
      <path
        fill="#FBBC05"
        d="M5.515 14.23c-.24-.71-.38-1.47-.38-2.23s.14-1.52.38-2.23v-3.1h-3.29C1.315 9.54.755 11.02.755 12.77s.56 3.23 1.47 4.77l3.29-3.31z" />
      <path
        fill="#EA4335"
        d="M12.255 4.76c1.77 0 3.36.61 4.61 1.81l3.43-3.43c-2.03-1.89-4.7-3.14-8.04-3.14-4.71 0-8.76 2.76-10.74 6.69l3.29 3.1c.95-2.86 3.61-4.98 6.74-4.98z" />
    </svg>
  );
}


export default LoginPage;
