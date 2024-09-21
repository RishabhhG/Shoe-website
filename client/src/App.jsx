import './App.css'
import EnhancedNikeSNKRS from './components/page'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage2 from './components/homepage2';
import LoginPage from './components/login-page'
import SignupPage from './components/signup-page'
import ForgotPasswordComponent from './components/forgot-password'
import ResetLinkSentComponent from './components/reset-link-sent'
import CompleteOrderComponent from './components/complete-order'
import PaymentSuccessComponent from './components/payment-success'
import ResetPasswordComponent from './components/reset-password'
import { useAppStore } from './store/index';
import { useEffect, useState } from 'react';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constant'

const PrivateRoute = ({ children }) => {
  const { userInfo,setUserInfo } = useAppStore();
  let isAuthenticated = !!userInfo;
  if(!isAuthenticated){

    isAuthenticated = JSON.parse(localStorage.getItem("userData"));
    setUserInfo(isAuthenticated)
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      
        const data = localStorage.getItem("userData");
        setUserInfo(data);
      
     
        setLoading(false);
      
    };
    getUserData()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Homepage2/>} />
        <Route path="/login" element={<AuthRoute><LoginPage /> </AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><SignupPage /> </AuthRoute>} />
        <Route path="/order" element={<PrivateRoute><CompleteOrderComponent /> </PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><PaymentSuccessComponent /></PrivateRoute> }></Route>
        <Route path="/reset" element={<ResetLinkSentComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/reset-password/:token" element={<ResetPasswordComponent />} />
        <Route path="/home" element={<PrivateRoute><EnhancedNikeSNKRS/></PrivateRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
