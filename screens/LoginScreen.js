import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { loginStyles } from './styles';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/users/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      if (response.data.access_token) {
        await AsyncStorage.setItem('token', response.data.access_token);

        // Запрос для получения роли пользователя
        const userResponse = await axios.get('http://10.0.2.2:8000/api/users/me', {
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        });

        const role = userResponse.data.role;
        if (role) {
          await AsyncStorage.setItem('userRole', role);
          setIsLoggedIn(true);
          setUserRole(role);

          if (role === 'business') {
            navigation.replace('BusinessTabs');
          } else {
            navigation.replace('RegularTabs');
          }
        } else {
          Alert.alert('Ошибка', 'Не удалось определить роль пользователя');
        }
      } else {
        Alert.alert('Ошибка', 'Неверные данные для входа');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert('Ошибка входа', error.response?.data?.detail || 'Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
    >
      <Text style={loginStyles.title}>Вход</Text>

      <TextInput
        style={loginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[loginStyles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={loginStyles.buttonText}>
          {loading ? 'Загрузка...' : 'Войти'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={loginStyles.linkContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={loginStyles.linkText}>Ещё нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={loginStyles.linkContainer}
        onPress={() => navigation.navigate('BusinessRegister')}
      >
        <Text style={loginStyles.linkText}>Создать бизнес-аккаунт?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;