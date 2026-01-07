import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { darkMode } = useStore();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const email = data.email?.toLowerCase().trim() || '';
    if (email.includes('@admin')) {
      navigation.replace('Home');
    } else {
      navigation.replace('UserHome');
    }
  };
  
  const bg = darkMode ? '#111827' : '#f3f4f6';
  const text = darkMode ? '#fff' : '#1f2937';
  const inputBg = darkMode ? '#374151' : '#fff';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <View style={styles.logoBox}><Text style={styles.logoText}>V</Text></View>
        <Text style={[styles.title, { color: text }]}>Valorant Store</Text>
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: inputBg, color: text }]} 
              placeholder="Email" 
              placeholderTextColor="#9ca3af" 
              autoCapitalize="none"
              value={value || ''} 
              onChangeText={onChange} 
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: inputBg, color: text }]} 
              placeholder="Password" 
              placeholderTextColor="#9ca3af" 
              secureTextEntry={true} // FIX: Pastikan pakai {}
              value={value || ''} 
              onChangeText={onChange} 
            />
          )}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  content: { padding: 24, alignItems: 'center' },
  logoBox: { width: 60, height: 60, backgroundColor: '#f97316', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  input: { width: '100%', padding: 16, borderRadius: 12, marginBottom: 12 },
  btn: { width: '100%', backgroundColor: '#f97316', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
});