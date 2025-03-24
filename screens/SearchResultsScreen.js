import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchResultsScreen = ({ route }) => {
  const { filteredOffers } = route.params;

  // Если результатов нет, отображаем сообщение и иконку
  if (filteredOffers.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <AntDesign name="frowno" size={60} color="#21421E" style={styles.sadIcon} />
        <Text style={styles.noResultsText}>Ой, ничего не нашли!</Text>
        <Text style={styles.noResultsSubText}>Попробуйте скорректировать поиск.</Text>
      </View>
    );
  }

  // Рендер элемента списка
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.discount}>{item.discount}</Text>
      <Text style={styles.rating}>Рейтинг: {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredOffers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21421E',
    marginBottom: 4,
  },
  discount: {
    fontSize: 14,
    color: '#FF6347',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#21421E',
    marginTop: 16,
  },
  noResultsSubText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  sadIcon: {
    marginBottom: 16,
  },
});

export default SearchResultsScreen;