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
import "../assets/auth/css/datatables.bootstrap5.css";
import "../assets/auth/css/responsive.bootstrap5.css";
import "../assets/auth/css/datatables.checkboxes.css";
import "../assets/auth/css/buttons.bootstrap5.css";
import "../assets/auth/css/rowgroup.bootstrap5.css";

function Header() {
	return (
		<>
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
		</>
	)
}
export default Header