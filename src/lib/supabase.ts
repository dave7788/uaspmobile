import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key dari Project Settings > API Supabase kamu
const SUPABASE_URL = 'https://ylwaadpkschacnycrabw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsd2FhZHBrc2NoYWNueWNyYWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MTQ1MDksImV4cCI6MjA4MzI5MDUwOX0.wEqkyXiBvO1sGjiM8oOx0RjB1EOX6ZeXKWY9-CgES-o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);