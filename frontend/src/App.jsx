import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FishList from "./pages/fish/List";
import FishAddEdit from "./pages/fish/AddEdit";
import VendorList from "./pages/vendor/List";
import VendorAddEdit from "./pages/vendor/AddEdit";
import CustomerList from "./pages/customer/List";
import CustomerAddEdit from "./pages/customer/AddEdit";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/fishes" element={<FishList />} />
				<Route path="/fishes/new" element={<FishAddEdit />} />
				<Route path="/fishes/edit/:id" element={<FishAddEdit />} />
				<Route path="/vendors" element={<VendorList />} />
				<Route path="/vendors/new" element={<VendorAddEdit />} />
				<Route path="/vendors/edit/:id" element={<VendorAddEdit />} />
				<Route path="/customers" element={<CustomerList />} />
				<Route path="/customers/new" element={<CustomerAddEdit />} />
				<Route path="/customers/edit/:id" element={<CustomerAddEdit />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App;