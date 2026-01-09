import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase'; // Pastikan import supabase
import Toast from 'react-native-toast-message';

export default function DetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { productId } = route.params || {}; // Tambahkan fallback objek kosong
  const { products, updateProduct, deleteProduct, darkMode } = useStore() as any;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localProduct, setLocalProduct] = useState<any>(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { vp: '', bonus: '', price: '', popular: false }
  });

  // Fungsi untuk mengambil data produk jika tidak ada di Store (Penting untuk Deep Link)
  const fetchProductFromDB = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      if (data) {
        setLocalProduct(data);
        reset({
          vp: data.vp?.toString() || '',
          bonus: data.bonus?.toString() || '0',
          price: data.price?.toString() || '',
          popular: data.popular || false,
        });
      }
    } catch (error: any) {
      console.error("Error Deep Link:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Cek di Store dulu
    const foundProduct = products.find((p: any) => p.id === productId || p.id?.toString() === productId?.toString());
    
    if (foundProduct) {
      setLocalProduct(foundProduct);
      reset({
        vp: foundProduct.vp?.toString() || '',
        bonus: foundProduct.bonus?.toString() || '0',
        price: foundProduct.price?.toString() || '',
        popular: foundProduct.popular || false,
      });
    } else if (productId) {
      // 2. Jika tidak ada di Store (misal buka lewat Deep Link), ambil dari DB
      fetchProductFromDB();
    }
  }, [productId, products, reset]);

  const onUpdate = async (data: any) => {
    await updateProduct(productId, {
      vp: parseInt(data.vp) || 0,
      bonus: parseInt(data.bonus) || 0,
      price: parseInt(data.price) || 0,
      popular: data.popular,
    });
    Toast.show({ type: 'success', text1: 'Berhasil', text2: 'Produk diperbarui' });
    navigation.goBack();
  };

  const onDeleteDirect = async () => {
    if (!productId) return;
    setIsDeleting(true);
    await deleteProduct(productId);
    setIsDeleting(false);
    navigation.goBack();
  };

  const bg = darkMode ? '#111827' : '#fff';
  const text = darkMode ? '#fff' : '#1f2937';
  const inputBg = darkMode ? '#374151' : '#f3f4f6';

  if (loading) return (
    <View style={[styles.container, { backgroundColor: bg, justifyContent: 'center' }]}>
      <ActivityIndicator size="large" color="#f97316" />
    </View>
  );

  if (!localProduct) return (
    <View style={[styles.container, {backgroundColor: bg}]}>
       <Text style={{color: text, textAlign:'center', marginTop: 50}}>
          Produk tidak ditemukan.{"\n"}ID: {productId}
       </Text>
       <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20}}>
          <Text style={{color: '#f97316', textAlign: 'center'}}>Kembali</Text>
       </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={{color: '#9ca3af', textAlign:'center', marginBottom:10}}>
        Editing Product ID: {productId}
      </Text>

      <Text style={[styles.label, { color: text }]}>Jumlah VP</Text>
      <Controller control={control} name="vp" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      <Text style={[styles.label, { color: text }]}>Bonus VP</Text>
      <Controller control={control} name="bonus" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      <Text style={[styles.label, { color: text }]}>Harga (Rp)</Text>
      <Controller control={control} name="price" render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: text }]} value={value || ''} onChangeText={onChange} keyboardType="numeric"/>
      )}/>

      <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
        <Text style={[styles.label, { color: text, flex: 1, marginTop: 0 }]}>Tandai Populer</Text>
        <Controller control={control} name="popular" render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} trackColor={{true:'#f97316'}}/>
        )}/>
      </View>

      <TouchableOpacity style={[styles.btn, {backgroundColor:'#3b82f6'}]} onPress={handleSubmit(onUpdate)}>
        <Text style={styles.btnText}>Simpan Perubahan</Text>
      </TouchableOpacity>
      
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