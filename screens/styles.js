// screens/styles.js
import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'Poppins_600SemiBold',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 10,
      marginBottom: 24,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchText: {
      color: '#888',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    card: {
      width: 250,
      marginRight: 16,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10,
    },
    cardImage: {
      width: '100%',
      height: 150,
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardLocation: {
      fontSize: 14,
      color: '#888',
      marginTop: 4,
    },
    cardPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 8,
    },
    cardDiscount: {
      fontSize: 12,
      color: '#900020',
      marginTop: 4,
    },
    divider: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginVertical: 16,
    },
    promoCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    promoImage: {
      width: 100,
      height: 100,
    },
    promoContent: {
      flex: 1,
      padding: 12,
    },
    promoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    promoDescription: {
      fontSize: 14,
      color: '#888',
      marginTop: 4,
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12 }, { translateY: -12 }],
    },
    showAllButton: {
      backgroundColor: '#21421E',
      paddingVertical: 6, 
      paddingHorizontal: 12, 
      borderRadius: 15, 
      alignSelf: 'center',
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    showAllText: {
      color: '#fff',
      fontSize: 12, // Делаем текст меньше
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
  });

export const hotelDetailsStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Явно задаем белый фон для всего экрана
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF', // Убедимся, что контейнер тоже белый
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#21421E',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#21421E',
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent', // Убираем возможный серый фон
  },
  bookButton: {
    backgroundColor: '#21421E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#21421E',
  },
  closeButton: {
    backgroundColor: '#900020',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  priceContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent', // Убираем белый фон, если он мешает
    marginBottom: 10,
  },
});

export const searchStyles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 12,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#CCC',
      marginBottom: 16,
      height: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 8,
    },
    pickerContainer: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#CCC',
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    picker: {
      height: 50,
    },
    searchButton: {
      backgroundColor: '#21421E',
      paddingVertical: 14,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchIcon: {
      marginRight: 8,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '90%',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: '#21421E',
    },
    closeButton: {
      backgroundColor: '#21421E',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export const profileStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
      backgroundColor: '#21421E',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#fff',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 10,
    },
    userEmail: {
      fontSize: 16,
      color: '#ddd',
      marginTop: 5,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    statCard: {
      backgroundColor: '#F0F0F0',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      width: '40%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#21421E',
      marginTop: 5,
    },
    statLabel: {
      fontSize: 14,
      color: '#666',
    },
    actionsContainer: {
      marginHorizontal: 16,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    actionText: {
      fontSize: 16,
      color: '#21421E',
      marginLeft: 10,
    },
    logoutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 16,
      padding: 16,
      backgroundColor: '#900020',
      borderRadius: 10,
    },
    logoutText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      },
      emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 20,
        fontFamily: 'Poppins_500Medium',
      },
      favoriteCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      favoriteContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
      },
      favoriteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins_600SemiBold',
      },
      favoriteLocation: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        fontFamily: 'Poppins_400Regular',
      },
      favoritePrice: {
        fontSize: 14,
        color: '#21421E',
        marginTop: 8,
        fontFamily: 'Poppins_600SemiBold',
      },
      favoriteContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
      },
      favoriteHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        fontFamily: 'Poppins_600SemiBold',
      },
      emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      },
      emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 20,
        fontFamily: 'Poppins_500Medium',
      },
      favoriteCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center', // Выравниваем элементы по центру
      },
      favoriteImage: {
        width: 100,
        height: 80,
        borderRadius: 8,
      },
      favoriteContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
      },
      favoriteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins_600SemiBold',
      },
      favoriteLocation: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        fontFamily: 'Poppins_400Regular',
      },
      favoritePrice: {
        fontSize: 14,
        color: '#21421E',
        marginTop: 8,
        fontFamily: 'Poppins_600SemiBold',
      },
      favoriteIcon: {
        padding: 8,
        marginLeft: 8,
      },
      bookingActions: {
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        marginTop: 10,
      },
      bookingActionButton: {
        backgroundColor: '#21421E',
        padding: 8,
        borderRadius: 5,
        marginVertical: 5, 
        width: 120, 
        alignItems: 'center',
      },
      bookingActionCancelButton: {
        backgroundColor: '#900020',
        padding: 8,
        borderRadius: 5,
        marginVertical: 5, 
        width: 120, 
        alignItems: 'center',
      },
      bookingActionText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      bookingButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
      },
      bookingConfirmButton: {
        backgroundColor: '#21421E',
      },
      bookingCloseButton: {
        backgroundColor: '#900020',
      },
      bookingButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      favoriteStatus: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: 'Poppins_500Medium',
      },
      favoriteStatusActive: {
        color: '#21421E', // Зеленый для активных бронирований
      },
      favoriteStatusCancelled: {
        color: '#900020', // Красный для отмененных бронирований
      },
      favoriteDates: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        fontFamily: 'Poppins_400Regular',
      },
      menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      menuOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      menuContainer: {
        position: 'absolute',
        top: 40, 
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      menuItem: {
        padding: 10,
      },
      menuItemText: {
        fontSize: 16,
        color: '#21421E',
      },
      bookingActionDeleteButton: {
        backgroundColor: '#900020',
        padding: 8,
        borderRadius: 5,
        marginVertical: 5, 
        width: 120, 
        alignItems: 'center',
      },
  });

export const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#21421E',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    linkContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    linkText: {
      color: '#21421E',
      fontSize: 14,
    },
  });

  export const popularOffersStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 0, // Убираем боковые отступы
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      paddingHorizontal: 16, // Отступы только для заголовка
      textAlign: 'center',
      fontFamily: 'Poppins_600SemiBold',
    },
    card: {
      marginBottom: 16,
      borderRadius: 0, // Убираем скругление
      overflow: 'hidden',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: '100%', // Полная ширина
    },
    cardImage: {
      width: '100%',
      height: 200, // Увеличим высоту изображения
    },
    cardContent: {
      padding: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Poppins_600SemiBold',
    },
    cardLocation: {
      fontSize: 14,
      color: '#888',
      marginTop: 8,
      fontFamily: 'Poppins_400Regular',
    },
    cardPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 12,
      color: '#21421E',
      fontFamily: 'Poppins_600SemiBold',
    },
    cardDiscount: {
      fontSize: 14,
      color: '#900020',
      marginTop: 8,
      fontFamily: 'Poppins_500Medium',
    },
  });

  export const ManagementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  cardRating: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: '#21421E',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  noHotelsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
});
