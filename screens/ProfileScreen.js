import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './styles';
import { AuthContext } from '../AuthContext'; // Импортируем контекст

const ProfileScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(AuthContext); // Используем контекст

  const user = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: require('../assets/avatar.png'),
    bookings: 12,
    rewards: 150,
  };

  const handleLogout = () => {
    // Очистка данных пользователя (если есть)
    setIsLoggedIn(false); // Устанавливаем состояние авторизации

    // Переход на экран логина с очисткой стека навигации
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }], 
    });
  };

  return (
    <ScrollView style={profileStyles.container}>
      <View style={profileStyles.header}>
        <Image source={user.avatar} style={profileStyles.avatar} />
        <Text style={profileStyles.userName}>{user.name}</Text>
        <Text style={profileStyles.userEmail}>{user.email}</Text>
      </View>

      <View style={profileStyles.statsContainer}>
        <View style={profileStyles.statCard}>
          <Ionicons name="calendar" size={24} color="#21421E" />
          <Text style={profileStyles.statValue}>{user.bookings}</Text>
          <Text style={profileStyles.statLabel}>Бронирований</Text>
        </View>
        <View style={profileStyles.statCard}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={profileStyles.statValue}>{user.rewards}</Text>
          <Text style={profileStyles.statLabel}>Баллов</Text>
        </View>
      </View>

      <View style={profileStyles.actionsContainer}>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Настройки')}>
          <Ionicons name="settings-outline" size={20} color="#21421E" />
          <Text style={profileStyles.actionText}>Настройки</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Favorites')} >
          <Ionicons name="heart-outline" size={20} color="#21421E" />
          <Text style={profileStyles.actionText}>Избранное</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('BookingHistory')}>
          <Ionicons name="time-outline" size={20} color="#21421E" />
          <Text style={profileStyles.actionText}>История бронирований</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={profileStyles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;