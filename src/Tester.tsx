import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { create } from 'zustand';

// Store minimalis untuk tes
const useTestStore = create((set) => ({
  testValue: false,
  toggleTest: () => set((state: any) => ({ testValue: !state.testValue })),
}));

// GUNAKAN EXPORT DEFAULT DI SINI
export default function Tester() {
  const { testValue, toggleTest } = useTestStore() as any;
  const [localBool, setLocalBool] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Aplikasi Tester</Text>
      
      <View style={styles.box}>
        <Text style={{color: 'black'}}>Tes Zustand: {testValue ? "✅ BERHASIL" : "❌ MATI"}</Text>
        <TouchableOpacity style={styles.btn} onPress={toggleTest}>
          <Text style={{color: 'white'}}>Tekan Tes Zustand</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={{color: 'black'}}>Tes Switch (Boolean Fix):</Text>
        <Switch 
          value={!!localBool} 
          onValueChange={(val) => setLocalBool(val)}
        />
        <Text style={{fontSize: 10, color: 'gray'}}>
          Jika layar tidak merah, berarti casting boolean aman.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: 'black' },
  box: { padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, width: '100%', marginBottom: 15, alignItems: 'center' },
  btn: { backgroundColor: '#f97316', padding: 10, borderRadius: 5, marginTop: 10 }
});