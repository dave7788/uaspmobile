import { create } from 'zustand'; // FIX: Pastikan baris ini ada agar tidak error 'create is not defined'
import { supabase } from '../lib/supabase';
import Toast from 'react-native-toast-message';

// Tipe data Produk
export interface Product {
  id: number;
  vp: number;
  bonus: number;
  price: number;
  popular: boolean;
}

// Tipe data Transaksi User
interface TransactionPayload {
  game_id: string;
  product_name: string;
  vp_amount: number;
  price: number;
  payment_method: string;
}

// Tipe State Global Aplikasi
interface StoreState {
  products: Product[];
  darkMode: boolean;
  isLoading: boolean;
  
  toggleDarkMode: () => void;
  fetchProducts: () => Promise<void>;
  
  // Admin Actions (CRUD)
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;

  // User Actions (Transaksi)
  checkout: (payload: TransactionPayload) => Promise<boolean>;
}

// Inisialisasi Store
export const useStore = create<StoreState>((set, get) => ({
  products: [],
  darkMode: true, 
  isLoading: false,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // 1. Ambil Data Produk
  fetchProducts: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('vp', { ascending: true });

    if (error) {
      Toast.show({ type: 'error', text1: 'Error Fetching', text2: error.message });
    } else {
      set({ products: data || [] });
    }
    set({ isLoading: false });
  },

  // 2. Admin: Tambah Produk
  addProduct: async (newProduct) => {
    set({ isLoading: true });
    const { error } = await supabase.from('products').insert([newProduct]);
    
    if (error) {
      Toast.show({ type: 'error', text1: 'Gagal Menambah', text2: error.message });
    } else {
      Toast.show({ type: 'success', text1: 'Berhasil', text2: 'Produk ditambahkan' });
      get().fetchProducts();
    }
    set({ isLoading: false });
  },

  // 3. Admin: Update Produk
  updateProduct: async (id, updatedFields) => {
    set({ isLoading: true });
    const { error } = await supabase.from('products').update(updatedFields).eq('id', id);
    
    if (error) {
      Toast.show({ type: 'error', text1: 'Gagal Update', text2: error.message });
    } else {
      Toast.show({ type: 'success', text1: 'Berhasil', text2: 'Produk diperbarui' });
      get().fetchProducts();
    }
    set({ isLoading: false });
  },

  // 4. Admin: Hapus Produk
  deleteProduct: async (id) => {
    set({ isLoading: true });
    
    // Konversi ID ke Number untuk memastikan tipe data cocok dengan Database
    const secureId = Number(id);

    const { error, count } = await supabase
      .from('products')
      .delete({ count: 'exact' })
      .eq('id', secureId);

    if (error) {
      Toast.show({ type: 'error', text1: 'Gagal Hapus', text2: error.message });
    } else if (count === 0) {
      Toast.show({ type: 'error', text1: 'Gagal', text2: 'Data tidak ditemukan' });
    } else {
      Toast.show({ type: 'success', text1: 'Terhapus', text2: 'Produk berhasil dihapus' });
      get().fetchProducts();
    }
    set({ isLoading: false });
  },

  // 5. User: Checkout
  checkout: async (payload) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const { error } = await supabase.from('transactions').insert([
      { ...payload, status: 'success' }
    ]);
    
    set({ isLoading: false });
    
    if (error) {
      Toast.show({ type: 'error', text1: 'Transaksi Gagal', text2: error.message });
      return false;
    } else {
      Toast.show({ type: 'success', text1: 'Top Up Berhasil!', text2: 'VP sedang dikirim.' });
      return true;
    }
  }
}));