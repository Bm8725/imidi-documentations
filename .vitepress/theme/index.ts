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
            persistSession: true, // Păstrează sesiunea local pe docs după ce a fost detectată o dată
            autoRefreshToken: true,
            detectSessionInUrl: true // FOARTE IMPORTANT: interceptați hash-ul generat de Supabase
          }
        })
        
        // 1. Verificăm dacă avem deja o sesiune locală salvată pe docs
        let { data: { session } } = await supabase.auth.getSession()
        
        // 2. Dacă nu există sesiune locală, verificăm dacă utilizatorul a venit direct cu token în URL (#access_token=...)
        if (!session && (window.location.hash || window.location.search)) {
          // Lăsăm Supabase detectSessionInUrl să proceseze hash-ul din URL timp de 300ms
          await new Promise(resolve => setTimeout(resolve, 300))
          const retry = await supabase.auth.getSession()
          session = retry.data.session
        }
        
        // 3. Evaluarea finală a stării de autentificare
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          checkingAuth.value = false
        } else {
          // Dacă sesiunea este complet absentă, redirecționăm către pagina ta de login din Next.js
          // Îi trimitem și parametrul unde să se întoarcă după ce se loghează cu succes
          const currentUrl = encodeURIComponent(window.location.href)
          window.location.href = `https://imidi.co.uk{currentUrl}`
        }
      } catch (e) {
        console.error('Auth error pe docs:', e)
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
