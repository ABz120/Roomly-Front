import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [favorites, setFavorites] = useState([]); 
  const [bookings, setBookings] = useState([]); 

  // Загрузка бронирований при старте
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const saved = await AsyncStorage.getItem('bookings');
        if (saved) setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load bookings', e);
      }
    };
    loadBookings();
  }, []);

  // Сохранение бронирований при изменении
  useEffect(() => {
    const saveBookings = async () => {
      try {
        await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      } catch (e) {
        console.error('Failed to save bookings', e);
      }
    };
    saveBookings();
  }, [bookings]);

  // Функция для добавления бронирования
  const addBooking = (hotel, startDate, endDate) => {
    const newBooking = {
      id: Date.now(), // Уникальный ID бронирования
      hotel,
      startDate,
      endDate,
      status: 'Активная', // Статус бронирования
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  // Функция для отмены бронирования
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'Отменена' } : booking
      )
    );
  };

  const removeBooking = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );
  };

  // Функция для изменения дат бронирования
  const updateBookingDates = (id, newStartDate, newEndDate) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, startDate: newStartDate, endDate: newEndDate }
          : booking
      )
    );
  };


    // Загрузка избранного при старте
    useEffect(() => {
      const loadFavorites = async () => {
        try {
          const saved = await AsyncStorage.getItem('favorites');
          if (saved) setFavorites(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load favorites', e);
        }
      };
      loadFavorites();
    }, []);
  
    // Сохранение избранного при изменении
    useEffect(() => {
      const saveFavorites = async () => {
        try {
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (e) {
          console.error('Failed to save favorites', e);
        }
      };
      saveFavorites();
    }, [favorites]);
  
    const toggleFavorite = (hotel) => {
      setFavorites(prev => {
        const exists = prev.some(item => item.id === hotel.id);
        return exists 
          ? prev.filter(item => item.id !== hotel.id)
          : [...prev, hotel];
      });
    };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        favorites,
        setFavorites,
        bookings,
        setBookings,
        addBooking,
        cancelBooking,
        updateBookingDates,
        toggleFavorite,
        removeBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};