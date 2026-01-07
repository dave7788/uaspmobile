import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { products, darkMode, fetchProducts, toggleDarkMode, isLoading } = useStore();

  useEffect(() => { fetchProducts(); }, []);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const bg = darkMode ? '#111827' : '#f3f4f6';
  const text = darkMode ? '#fff' : '#1f2937';
  const iconBg = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={[styles.header, { borderBottomColor: darkMode ? '#374151' : '#e5e7eb' }]}>
        <View>
          <Text style={[styles.headerTitle, { color: text }]}>Admin Panel</Text>
          <Text style={{ color: '#f97316' }}>Kelola Produk</Text>
        </View>

        {/* Tombol Kanan Atas */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Tombol History */}
            <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')} style={[styles.iconBtn, { backgroundColor: iconBg }]}>
               <Text>🕒</Text>
            </TouchableOpacity>

            {/* Tombol Dark Mode */}
            <TouchableOpacity onPress={toggleDarkMode} style={[styles.iconBtn, { backgroundColor: iconBg }]}>
               <Text>{darkMode ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>

            {/* Tombol Logout (Teks) */}
            <TouchableOpacity onPress={handleLogout} style={[styles.textBtn, { backgroundColor: iconBg }]}>
               <Text style={{ color: text, fontWeight: '600', fontSize: 12 }}>Log out</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* LIST PRODUK */}
      {isLoading ? <ActivityIndicator size="large" color="#f97316" style={{marginTop: 50}} /> : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={() => navigation.navigate('DetailScreen', { productId: item.id })} />
          )}
        />
      )}

      {/* FAB (Tambah Produk) */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddItemScreen')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  iconBtn: { padding: 10, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  textBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, justifyContent: 'center' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#f97316', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 32, color: 'white', marginTop: -4 },
});