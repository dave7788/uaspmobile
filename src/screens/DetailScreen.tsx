import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../store/useStore';
import Toast from 'react-native-toast-message'; // Import Toast langsung

export default function DetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { productId } = route.params; // ID produk dari navigasi
  const { products, updateProduct, deleteProduct, darkMode } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const product = products.find(p => p.id === productId);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { vp: '', bonus: '', price: '', popular: false }
  });

  useEffect(() => {
    if (product) {
      reset({
        vp: product.vp?.toString() || '',
        bonus: product.bonus?.toString() || '0',
        price: product.price?.toString() || '',
        popular: product.popular || false,
      });
    }
  }, [product, reset]);

  const onUpdate = async (data: any) => {
    await updateProduct(productId, {
      vp: parseInt(data.vp) || 0,
      bonus: parseInt(data.bonus) || 0,
      price: parseInt(data.price) || 0,
      popular: data.popular,
    });
    navigation.goBack();
  };

  // FUNGSI HAPUS LANGSUNG (TANPA ALERT) UNTUK TES
  const onDeleteDirect = async () => {
    // 1. Cek apakah ID ada
    if (!productId) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Product ID tidak ditemukan!' });
      return;
    }

    setIsDeleting(true);
    Toast.show({ type: 'info', text1: 'Proses...', text2: `Menghapus ID: ${productId}` });

    // 2. Panggil fungsi di Store
    await deleteProduct(productId);
    
    setIsDeleting(false);
    navigation.goBack();
  };

  const bg = darkMode ? '#111827' : '#fff';
  const text = darkMode ? '#fff' : '#1f2937';
  const inputBg = darkMode ? '#374151' : '#f3f4f6';

  if (!product) return (
    <View style={[styles.container, {backgroundColor: bg}]}>
       <Text style={{color: text, textAlign:'center', marginTop: 50}}>
          Produk tidak ditemukan di List.
          {"\n"}ID yang dicari: {productId}
       </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      
      {/* DEBUG ID: Pastikan ini muncul angkanya */}
      <Text style={{color: '#9ca3af', textAlign:'center', marginBottom:10}}>
        Editing Product ID: {productId}
      </Text>

      {/* FORM VP */}
      <Text style={[styles.label, { color: text }]}>Jumlah VP</Text>
      <Controller control={control} name="vp" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      {/* FORM BONUS */}
      <Text style={[styles.label, { color: text }]}>Bonus VP</Text>
      <Controller control={control} name="bonus" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      {/* FORM PRICE */}
      <Text style={[styles.label, { color: text }]}>Harga (Rp)</Text>
      <Controller control={control} name="price" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      {/* SWITCH POPULAR */}
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
        <Text style={[styles.label, { color: text, flex: 1, marginTop: 0 }]}>Tandai Populer</Text>
        <Controller control={control} name="popular" render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} trackColor={{true:'#f97316'}}/>
        )}/>
      </View>

      {/* TOMBOL UPDATE */}
      <TouchableOpacity style={[styles.btn, {backgroundColor:'#3b82f6'}]} onPress={handleSubmit(onUpdate)}>
        <Text style={styles.btnText}>Simpan Perubahan</Text>
      </TouchableOpacity>
      
      {/* TOMBOL HAPUS LANGSUNG */}
      <TouchableOpacity 
        style={[styles.btn, {backgroundColor: isDeleting ? '#9ca3af' : '#ef4444'}]} 
        onPress={onDeleteDirect}
        disabled={isDeleting}
      >
        <Text style={styles.btnText}>{isDeleting ? 'Sedang Menghapus...' : 'Hapus Produk'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 16, marginBottom: 6, fontWeight: '600', fontSize: 14 },
  input: { padding: 12, borderRadius: 8 },
  btn: { padding: 16, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});