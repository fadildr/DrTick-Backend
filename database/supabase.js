const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://mbybybaagdfdddqwfayh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieWJ5YmFhZ2RmZGRkcXdmYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc2NjYsImV4cCI6MTk3NzY2MzY2Nn0.s8Ty6YMi4Nj1Hioio4jUzkNtvyWaCcG_LFAr294A1OY";
const supabase = createClient(supabaseUrl, supabaseKey);

const getData = async () => {
  const { data, error } = await supabase.from("wishlist").select(`*,
      user ( * )
      `);
  console.log(data);
  console.log(error);
};

const getData = async () => {
  const { data, error } = await supabase.from("wishlist").select(`*,
    user:userId ( * ),
    event:eventId ( * )
    `);
  console.log(data);
  console.log(error);
};
