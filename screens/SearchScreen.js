import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker'; // Импортируем календарь
import { searchStyles } from './styles';

const SearchScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState('Любой');

  // Состояния для модального окна и выбора дат
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Открыть модальное окно для выбора дат
  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // Закрыть модальное окно
  const closeDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  // Обработчик выбора дат
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null); // Сбросить конечную дату при выборе новой начальной
    }
  };

  // Подтверждение выбора дат
  const confirmBooking = () => {
    if (startDate && endDate) {
      setCheckInDate(startDate.toString().split(' ').slice(1, 4).join(' ')); // Форматирование даты
      setCheckOutDate(endDate.toString().split(' ').slice(1, 4).join(' ')); // Форматирование даты
    }
    closeDatePicker();
  };

  const handleSearch = () => {
    // Фильтруем предложения по количеству гостей
    const filteredOffers = offers.filter((offer) => offer.beds >= guests);

    // Переходим на экран результатов и передаем отфильтрованные данные
    navigation.navigate('SearchResults', { filteredOffers });
  };

  // Пример данных для предложений
  const offers = [
    {
      id: 1,
      title: 'Отель "Лето"',
      location: 'Сочи, Россия',
      price: '₽5,000/ночь',
      image: require('../assets/hotel1.jpg'),
      discount: 'Скидка 20%',
      rating: String('4.5'),
      beds: 2,
      rooms: 1,
    },
    {
      id: 2,
      title: 'Горный курорт',
      location: 'Красная Поляна',
      price: '₽7,500/ночь',
      image: require('../assets/hotel2.jpg'),
      discount: 'Акция: 3=2',
      rating: String('4.5'),
      beds: 2,
      rooms: 1,
    },
    {
      id: 3,
      title: 'Отель "Море"',
      location: 'Анапа, Россия',
      price: '₽4,500/ночь',
      image: require('../assets/hotel1.jpg'),
      discount: 'Скидка 15%',
      rating: String('4.5'),
      beds: 1,
      rooms: 1,
    },
    {
      id: 4,
      title: 'Отель "Солнце"',
      location: 'Геленджик, Россия',
      price: '₽6,000/ночь',
      image: require('../assets/hotel2.jpg'),
      discount: 'Акция: 4=3',
      rating: String('4.5'),
      beds: 4,
      rooms: 2,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView contentContainerStyle={searchStyles.container}>
        <Text style={searchStyles.header}>Найди свой идеальный отель</Text>

        {/* Поле ввода места */}
        <View style={searchStyles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="#21421E" style={searchStyles.icon} />
          <TextInput
            style={searchStyles.input}
            placeholder="Куда вы хотите поехать?"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#666"
          />
        </View>

        {/* Дата заезда */}
        <Text style={searchStyles.label}>Дата заезда</Text>
        <TouchableOpacity style={searchStyles.inputContainer} onPress={openDatePicker}>
          <Ionicons name="calendar-outline" size={20} color="#21421E" style={searchStyles.icon} />
          <Text style={searchStyles.input}>
            {checkInDate || 'дд.мм.гггг'}
          </Text>
        </TouchableOpacity>

        {/* Дата выезда */}
        <Text style={searchStyles.label}>Дата выезда</Text>
        <TouchableOpacity style={searchStyles.inputContainer} onPress={openDatePicker}>
          <Ionicons name="calendar-outline" size={20} color="#21421E" style={searchStyles.icon} />
          <Text style={searchStyles.input}>
            {checkOutDate || 'дд.мм.гггг'}
          </Text>
        </TouchableOpacity>

        {/* Количество гостей */}
        <Text style={searchStyles.label}>Количество гостей</Text>
        <View style={searchStyles.pickerContainer}>
          <Picker
            selectedValue={guests}
            style={searchStyles.picker}
            onValueChange={(itemValue) => setGuests(itemValue)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Picker.Item key={num} label={`${num} гостей`} value={num} />
            ))}
          </Picker>
        </View>

        {/* Тип номера */}
        <Text style={searchStyles.label}>Тип номера</Text>
        <View style={searchStyles.pickerContainer}>
          <Picker
            selectedValue={roomType}
            style={searchStyles.picker}
            onValueChange={(itemValue) => setRoomType(itemValue)}
          >
            {['Любой', 'Стандарт', 'Люкс', 'Сьют'].map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        {/* Кнопка поиска */}
        <TouchableOpacity style={searchStyles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" style={searchStyles.searchIcon} />
          <Text style={searchStyles.searchButtonText}>Найти</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Модальное окно для выбора дат */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDatePicker}
      >
        <View style={searchStyles.modalContainer}>
          <View style={searchStyles.calendarContainer}>
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
            <View style={searchStyles.buttonRow}>
              <TouchableOpacity
                style={[searchStyles.button, searchStyles.confirmButton]}
                onPress={confirmBooking}
              >
                <Text style={searchStyles.buttonText}>Выбрать</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[searchStyles.button, searchStyles.closeButton]}
                onPress={closeDatePicker}
              >
                <Text style={searchStyles.buttonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;