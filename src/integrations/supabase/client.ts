import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wjhqauxjaxywafbiuxik.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqaHFhdXhqYXh5d2FmYml1eGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzI0NDcsImV4cCI6MjA2NTIwODQ0N30.v7OH0--BUNbTad-5_hfJrrfHJlmN8VGAbmLyM4ziBpQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
