import styled from "styled-components"
import "./App.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductList from "./screens/ProductList"
import { HashRouter as Router, Route } from "react-router-dom"
import ProductDetail from "./screens/ProductDetail"
import Cart from "./screens/Cart"
import LoginForm from "./screens/LoginForm"
import RegisterForm from "./screens/RegisterForm"
import ProfileScreen from "./screens/ProfileScreen"
import { CheckoutScreen } from "./screens/CheckoutScreen"
import OrderDetails from "./screens/OrderDetails"
import EditProductDetails from "./screens/EditProductDetails"
import AdminScreen from "./screens/AdminScreen"

function App() {
	return (
		<div className="App">
			<Router>
				<HeaderBody>
					<Header />
				</HeaderBody>
				<hr />
				<MainBody>
					<Route path="/" exact component={ProductList} />
					<Route path="/productdetail/:id" component={ProductDetail} />
					<Route path="/product/:id/edit" component={EditProductDetails} />
					<Route path="/cart/:id?" component={Cart} />
					<Route path="/login" component={LoginForm} />
					<Route path="/register" component={RegisterForm} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/shipping" component={CheckoutScreen} />
					<Route path="/orderdetails/:id" component={OrderDetails} />
					<Route path="/admin" component={AdminScreen} />
				</MainBody>
				<FooterBody>
					<Footer />
				</FooterBody>
			</Router>
		</div>
	)
}

export default App

const HeaderBody = styled.div`
	background: #3f0e40;
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 2;
	max-height: 50px;
`

const MainBody = styled.div`
	padding-bottom: 40px;
	padding-top: 20px;
	position: relative;
`

const FooterBody = styled.div`
	background: #3f0e40;
	text-align: center;
	color: white;
	width: 100%;
	position: fixed;
	bottom: 0;
`
