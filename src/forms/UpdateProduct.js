import React, { Component } from 'react'
import ProductConsumer from '../Context';
import axios from 'axios';

class UpdateProduct extends Component {

    state = {
        name: "",
        supplier: "",
        manufacturer: "",
        distributor: "",
        plService: "",
        retailer: "",
        store: "",
        client: "",
        error: false
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/products/${id}`)
        const { name, supplier, manufacturer, distributor, plService, retailer, store, client } = response.data;
        this.setState({
            name,
            supplier,
            manufacturer,
            distributor,
            plService,
            retailer,
            store,
            client
        });
    }

    validateForm = () => {
        const { name, supplier, manufacturer, distributor, plService, retailer, store, client } = this.state;
        if (name === "" || supplier === "" || manufacturer === "" || distributor === "" || plService === "" || retailer === "" || store === "" || client === "") {
            return false;
        }
        return true;
    }

    updateProduct = async (dispatch, e) => {
        e.preventDefault();
        //Update Product
        const { name, supplier, manufacturer, distributor, plService, retailer, store, client } = this.state;
        const { id } = this.props.match.params;
        const updatedProduct = {
            name,
            supplier,
            manufacturer,
            distributor,
            plService,
            retailer,
            store,
            client
        };

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.put(`http://localhost:3004/products/${id}`, updatedProduct);

        dispatch({ type: "UPDATE_PRODUCT", payload: response.data });

        // Redirect
        this.props.history.push('/');
    }

    render() {
        const { name, supplier, manufacturer, distributor, plService, retailer, store, client, error } = this.state;

        return <ProductConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className='col-md-8 mb-4'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Update Product Form</h4>
                                </div>
                                <div className='card-body'>
                                    {
                                        error ?
                                            <div className='alert alert-danger'>
                                                Please check your information.
                                            </div>
                                            : null
                                    }
                                    <form onSubmit={this.updateProduct.bind(this, dispatch)}>
                                        <div className='form-group'>
                                            <label htmlFor='name'>Name</label>
                                            <input
                                                type='text'
                                                name='name'
                                                id='id'
                                                placeholder='Enter Name'
                                                className='form-control'
                                                value={name}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='supplier'>Supplier</label>
                                            <input
                                                type='text'
                                                name='supplier'
                                                id='supplier'
                                                placeholder='Enter Supplier'
                                                className='form-control'
                                                value={supplier}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='manufacturer'>Manufacturer</label>
                                            <input
                                                type='text'
                                                name='manufacturer'
                                                id='manufacturer'
                                                placeholder='Enter Manufacturer'
                                                className='form-control'
                                                value={manufacturer}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='distributor'>Distributor</label>
                                            <input
                                                type='text'
                                                name='distributor'
                                                id='distributor'
                                                placeholder='Enter Distributor'
                                                className='form-control'
                                                value={distributor}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='plService'>Pl Service</label>
                                            <input
                                                type='text'
                                                name='plService'
                                                id='plService'
                                                placeholder='Enter PlService'
                                                className='form-control'
                                                value={plService}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='retailer'>Retailer</label>
                                            <input
                                                type='text'
                                                name='retailer'
                                                id='retailer'
                                                placeholder='Enter Retailer'
                                                className='form-control'
                                                value={retailer}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='store'>Store</label>
                                            <input
                                                type='text'
                                                name='store'
                                                id='store'
                                                placeholder='Enter Store'
                                                className='form-control'
                                                value={store}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='client'>Client</label>
                                            <input
                                                type='text'
                                                name='client'
                                                id='client'
                                                placeholder='Enter Client'
                                                className='form-control'
                                                value={client}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <button className='btn btn-danger btn-block' style={{ width: "100%" }} type='submit'>Update Product</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    }
}

export default UpdateProduct;