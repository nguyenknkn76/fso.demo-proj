import React, { useEffect, useState } from 'react';
import './Dishes.scss';
import axios from 'axios';

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/dishes')
      .then(response => response.data)
      .then(data => setDishes(data));
  }, []);

  return (
    <div className="dishes-container">
      {dishes.map(dish => (
        <div key={dish.id} className="dish-card">
          <img src={dish.image_url} alt={dish.name} className="dish-image" />
          <h2 className="dish-name">{dish.name}</h2>
          <p className="dish-description">{dish.description}</p>
          <p className="dish-price">${dish.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Dishes;
