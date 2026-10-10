import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Funcție utilitară pentru a găsi ultimul fișier .md modificat în proiect
function getLatestMarkdownUpdate() {
  try {
    const docsDir = path.resolve(__dirname, '../') // Directorul rădăcină al documentelor ta
    let latestFile = null;
    let latestMtime = 0;

    // Scanăm directoarele importante menționate în sidebar
    const foldersToScan = ['i-volution', 'ts4x', 'e-market', 'cloud'];

    foldersToScan.forEach(folder => {
      const folderPath = path.join(docsDir, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        
        files.forEach(file => {
          if (file.endsWith('.md')) {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);
            
            if (stat.mtimeMs > latestMtime) {
              latestMtime = stat.mtimeMs;
              // Generăm link-ul formatat corect pentru VitePress (ex: /ts4x/latenta)
              const pageName = file === 'index.md' ? '' : file.replace('.md', '');
              latestFile = {
                text: `🔄 Recent: ${pageName || folder}`,
                link: `/${folder}/${pageName}`
              };
            }
          }
        });
      }
    });

    // Dacă a găsit un fișier returnează-l, altfel pune un fallback
    return latestFile || { text: 'Docs', link: '/' };
  } catch (error) {
    console.error("Eroare la citirea fișierelor markdown:", error);
    return { text: 'Docs', link: '/' };
  }
}

// Generăm dinamic item-ul pentru navbar la momentul rulării procesului de build / dev
const latestUpdateItem = getLatestMarkdownUpdate();

export default defineConfig({
  title: "iMIDI . Docs",
  description: "Official guides, manuals and specifications for iMIDI",
  themeConfig: {
    logo: '/logo.png',
    
    // Top navigation menu (Nav Bar) cu item dinamic atașat la final
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TS4X Synth', link: '/ts4x/' },
      { text: 'i-volution Controller', link: '/i-volution/' },
      { text: 'E-Market', link: '/e-market/' },
      { text: 'Cloud & mySpace', link: '/cloud/' },
      latestUpdateItem // <-- Aici apare automat ultimul fișier editat în cod!
    ],

    // Sidebars organized by section
    sidebar: {
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bm8725' }
    ],

    footer: {
      copyright: '© Copyright iMIDI.co.uk. '
    }
  }
})
