import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';

export default function AddItemScreen() {
  const { control, handleSubmit } = useForm();
  const { addProduct, darkMode } = useStore();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    await addProduct({
      vp: parseInt(data.vp),
      bonus: parseInt(data.bonus || '0'),
      price: parseInt(data.price),
      popular: data.popular || false,
    });
    navigation.goBack();
  };

  const bg = darkMode ? '#111827' : '#fff';
  const text = darkMode ? '#fff' : '#1f2937';
  const inputBg = darkMode ? '#374151' : '#f3f4f6';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.label, {color: text}]}>VP Amount</Text>
      <Controller control={control} name="vp" render={({ field: { onChange, value } }) => (
        <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} keyboardType="numeric" value={value} onChangeText={onChange} placeholder="1000" placeholderTextColor="#888" />
      )}/>
      
      <Text style={[styles.label, {color: text}]}>Bonus</Text>
      <Controller control={control} name="bonus" render={({ field: { onChange, value } }) => (
        <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} keyboardType="numeric" value={value} onChangeText={onChange} placeholder="0" placeholderTextColor="#888"/>
      )}/>

      <Text style={[styles.label, {color: text}]}>Price (IDR)</Text>
      <Controller control={control} name="price" render={({ field: { onChange, value } }) => (
        <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} keyboardType="numeric" value={value} onChangeText={onChange} placeholder="150000" placeholderTextColor="#888"/>
      )}/>

      <View style={{flexDirection:'row', alignItems:'center', marginTop:16}}>
        <Text style={[styles.label, {color: text, flex:1}]}>Popular Item?</Text>
        <Controller control={control} name="popular" defaultValue={false} render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} trackColor={{ false: '#767577', true: '#f97316' }}/>
        )}/>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}><Text style={styles.btnText}>Simpan</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: { padding: 12, borderRadius: 8 },
  btn: { backgroundColor: '#f97316', padding: 16, borderRadius: 8, marginTop: 32, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});