import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductConsumer from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  onClickEvent = (number, e) => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  onDeleteProduct = async (dispatch, e) => {
    const { id } = this.props;
    //Delete Request
    await axios.delete(`http://localhost:3004/products/${id}`);
    //Consumer Dispatch
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  render() {
    //Destructing
    const { id, name, supplier, manufacturer, distributor, plService, retailer, store, client } = this.props;
    const { isVisible } = this.state;
    return (
      <ProductConsumer>
        {
          value => {
            const { dispatch } = value;
            return (
              <div className="=col-md-8 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h4 className="d-inline" style={{width:'100%'}} onClick={this.onClickEvent.bind(this, 34)}>{name}</h4>
                    <i
                      onClick={this.onDeleteProduct.bind(this, dispatch)}
                      className="fa-solid fa-delete-left"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                  {isVisible ? (
                    <div className="card-body">
                      <div className="blok">
                        <p className="card-text"><span>Supplier</span> {supplier}</p>
                        <p className="card-text"><span>Manufacturer</span>{manufacturer}</p>
                        <p className="card-text"><span>Distributor</span>{distributor}</p>
                        <p className="card-text"><span>Pl Service</span>{plService}</p>
                        <p className="card-text"><span>Retailer</span>{retailer}</p>
                        <p className="card-text"><span>Store</span>{store}</p>
                        <p className="card-text"><span>Client</span>{client}</p>
                      </div>
                      <Link to={`edit/${id}`} className='btn btn-dark btn-block' >Update Product</Link>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          }
        }
      </ProductConsumer>
    )
  }
}
Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  supplier: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  plService: PropTypes.string.isRequired,
  retailer: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired
};
Product.defaultProps = {
  id: "No information",
  name: "No information",
  supplier: "No information",
  manufacturer: "No information",
  distributor: "No information",
  plService: "No information",
  retailer: "No information",
  store: "No information",
  client: "No information"
};

export default Product;