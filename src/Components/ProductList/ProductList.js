import React from 'react';
import './ProductList.css'; // Import CSS file for styling
import Background from '../../Assets/xmld.png'
import Reviews from '../Reviews/Reviews';


const ProductList = ({ setCartItems, products, handleBuyNow }) => {
  const addToCart = (selectedProduct) => {
    // Add logic here to add items to the cart
    // Example logic to update the cart items
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex((item) => item.id === selectedProduct.id);
  
      if (existingItemIndex !== -1) {
        // If the selected product already exists in the cart, update its quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1; // Update quantity
        return updatedCartItems;
      } else {
        // If the selected product is not in the cart, add it with quantity 1
        return [...prevCartItems, { ...selectedProduct, quantity: 1 }];
      }
    });
  };
  const productListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
    backgroundImage: `url(${Background})`, // Use the imported image
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat:'no-repeat',
    Filter: 'grayscale(100%)',
  };

  return (
    <div>
      
      <div className="product-list" style={productListStyle}>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span className="price">{product.price}</span>
            <button onClick={() => handleBuyNow(product.id)}>Add to Cart</button>
          </div>
        ))}
       
      </div> <Reviews/>
    </div>
  );
};

export default ProductList;
