import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { searchStyles } from './styles';

const SearchScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState('Любой');

  const handleSearch = () => {
    alert(`Поиск: ${location}, ${checkInDate}, ${checkOutDate}, ${guests} гостей, ${roomType}`);
  };

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
      <View style={searchStyles.inputContainer}>
        <Ionicons name="calendar-outline" size={20} color="#21421E" style={searchStyles.icon} />
        <TextInput
          style={searchStyles.input}
          placeholder="дд.мм.гггг"
          value={checkInDate}
          onChangeText={setCheckInDate}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
      </View>

      {/* Дата выезда */}
      <Text style={searchStyles.label}>Дата выезда</Text>
      <View style={searchStyles.inputContainer}>
        <Ionicons name="calendar-outline" size={20} color="#21421E" style={searchStyles.icon} />
        <TextInput
          style={searchStyles.input}
          placeholder="дд.мм.гггг"
          value={checkOutDate}
          onChangeText={setCheckOutDate}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
      </View>

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
  </SafeAreaView>
);
};

export default SearchScreen;
