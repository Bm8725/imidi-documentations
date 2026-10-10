import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

const SUPABASE_URL = 'https://supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'

// Componenta globală care protejează paginile și afișează numele în Nav Bar
const AuthGuardAndStatus = {
  setup() {
    const fullName = ref('')
    const isAuthorized = ref(false)

    onMounted(async () => {
      try {
        // Încărcare dinamică securizată pentru build static
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
          fullName.value = profileName || session.user.email.split('@')[0]
          isAuthorized.value = true
        } else {
          // Redirecționare dacă nu există sesiune activă
          window.location.href = 'https://imidi.co.uk/login'
        }
      } catch (e) {
        console.error('Auth error:', e)
      }
    })

    return () => {
      // Afișează badge-ul cu utilizatorul în bara de navigare doar dacă este logat
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
      // Injectare curată în slotul nativ, fără a rupe restul scripturilor tematice (Light/Dark sau Sidebar)
      'nav-bar-content-after': () => h(AuthGuardAndStatus)
    })
  }
}
