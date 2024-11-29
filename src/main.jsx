import React, { useContext, useEffect } from "react"
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Frontend from "./components/Frontend"
import Home from "./pages/Home"
import Requests from "./pages/Requests"
import Login from "./auth/Login"
import Register from "./auth/Register"
import AdminRequests from "./pages/admin/Requests"
import RequestsSelected from "./pages/admin/RequestsSelected"
import { AuthProvider, AuthContext } from "./config/context/auth-context"

const AppRouter = () => {
  const { state, dispatch } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (token && role && userId) {
      dispatch({
        type: 'SIGNIN',
        payload: {
          accessToken: token,
          role: role,
          id: userId,
        },
      });
    }
  }, [dispatch, token, role, userId]);
  const routesFromRole = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return (
          // <>
          <Route path="/" element={<Frontend />}>
            <Route index element={<AdminRequests />} />
            <Route path="/requestsSelected" element={<RequestsSelected />} />
          </Route>
          // </>
        );
      case 'ROLE_USER':
        return (
          // <>
          <Route path="/" element={<Frontend />}>
            <Route index element={<Home />} />
            <Route path="requests" element={<Requests />} />
          </Route>
          // </>
        );
      default:
        return null;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {state.signed ? (
          <>
            {routesFromRole(role)}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
