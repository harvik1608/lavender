import { useState } from 'react'
import { Link } from "react-router-dom";
import "../assets/auth/vendor/fonts/boxicons.css";
import "../assets/auth/vendor/css/core.css";
import "../assets/auth/vendor/css/theme-default.css";
import "../assets/auth/css/demo.css";
import "../assets/auth/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/auth/vendor/css/pages/page-auth.css";
import "../assets/auth/css/custom.css";
import "../assets/auth/css/butterpop.css";

function Sidebar() {
	return (
		<>
			<aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo ">
                    <a href="index-2.html" className="app-brand-link">
                        <span className="app-brand-logo demo"></span>
                        <span className="app-brand-text demo menu-text fw-bold ms-2">Lavender Look</span>
                    </a>
                    <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center"></i>
                    </a>
                </div>
                <div className="menu-inner-shadow"></div>
                <ul className="menu-inner py-1" id="main-menu">
                    <li className="menu-item">
                        <Link to="/dashboard" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-crown"></i>
                            <div className="text-truncate" data-i18n="Boxicons">Dashboard</div>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/fishes" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-crown"></i>
                            <div className="text-truncate" data-i18n="Boxicons">Fishes</div>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/vendors" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-crown"></i>
                            <div className="text-truncate" data-i18n="Boxicons">Vendors</div>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/customers" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-crown"></i>
                            <div className="text-truncate" data-i18n="Boxicons">Customers</div>
                        </Link>
                    </li>
                </ul>
            </aside>   		
		</>
	)
}
export default Sidebar