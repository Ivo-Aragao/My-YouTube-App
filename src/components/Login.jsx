import { supabase } from '../services/supabase.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import '../css/App.css'; 

export default function Login() {
    return (
        <div className="login-container"> 
            <div className="login-buttons"> 
                <Auth 
                    supabaseClient={supabase} 
                    providers={['google', 'github']}
                    appearance={{ 
                        theme: ThemeSupa,
                        buttonSize: 'small', 
                    }}
                />
            </div>
        </div>
    );
}
