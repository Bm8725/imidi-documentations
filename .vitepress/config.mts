import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process' // Modul nativ pentru executarea comenzilor Git

// Dicționar de mapare pentru a afișa titluri premium în loc de numele brut al fișierului
const labelMapping = {
  'index': 'Ghid Introducere',
  'configurare': 'Configurare Ecran OLED',
  'mapping': 'Mapare Solo & Bass',
  'specificatii': 'Specificații Tehnice',
  'midi-interconnection': 'Arhitectură MIDI 3.0',
  'firmware': 'Actualizare Firmware',
  'faq': 'Întrebări Frecvente (FAQ)',
  'instalare': 'Instalare Desktop & Mobile',
  'latenta': 'Optimizare Latență (<1.8ms)',
  'licentiere': 'Management Licențe Pro',
  'samplers': 'Import Audio Samplers (.wav)',
  'loopers': 'Loopere & Step Samplers',
  'listare': 'Reguli Listare E-Market',
  'ai-smith': 'Integrare Inteligență AI Smith',
  'sincronizare': 'Sincronizare Profile Audio',
  'backup': 'Backup Securizat 30GB'
};

// Funcție care extrage numele autorului ultimului commit Git pentru un anumit fișier
function getGitAuthor(filePath) {
  try {
    const author = execSync(`git log -1 --pretty=format:"%an" -- "${filePath}"`, { encoding: 'utf-8' }).trim();
    return author || 'iMIDI Team'; // Fallback în caz că fișierul nu are încă commit-uri
  } catch (error) {
    return 'iMIDI Team'; // Fallback dacă proiectul nu este inițializat local cu Git
  }
}

// Funcție recursivă care scanează toate subdirectoarele pentru a găsi fișiere markdown
function getAllMarkdownFiles(dirPath, folderName, allFiles = []) {
  if (!fs.existsSync(dirPath)) return allFiles;
  
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Scanează recursiv subfolderele dacă există
      getAllMarkdownFiles(fullPath, folderName, allFiles);
    } else if (item.endsWith('.md')) {
      const baseName = item.replace('.md', '');
      const cleanTitle = labelMapping[baseName] || (baseName === 'index' ? `Acasă ${folderName}` : baseName);
      const authorName = getGitAuthor(fullPath);
      
      // Calculăm link-ul relativ corect pentru structura VitePress
      let relativeLink = '';
      if (baseName === 'index') {
        relativeLink = `/${folderName}/`;
      } else {
        relativeLink = `/${folderName}/${baseName}`;
      }

      allFiles.push({
        text: `${cleanTitle} (by ${authorName})`,
        link: relativeLink,
        mtime: stat.mtimeMs
      });
    }
  });
  
  return allFiles;
}

// Funcție premium actualizată cu path corectat
function getPremiumLatestUpdates() {
  try {
    // Încercăm mai întâi varianta standard (config în .vitepress/config.js)
    let docsDir = path.resolve(__dirname, '../../'); 
    const foldersToScan = ['i-volution', 'ts4x', 'e-market', 'cloud'];
    
    // VERIFICARE DE SIGURANȚĂ: Dacă folderele nu există la calea curentă, înseamnă că fișierul config e direct în rădăcină
    const primaMapaExista = fs.existsSync(path.join(docsDir, foldersToScan[0]));
    if (!primaMapaExista) {
      // Ajustăm calea automaginit (urcă doar un nivel dacă e configurat direct în rădăcină)
      docsDir = path.resolve(__dirname, '../');
    }

    let allFiles = [];

    foldersToScan.forEach(folder => {
      const folderPath = path.join(docsDir, folder);
      // Scanăm doar dacă folderul există cu adevărat pe disc
      if (fs.existsSync(folderPath)) {
        getAllMarkdownFiles(folderPath, folder, allFiles);
      }
    });

    // Sortăm descrescător după data ultimei modificări (mtime)
    const latestUpdates = allFiles
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, 3);

    // DEBUG CLI: Îți va scrie în terminalul de VS Code exact ce a găsit sau dacă e gol
    console.log(`[iMIDI Debug] S-au găsit ${allFiles.length} fișiere Markdown în total.`);

    if (latestUpdates.length === 0) {
      return { 
        text: '🔄 Latest Updates', 
        items: [{ text: 'Nu s-au găsit fișiere .md', link: '/' }] 
      };
    }

    return {
      text: '🔄 Latest Updates',
      items: latestUpdates
    };
  } catch (error) {
    console.error("Eroare la generarea meniului de actualizări recente:", error);
    return { text: '🔄 Updates', items: [{ text: 'Go to Home', link: '/' }] };
  }
}

const recentUpdatesDropdown = getPremiumLatestUpdates();

export default defineConfig({
  title: ". DOCS",
  description: "Official guides, manuals and specifications for iMIDI",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search guides...',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results found for',
                resetButtonTitle: 'Clear search query',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },

    // Top navigation menu (Nav Bar)
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TS4X Synth', link: '/ts4x/' },
      { text: 'i-volution Controller', link: '/i-volution/' },
      { text: 'E-Market', link: '/e-market/' },
      { text: 'Cloud & mySpace', link: '/cloud/' },
      recentUpdatesDropdown // Meniul dinamic reparat
    ],

    // Meniurile Sidebar organizate pe secțiuni tehnice
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
