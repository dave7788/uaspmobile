# 🎮 Valorant Shop - Mobile App

Aplikasi Top-Up Valorant Points sederhana yang dibangun menggunakan **React Native (Expo)** dan **Supabase**. Aplikasi ini mendukung sistem Admin untuk manajemen produk dan sistem User untuk melihat promo.

## 🚀 Fitur Terbaru
- **Deep Linking**: Membuka aplikasi langsung menggunakan skema `valorantstore://`.
- **Android App Links**: Integrasi domain resmi `https://valorant-shop-ochre.vercel.app` untuk membuka detail produk secara otomatis dari link browser.
- **Share Promo**: Fitur berbagi detail produk ke WhatsApp, Notes, atau media sosial lainnya.
- **Dark Mode**: Mendukung antarmuka tema gelap yang nyaman di mata.
- **Real-time Database**: Sinkronisasi data produk langsung menggunakan Supabase.

## 🛠️ Tech Stack
- **Framework**: Expo (React Native)
- **Navigation**: React Navigation (Stack Navigation)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (untuk verifikasi App Links) & EAS Build (Android APK)
- **State Management**: Zustand

## 📱 Deep Link Configuration
Aplikasi ini sudah dikonfigurasi untuk menangkap URL berikut:
- **Custom Scheme**: `valorantstore://product/[id]`
- **Web Domain**: `https://valorant-shop-ochre.vercel.app/product/[id]`

Verifikasi keamanan menggunakan file `assetlinks.json` yang di-host pada folder `.well-known` di domain Vercel untuk memastikan integrasi yang aman antara website dan aplikasi Android.

- **APK Download Link**: https://expo.dev/artifacts/eas/ghubBJ7xjMuzSSQnezksBj.apk
