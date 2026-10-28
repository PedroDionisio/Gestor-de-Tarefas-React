import { createClient } from "@supabase/supabase-js";
import { markRecoveryFromUrl } from "./passwordRecovery";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

markRecoveryFromUrl();

export const supabase = createClient(supabaseUrl, supabaseKey);
