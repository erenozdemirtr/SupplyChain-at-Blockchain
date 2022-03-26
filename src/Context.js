import React, { Component } from 'react'
import axios from 'axios';

const ProductContext = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case "DELETE_PRODUCT":
      return {
        ...state,
        products : state.products.filter(product => action.payload!== product.id)
      }
    case "ADD_PRODUCT":
      return {
        ...state,
        products : [...state.products, action.payload]
      }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products : state.products.map(product => product.id === action.payload.id ? action.payload : product)
      } 
    default :
      return state
  }
}



export class ProductProvider extends Component {

    state = {
        products : [],
        dispatch : action => {
          this.setState(state => reducer(state, action))
        }
      }

     componentDidMount = async () => { 
  const response = await axios.get("http://localhost:3004/products")
  this.setState({
    products : response.data
  })
 } 

  render() {
    return (
      <ProductContext.Provider value={this.state}>
          {this.props.children}
      </ProductContext.Provider>
    )
  }
}
const ProductConsumer = ProductContext.Consumer;

export default ProductConsumer;