import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]); 
  const [bookings, setBookings] = useState([]); 

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        favorites,
        setFavorites,
        bookings,
        setBookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};