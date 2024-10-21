// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Reemplaza con la URL de tu proyecto y la clave pública
const supabaseUrl = '';
const supabaseAnonKey = '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
