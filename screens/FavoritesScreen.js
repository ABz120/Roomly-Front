import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './styles';
import { AuthContext } from '../AuthContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(AuthContext); // Предполагаем, что favorites хранится в контексте

  return (
    <ScrollView style={profileStyles.container}>

      {favorites?.length === 0 ? (
        <View style={profileStyles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
          <Text style={profileStyles.emptyText}>Нет избранных отелей</Text>
        </View>
      ) : (
        favorites?.map((hotel) => (
          <TouchableOpacity
            key={hotel.id}
            style={profileStyles.favoriteCard}
            onPress={() => navigation.navigate('HotelDetails', { hotel })}
          >
            <Image source={hotel.image} style={profileStyles.favoriteImage} />
            <View style={profileStyles.favoriteContent}>
              <Text style={profileStyles.favoriteTitle}>{hotel.title}</Text>
              <Text style={profileStyles.favoriteLocation}>{hotel.location}</Text>
              <Text style={profileStyles.favoritePrice}>{hotel.price}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;