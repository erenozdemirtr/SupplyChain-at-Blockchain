import React, { Component } from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Products from './components/Products';
import AddProduct from './forms/AddProduct';
import Contribute from './pages/Contribute';
import UpdateProduct from './forms/UpdateProduct';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Generator from './qrCode/Generator';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar title="SUPPLY CHAİN" />
          <hr />
          <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/add' component={AddProduct} />
            <Route exact path='/github' component={Contribute} />
            <Route exact path='/edit/:id' component={UpdateProduct} />
            <Route exact path='/generator' component={Generator} />
            
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;