import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { hotelDetailsStyles } from './styles';
import { AuthContext } from '../AuthContext';

const HotelDetailsScreen = ({ route }) => {
  const { hotel } = route.params;
  const { favorites, toggleFavorite, addBooking } = useContext(AuthContext);
  const isFavorite = favorites.some(item => item.id === hotel.id);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [realTimePrice, setRealTimePrice] = useState(hotel.price || 'Цена недоступна');
  const [popularityFactor, setPopularityFactor] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(1)); // Для анимации "горящей" цены

  // Подключение к WebSocket
  useEffect(() => {
    const wsUrl = `ws://10.0.2.2:8000/api/hotels/ws/rooms/offers/7`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket соединение открыто');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.current_price && data.popularity_factor !== undefined) {
        // Форматируем цену как целое число с пробелами между тысячами
        const formattedPrice = data.current_price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        setRealTimePrice(`₽${formattedPrice}`);
        setPopularityFactor(data.popularity_factor);

        // Запускаем анимацию, если popularity_factor < 3
        if (data.popularity_factor < 3) {
          Animated.loop(
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 0.5,
                duration:400,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
            ])
          ).start();
        } else {
          fadeAnim.setValue(1); // Останавливаем анимацию, если фактор >= 3
          Animated.loop().stop();
        }
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket ошибка:', error.message);
    };

    ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };

    // Закрытие соединения при размонтировании компонента
    return () => {
      ws.close();
      fadeAnim.setValue(1); // Сбрасываем анимацию при размонтировании
      Animated.loop().stop();
    };
  }, [hotel.id, fadeAnim]);

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const closeDatePicker = () => {
    setDatePickerVisible(false);
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const confirmBooking = () => {
    if (startDate && endDate) {
      addBooking(hotel, startDate, endDate);
      closeDatePicker();
    } else {
      alert('Пожалуйста, выберите даты бронирования.');
    }
  };

  return (
    <View style={hotelDetailsStyles.wrapper}>
      <ScrollView style={hotelDetailsStyles.container}>
        <View style={hotelDetailsStyles.imageContainer}>
          <Image source={hotel.image} style={hotelDetailsStyles.image} />
          <TouchableOpacity
            style={hotelDetailsStyles.favoriteButton}
            onPress={() => toggleFavorite(hotel)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={30}
              color={isFavorite ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>

        <Text style={hotelDetailsStyles.title}>{hotel.title}</Text>
        <View style={hotelDetailsStyles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#21421E" />
          <Text style={hotelDetailsStyles.locationText}>{hotel.location}</Text>
        </View>

        <Text style={hotelDetailsStyles.description}>
          {hotel.description ? hotel.description : 'Описание отсутствует'}
        </Text>

        <View style={hotelDetailsStyles.details}>
          <View style={hotelDetailsStyles.detailItem}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={hotelDetailsStyles.detailText}>{String(hotel.rating)}</Text>
          </View>

          <View style={hotelDetailsStyles.detailItem}>
            <Ionicons name="bed-outline" size={20} color="#21421E" />
            <Text style={hotelDetailsStyles.detailText}>Кровати: {hotel.beds}</Text>
          </View>

          <View style={hotelDetailsStyles.detailItem}>
            <Ionicons name="home-outline" size={20} color="#21421E" />
            <Text style={hotelDetailsStyles.detailText}>Комнаты: {hotel.rooms}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Цена над кнопкой забронировать */}
      <View style={hotelDetailsStyles.priceContainer}>
        <Animated.Text style={[hotelDetailsStyles.price, { opacity: fadeAnim }]}>
          {realTimePrice}
        </Animated.Text>
      </View>

      <View style={hotelDetailsStyles.buttonContainer}>
        <TouchableOpacity
          style={hotelDetailsStyles.bookButton}
          onPress={openDatePicker}
        >
          <Text style={hotelDetailsStyles.buttonText}>Забронировать</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDatePicker}
      >
        <View style={hotelDetailsStyles.modalContainer}>
          <View style={hotelDetailsStyles.calendarContainer}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              onDateChange={onDateChange}
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              selectedDayColor="#21421E"
              selectedDayTextColor="#FFFFFF"
            />

            <View style={hotelDetailsStyles.buttonRow}>
              <TouchableOpacity
                style={[hotelDetailsStyles.button, hotelDetailsStyles.confirmButton]}
                onPress={confirmBooking}
              >
                <Text style={hotelDetailsStyles.buttonText}>Подтвердить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[hotelDetailsStyles.button, hotelDetailsStyles.closeButton]}
                onPress={closeDatePicker}
              >
                <Text style={hotelDetailsStyles.buttonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HotelDetailsScreen;