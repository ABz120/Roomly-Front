import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import debounce from 'lodash/debounce';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Состояние для роли пользователя
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка токена и роли при старте
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('userRole');
        if (token && role) {
          setIsLoggedIn(true);
          setUserRole(role);
          await loadServerData(token);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        Alert.alert('Ошибка', 'Не удалось проверить статус авторизации');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Загрузка данных с сервера
  const loadServerData = async (token) => {
    try {
      const favoritesResponse = await axios.get('http://127.0.0.1:8000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favoritesResponse.data || []);

      const bookingsResponse = await axios.get('http://127.0.0.1:8000/api/users/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookingsResponse.data || []);
    } catch (error) {
      console.error('Error loading server data:', error);
      await loadLocalData();
    }
  };

  // Загрузка локальных данных
  const loadLocalData = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedBookings = await AsyncStorage.getItem('bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } catch (error) {
      console.error('Failed to load local data:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить локальные данные');
    }
  };

  // Дебаунсинг для сохранения данных
  const saveFavorites = debounce(async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить избранное');
    }
  }, 500);

  const saveBookings = debounce(async () => {
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (error) {
      console.error('Failed to save bookings:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить бронирования');
    }
  }, 500);

  // Сохранение favorites и bookings
  useEffect(() => {
    if (favorites.length > 0) saveFavorites();
  }, [favorites]);

  useEffect(() => {
    if (bookings.length > 0) saveBookings();
  }, [bookings]);

  // Функция для добавления бронирования
  const addBooking = async (hotel, startDate, endDate) => {
    const newBooking = {
      id: Date.now(),
      hotel,
      startDate,
      endDate,
      status: 'Активная',
    };
    setBookings((prev) => [...prev, newBooking]);

    if (isLoggedIn) {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.post(
          'http://127.0.0.1:8000/api/users/bookings',
          newBooking,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Failed to save booking to server:', error);
        Alert.alert('Ошибка', 'Не удалось сохранить бронирование на сервере');
      }
    }
  };

  // Функция для отмены бронирования
  const cancelBooking = async (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'Отменена' } : booking
      )
    );

    if (isLoggedIn) {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.patch(
          `http://127.0.0.1:8000/api/users/bookings/${id}`,
          { status: 'Отменена' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Failed to cancel booking on server:', error);
        Alert.alert('Ошибка', 'Не удалось отменить бронирование на сервере');
      }
    }
  };

  // Функция для удаления бронирования
  const removeBooking = async (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );

    if (isLoggedIn) {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/users/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error('Failed to remove booking from server:', error);
        Alert.alert('Ошибка', 'Не удалось удалить бронирование на сервере');
      }
    }
  };

  // Функция для изменения дат бронирования
  const updateBookingDates = async (id, newStartDate, newEndDate) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, startDate: newStartDate, endDate: newEndDate }
          : booking
      )
    );

    if (isLoggedIn) {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.patch(
          `http://127.0.0.1:8000/api/users/bookings/${id}`,
          { startDate: newStartDate, endDate: newEndDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Failed to update booking dates on server:', error);
        Alert.alert('Ошибка', 'Не удалось обновить даты бронирования на сервере');
      }
    }
  };

  // Функция для управления избранным
  const toggleFavorite = async (hotel) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === hotel.id);
      return exists
        ? prev.filter((item) => item.id !== hotel.id)
        : [...prev, hotel];
    });

    if (isLoggedIn) {
      try {
        const token = await AsyncStorage.getItem('token');
        if (favorites.some((item) => item.id === hotel.id)) {
          await axios.delete(`http://127.0.0.1:8000/api/favorites/${hotel.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          await axios.post(
            'http://127.0.0.1:8000/api/favorites',
            { hotelId: hotel.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (error) {
        console.error('Failed to update favorite on server:', error);
        Alert.alert('Ошибка', 'Не удалось обновить избранное на сервере');
      }
    }
  };

  // Функция для выхода из системы
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userRole'); // Удаляем роль
      setIsLoggedIn(false);
      setUserRole(null); // Сбрасываем роль
      setFavorites([]);
      setBookings([]);
      await AsyncStorage.removeItem('favorites');
      await AsyncStorage.removeItem('bookings');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Ошибка', 'Не удалось выйти из системы');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userRole, // Добавляем роль в контекст
        setUserRole, // Добавляем функцию установки роли
        favorites,
        setFavorites,
        bookings,
        setBookings,
        addBooking,
        cancelBooking,
        updateBookingDates,
        toggleFavorite,
        removeBooking,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};