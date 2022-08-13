import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

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
            </Switch>
      </Router>
    </div>
  );
}


export default App;
