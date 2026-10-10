import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "iMIDI . Docs",
  description: "Official guides, manuals and specifications for iMIDI",
  themeConfig: {
    logo: '/logo.png', // Place logo.png in the public folder (optional)
    
    // Top navigation menu (Nav Bar)
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TS4X Synth', link: '/ts4x/' },
      { text: 'i-volution Controller', link: '/i-volution/' },
      { text: 'E-Market', link: '/e-market/' },
      { text: 'Cloud & mySpace', link: '/cloud/' }
    ],

    // Sidebars organized by section
    sidebar: {
      // Sidebar for the i-volution hardware ecosystem
      '/i-volution/': [
        {
          text: 'i-volution Controller',
          items: [
            { text: 'Introduction & Concept', link: '/i-volution/' },
            { text: 'OLED Display Configuration', link: '/i-volution/configurare' },
            { text: 'Mapping SOLO/BASS Accordion', link: '/i-volution/mapping' },
            { text: 'Technical Specifications', link: '/i-volution/specificatii' },
            { text: 'MIDI 3.0 Connection Guide', link: '/i-volution/midi-interconnection' }
          ]
        },
        {
          text: 'Maintenance & Support',
          items: [
            { text: 'Update Firmware', link: '/i-volution/firmware' },
            { text: 'Troubleshooting (FAQ)', link: '/i-volution/faq' }
          ]
        }
      ],

      // Sidebar for the TS4X Synth software engine
      '/ts4x/': [
        {
          text: 'TS4X Synth Engine',
          items: [
            { text: 'About TS4X Core DSP', link: '/ts4x/' },
            { text: 'Desktop & Mobile Installation', link: '/ts4x/instalare' },
            { text: 'Latency Optimization (<1.8ms)', link: '/ts4x/latenta' },
            { text: 'Pro License Management', link: '/ts4x/licentiere' }
          ]
        },
        {
          text: 'Sounds & Mapping',
          items: [
            { text: 'Import Audio Samplers (.wav)', link: '/ts4x/samplers' },
            { text: 'Loopers & Step Samplers', link: '/ts4x/loopers' }
          ]
        }
      ],

      // Sidebar for E-Market and Cloud Sync
      '/e-market/': [
        {
          text: 'E-Market Marketplace',
          items: [
            { text: 'Seller Guide (Presets & Sound Banks)', link: '/e-market/' },
            { text: 'Listing Rules & 14-Day Trial', link: '/e-market/listare' },
            { text: 'AI Smith Integration', link: '/e-market/ai-smith' }
          ]
        }
      ],
      
      '/cloud/': [
        {
          text: 'MyCloud Storage',
          items: [
            { text: 'mySpace Account Setup', link: '/cloud/' },
            { text: 'Audio Profile Sync (KORG/Genos)', link: '/cloud/sincronizare' },
            { text: 'Secure 30GB Backup', link: '/cloud/backup' }
          ]
        }
      ]
    },

    // Links to social networks / GitHub
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bm8725' }
    ],

    // Base footer generated automatically on ALL pages of the site
    footer: {
     
      copyright: '© Copyright iMIDI.co.uk. '
    }
  }
})