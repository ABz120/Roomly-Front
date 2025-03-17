import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker'; // Импортируем календарь
import { hotelDetailsStyles } from './styles';

const HotelDetailsScreen = ({ route }) => {
  const { hotel } = route.params;

  // Состояние для избранного
  const [isFavorite, setIsFavorite] = useState(false);

  // Состояние для управления видимостью окна выбора дат
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Состояние для выбранных дат
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Функция для переключения состояния избранного
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Функция для открытия окна выбора дат
  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Функция для закрытия окна выбора дат
  const closeDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Функция для обработки выбора дат
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null); // Сбрасываем конечную дату при выборе новой начальной
    }
  };

  // Функция для подтверждения бронирования
  const confirmBooking = () => {
    if (startDate && endDate) {
      alert(`Бронирование подтверждено с ${startDate.toString()} по ${endDate.toString()}`);
      closeDatePicker();
    } else {
      alert('Пожалуйста, выберите даты бронирования.');
    }
  };

  return (
    <View style={hotelDetailsStyles.wrapper}>
      <ScrollView style={hotelDetailsStyles.container}>
        {/* Контейнер для картинки и кнопки избранного */}
        <View style={hotelDetailsStyles.imageContainer}>
          <Image source={hotel.image} style={hotelDetailsStyles.image} />
          {/* Кнопка избранного */}
          <TouchableOpacity
            style={hotelDetailsStyles.favoriteButton}
            onPress={toggleFavorite}
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

        <Text style={hotelDetailsStyles.price}>{String(hotel.price)}</Text>

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

      {/* Кнопка бронирования */}
      <View style={hotelDetailsStyles.buttonContainer}>
        <TouchableOpacity
          style={hotelDetailsStyles.bookButton}
          onPress={openDatePicker}
        >
          <Text style={hotelDetailsStyles.buttonText}>Забронировать</Text>
        </TouchableOpacity>
      </View>

      {/* Модальное окно для выбора дат */}
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
              selectedDayColor="#21421E" // Цвет выделения выбранных дат
              selectedDayTextColor="#FFFFFF" // Цвет текста выбранных дат
            />

            {/* Кнопки Подтвердить и Закрыть */}
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
