# 🏬 Shoe Website

A robust, full-stack e-commerce platform for shoe brands, built with a modern technology stack. This project provides a seamless shopping experience, with a responsive UI and secure backend functionalities to handle user accounts, product management, and transactions.

## 🚀 Features

- **Responsive Design**: Fully optimized across devices using Tailwind CSS and custom animations.
- **Product Listings**: Detailed product pages with pricing and descriptions.
- **Authentication & Authorization**: Secure JWT-based login system for users and admin roles.
- **Cart & Checkout**: Full shopping cart functionality with the ability to place orders.
- **RESTful API**: Built-in API to manage user accounts, products, and orders.
- **Backend Security**: Environment variables, password hashing, JWT authentication, and secure database connections.
- **Deployment Ready**: Production-level configurations, including `.env` management, error handling, and database optimizations.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Bundler**: Vite.js for optimized builds
- **State Management**: Context API
- **Animations**: Tailwind and custom CSS for smooth UI transitions

### Backend (Server)
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose for schema modeling
- **Authentication**: JWT with role-based access control (RBAC)
- **Security**: Bcrypt for password hashing, Helmet for securing HTTP headers
- **Error Handling**: Centralized error-handling middleware for improved debugging
- **Logging**: Integrated logging using Morgan for API request tracking

## 📂 Folder Structure

### Client

/client ├── public # Static assets ├── src │ ├── components # Reusable UI components │ ├── pages # React pages (Home, Products, Cart, etc.) │ ├── App.js # Main application component │ ├── index.js # Entry point for React app ├── tailwind.config.js # Tailwind CSS configuration └── vite.config.js # Vite configuration for bundling



### Server

/server ├── config # Database config and environment variables ├── controller # Business logic for handling requests (Products, Users) ├── middleware # Authentication, error-handling, and other middleware ├── models # Mongoose models for the database ├── routes # Express routes (API endpoints for users, products) ├── utils # Utility functions (JWT, email handlers, etc.) └── index.js # Server entry point



## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **MongoDB** (Cloud or Local instance)
- **npm** (v7 or higher)

### Environment Variables

Create a `.env` file in the `server` directory with the following configuration:


# Server
PORT=3000
NODE_ENV=production

# MongoDB
MONGO_URI="mongodb+srv://Rishabh:b.net/?retryWrites=true&wr1"

# JWT Authentication
JWT_SECRET=<your-secret-key>
JWT_EXPIRE=30d

# Bcrypt
BCRYPT_SALT=12

# CORS (Cross-Origin Resource Sharing)
CLIENT_URL=http://localhost:3000

# Email Service (SMTP)
MAIL_HOST=smm
MAIL_USER=hy
MAIL_PASS=msce

# Recaptcha
RECAPTCHA_SECRET_KEY=6LtOrbxM

# Cloudinary (for Image Uploads)
CLOUDINARY_CLOUD_NAME=dcs
CLOUDINARY_API_KEY=1391
CLOUDINARY_API_SECRET=7Kp4

# Logging
LOG_LEVEL=info


Installation
Clone the repository:

bash
Copy code
git clone https://github.com/RishabhhG/Shoe-website.git
cd Shoe-website
Client Setup: Navigate to the client folder and install dependencies:

bash
Copy code
cd client
npm install
Server Setup: Navigate to the server folder and install dependencies:

bash
Copy code
cd ../server
npm install
Running the Application
Development Mode
Start both client and server for development with live reloading:

Frontend (Client):

bash
Copy code
cd client
npm run dev
Backend (Server):

bash
Copy code
cd ../server
npm run dev



🔐 Security Best Practices
Environment Variables: Sensitive information such as JWT secrets, database URIs, email credentials, and API keys are stored in the .env file, which should never be committed to version control.
HTTPS: Ensure HTTPS is enabled in production environments for secure data transmission.
Authentication: JWT tokens are used for user sessions, ensuring stateless authentication with expiration.
Password Hashing: User passwords are hashed using bcrypt with a salt factor of 12 for added security.



![image](https://github.com/user-attachments/assets/15b0b44f-fcde-4541-9ab0-57bd8dd9cdf1)











![image](https://github.com/user-attachments/assets/ea3834eb-f9bc-40c0-b90b-816665f5bf9d)








![image](https://github.com/user-attachments/assets/95198ebe-fe01-437c-bea5-30696b1057b6)





![image](https://github.com/user-attachments/assets/026804a4-89c3-4b32-bca1-985ce6a7f684)


