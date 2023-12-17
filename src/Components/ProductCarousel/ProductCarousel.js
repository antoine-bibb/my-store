import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductCarousel.css'; // Import CSS file for styling


const ProductCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // enable center mode for better display
    centerPadding: '5%',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const firstThreeProducts = products.slice(0, 3); // Get the first three products
  const remainingProducts = products.slice(3); // Get the remaining products

  const handleBuyNow = (productId) => {
    // Add logic to handle adding the item to the cart
    console.log(`Product ${productId} added to cart`);
  };

  const handleProductClick = (productId) => {
    // Add logic to navigate to the product page
    console.log(`Navigate to product ${productId} page`);
  };

  return (
    <div className="product-carousel">
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="product-slide">
          <div className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}</span>
              <button onClick={() => handleBuyNow(product.id)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);
};
export default ProductCarousel;
