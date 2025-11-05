import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function FishAddEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		name: "",
		is_active: "1"
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (id) {
			const fetchFish = async () => {
				try {
					setLoading(true);
					const res = await fetch(`http://localhost:3000/api/fish/${id}`);
					const responseData = await res.json();
					console.log(responseData);
					if (responseData.success && responseData.data) {
						setFormData({
							name: responseData.data.name,
							is_active: responseData.data.is_active.toString(),
						});
					} else {
						setMessage("⚠️ Fish not found");
					}
				} catch (err) {
					console.error(err);
					setMessage("❌ Failed to load fish details");
				} finally {
					setLoading(false);
				}
			};
			fetchFish();
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		if (!formData.name.trim()) {
			setMessage("⚠️ Name is required");
			return;
		}
		setLoading(true);
		try {
			const url = id ? `http://localhost:3000/api/update-fish/${id}` : "http://localhost:3000/api/add-vendor";
		  	const method = id ? "PUT" : "POST";
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success) {
				setMessage(data.message);
				setTimeout(() => navigate("/fishes"), 1000);
			} else {
				setMessage(data.error || "❌ Failed to add fish");
			}
		} catch (error) {
			console.error("Error:", error);
  			setMessage("❌ Server error, please try again");
		} finally {
			setLoading(false);
		}
	};
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
									<div className="col-xl">
										<div className="card mb-12">
											<div className="card-header d-flex justify-content-between align-items-center">
												<h5 className="mb-0">New Vendor</h5>
												<small className="text-body float-end">
													(<small className='astrock'>*</small>) indicates required field.
												</small>
											</div>
											<div className="card-body">
												<form id="main-form" onSubmit={handleSubmit}>
													<div className="row">
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Name<small className='astrock'>*</small></label>
															<input type="text" className="form-control" id="name" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Email</label>
															<input type="text" className="form-control" id="email" name="email" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Mobile No.<small className='astrock'>*</small></label>
															<input type="text" className="form-control" id="phone" name="phone" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Country<small className='astrock'>*</small></label>
															<input type="text" className="form-control" id="country" name="country" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">State<small className='astrock'>*</small></label>
															<input type="text" className="form-control" id="state" name="state" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">City</label>
															<input type="text" className="form-control" id="city" name="city" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-8 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Address</label>
															<input type="text" className="form-control" id="address" name="address" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>
														<div className="col-lg-4 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Password</label>
															<input type="text" className="form-control" id="password" name="password" placeholder="Enter name" value={formData.name} onChange={handleChange} />
														</div>							
														<div className="col-lg-12 mb-4">
															<label className="form-label" htmlFor="basic-default-fullname">Status</label>
															<select className="form-control" id="is_active" name="is_active" value={formData.is_active} onChange={handleChange}>
																<option value="1">Active</option>
																<option value="0">Inactive</option>
															</select>
														</div>
													</div>
													{message && (<div className="alert alert-info py-2">{message}</div>)}
													<button type="submit" className="btn btn-primary btn-sm mt-2" disabled={loading}>{loading ? "Saving..." : "Submit"}</button>&nbsp;
													<Link className="btn btn-danger btn-sm text-white mt-2" id="back-btn" to="/vendors">Back</Link>
												</form>
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
export default FishAddEdit