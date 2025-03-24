import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { popularOffersStyles } from './styles';

const PopularOffersScreen = ({ navigation }) => {
  // Пример данных для популярных предложений
  const popularOffers = [
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
      beds: 2,
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
      beds: 2,
      rooms: 1,
    },
  ];

  return (
    <ScrollView style={popularOffersStyles.container}>

      {popularOffers.map((offer) => (
        <TouchableOpacity
          key={offer.id}
          style={popularOffersStyles.card}
          onPress={() => navigation.navigate('HotelDetails', { hotel: offer })}
        >
          <Image 
            source={offer.image} 
            style={popularOffersStyles.cardImage} 
            resizeMode="cover"
          />
          <View style={popularOffersStyles.cardContent}>
            <Text style={popularOffersStyles.cardTitle}>{offer.title}</Text>
            <Text style={popularOffersStyles.cardLocation}>{offer.location}</Text>
            <Text style={popularOffersStyles.cardPrice}>{offer.price}</Text>
            <Text style={popularOffersStyles.cardDiscount}>{offer.discount}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PopularOffersScreen;