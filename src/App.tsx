import React, { useRef } from 'react';

import './styles/App.css';
import RestaurantHeader from './features/restaurant/RestaurantHeader.tsx';
import MenueFilters from './features/filters/MenuListFilters.tsx';
import MenuList from './features/menu/MenuList.tsx';
import ShopingCart from './features/cart/ShoppingCart.tsx';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div className="main-content" ref={scrollContainerRef}>
        <RestaurantHeader />
        <MenueFilters containerRef={scrollContainerRef} />
        <MenuList />
      </div>
      <ShopingCart />
    </div>
  );
}

export default App;
