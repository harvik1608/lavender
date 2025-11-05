import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function FishList() {
	const navigate = useNavigate();
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
				if (!$.fn.DataTable) {
					console.error("DataTable plugin not found — check JS path");
					return;
				}
				if (initialized || $.fn.DataTable.isDataTable("#fish-list")) {
					console.warn("DataTable already initialized");
					return;
				}
				initialized = true;
				$("#fish-list").DataTable({
					processing: true,
					serverSide: true,
					ajax: {
						url: "http://localhost:3000/api/load-vendors",
						type: "POST",
					},
					columns: [
						{ data: "id" },
						{ data: "name" },
						{ data: "email" },
						{
							data: "is_active",
							render: (data) => data === 1 ? '<span class="badge bg-label-primary">Active</span>' : '<span class="badge bg-label-danger">Inactive</span>',
						},
						{
							data: "id",
							render: function (data, type, row) {
								return `
									<a class="btn btn-sm btn-warning text-white edit-fish" data-id="${data}">Edit</a>
									<a class="btn btn-sm btn-danger text-white delete-fish" data-id="${data}">Delete</a>
								`;
							}
						},
					],
				});
				$("#fish-list").on("click", ".edit-fish", function () {
			        const fishId = $(this).data("id");
			        navigate(`/fishes/edit/${fishId}`); 
			  	});
			  	$('#fish-list').on('click', '.delete-fish', async function () {
			  		const fishId = $(this).data('id');

			  		if (!confirm('Are you sure you want to delete this fish?')) return;

			  		try {
			  			const res = await fetch(`http://localhost:3000/api/delete-fish/${fishId}`, { method: 'DELETE' });
			  			const data = await res.json();
			  			if (data.success) {
			  				$('#fish-list').DataTable().ajax.reload(null, false); // reload without losing pagination
			  			} else {
			  				alert('❌ Failed to delete fish');
			  			}
			  		} catch (err) {
			  			console.error(err);
			  			alert('❌ Server error while deleting fish');
			  		}
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
										Vendors 
										<Link to="/vendors/new" className="btn btn-primary btn-sm text-white newbtn">New Vendor</Link>
									</h5>
									<div className="container">
										<div className="table-responsive">
											<table className="table table-default" id="fish-list">
												<thead>
													<tr>
														<th width="5%">#</th>
														<th width="70%">Name</th>
														<th width="70%">Email</th>
														<th width="70%">Mobile No.</th>
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