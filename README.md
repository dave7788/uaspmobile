# 🎮 Valorant Store App - Expo React Native

Aplikasi Mobile Store untuk top-up Valorant Points (VP) yang dibangun menggunakan **React Native (Expo)** dan **Supabase**. Aplikasi ini mendukung sistem multi-role (Admin & User) dengan fitur manajemen produk dan riwayat transaksi secara real-time.



## 🚀 Fitur Utama

- **Multi-Role Authentication**: 
  - Login khusus Admin (menggunakan email `@admin`) untuk mengelola produk.
  - Login User untuk melakukan pembelian VP.
- **Product Management (Admin)**: Tambah, Edit, dan Hapus paket VP (CRUD).
- **Transaction System (User)**: Simulasi checkout VP dengan integrasi database transaksi.
- **Transaction History**: Riwayat pembelian yang tersimpan secara real-time di Supabase.
- **Dark Mode Support**: Tema gelap yang nyaman untuk mata.
- **Deep Linking**: Mendukung navigasi langsung ke halaman produk melalui URL scheme `valorantstore://`.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React Native, Expo, Zustand (State Management), React Hook Form.
- **Backend**: Supabase (Database & Real-time).
- **Navigation**: React Navigation (Stack Navigation).
- **Styling**: Native Base / StyleSheet (Tailwind-like design).
- **Build Tool**: EAS (Expo Application Services) untuk generate APK.

- **APK Download Link**: https://expo.dev/artifacts/eas/ghubBJ7xjMuzSSQnezksBj.apk
