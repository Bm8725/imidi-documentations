import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

// Helper simplu pentru manipularea cookie-urilor în browser
const CookieStorage = {
  getItem(key) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return null;
  },
  setItem(key, value) {
    // Salvează cookie-ul pe domeniul rădăcină .imidi.co.uk pentru a fi accesibil peste tot
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; domain=.imidi.co.uk; SameSite=Lax; Secure`;
  },
  removeItem(key) {
    document.cookie = `${key}=; path=/; domain=.imidi.co.uk; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure`;
  }
}

const AuthGuardAndStatus = {
  setup() {
    const fullName = ref('')
    const checkingAuth = ref(true)

    onMounted(async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        
        // Inițializăm Supabase folosind Cookie-urile partajate pe tot domeniul imidi.co.uk
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            storage: CookieStorage,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        })
        
        // Verificăm sesiunea curentă
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
        } else {
          // Dacă nu există sesiune activă pe docs, îl trimitem la login pe domeniul principal
          window.location.href = 'https://imidi.co.uk'
        }

        // Ascultă modificările de stare în timp real (de exemplu, dacă dă logout în altă filă)
        supabase.auth.onAuthStateChange((event, currentSession) => {
          if (event === 'SIGNED_OUT' || !currentSession) {
            window.location.href = 'https://imidi.co.uk'
          }
        })

      } catch (e) {
        console.error('Auth error:', e)
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
