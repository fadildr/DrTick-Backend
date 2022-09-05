const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://nvuzydaeerhtbvdymnea.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dXp5ZGFlZXJodGJ2ZHltbmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc2NjYsImV4cCI6MTk3NzY2MzY2Nn0.DD69dQVSiogCvksPSPOV58RJFhtbRzXRBoml3x_3STA";
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
