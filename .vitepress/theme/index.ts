import DefaultTheme from 'vitepress/theme'
import { createClient } from '@supabase/supabase-js'
import { h, ref, onMounted } from 'vue'

// Clientul tău Supabase iMIDI
const supabase = createClient(
  'https://supabase.co', 
  'sb_publishable_H9tcriVnzdNjXOxgU2wLVQ_Hp_BlT4q'
)

// Componenta dinamică pentru afișarea numelui în bara de navigare
const UserProfileWidget = {
  setup() {
    const fullName = ref('')

    onMounted(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        // Încearcă să ia numele din metadatele Supabase (dacă a fost salvat la sign-up)
        const profileName = session.user.user_metadata?.full_name || session.user.user_metadata?.name
        
        // Dacă nu există câmpul de nume, va afișa prima parte din email (ex: "bobby" din "bobby@mail.com")
        fullName.value = profileName || session.user.email.split('@')[0]
      }
    })

    return () => {
      if (!fullName.value) return null
      
      return h('div', { 
        style: 'display: flex; align-items: center; margin-left: 20px; font-size: 14px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-bg-alt); padding: 4px 12px; border-radius: 8px; border: 1px solid var(--vp-c-gutter);' 
      }, `👤 ${fullName.value}`)
    }
  }
}

export default {
  extends: DefaultTheme,
  // Injectează widgetul cu numele în layout-ul barei de navigare native
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(UserProfileWidget)
    })
  },
  enhanceApp({ router }) {
    // Scutul de securitate (Route Guard)
    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange(async (to) => {
        const { data: { session } } = await supabase.auth.getSession()

        // Dacă nu este logat, îl aruncă înapoi pe pagina de login iMIDI
        if (!session) {
          window.location.href = 'https://imidi.co.uk/login' 
          return false
        }
      })
    }
  }
}
