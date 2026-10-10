import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

// Funcție care extrage și curăță cookie-ul generat de Next.js
function getNextJsSupabaseSession() {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  for (let c of cookies) {
    c = c.trim()
    // Căutăm cookie-ul nativ Supabase generat de Next.js (conține auth-token în nume)
    if (c.includes('auth-token')) {
      try {
        const rawValue = c.substring(c.indexOf('=') + 1)
        const decodedValue = decodeURIComponent(rawValue)
        
        // Next.js tinde să serializeze obiectul sau să îl salveze ca string JSON curat
        if (decodedValue.startsWith('base64:')) {
          return JSON.parse(atob(decodedValue.replace('base64:', '')))
        }
        return JSON.parse(decodedValue)
      } catch (e) {
        console.error('Eroare decodificare cookie Next.js:', e)
      }
    }
  }
  return null
}

const AuthGuardAndStatus = {
  setup() {
    const fullName = ref('')
    const checkingAuth = ref(true)

    onMounted(async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        })

        // 1. Verificăm dacă avem deja sesiune locală pe docs
        let { data: { session } } = await supabase.auth.getSession()
        
        // 2. Dacă nu există local, încercăm să citim cookie-ul nativ din Next.js
        if (!session) {
          const nextSession = getNextJsSupabaseSession()
          
          if (nextSession && (nextSession.access_token || nextSession.currentSession?.access_token)) {
            const tokenData = nextSession.currentSession || nextSession
            
            // Forțăm instanța din docs să asimileze token-ul de pe domeniul principal
            const { data } = await supabase.auth.setSession({
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token
            })
            session = data.session
          }
        }

        // 3. Decizia finală: Îl lăsăm pe pagină sau îl trimitem la login
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
        } else {
          // Dacă nu e logat deloc pe imidi.co.uk, îl trimitem direct la login în Next.js
          window.location.href = 'https://imidi.co.uk'
        }

      } catch (e) {
        console.error('Auth critic error:', e)
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
