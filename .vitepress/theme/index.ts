import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

const AuthGuardAndStatus = {
  setup() {
    const fullName = ref('')

    onMounted(async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        // Verificăm sesiunea direct în browser
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Dacă ești logat pe imidi.co.uk, îți ia numele sau email-ul direct
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
        } else {
          // CORECTAT: Trimite utilizatorul direct la pagina ta reală de login
          window.location.href = 'https://imidi.co.uk'
        }
      } catch (e) {
        console.error('Eroare la autentificare:', e)
      }
    })

    return () => {
      if (!fullName.value) return null
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
