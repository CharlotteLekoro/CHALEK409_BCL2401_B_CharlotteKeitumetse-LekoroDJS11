import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mjbgjctyvpoxlwwigmfb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYmdqY3R5dnBveGx3d2lnbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4OTQ4NzAsImV4cCI6MjAwNjQ3MDg3MH0.MjH2JCZPArpJjMLllP7JsF5UZnSNGe7KVF8mSG8KXes';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
