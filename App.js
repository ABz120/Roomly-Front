import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, ActivityIndicator, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Экраны
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import HotelDetailsScreen from './screens/HotelDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BusinessRegisterScreen from './screens/BusinessRegisterScreen';
import PopularOffersScreen from './screens/PopularOffersScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ManagementScreen from './screens/ManagementScreen'; // Добавляем импорт

// Контекст
import { AuthProvider, AuthContext } from './AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Стек для главного экрана
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Главная" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="HotelDetails" 
        component={HotelDetailsScreen} 
        options={{ title: 'Детали отеля' }}
      />
      <Stack.Screen 
        name="PopularOffers" 
        component={PopularOffersScreen} 
        options={{ title: 'Популярные предложения' }}
      />
    </Stack.Navigator>
  );
}

// Стек для поиска
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResultsScreen} 
        options={{ title: 'Результаты поиска' }}
      />
    </Stack.Navigator>
  );
}

// Стек для профиля
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'Избранное' }}
      />
      <Stack.Screen 
        name="BookingHistory" 
        component={BookingHistoryScreen} 
        options={{ title: 'История бронирований' }}
      />
    </Stack.Navigator>
  );
}

// Стек для аутентификации
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BusinessRegister" 
        component={BusinessRegisterScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Таб-навигатор для обычных пользователей
function RegularTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#21421E',
        },
        headerTintColor: '#F5FFFA',
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Главная') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Поиск') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Профиль') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#21421E',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Главная" component={HomeStack} />
      <Tab.Screen name="Поиск" component={SearchStack} /> 
      <Tab.Screen name="Профиль" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Таб-навигатор для бизнес-пользователей
function BusinessTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#21421E',
        },
        headerTintColor: '#F5FFFA',
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Управление') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'Профиль') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#21421E',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Управление" component={ManagementScreen} />
      <Tab.Screen name="Профиль" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Корневой навигатор
function RootNavigator() {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole } = useContext(AuthContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('userRole');
        if (token && role) {
          setIsLoggedIn(true);
          setUserRole(role);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [setIsLoggedIn, setUserRole]);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#21421E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? (userRole === 'business' ? 'BusinessTabs' : 'RegularTabs') : 'Auth'}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthStack} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegularTabs" 
          component={RegularTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="BusinessTabs" 
          component={BusinessTabs} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#21421E" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <StatusBar backgroundColor="#21421E" barStyle="light-content" />
      <RootNavigator />
    </AuthProvider>
  );
}