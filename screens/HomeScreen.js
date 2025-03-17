import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeStyles } from './styles';



const HomeScreen = ({ navigation }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const popularOffers = [
    {
        id: 1,
        title: 'Отель "Лето"',
        location: 'Сочи, Россия',
        price: String('₽5,000/ночь'),
        image: require('../assets/hotel1.jpg'),
        discount: 'Скидка 20%',
        rating: String('4.5'),
        reviewsCount: 125,
        beds: 2,
        rooms: 1,
        amenities: ['Wi-Fi', 'Бассейн', 'Парковка', 'Завтрак включен'],
        description: 'Уютный отель у моря с видом на пляж. Отличный вариант для летнего отдыха.',
      },
      {
        id: 2,
        title: 'Горный курорт',
        location: 'Красная Поляна',
        price: String('₽7,500/ночь'),
        image: require('../assets/hotel2.jpg'),
        discount: 'Акция: 3=2',
        rating: String('4.8'),
        reviewsCount: 98,
        beds: 3,
        rooms: 2,
        amenities: ['Спа', 'Горнолыжные трассы', 'Ресторан', 'Фитнес-зал'],
        description: 'Роскошный горный курорт с потрясающим видом на заснеженные вершины.',
      },
  ];

  const promotions = [
    {
      id: 1,
      title: 'Раннее бронирование',
      description: 'Забронируйте заранее и получите скидку 25%',
      image: require('../assets/promo1.jpg'),
    },
    {
      id: 2,
      title: 'Семейный отдых',
      description: 'Специальные условия для семей',
      image: require('../assets/promo1.jpg'),
    },
  ];

  return (
    <ScrollView style={homeStyles.container}>
      {/* Заголовок */}
      <Text style={homeStyles.header}>Roomly</Text>

      {/* Поиск */}
      <TouchableOpacity
        style={homeStyles.searchBar}
        onPress={() => navigation.navigate('Поиск')}
      >
        <Ionicons name="search" size={20} color="#888" style={homeStyles.searchIcon} />
        <Text style={homeStyles.searchText}>Куда вы хотите поехать?</Text>
      </TouchableOpacity>

      {/* Популярные предложения */}
<View style={homeStyles.sectionHeader}>
  <Text style={homeStyles.sectionTitle}>Популярные предложения</Text>
  <TouchableOpacity 
    style={homeStyles.showAllButton} 
    onPress={() => navigation.navigate('PopularOffers')}
  >
    <Text style={homeStyles.showAllText}>Показать все</Text>
  </TouchableOpacity>
</View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popularOffers.map((offer) => (
          <TouchableOpacity
            key={offer.id}
            style={homeStyles.card}
            onPress={() => navigation.navigate('HotelDetails', { hotel: offer })}
            activeOpacity={0.7}
          >
            <Image
              source={offer.image}
              style={homeStyles.cardImage}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
            {imageLoading && (
              <ActivityIndicator style={homeStyles.loader} color="#4A90E2" />
            )}
            <View style={homeStyles.cardContent}>
              <Text style={homeStyles.cardTitle}>{offer.title}</Text>
              <Text style={homeStyles.cardLocation}>{offer.location}</Text>
              <Text style={homeStyles.cardPrice}>{offer.price}</Text>
              <Text style={homeStyles.cardDiscount}>{offer.discount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Разделитель */}
      <View style={homeStyles.divider} />

      {/* Акции */}
      <Text style={homeStyles.sectionTitle}>Акции</Text>
      {promotions.map((promo) => (
        <TouchableOpacity key={promo.id} style={homeStyles.promoCard}>
          <Image source={promo.image} style={homeStyles.promoImage} />
          <View style={homeStyles.promoContent}>
            <Text style={homeStyles.promoTitle}>{promo.title}</Text>
            <Text style={homeStyles.promoDescription}>{promo.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;