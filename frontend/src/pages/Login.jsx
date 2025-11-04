import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/auth/vendor/css/core.css";
import "../assets/auth/vendor/css/theme-default.css";
import "../assets/auth/css/demo.css";
import "../assets/auth/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/auth/vendor/css/pages/page-auth.css";
import "../assets/auth/vendor/css/pages/page-auth.css";
import "../assets/auth/css/custom.css";
import "../assets/auth/css/butterpop.css";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};
		
		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}
		return newErrors;
	};
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = validate();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
		} else {
			setErrors({});
			const response = await fetch("http://localhost:3000/api/check-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log("Response:", data);

			if (data.success) {
				navigate("/dashboard");
			} else {
				alert("Invalid email or password");
			}
		}
	};
	return (
		<>
			<div className="authentication-wrapper authentication-basic container-p-y">
				<div className="authentication-inner">
					<div className="card px-sm-6 px-0">
						<div className="card-body">
							<div className="app-brand justify-content-center">
								<a href="index-2.html" className="app-brand-link gap-2">
									<span className="app-brand-text demo text-heading fw-bold">Niraj Purbiya</span>
								</a>
							</div>
							<p className="mb-6">Please sign-in to your account and start the adventure</p>
							<form id="formAuthentication" className="mb-6" onSubmit={handleSubmit} method="POST">
								<div className="mb-6">
									<label htmlFor="email" className="form-label">Email</label>
									<input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
									{errors.email && <small className="text-danger">{errors.email}</small>}
								</div>
								<div className="mb-6 form-password-toggle">
									<label className="form-label" htmlFor="password">Password</label>
									<div className="input-group input-group-merge">
										<input type="password" id="password" className="form-control" name="password" placeholder="Enter your password" aria-describedby="password" value={password} onChange={(e) => setPassword(e.target.value)} />
										<span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
									</div>
									{errors.password && <small className="text-danger">{errors.password}</small>}
								</div>
								<div className="mb-8">
									<div className="d-flex justify-content-between mt-8">
										<div className="form-check mb-0 ms-2">
											<input className="form-check-input" type="checkbox" id="remember-me" />
											<label className="form-check-label" htmlFor="remember-me">Remember Me</label>
										</div>
										<a href="auth-forgot-password-basic.html"><span>Forgot Password?</span></a>
									</div>
								</div>
								<div className="mb-6">
									<button className="btn btn-primary d-grid w-100" type="submit">Sign In</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
document.body.classList.add("container-xxl");
export default Login