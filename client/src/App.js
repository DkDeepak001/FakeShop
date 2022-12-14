import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Login from './components/login/login';
import signUp from './components/login/signUp';
import OrderPage from './components/OrderPage/OrderPage';
import Failed from './components/OrderPage/failed';
import Sucess from './components/OrderPage/sucess';
function App() {
  return (
    <div className="App-container">
      <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home}>
              </Route>
              <Route exact path="/products/:productId" component={Products}>
              </Route>
              <Route exact path="/cart" component={Cart} >
              </Route>
              <Route exact path="/login" component={Login} >
              </Route>
              <Route exact path="/signup" component={signUp} >
              </Route>
              <Route exact path="/OrderPage" component={OrderPage} >
              </Route>
              <Route exact path="/cancel" component={Failed} >
              </Route>
              <Route exact path="/success/:id" component={Sucess} >
              </Route>
            </Switch>
      </Router>
    </div>
  );
}


export default App;
