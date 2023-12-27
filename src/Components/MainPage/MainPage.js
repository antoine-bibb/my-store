import React from 'react';
import ProductCarousel from '../ProductCarousel/ProductCarousel';
import './MainPage.css';
import ProductList from '../ProductList/ProductList';

const MainPage = () => {
  const products = [

  ]
  return (
    <div className="main-page">
      <h1>Featured Collection</h1>
      <p>Embrace your Own Style </p>
      <ProductCarousel/>
      <ProductList products={products}/>
      {/* Your main page content goes here */}
    </div>
  );
};

export default MainPage;
