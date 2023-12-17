import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import MainPage from './Components/MainPage/MainPage';
import Cart from './Components/Cart/Cart';
import ProductList from './Components/ProductList/ProductList';

const App = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [products, setProducts] = useState([]);

  // Function to handle adding items to the cart
  const handleAddToCart = (product) => {
    // Your existing logic to add items to the cart
  };
  useEffect(() => {
    // Fetch data when component mounts
    fetch('/products.json') // Path might change depending on the location of your JSON file
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleBuyNow = (productId) => {
    // Find the selected product based on productId
    const selectedProduct = products.find((product) => product.id === productId);

    // Ensure the selected product exists
    if (selectedProduct) {
      // Check if the product is already in the cart
      const existingItem = cartItems.find((item) => item.id === selectedProduct.id);

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        const updatedCart = cartItems.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
      } else {
        // If it's a new item, add it to the cart with quantity 1
        setCartItems([...cartItems, { ...selectedProduct, quantity: 1 }]);
      }
    }
    
  };const clearCart = () => {
      setCartItems([]);
};

  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* Define routes */}
        <Routes>
          {/* Route for the cart page */}
          <Route   path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} clearCart={clearCart} />} />
          {/* Route for the product page */}
          <Route path="/products" element={<ProductList products={products} handleBuyNow={handleBuyNow} />} />
          {/* Route for the main page */}
          <Route path="/" element={<MainPage handleAddToCart={handleAddToCart} />} />
          {/* You can pass other props to MainPage if needed */}
        </Routes>
        {/* Remove the ProductList component from here */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
