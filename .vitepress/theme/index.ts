import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

// Funcție care caută direct în cookie-urile partajate de domeniul principal
function getSharedSupabaseSession() {
  if (typeof document === 'undefined') return null;
  
  // Supabase folosește un format standard de salvare în cookie-uri: sb-[proiect]-auth-token
  // Căutăm orice cookie care conține structura de auth-token de la Supabase
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.includes('auth-token=')) {
      try {
        const rawValue = c.split('=')[1];
        // Decodificăm string-ul deoarece Supabase îl salvează parțial encodat în baza de date / rețea
        const decodedValue = decodeURIComponent(rawValue);
        
        // Dacă valoarea începe cu „base64:”, o decodificăm (specific pentru anumite versiuni de Supabase)
        if (decodedValue.startsWith('base64:')) {
          const base64Content = decodedValue.replace('base64:', '');
          return JSON.parse(atob(base64Content));
        }
        
        return JSON.parse(decodedValue);
      } catch (e) {
        console.error("Eroare la parsarea cookie-ului de auth:", e);
      }
    }
  }
  return null;
}

const AuthGuardAndStatus = {
  setup() {
    const fullName = ref('')
    const checkingAuth = ref(true)

    onMounted(async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        
        // Încercăm mai întâi să interceptăm manual sesiunea nativă din cookie-ul site-ului mamă
        const sharedSession = getSharedSupabaseSession()
        
        // Inițializăm clientul curat
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        })

        // Dacă am găsit o sesiune validă în cookie-uri, o injectăm direct în instanța din docs
        if (sharedSession && (sharedSession.access_token || sharedSession.currentSession?.access_token)) {
          const tokenData = sharedSession.currentSession || sharedSession;
          
          await supabase.auth.setSession({
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token
          })
        }

        // Verificăm dacă instanța a asimilat cu succes sesiunea
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
        } else {
          // Dacă după toate încercările nu avem sesiune, abia atunci dăm afară utilizatorul
          window.location.href = 'https://imidi.co.uk'
        }
      } catch (e) {
        console.error('Auth error critic:', e)
        window.location.href = 'https://imidi.co.uk'
      }
    })

    return () => {
      if (checkingAuth.value || !fullName.value) return null
      
      return h('div', { 
        style: 'display: flex; align-items: center; margin-left: 20px; font-size: 14px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-bg-alt); padding: 4px 12px; border-radius: 8px; border: 1px solid var(--vp-c-gutter); height: 32px;' 
      }, `👤 ${fullName.value}`)
    }
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(AuthGuardAndStatus)
    })
  }
}
