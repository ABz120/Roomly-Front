import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { loginStyles } from './styles';
import { AuthContext } from '../AuthContext'; // Импортируем контекст

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext); // Используем контекст

  const handleLogin = () => {
    // Заглушка для входа (без проверки данных)
    console.log('Login with:', email, password);

    
    // Переход на корневой навигатор (Tab.Navigator)
    navigation.replace('MainTabs');
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
      
      <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Войти</Text>
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