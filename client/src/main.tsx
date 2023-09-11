import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.tsx';
import Review from './components/Review.tsx';
import './i18n';
import User from './components/User.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google"
import Search from './components/Search.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/review/:idReview",
    element: <Review />,
  },
  {
    path: "/user/:idUser",
    element: <User />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
