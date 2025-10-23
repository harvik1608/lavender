import { useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {
	return (
		<>
			<Header />
			<div class="content-wrapper">
				<div class="container-xxl flex-grow-1 container-p-y">
					<div class="row">
						<div class="col-xxl-5 col-lg-12">
							<div class="card h-100">
								<div class="card-header d-flex align-items-center justify-content-between">
									<div class="card-title mb-0">
										<input type="month" id="year_month" />
									</div>
									<a href="javascript:;" class="btn btn-primary btn-sm text-white">Export</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Dashboard