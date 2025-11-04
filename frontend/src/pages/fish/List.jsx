import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function FishList() {
	useEffect(() => {
		let initialized = false;
		const loadDataTables = async () => {
			try {
				const scripts = [
					"/assets/js/helpers.js",
					"/assets/js/config.js",
					"/assets/js/jquery.js",
					"/assets/js/datatables-bootstrap5.js"
				];
				for (const src of scripts) {
					await new Promise((resolve, reject) => {
						const script = document.createElement("script");
						script.src = src;
						script.async = false;
						script.onload = resolve;
						script.onerror =  () => reject(new Error(`Failed to load ${src}`));
						document.body.appendChild(script);
					});
				}
				const $ = window.jQuery; 
				console.log("jQuery version:", $.fn.jquery);
				console.log("DataTable available?", typeof $.fn.DataTable);
				if (!$.fn.DataTable) {
					console.error("DataTable plugin not found — check JS path");
					return;
				}
				if (initialized || $.fn.DataTable.isDataTable("#fish-list")) {
					console.warn("DataTable already initialized");
					return;
				}
				// if ($.fn.DataTable.isDataTable("#fish-list")) {
				// 	$("#fish-list").DataTable().destroy();
				// }
				initialized = true;
				$("#fish-list").DataTable({
					processing: true,
					serverSide: true,
					ajax: {
						url: "http://localhost:3000/api/load-fishes",
						type: "POST",
					},
					columns: [
						{ data: "id" },
						{ data: "name" },
						{
							data: "is_active",
							render: (data) => data === 1 ? '<span class="badge bg-label-primary">Active</span>' : '<span class="badge bg-label-danger">Inactive</span>',
						},
						{
							data: "id",
							render: function (data, type, row) {
								return `
									<a class="btn btn-sm btn-warning text-white">Edit</a>
									<a class="btn btn-sm btn-danger text-white">Delete</a>
								`;
							}
						},
					],
				});
			} catch (error) {
		        console.error(error);
		  	}
		};
		loadDataTables();

		return () => {
			const $ = window.jQuery;
			if ($ && $.fn.DataTable && $.fn.DataTable.isDataTable("#fish-list")) {
				$("#fish-list").DataTable().destroy(true);
			}
		}
	}, []);
	return (
		<>
			<div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                	<Sidebar />
                	<div className="layout-page">
                		<Header />
						<div className="content-wrapper">
							<div className="container-xxl flex-grow-1 container-p-y">
								<div className="card">
									<h5 className="card-header">
										Fishes 
										<Link to="/fishes/new" className="btn btn-primary btn-sm text-white newbtn">New Fish</Link>
									</h5>
									<div className="container">
										<div className="table-responsive">
											<table className="table table-default" id="fish-list">
												<thead>
													<tr>
														<th width="5%">#</th>
														<th width="70%">Fish Name</th>
														<th width="10%">Status</th>
														<th width="15%">Action</th>
													</tr>
												</thead>
												<tbody></tbody>
											</table>
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
export default FishList