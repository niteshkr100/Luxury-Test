import React, { useState, useEffect } from 'react';
import { products } from './products'; // Adjust the path as needed

const getRandomProducts = (data, count = 2) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductComparison = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Set random products on component mount
    setDisplayedProducts(getRandomProducts(products));
  }, []);

  const handleChoice = (chosenProduct) => {
    const otherProduct = displayedProducts.find(product => product.id !== chosenProduct.id);
    if (chosenProduct.price > otherProduct.price) {
      setMessage('Correct! You chose the more expensive product.');
      setScore(prevScore => prevScore + 100); // Increase score
    } else {
      setMessage('Incorrect. The other product is more expensive.');
      setScore(prevScore => Math.max(prevScore - 50, 0)); // Decrease score but ensure it doesn\'t go below 0
    }
    // Set new random products after a choice
    setDisplayedProducts(getRandomProducts(products));
  };

  return (
    <div className="main-container">
      <h1 className="heading">Luxury Test</h1>
      <div className="product-comparison">
        {displayedProducts.map(product => (
          <div key={product.id} className="product">
            <img src={product.imageUrl} alt={`Product ${product.id}`} />
            <button onClick={() => handleChoice(product)}>Choose</button>
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default ProductComparison;
