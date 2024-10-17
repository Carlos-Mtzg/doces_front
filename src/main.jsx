import React from "react"
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './../public/css/sidebar.css'


import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Frontend from "./components/Frontend"
import Home from "./pages/Home"
import Requests from "./pages/Requests"
import Payments from "./pages/Payments"

const router = createBrowserRouter(
  [
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
            path: '/requests',
            element: <Requests />
          },
          {
            path: '/payments',
            element: <Payments />
          }
        ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
