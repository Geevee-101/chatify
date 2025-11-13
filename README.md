# Chatify App

A modern real-time chat application built with React, Node.js, Express, Socket.IO, and MongoDB.

## 🌐 Live Demo

Check out the live application: [https://chatify-dlfs9.sevalla.app/](https://chatify-dlfs9.sevalla.app/)

## ✨ Features

- **Real-time messaging** with Socket.IO
- **Image sharing** with Cloudinary integration
- **User authentication** with JWT
- **Sound notifications** for new messages
- **Modern UI** with TailwindCSS and DaisyUI
- **Optimistic UI updates** for better user experience
- **Security** with Arcjet protection

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS 4
- Zustand (state management)
- Socket.IO Client
- React Hot Toast
- Lucide React (icons)

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- Cloudinary (image storage)
- Resend (email service)
- Arcjet (security)

## 📋 Prerequisites

- Node.js >= 20.0.0
- MongoDB database
- Cloudinary account
- Resend account (for emails)

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd chatify-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following configuration:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

NODE_ENV=development

JWT_SECRET=your_jwt_secret_key

RESEND_API_KEY=your_resend_api_key

EMAIL_FROM=your_email@domain.com
EMAIL_FROM_NAME=Chatify

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5001
```

### 4. Start the Application

**Option 1: Run both servers separately**

In one terminal (backend):
```bash
cd backend
npm run dev
```

In another terminal (frontend):
```bash
cd frontend
npm run dev
```

**Option 2: Production build**

From the root directory:
```bash
npm run build
npm start
```

### 5. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173` (Vite default)
- Backend API: `http://localhost:3000`

## 📁 Project Structure

```
chatify-app/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── emails/         # Email templates
│   │   ├── lib/            # Utility functions
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   └── App.tsx         # Main app component
│   └── package.json
└── package.json            # Root package.json
```

## 🔧 Available Scripts

### Root Directory
- `npm run build` - Build both frontend and backend
- `npm start` - Start the production server

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

### Backend Required Variables
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `RESEND_API_KEY` - Resend API key for emails
- `EMAIL_FROM` - Email sender address
- `EMAIL_FROM_NAME` - Email sender name
- `CLIENT_URL` - Frontend URL for CORS
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ARCJET_KEY` - Arcjet security key
- `ARCJET_ENV` - Arcjet environment

### Frontend Required Variables
- `VITE_API_URL` - Backend API URL

