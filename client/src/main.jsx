import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-hymqkiipt1aejssi.us.auth0.com"
      clientId="Rx4dZ8Sz3pLP5RT5GakTQHM17wnvUwpK"
      authorizationParams={{
        redirect_uri:`${window.location.origin}/home` 
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
