import React from "react";

interface MenuListFiltersProps {
    showFavorites: boolean;
    setShowFavorites: (showFavorites: boolean) => void;
}


function MenuListFilters({ showFavorites, setShowFavorites }: MenuListFiltersProps) {
    return (
        <div className="menu-list-filters">
            {/* <input type="text" />
            <select>
                <option value="meat">Meat</option>
                <option value="fish">Fish</option>
                <option value="vegetarian">Vegetarian</option>
            </select> */}
            <button onClick={() => setShowFavorites(!showFavorites)}>
                {showFavorites ? "Show All" : "Show Favorites"}
            </button>


        </div>
    );
}

export default MenuListFilters;