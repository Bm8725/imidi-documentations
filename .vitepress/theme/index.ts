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
        
        // Folosim o inițializare curată care caută automat în localStorage-ul partajat
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        })
        
        // Așteptăm ca Supabase să își ia starea internă din browser
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
        } else {
          // Facem o mică verificare suplimentară în localStorage-ul local în caz de delay
          const localToken = window.localStorage.getItem('sb-wjwjkqghyekitpiqnqqb-auth-token')
          if (localToken) {
            // Dacă există urme de token, mai dăm o șansă de reîncărcare înainte de eșec
            setTimeout(async () => {
              const retry = await supabase.auth.getSession()
              if (retry.data.session?.user) {
                const pName = retry.data.session.user.user_metadata?.full_name
                fullName.value = pName || retry.data.session.user.email.split('@')[0]
                checkingAuth.value = false
                return
              }
              window.location.href = 'https://imidi.co.uk'
            }, 400)
          } else {
            // Dacă e complet gol, abia atunci execută redirecționarea
            window.location.href = 'https://imidi.co.uk'
          }
        }
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
