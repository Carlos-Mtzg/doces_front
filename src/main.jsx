import React from "react"
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Frontend from "./components/Frontend"
import Home from "./pages/Home"
import Requests from "./pages/Requests"
import Payments from "./pages/Payments"
import Login from "./auth/Login"
import Register from "./auth/Register"
import AdminRequests from "./pages/admin/Requests"
import RequestsSelected from "./pages/admin/RequestsSelected"

const router = createBrowserRouter(
  [
    {
      path: '/auth',
      children:
        [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
        ]
    },
    {
      path: '/',
      element: <Frontend />,
      children:
        [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'requests',
            element: <Requests />
          },
          {
            path: 'payments',
            element: <Payments />
          },
        ]
    },
    {
      path: '/admin',
      element: <Frontend />,
      children:
        [
          {
            index: true,
            element: <AdminRequests />
          },
          {
            path: 'requestsSelected',
            element: <RequestsSelected />
          },
        ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
