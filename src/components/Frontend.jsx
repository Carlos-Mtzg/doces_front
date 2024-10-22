import { useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { Home, FileText, DollarSign, LogOut, Menu } from "react-feather"

const Frontend = () => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

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
                    <li className="sidebar-item">
                        <Link to="/payments" className="sidebar-link">
                            <DollarSign />
                            <span>Pagos</span>
                        </Link>
                    </li>
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
                    <Link to="#" className="sidebar-link sign-out">
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