import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (place) => {
    const isFavorite = favorites.some((fav) => fav.id === place.id);
    if (isFavorite) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== place.id));
    } else {
      setFavorites((prev) => [...prev, place]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
