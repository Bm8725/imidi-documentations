import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "iMIDI . Docs",
  description: "Ghiduri, Manuale și Specificații Oficiale iMIDI",
  themeConfig: {
    logo: '/logo.png', // Plasează logo.png în folderul public (opțional)
    
    // Meniul de navigare de sus (Nav Bar)
    nav: [
      { text: 'Acasă', link: '/' },
      { text: 'TS4X Synth', link: '/ts4x/' },
      { text: 'i-volution Controller', link: '/i-volution/' },
      { text: 'E-Market', link: '/e-market/' },
      { text: 'Cloud & mySpace', link: '/cloud/' }
    ],

    // Barele laterale (Sidebar) organizate pe secțiuni
    sidebar: {
      // Sidebar pentru ecosistemul Hardware i-volution
      '/i-volution/': [
        {
          text: 'i-volution Controller',
          items: [
            { text: 'Introducere & Concept', link: '/i-volution/' },
            { text: 'Configurare Ecran OLED', link: '/i-volution/configurare' },
            { text: 'Mapping SOLO/BASS Accordion', link: '/i-volution/mapping' },
            { text: 'Specificații Tehnice', link: '/i-volution/specificatii' },
            { text: 'Ghid Conectare MIDI 3.0', link: '/i-volution/midi-interconnection' }
          ]
        },
        {
          text: 'Mentenanță & Suport',
          items: [
            { text: 'Update Firmware', link: '/i-volution/firmware' },
            { text: 'Depanare Probleme (FAQ)', link: '/i-volution/faq' }
          ]
        }
      ],

      // Sidebar pentru motorul software TS4X Synth
      '/ts4x/': [
        {
          text: 'TS4X Synth Engine',
          items: [
            { text: 'Despre TS4X Core DSP', link: '/ts4x/' },
            { text: 'Instalare Desktop & Mobile', link: '/ts4x/instalare' },
            { text: 'Optimizare Latență (<1.8ms)', link: '/ts4x/latenta' },
            { text: 'Management Licențe Pro', link: '/ts4x/licentiere' }
          ]
        },
        {
          text: 'Sunete & Mapare',
          items: [
            { text: 'Import Audio Samplers (.wav)', link: '/ts4x/samplers' },
            { text: 'Loopers & Step Samplers', link: '/ts4x/loopers' }
          ]
        }
      ],

      // Sidebar pentru E-Market și Cloud Sync
      '/e-market/': [
        {
          text: 'E-Market Marketplace',
          items: [
            { text: 'Ghid Vânzător (Presets & Sound Banks)', link: '/e-market/' },
            { text: 'Reguli de Listare & Trial 14 zile', link: '/e-market/listare' },
            { text: 'Integrare AI Smith', link: '/e-market/ai-smith' }
          ]
        }
      ],
      
      '/cloud/': [
        {
          text: 'MyCloud Storage',
          items: [
            { text: 'Configurare Cont mySpace', link: '/cloud/' },
            { text: 'Sincronizare Profiluri Audio (KORG/Genos)', link: '/cloud/sincronizare' },
            { text: 'Backup Securizat 30GB', link: '/cloud/backup' }
          ]
        }
      ]
    },

    // Link-uri către rețele sociale / GitHub
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    // Footer-ul de bază generat automat pe TOATE paginile site-ului
    footer: {
      message: 'Platformă dezvoltată în conformitate cu standardele iMIDI Ecosystem.',
      copyright: '© 2026 Copyright iMIDI.co.uk. Toate drepturile rezervate.'
    }
  }
})
