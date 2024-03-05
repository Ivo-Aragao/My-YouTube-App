//Login.jsx
import { supabase } from '../services/supabase.js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


export default function Login() {
    return (<Auth 
                supabaseClient={supabase} 
                providers={['google', 'github']} // Adicione os provedores desejados
                appearance={{ theme: ThemeSupa }}
            />)
}

