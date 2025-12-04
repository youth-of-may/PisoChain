import pkg from 'pg';
import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKEY = process.env.SUPABASE_ROLE;

export const supabase = createClient(supabaseURL, supabaseKEY);