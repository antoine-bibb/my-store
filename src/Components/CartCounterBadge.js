import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from JSON file or API endpoint
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);


  const handleAddToCart = (selectedItem) => {
    const itemExistsInCart = cartItems.some(item => item.id === selectedItem.id);

    if (itemExistsInCart) {
      // If the item exists, update its quantity
      const updatedCart = cartItems.map(item =>
        item.id === selectedItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // If the item doesn't exist, add it to the cart with a quantity of 1
      const newItem = { ...selectedItem, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Update itemCount by counting the total quantity of items in the cart whenever cartItems change
  useEffect(() => {
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(totalCount);
  }, [cartItems]);

  return (
    <div className="cart-counter-badge">
      {/* Display total count */}
      {itemCount > 0 && <span className="badge">{itemCount}</span>}
      <p>({itemCount})</p>
    </div>
  );
};

export default Cart;
