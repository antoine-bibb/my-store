import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to My App</h1>
      <Link to="/main">
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default LandingPage;
