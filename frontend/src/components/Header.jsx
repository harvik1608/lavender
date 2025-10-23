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

function Header() {
	return (
		<>
			<div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
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
                                <a href="" className="menu-link">
                                    <i className="menu-icon tf-icons bx bx-crown"></i>
                                    <div className="text-truncate" data-i18n="Boxicons">Dashboard</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="" className="menu-link">
                                    <i className="menu-icon tf-icons bx bx-crown"></i>
                                    <div className="text-truncate" data-i18n="Boxicons">Services</div>
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <div className="layout-page">
                        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0   d-xl-none ">
                                <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)"><i className="bx bx-menu bx-md"></i></a>
                            </div>
                            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                                <ul className="navbar-nav flex-row align-items-center ms-auto">
                                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                        <a className="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                                            <div className="avatar avatar-online">
                                                <img src="1.webp" alt="" className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar avatar-online">
                                                                <img src="1.webp" alt="" className="w-px-40 h-auto rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-0"></h6>
                                                            <small className="text-muted"></small>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <div className="dropdown-divider my-1"></div>
                                            </li>
                                            <li><a className="dropdown-item" href=""><i className="bx bx-power-off bx-md me-3"></i><span>Log Out</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>   		
		</>
	)
}
export default Header