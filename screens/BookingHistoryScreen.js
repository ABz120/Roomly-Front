import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { profileStyles } from './styles';
import { AuthContext } from '../AuthContext';

const BookingHistoryScreen = ({ navigation }) => {
  const { bookings, cancelBooking, updateBookingDates, removeBooking } = useContext(AuthContext);

  // Нормализация дат
  const normalizedBookings = bookings.map((booking) => ({
    ...booking,
    startDate: new Date(booking.startDate),
    endDate: new Date(booking.endDate),
  }));

  // Форматирование даты
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  // Состояния для модального окна изменения дат
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  // Открыть модальное окно изменения дат
  const openDatePicker = (bookingId) => {
    setSelectedBookingId(bookingId);
    setDatePickerVisible(true);
  };

  // Закрыть модальное окно изменения дат
  const closeDatePicker = () => {
    setDatePickerVisible(false);
    setNewStartDate(null);
    setNewEndDate(null);
  };

  // Обработчик выбора дат
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setNewEndDate(date);
    } else {
      setNewStartDate(date);
      setNewEndDate(null);
    }
  };

  // Подтверждение изменения дат
  const confirmDateChange = () => {
    if (newStartDate && newEndDate) {
      updateBookingDates(
        selectedBookingId,
        newStartDate.toISOString(),
        newEndDate.toISOString()
      );
      closeDatePicker();
      alert('Даты бронирования успешно изменены!');
    } else {
      alert('Пожалуйста, выберите новые даты бронирования.');
    }
  };

  // Удалить бронирование
  const handleDeleteBooking = (bookingId) => {
    Alert.alert(
      'Удалить бронирование',
      'Вы уверены, что хотите удалить это бронирование из истории?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            removeBooking(bookingId);
          },
        },
      ]
    );
  };

  // Подтверждение отмены бронирования
  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Отменить бронирование',
      'Вы уверены, что хотите отменить это бронирование?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Подтвердить',
          onPress: () => {
            cancelBooking(bookingId); // Вызов функции отмены бронирования
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={profileStyles.container}>
      {normalizedBookings?.length === 0 ? (
        <View style={profileStyles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
          <Text style={profileStyles.emptyText}>Бронирований нет</Text>
        </View>
      ) : (
        normalizedBookings?.map((booking) => (
          <View key={booking.id} style={profileStyles.favoriteCard}>
            <TouchableOpacity
              style={{ flexDirection: 'row', flex: 1 }}
              onPress={() => navigation.navigate('HotelDetails', { hotel: booking.hotel })}
            >
              <Image source={booking.hotel.image} style={profileStyles.favoriteImage} />
              <View style={profileStyles.favoriteContent}>
                <Text style={profileStyles.favoriteTitle}>{booking.hotel.title}</Text>
                <Text style={profileStyles.favoriteLocation}>{booking.hotel.location}</Text>
                <Text style={profileStyles.favoritePrice}>{booking.hotel.price}</Text>

                <Text
                  style={[
                    profileStyles.favoriteStatus,
                    booking.status === 'Активная'
                      ? profileStyles.favoriteStatusActive
                      : profileStyles.favoriteStatusCancelled,
                  ]}
                >
                  Статус: {booking.status}
                </Text>

                <Text style={profileStyles.favoriteDates}>
                  Даты: {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Кнопки для активных бронирований */}
            {booking.status === 'Активная' && (
              <View style={profileStyles.bookingActions}>
                <TouchableOpacity
                  style={profileStyles.bookingActionCancelButton}
                  onPress={() => handleCancelBooking(booking.id)} // Используем handleCancelBooking
                >
                  <Text style={profileStyles.bookingActionText}>Отменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={profileStyles.bookingActionButton}
                  onPress={() => openDatePicker(booking.id)}
                >
                  <Text style={profileStyles.bookingActionText}>Изменить</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Кнопка "Удалить из истории" для отменённых бронирований */}
            {booking.status === 'Отменена' && (
              <View style={profileStyles.bookingActions}>
                <TouchableOpacity
                  style={profileStyles.bookingActionDeleteButton}
                  onPress={() => handleDeleteBooking(booking.id)}
                >
                  <Text style={profileStyles.bookingActionText}>Удалить из истории</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}

      {/* Модальное окно изменения дат */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDatePicker}
      >
        <View style={profileStyles.modalContainer}>
          <View style={profileStyles.calendarContainer}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              onDateChange={onDateChange}
              selectedStartDate={newStartDate}
              selectedEndDate={newEndDate}
              selectedDayColor="#21421E"
              selectedDayTextColor="#FFFFFF"
            />

            <View style={profileStyles.buttonRow}>
              <TouchableOpacity
                style={[profileStyles.bookingButton, profileStyles.bookingConfirmButton]}
                onPress={confirmDateChange}
              >
                <Text style={profileStyles.bookingButtonText}>Подтвердить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[profileStyles.bookingButton, profileStyles.bookingCloseButton]}
                onPress={closeDatePicker}
              >
                <Text style={profileStyles.bookingButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default BookingHistoryScreen;