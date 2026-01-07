import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product, useStore } from '../store/useStore';

interface ProductCardProps {
  item: Product;
  onPress: () => void;
  selected?: boolean;
}

const formatRupiah = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress, selected }) => {
  const { darkMode } = useStore();
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          backgroundColor: darkMode ? '#1f2937' : '#fff',
          borderColor: selected ? '#f97316' : (darkMode ? '#374151' : '#e5e7eb'),
          borderWidth: selected ? 2 : 1,
        }
      ]}
      onPress={onPress}
    >
      {item.popular && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>HOT</Text>
        </View>
      )}
      
      <View>
        <Text style={[styles.vpText, { color: darkMode ? '#fff' : '#111827' }]}>{item.vp} VP</Text>
        {item.bonus > 0 && <Text style={styles.bonusText}>+{item.bonus} Bonus</Text>}
      </View>

      <Text style={styles.priceText}>{formatRupiah(item.price)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, margin: 6, padding: 16, borderRadius: 12, borderWidth: 1,
    minHeight: 110, justifyContent: 'space-between', elevation: 2
  },
  badge: {
    position: 'absolute', top: 0, right: 0, backgroundColor: '#f97316',
    borderTopRightRadius: 10, borderBottomLeftRadius: 10, paddingHorizontal: 8, paddingVertical: 2
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  vpText: { fontSize: 18, fontWeight: '800' },
  bonusText: { color: '#10b981', fontSize: 12, fontWeight: '600' },
  priceText: { color: '#f97316', fontSize: 14, fontWeight: 'bold' },
});

export default ProductCard;