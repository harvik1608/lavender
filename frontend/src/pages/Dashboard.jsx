import { useState } from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Dashboard() {
	return (
		<>
			<div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                	<Sidebar />
                	<div className="layout-page">
                		<Header />
						<div className="content-wrapper">
							<div className="container-xxl flex-grow-1 container-p-y">
								<div className="row">
									<div className="col-xxl-5 col-lg-12">
										<div className="card h-100">
											<div className="card-header d-flex align-items-center justify-content-between">
												<div className="card-title mb-0">
													<input type="month" id="year_month" />
												</div>
												<a href="javascript:;" className="btn btn-primary btn-sm text-white">Export</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
document.body.classList.remove("container-xxl");
export default Dashboard