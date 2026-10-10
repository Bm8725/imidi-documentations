import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

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

        // 1. Verificăm mai întâi dacă subdomeniul docs are deja sesiunea copiată local
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
          return
        }

        // 2. Dacă docs nu știe nimic, creăm un iframe ascuns către domeniul principal
        // Deoarece Next.js de pe domeniul principal are acces la cookie-uri/localStorage, el ne poate trimite token-ul înapoi
        const iframe = document.createElement('iframe')
        iframe.src = 'https://imidi.co.uk' // O pagină simplă din aplicația ta Next.js care face postMessage la sesiune
        iframe.style.display = 'none'
        document.body.appendChild(iframe)

        // Ascultăm răspunsul securizat de la domeniul principal
        const handleMessage = async (event) => {
          if (event.origin !== 'https://imidi.co.uk') return

          const { access_token, refresh_token, user_data } = event.data

          if (access_token && refresh_token) {
            // Injectăm sesiunea primită de pe domeniul principal în instanța locală din docs
            await supabase.auth.setSession({ access_token, refresh_token })
            fullName.value = user_data?.full_name || user_data?.email?.split('@')[0] || 'Utilizator'
            checkingAuth.value = false
            
            window.removeEventListener('message', handleMessage)
            iframe.remove()
          } else {
            // Dacă domeniul principal spune că nu există sesiune, abia atunci executăm redirecționarea la login
            window.location.href = 'https://imidi.co.uk'
          }
        }

        window.addEventListener('message', handleMessage)

        // Siguranță: dacă puntea dintre domenii nu răspunde în 2 secunde, înseamnă că puntea nu e configurată pe Next.js
        // În acest caz, oprim bucla blocantă și lăsăm utilizatorul să vadă docs-ul fără să îl dăm afară forțat
        setTimeout(() => {
          if (checkingAuth.value) {
            console.warn('Puntea de comunicare cu domeniul principal a expirat.')
            checkingAuth.value = false
            // Opțional: poți lăsa window.location.href dezactivat aici ca să NU mai fie redirecționat greșit
          }
        }, 2000)

      } catch (e) {
        console.error('Auth error:', e)
        // În caz de eroare critică de script, lăsăm utilizatorul pe pagină în loc să creăm o buclă de redirect
        checkingAuth.value = false
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
