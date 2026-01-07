import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useStore, Product } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

const PAYMENTS = [
  { id: 'gopay', name: 'GoPay', fee: 1000, icon: '🟢' },
  { id: 'dana', name: 'DANA', fee: 1000, icon: '🔵' },
  { id: 'ovo', name: 'OVO', fee: 1500, icon: '🟣' },
];

const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

export default function UserHomeScreen() {
  const { products, fetchProducts, isLoading, checkout, darkMode, toggleDarkMode } = useStore();
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const navigation = useNavigation<any>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  useEffect(() => { fetchProducts(); }, []);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleCheckout = async (data: any) => {
    if (!selectedProduct || !selectedPayment) return;
    const success = await checkout({
      game_id: data.gameId,
      product_name: `${selectedProduct.vp} VP`,
      vp_amount: selectedProduct.vp,
      price: selectedProduct.price + selectedPayment.fee,
      payment_method: selectedPayment.name,
    });
    if (success) {
        reset(); setSelectedProduct(null); setSelectedPayment(null);
    }
  };

  const bg = darkMode ? '#111827' : '#f3f4f6';
  const cardBg = darkMode ? '#1f2937' : '#fff';
  const text = darkMode ? '#fff' : '#1f2937';
  const iconBg = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* HEADER */}
        <View style={{ padding: 20, backgroundColor: cardBg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: darkMode ? '#374151' : '#e5e7eb' }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: text }}>Top Up Valorant</Text>
                <Text style={{ color: '#9ca3af' }}>Fast & Secure</Text>
            </View>

            {/* Tombol Kanan Atas */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                 {/* Tombol History */}
                 <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')} style={{ padding: 10, backgroundColor: iconBg, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>🕒</Text>
                 </TouchableOpacity>

                 {/* Tombol Dark Mode */}
                 <TouchableOpacity onPress={toggleDarkMode} style={{ padding: 10, backgroundColor: iconBg, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{darkMode ? '☀️' : '🌙'}</Text>
                 </TouchableOpacity>

                 {/* Tombol Logout (Teks) */}
                 <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 10, paddingHorizontal: 16, backgroundColor: iconBg, borderRadius: 20 }}>
                    <Text style={{ color: text, fontWeight: '600', fontSize: 12 }}>Log out</Text>
                 </TouchableOpacity>
            </View>
        </View>

        {/* 1. INPUT ID */}
        <View style={styles.section}><Text style={[styles.sectTitle, {color: text}]}>1. Masukkan Riot ID</Text></View>
        <View style={{ paddingHorizontal: 16 }}>
          <Controller control={control} name="gameId" rules={{ required: 'Wajib diisi' }}
            render={({ field: { onChange, value } }) => (
              <TextInput style={[styles.input, { backgroundColor: cardBg, color: text }]} 
                placeholder="Contoh: Jett#IND" placeholderTextColor="#9ca3af" value={value} onChangeText={onChange} />
            )}
          />
          {errors.gameId && <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>ID Wajib diisi</Text>}
        </View>

        {/* 2. PILIH ITEM */}
        <View style={styles.section}><Text style={[styles.sectTitle, {color: text}]}>2. Pilih Paket</Text></View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
            {products.map(p => (
                <View key={p.id} style={{width:'50%'}}>
                    <ProductCard item={p} onPress={() => setSelectedProduct(p)} selected={selectedProduct?.id === p.id} />
                </View>
            ))}
        </View>

        {/* 3. PEMBAYARAN */}
        <View style={styles.section}><Text style={[styles.sectTitle, {color: text}]}>3. Pembayaran</Text></View>
        <View style={{ paddingHorizontal: 16 }}>
            {PAYMENTS.map(pay => (
                <TouchableOpacity key={pay.id} onPress={() => setSelectedPayment(pay)}
                    style={[styles.payCard, { backgroundColor: cardBg, borderColor: selectedPayment?.id === pay.id ? '#f97316' : 'transparent', borderWidth: selectedPayment?.id === pay.id ? 2 : 0 }]}>
                    <Text style={{color: text, fontWeight: 'bold'}}>{pay.icon}  {pay.name}</Text>
                    <Text style={{color: '#f97316'}}>+ {formatRupiah(pay.fee)}</Text>
                </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={[styles.footer, { backgroundColor: cardBg, borderTopColor: darkMode ? '#374151' : '#e5e7eb', borderTopWidth: 1 }]}>
        <View>
            <Text style={{color:'#9ca3af'}}>Total:</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color: '#f97316'}}>
                {selectedProduct && selectedPayment ? formatRupiah(selectedProduct.price + selectedPayment.fee) : 'Rp 0'}
            </Text>
        </View>
        <TouchableOpacity style={[styles.btn, (!selectedProduct || !selectedPayment || isLoading) && {backgroundColor:'#ccc'}]}
            onPress={handleSubmit(handleCheckout)} disabled={!selectedProduct || !selectedPayment || isLoading}>
            {isLoading ? <ActivityIndicator color="#fff"/> : <Text style={{color:'white', fontWeight:'bold'}}>Bayar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, marginTop: 10 },
  sectTitle: { fontSize: 16, fontWeight: 'bold' },
  input: { padding: 14, borderRadius: 10 },
  payCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginBottom: 8, borderRadius: 10, elevation: 1 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 10 },
  btn: { backgroundColor: '#f97316', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 10 }
});