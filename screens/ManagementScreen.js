import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ManagementStyles, homeStyles } from './styles';
import { StyleSheet } from 'react-native';

// Заглушка для одной карточки отеля
const dummyHotel = {
  id: 1,
  title: 'Отель "Лето"',
  location: 'Сочи, Россия',
  description: 'Уютный отель с видом на море',
  image: require('../assets/hotel1.jpg'), // Убедитесь, что изображение существует
  rating: '4.5',
  beds: 2,
  rooms: 1,
};

const ManagementScreen = () => {
  console.log('Rendering ManagementScreen'); // Логирование для проверки рендеринга
  const [hotels, setHotels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newHotel, setNewHotel] = useState({ name: '', address: '', description: '', photo: '' });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://10.0.2.2:8000/api/hotels/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке отелей:', error);
    }
  };

  const handleAddHotel = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('http://10.0.2.2:8000/api/hotels/', newHotel, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalVisible(false);
      setNewHotel({ name: '', address: '', description: '', photo: '' });
      fetchHotels();
    } catch (error) {
      console.error('Ошибка при добавлении отеля:', error);
    }
  };

  return (
    <View style={ManagementStyles.container}>
      <ScrollView>
        <Text style={homeStyles.header}>Управление</Text>
        {hotels.length === 0 ? (
          <View>
            
            {/* Заглушка одной карточки отеля */}
            <TouchableOpacity style={ManagementStyles.card}>
              <Image source={dummyHotel.image} style={ManagementStyles.cardImage} resizeMode="cover" />
              <View style={ManagementStyles.cardContent}>
                <Text style={ManagementStyles.cardTitle}>{dummyHotel.title}</Text>
                <Text style={ManagementStyles.cardLocation}>{dummyHotel.location}</Text>
                <Text style={ManagementStyles.cardDescription}>{dummyHotel.description}</Text>
                <Text style={ManagementStyles.cardRating}>Рейтинг: {dummyHotel.rating}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          hotels.map((hotel) => (
            <View key={hotel.id} style={ManagementStyles.card}>
              <Image source={{ uri: hotel.image }} style={ManagementStyles.cardImage} resizeMode="cover" />
              <View style={ManagementStyles.cardContent}>
                <Text style={ManagementStyles.cardTitle}>{hotel.name}</Text>
                <Text style={ManagementStyles.cardLocation}>{hotel.address}</Text>
                <Text style={ManagementStyles.cardDescription}>{hotel.description}</Text>
                <Text style={ManagementStyles.cardRating}>Рейтинг: {hotel.rating}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={ManagementStyles.addButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={ManagementStyles.modalContainer}>
          <Text style={ManagementStyles.modalTitle}>Добавить отель</Text>
          <TextInput
            style={ManagementStyles.input}
            placeholder="Название"
            value={newHotel.name}
            onChangeText={(text) => setNewHotel({ ...newHotel, name: text })}
          />
          <TextInput
            style={ManagementStyles.input}
            placeholder="Адрес"
            value={newHotel.address}
            onChangeText={(text) => setNewHotel({ ...newHotel, address: text })}
          />
          <TextInput
            style={ManagementStyles.input}
            placeholder="Описание"
            value={newHotel.description}
            onChangeText={(text) => setNewHotel({ ...newHotel, description: text })}
          />
          <TextInput
            style={ManagementStyles.input}
            placeholder="Добавить фото"
            value={newHotel.photo}
            onChangeText={(text) => setNewHotel({ ...newHotel, photo: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddHotel}>
            <Text style={styles.buttonText}>Добавить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.buttonText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#21421E',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F5FFFA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManagementScreen;