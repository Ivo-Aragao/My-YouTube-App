//supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hbgouhetuiojmlgllvni.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZ291aGV0dWlvam1sZ2xsdm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNjQ0NTYsImV4cCI6MjAyMjg0MDQ1Nn0.3KbJjdgmaDG_WTBxW3YxiT1LhyCYO9ar_yv0XppKuuE'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }