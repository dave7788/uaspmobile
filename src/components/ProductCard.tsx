import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useStore } from '../store/useStore';

export default function ProductCard({ item, onPress, selected = false }: any) {
  const { darkMode } = useStore() as any;

  const onShare = async () => {
    try {
      // Membuat format pesan seperti contoh yang kamu minta
      await Share.share({
        message: `Check out this VP Promo: ${item.vp} VP!\n\nhttps://valorant-shop-ochre.vercel.app/product/${item.id}`,
      });
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  const cardBg = darkMode ? '#1f2937' : '#fff';
  const textColor = darkMode ? '#fff' : '#1f2937';

  return (
    <View style={[styles.cardContainer, { 
      backgroundColor: cardBg, 
      borderColor: selected ? '#f97316' : 'transparent',
      borderWidth: 2 
    }]}>
      <TouchableOpacity 
        style={styles.mainArea} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        {!!item.popular && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>POPULER</Text>
          </View>
        )}
        <Text style={[styles.vpText, { color: textColor }]}>{item.vp} VP</Text>
        <Text style={styles.priceText}>Rp {item.price?.toLocaleString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
        <Text style={styles.shareText}>🔗 Share Promo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    elevation: 4,
    overflow: 'hidden',
  },
  mainArea: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f97316',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  vpText: { fontSize: 20, fontWeight: 'bold' },
  priceText: { fontSize: 14, color: '#f97316', marginTop: 5, fontWeight: '600' },
  shareBtn: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  shareText: {
    color: '#f97316',
    fontSize: 12,
    fontWeight: 'bold',
  },
});