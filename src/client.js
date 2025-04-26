import { createClient } from '@supabase/supabase-js'

const URL = 'https://xpcuaxtawyxnhehtrfhz.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwY3VheHRhd3l4bmhlaHRyZmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTk4NjksImV4cCI6MjA2MTE3NTg2OX0.E9HcrEamcb-1428vJPYxE8d9koSc79BZVueM4-L_kLo';

export const supabase = createClient(URL, API_KEY);
