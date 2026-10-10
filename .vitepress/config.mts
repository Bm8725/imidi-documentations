import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "iMIDI Docs",
  description: "Ghiduri și Manuale Oficiale iMIDI",
  themeConfig: {
    logo: '/logo.png', // dacă ai un logo în folderul public
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Manual i-VOLUTION', link: '/i-volution/' }
    ],
    sidebar: {
      '/i-volution/': [
        {
          text: 'Ghid i-VOLUTION',
          items: [
            { text: 'Introducere', link: '/i-volution/' },
            { text: 'Configurare Ecran OLED', link: '/i-volution/configurare' },
            { text: 'Specificații Tehnice', link: '/i-volution/specificatii' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
