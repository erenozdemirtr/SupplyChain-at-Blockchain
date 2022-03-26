import React, { Component } from 'react'
import Product from './Product';
import ProductConsumer from '../Context';

class Products extends Component {
  render() {
    return (
      <ProductConsumer>
        {
          value => {
            const { products } = value;
            return (
              <div>
                {
                  products.map(product => {
                    return (
                      <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        supplier={product.supplier}
                        manufacturer={product.manufacturer}
                        distributor={product.distributor}
                        plService={product.plService}
                        retailer={product.retailer}
                        store={product.store}
                        client={product.client}
                      />
                    )
                  })
                }
              </div>
            )
          }
        }
      </ProductConsumer>
    )
  }
}

export default Products;