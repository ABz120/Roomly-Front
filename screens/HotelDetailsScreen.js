import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hotelDetailsStyles } from './styles';

const HotelDetailsScreen = ({ route }) => {
  const { hotel } = route.params;

  return (
    <View style={hotelDetailsStyles.wrapper}>
      <ScrollView style={hotelDetailsStyles.container}>
        <Image source={hotel.image} style={hotelDetailsStyles.image} />
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
        <TouchableOpacity style={hotelDetailsStyles.bookButton}>
          <Text style={hotelDetailsStyles.buttonText}>Забронировать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HotelDetailsScreen;
