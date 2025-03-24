import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './styles';
import { AuthContext } from '../AuthContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useContext(AuthContext); // Добавляем toggleFavorite

  return (
    <ScrollView style={profileStyles.favoriteContainer}>

      {favorites?.length === 0 ? (
        <View style={profileStyles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
          <Text style={profileStyles.emptyText}>Нет избранных отелей</Text>
        </View>
      ) : (
        favorites?.map((hotel) => (
          <View key={hotel.id} style={profileStyles.favoriteCard}>
            <TouchableOpacity
              style={{ flexDirection: 'row', flex: 1 }}
              onPress={() => navigation.navigate('HotelDetails', { hotel })}
            >
              <Image source={hotel.image} style={profileStyles.favoriteImage} />
              <View style={profileStyles.favoriteContent}>
                <Text style={profileStyles.favoriteTitle}>{hotel.title}</Text>
                <Text style={profileStyles.favoriteLocation}>{hotel.location}</Text>
                <Text style={profileStyles.favoritePrice}>{hotel.price}</Text>
              </View>
            </TouchableOpacity>

            {/* Кнопка удаления из избранного */}
            <TouchableOpacity
              style={profileStyles.favoriteIcon}
              onPress={() => toggleFavorite(hotel)} // Удаляем отель из избранного
            >
              <Ionicons 
                name="heart" 
                size={34} 
                color="#ff0000" 
              />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;