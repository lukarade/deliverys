import React from 'react';

import './styles/App.css';
import RestaurantHeader from './features/restaurant/RestaurantHeader.tsx';
import MenueFilters from './features/filters/MenuListFilters.tsx';
import MenuList from './features/menu/MenuList.tsx';
import ShopingCart from './features/cart/ShoppingCart.tsx';

function App() {
  return (
    <div className="App">
      <div className="main-content">
        <RestaurantHeader />
        <MenueFilters />
        <MenuList />
      </div>
      <ShopingCart />
    </div>
  );
}

export default App;
