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
  const { setIsLoggedIn } = useContext(AuthContext);

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

      // Сохраняем токен, если API его возвращает
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }

      setIsLoggedIn(true);
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert('Ошибка входа', error.response?.data?.message || 'Неверный email или пароль');
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
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;