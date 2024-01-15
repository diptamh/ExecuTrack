const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

module.exports = supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ADMIN_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: true,
    },
  }
);
