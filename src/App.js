import styled from "styled-components";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./screens/ProductList";
import { BrowserRouter as Router, Route } from "react-router-dom"
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";
import LoginForm from "./screens/LoginForm";
import RegisterForm from "./screens/RegisterForm";
import ProfileScreen from "./screens/ProfileScreen"
import { CheckoutScreen } from "./screens/CheckoutScreen";
import OrderDetails from "./screens/OrderDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderBody>
          <Header />
        </HeaderBody>
        <MainBody>
          <Route path='/' exact component={ ProductList } />
          <Route path='/productdetail/:id' component={ ProductDetail } />
          <Route path='/cart/:id?' component={ Cart } />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={CheckoutScreen} />
          <Route path='/orderdetails/:id' component={OrderDetails} />
        </MainBody>
        <FooterBody>
          <Footer />
        </FooterBody>
      </Router>
    </div>
  );
}

export default App;

const HeaderBody = styled.div`
  background: #3f0e40;
  width: 100%;
  position: static;
  top: 0;
`;

const MainBody = styled.div`
  margin-bottom: 15px;
  margin-top: 20px;
`;

const FooterBody = styled.div`
  background: #3f0e40;
  text-align: center;
  color: white;
  width: 100%;
  position: relative;
  bottom: 0;
`;
