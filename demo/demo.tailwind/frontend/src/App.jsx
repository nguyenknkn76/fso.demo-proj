import React from 'react';
import Dishes from './components/DishesComps/Dishes';
import './index.css';
import CollectionComponent from './components/Collections/Collections';
import RestaurantsComponent from './components/Restaurants/Restaurants';
import ChooseOrderAddress from './components/OrderAddress/ChooseOrderAddress';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      {/* <Dishes/> */}
      <Header/>
      <ChooseOrderAddress/>
      <RestaurantsComponent/>
      <CollectionComponent/>
    </div>
  );
}

export default App;
