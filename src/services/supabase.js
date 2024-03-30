import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sspwobeyiopdidfdwvqj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHdvYmV5aW9wZGlkZmR3dnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDM1ODksImV4cCI6MjAyNzM3OTU4OX0.P42lRFmbZpsmCPglhqSI_pVNJ_8D0d_0QJKUNT4Aeiw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
