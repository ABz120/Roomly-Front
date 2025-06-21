import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { loginStyles } from './styles';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessRegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/users/register', {
        email,
        password,
        role: 'business',
      });

      console.log('Business registration successful:', response.data);

      if (response.data.id && response.data.role) {
        const tokenResponse = await axios.post('http://10.0.2.2:8000/api/users/login', {
          email,
          password,
        });
        if (tokenResponse.data.access_token) {
          await AsyncStorage.setItem('token', tokenResponse.data.access_token);
          await AsyncStorage.setItem('userRole', response.data.role);
          setIsLoggedIn(true);
          setUserRole(response.data.role);
          navigation.replace('BusinessTabs');
        } else {
          Alert.alert('Ошибка', 'Не удалось получить токен после регистрации');
        }
      } else {
        Alert.alert('Ошибка', 'Не удалось зарегистрировать бизнес-аккаунт');
      }
    } catch (error) {
      console.error('Business registration error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.detail === 'Email already registered'
        ? 'Этот email уже зарегистрирован'
        : 'Что-то пошло не так';
      Alert.alert('Ошибка регистрации', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
    >
      <Text style={loginStyles.title}>Регистрация бизнес-аккаунта</Text>

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

      <TextInput
        style={loginStyles.input}
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[loginStyles.button, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={loginStyles.buttonText}>
          {loading ? 'Загрузка...' : 'Зарегистрировать бизнес-аккаунт'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={loginStyles.linkContainer}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={loginStyles.linkText}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default BusinessRegisterScreen;