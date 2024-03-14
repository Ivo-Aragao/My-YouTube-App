//supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytbyyqxxlpocqdbqijnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Ynl5cXh4bHBvY3FkYnFpam5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwOTY3OTIsImV4cCI6MjAyMzY3Mjc5Mn0.ZN4PDFtmynBqzVrWJeO-QGGewq_2rLZMOOc_EEFOMbY'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }