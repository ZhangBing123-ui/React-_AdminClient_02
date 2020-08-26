import React, { Component } from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'
import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from "./add-updata";
import './product.css'
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' exact component={ProductHome}></Route>
                <Route path='/product/detail/:id' component={ProductDetail}></Route>
                <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        );
    }
}

export default Product;