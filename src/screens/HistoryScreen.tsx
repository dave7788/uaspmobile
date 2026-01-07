import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { darkMode } = useStore() as any;

  // Fungsi untuk mengambil data dari Supabase
const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Pindahkan setHistory ke dalam blok try yang sama dengan deklarasi data
      setHistory(data || []); 
    } catch (error) {
      console.error("Error fetch history:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const bg = darkMode ? '#111827' : '#f3f4f6';
  const card = darkMode ? '#1f2937' : '#fff';
  const text = darkMode ? '#fff' : '#1f2937';

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        data={history}
        keyExtractor={(item: any) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: '#9ca3af' }}>Belum ada riwayat transaksi.</Text>
          </View>
        }
        renderItem={({ item }: any) => (
          <View style={[styles.card, { backgroundColor: card }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.vp, { color: text }]}>{item.product_name}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 12 }}>ID: {item.game_id}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 10 }}>
                {new Date(item.created_at).toLocaleString('id-ID')}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>Rp {item.price?.toLocaleString()}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.status?.toUpperCase() || 'SUCCESS'}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  vp: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#f97316', fontWeight: 'bold', marginBottom: 4 },
  badge: { backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: '#22c55e', fontSize: 10, fontWeight: 'bold' }
});