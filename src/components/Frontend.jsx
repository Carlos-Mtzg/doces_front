import React, { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"
import { Home, FileText, LogOut, Menu, Folder, FolderPlus } from "react-feather"
import '../assets/css/sidebar.css'
import AuthContext from '../config/context/auth-context';

const Frontend = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')

        
        sessionStorage.removeItem('userId');
        
        dispatch({ type: 'SIGNOUT'})
        navigate('/login');
    };

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const role = localStorage.getItem('role');
    return (
        <div className="wrapper">
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                        <Menu />
                    </button>
                    <div className="sidebar-logo">
                        <Link to="/">DOCES</Link>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    {role === 'ROLE_USER' && (
                        <>
                    <li className="sidebar-item">
                        <Link to="/" className="sidebar-link">
                            < Home />
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/requests" className="sidebar-link">
                            <FileText />
                            <span>Mis solicitudes</span>
                        </Link>
                    </li>
                    </>
                    )}
                    {role === 'ROLE_ADMIN' && (
                        <>
                    <li className="sidebar-item">
                        <Link to="/" className="sidebar-link">
                            <Folder />
                            <span>Solicitudes</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/requestsSelected" className="sidebar-link">
                            <FolderPlus />
                            <span>Solicitudes Seleccionadas</span>
                        </Link>
                    </li>
                    </>)}
                    {/* <li className="sidebar-item">
                        <Link to="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="lni lni-protection"></i>
                            <span>Auth</span>
                        </Link>
                        <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Login</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Register</Link>
                            </li>
                        </ul>
                    </li> */}
                </ul>
                <div className="sidebar-footer">
                    <Link to="#" className="sidebar-link sign-out" onClick={handleLogout}>
                        <LogOut />
                        <span>Cerrar Sesión</span>
                    </Link>
                </div>
            </aside>
            <div className="main p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Frontend