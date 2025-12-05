import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://jcuygxktwwedqdxuppyz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdXlneGt0d3dlZHFkeHVwcHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjQyMTEsImV4cCI6MjA3OTIwMDIxMX0.7S2zASN8zESFlX7RHe4_plKzoVSo-XRZPOOm3jRPTo4";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);