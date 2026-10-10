// .vitepress/config.mts
import { defineConfig } from "file:///C:/Users/testa/Desktop/imidi_australia.co.uk/viteexpdoc/node_modules/vitepress/dist/node/index.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
var __vite_injected_original_dirname = "C:\\Users\\testa\\Desktop\\imidi_australia.co.uk\\viteexpdoc\\.vitepress";
var labelMapping = {
  "index": "Ghid Introducere",
  "configurare": "Configurare Ecran OLED",
  "mapping": "Mapare Solo & Bass",
  "specificatii": "Specifica\u021Bii Tehnice",
  "midi-interconnection": "Arhitectur\u0103 MIDI 3.0",
  "firmware": "Actualizare Firmware",
  "faq": "\xCEntreb\u0103ri Frecvente (FAQ)",
  "instalare": "Instalare Desktop & Mobile",
  "latenta": "Optimizare Laten\u021B\u0103 (<1.8ms)",
  "licentiere": "Management Licen\u021Be Pro",
  "samplers": "Import Audio Samplers (.wav)",
  "loopers": "Loopere & Step Samplers",
  "listare": "Reguli Listare E-Market",
  "ai-smith": "Integrare Inteligen\u021B\u0103 AI Smith",
  "sincronizare": "Sincronizare Profile Audio",
  "backup": "Backup Securizat 30GB"
};
function getGitAuthor(filePath) {
  try {
    const author = execSync(`git log -1 --pretty=format:"%an" -- "${filePath}"`, { encoding: "utf-8" }).trim();
    return author || "iMIDI Team";
  } catch (error) {
    return "iMIDI Team";
  }
}
function getPremiumLatestUpdates() {
  try {
    const docsDir = path.resolve(__vite_injected_original_dirname, "../");
    const foldersToScan = ["i-volution", "ts4x", "e-market", "cloud"];
    let allFiles = [];
    foldersToScan.forEach((folder) => {
      const folderPath = path.join(docsDir, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
          if (file.endsWith(".md")) {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);
            const baseName = file.replace(".md", "");
            const cleanTitle = labelMapping[baseName] || (baseName === "index" ? `Acas\u0103 ${folder}` : baseName);
            const authorName = getGitAuthor(filePath);
            allFiles.push({
              text: `${cleanTitle} (by ${authorName})`,
              link: `/${folder}/${baseName === "index" ? "" : baseName}`,
              mtime: stat.mtimeMs
            });
          }
        });
      }
    });
    const latestUpdates = allFiles.sort((a, b) => b.mtime - a.mtime).slice(0, 3);
    return {
      text: "\u{1F504} Latest Updates",
      items: latestUpdates
    };
  } catch (error) {
    console.error("Eroare la generarea meniului de actualiz\u0103ri recente:", error);
    return { text: "Docs", link: "/" };
  }
}
var recentUpdatesDropdown = getPremiumLatestUpdates();
var config_default = defineConfig({
  title: "iMIDI . Docs",
  description: "Official guides, manuals and specifications for iMIDI",
  themeConfig: {
    logo: "/logo.png",
    // Plasează logo.png în folderul public
    // 🔍 INTEGRAREA SISTEMULUI DE CĂUTARE PREMIUM NATIV (MiniSearch)
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search guides...",
                buttonAriaLabel: "Search documentation"
              },
              modal: {
                noResultsText: "No results found for",
                resetButtonTitle: "Clear search query",
                footer: {
                  selectText: "to select",
                  navigateText: "to navigate",
                  closeText: "to close"
                }
              }
            }
          }
        }
      }
    },
    // Top navigation menu (Nav Bar)
    nav: [
      { text: "Home", link: "/" },
      { text: "TS4X Synth", link: "/ts4x/" },
      { text: "i-volution Controller", link: "/i-volution/" },
      { text: "E-Market", link: "/e-market/" },
      { text: "Cloud & mySpace", link: "/cloud/" },
      recentUpdatesDropdown
      // Meniul dinamic cu ultimele update-uri și autori
    ],
    // Meniurile Sidebar organizate pe secțiuni tehnice
    sidebar: {
      "/i-volution/": [
        {
          text: "i-volution Controller",
          items: [
            { text: "Introduction & Concept", link: "/i-volution/" },
            { text: "OLED Display Configuration", link: "/i-volution/configurare" },
            { text: "Mapping SOLO/BASS Accordion", link: "/i-volution/mapping" },
            { text: "Technical Specifications", link: "/i-volution/specificatii" },
            { text: "MIDI 3.0 Connection Guide", link: "/i-volution/midi-interconnection" }
          ]
        },
        {
          text: "Maintenance & Support",
          items: [
            { text: "Update Firmware", link: "/i-volution/firmware" },
            { text: "Troubleshooting (FAQ)", link: "/i-volution/faq" }
          ]
        }
      ],
      "/ts4x/": [
        {
          text: "TS4X Synth Engine",
          items: [
            { text: "About TS4X Core DSP", link: "/ts4x/" },
            { text: "Desktop & Mobile Installation", link: "/ts4x/instalare" },
            { text: "Latency Optimization (<1.8ms)", link: "/ts4x/latenta" },
            { text: "Pro License Management", link: "/ts4x/licentiere" }
          ]
        },
        {
          text: "Sounds & Mapping",
          items: [
            { text: "Import Audio Samplers (.wav)", link: "/ts4x/samplers" },
            { text: "Loopers & Step Samplers", link: "/ts4x/loopers" }
          ]
        }
      ],
      "/e-market/": [
        {
          text: "E-Market Marketplace",
          items: [
            { text: "Seller Guide (Presets & Sound Banks)", link: "/e-market/" },
            { text: "Listing Rules & 14-Day Trial", link: "/e-market/listare" },
            { text: "AI Smith Integration", link: "/e-market/ai-smith" }
          ]
        }
      ],
      "/cloud/": [
        {
          text: "MyCloud Storage",
          items: [
            { text: "mySpace Account Setup", link: "/cloud/" },
            { text: "Audio Profile Sync (KORG/Genos)", link: "/cloud/sincronizare" },
            { text: "Secure 30GB Backup", link: "/cloud/backup" }
          ]
        }
      ]
    },
    // Link către profilul de GitHub
    socialLinks: [
      { icon: "github", link: "https://github.com/Bm8725" }
    ],
    // Footer global
    footer: {
      copyright: "\xA9 Copyright iMIDI.co.uk. "
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGVzdGFcXFxcRGVza3RvcFxcXFxpbWlkaV9hdXN0cmFsaWEuY28udWtcXFxcdml0ZWV4cGRvY1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0ZXN0YVxcXFxEZXNrdG9wXFxcXGltaWRpX2F1c3RyYWxpYS5jby51a1xcXFx2aXRlZXhwZG9jXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdGVzdGEvRGVza3RvcC9pbWlkaV9hdXN0cmFsaWEuY28udWsvdml0ZWV4cGRvYy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJyAvLyBNb2R1bCBuYXRpdiBwZW50cnUgZXhlY3V0YXJlYSBjb21lbnppbG9yIEdpdFxuXG4vLyBEaWNcdTAyMUJpb25hciBkZSBtYXBhcmUgcGVudHJ1IGEgYWZpXHUwMjE5YSB0aXRsdXJpIHByZW1pdW0gXHUwMEVFbiBsb2MgZGUgbnVtZWxlIGJydXQgYWwgZmlcdTAyMTlpZXJ1bHVpXG5jb25zdCBsYWJlbE1hcHBpbmcgPSB7XG4gICdpbmRleCc6ICdHaGlkIEludHJvZHVjZXJlJyxcbiAgJ2NvbmZpZ3VyYXJlJzogJ0NvbmZpZ3VyYXJlIEVjcmFuIE9MRUQnLFxuICAnbWFwcGluZyc6ICdNYXBhcmUgU29sbyAmIEJhc3MnLFxuICAnc3BlY2lmaWNhdGlpJzogJ1NwZWNpZmljYVx1MDIxQmlpIFRlaG5pY2UnLFxuICAnbWlkaS1pbnRlcmNvbm5lY3Rpb24nOiAnQXJoaXRlY3R1clx1MDEwMyBNSURJIDMuMCcsXG4gICdmaXJtd2FyZSc6ICdBY3R1YWxpemFyZSBGaXJtd2FyZScsXG4gICdmYXEnOiAnXHUwMENFbnRyZWJcdTAxMDNyaSBGcmVjdmVudGUgKEZBUSknLFxuICAnaW5zdGFsYXJlJzogJ0luc3RhbGFyZSBEZXNrdG9wICYgTW9iaWxlJyxcbiAgJ2xhdGVudGEnOiAnT3B0aW1pemFyZSBMYXRlblx1MDIxQlx1MDEwMyAoPDEuOG1zKScsXG4gICdsaWNlbnRpZXJlJzogJ01hbmFnZW1lbnQgTGljZW5cdTAyMUJlIFBybycsXG4gICdzYW1wbGVycyc6ICdJbXBvcnQgQXVkaW8gU2FtcGxlcnMgKC53YXYpJyxcbiAgJ2xvb3BlcnMnOiAnTG9vcGVyZSAmIFN0ZXAgU2FtcGxlcnMnLFxuICAnbGlzdGFyZSc6ICdSZWd1bGkgTGlzdGFyZSBFLU1hcmtldCcsXG4gICdhaS1zbWl0aCc6ICdJbnRlZ3JhcmUgSW50ZWxpZ2VuXHUwMjFCXHUwMTAzIEFJIFNtaXRoJyxcbiAgJ3NpbmNyb25pemFyZSc6ICdTaW5jcm9uaXphcmUgUHJvZmlsZSBBdWRpbycsXG4gICdiYWNrdXAnOiAnQmFja3VwIFNlY3VyaXphdCAzMEdCJ1xufTtcblxuLy8gRnVuY1x1MDIxQmllIGNhcmUgZXh0cmFnZSBudW1lbGUgYXV0b3J1bHVpIHVsdGltdWx1aSBjb21taXQgR2l0IHBlbnRydSB1biBhbnVtaXQgZmlcdTAyMTlpZXJcbmZ1bmN0aW9uIGdldEdpdEF1dGhvcihmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGNvbnN0IGF1dGhvciA9IGV4ZWNTeW5jKGBnaXQgbG9nIC0xIC0tcHJldHR5PWZvcm1hdDpcIiVhblwiIC0tIFwiJHtmaWxlUGF0aH1cImAsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpO1xuICAgIHJldHVybiBhdXRob3IgfHwgJ2lNSURJIFRlYW0nOyAvLyBGYWxsYmFjayBcdTAwRUVuIGNheiBjXHUwMTAzIGZpXHUwMjE5aWVydWwgbnUgYXJlIFx1MDBFRW5jXHUwMTAzIGNvbW1pdC11cmlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ2lNSURJIFRlYW0nOyAvLyBGYWxsYmFjayBkYWNcdTAxMDMgcHJvaWVjdHVsIG51IGVzdGUgaW5pXHUwMjFCaWFsaXphdCBsb2NhbCBjdSBHaXRcbiAgfVxufVxuXG4vLyBGdW5jXHUwMjFCaWUgcHJlbWl1bSBjYXJlIHNjYW5lYXpcdTAxMDMgZGlyZWN0b2FyZWxlIFx1MDIxOWkgcmV0dXJuZWF6XHUwMTAzIHVsdGltZWxlIDMgZmlcdTAyMTlpZXJlIG1vZGlmaWNhdGUgKyBBdXRvcnVsIGxvclxuZnVuY3Rpb24gZ2V0UHJlbWl1bUxhdGVzdFVwZGF0ZXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZG9jc0RpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8nKVxuICAgIGNvbnN0IGZvbGRlcnNUb1NjYW4gPSBbJ2ktdm9sdXRpb24nLCAndHM0eCcsICdlLW1hcmtldCcsICdjbG91ZCddXG4gICAgbGV0IGFsbEZpbGVzID0gW11cblxuICAgIGZvbGRlcnNUb1NjYW4uZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgY29uc3QgZm9sZGVyUGF0aCA9IHBhdGguam9pbihkb2NzRGlyLCBmb2xkZXIpXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhmb2xkZXJQYXRoKSkge1xuICAgICAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGZvbGRlclBhdGgpXG4gICAgICAgIFxuICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgIGlmIChmaWxlLmVuZHNXaXRoKCcubWQnKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZm9sZGVyUGF0aCwgZmlsZSlcbiAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhmaWxlUGF0aClcbiAgICAgICAgICAgIGNvbnN0IGJhc2VOYW1lID0gZmlsZS5yZXBsYWNlKCcubWQnLCAnJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY2xlYW5UaXRsZSA9IGxhYmVsTWFwcGluZ1tiYXNlTmFtZV0gfHwgKGJhc2VOYW1lID09PSAnaW5kZXgnID8gYEFjYXNcdTAxMDMgJHtmb2xkZXJ9YCA6IGJhc2VOYW1lKVxuICAgICAgICAgICAgY29uc3QgYXV0aG9yTmFtZSA9IGdldEdpdEF1dGhvcihmaWxlUGF0aCk7XG5cbiAgICAgICAgICAgIGFsbEZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBgJHtjbGVhblRpdGxlfSAoYnkgJHthdXRob3JOYW1lfSlgLFxuICAgICAgICAgICAgICBsaW5rOiBgLyR7Zm9sZGVyfS8ke2Jhc2VOYW1lID09PSAnaW5kZXgnID8gJycgOiBiYXNlTmFtZX1gLFxuICAgICAgICAgICAgICBtdGltZTogc3RhdC5tdGltZU1zXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGxhdGVzdFVwZGF0ZXMgPSBhbGxGaWxlc1xuICAgICAgLnNvcnQoKGEsIGIpID0+IGIubXRpbWUgLSBhLm10aW1lKVxuICAgICAgLnNsaWNlKDAsIDMpXG5cbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDogJ1x1RDgzRFx1REQwNCBMYXRlc3QgVXBkYXRlcycsXG4gICAgICBpdGVtczogbGF0ZXN0VXBkYXRlc1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJvYXJlIGxhIGdlbmVyYXJlYSBtZW5pdWx1aSBkZSBhY3R1YWxpelx1MDEwM3JpIHJlY2VudGU6XCIsIGVycm9yKVxuICAgIHJldHVybiB7IHRleHQ6ICdEb2NzJywgbGluazogJy8nIH1cbiAgfVxufVxuXG5jb25zdCByZWNlbnRVcGRhdGVzRHJvcGRvd24gPSBnZXRQcmVtaXVtTGF0ZXN0VXBkYXRlcygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogXCJpTUlESSAuIERvY3NcIixcbiAgZGVzY3JpcHRpb246IFwiT2ZmaWNpYWwgZ3VpZGVzLCBtYW51YWxzIGFuZCBzcGVjaWZpY2F0aW9ucyBmb3IgaU1JRElcIixcbiAgdGhlbWVDb25maWc6IHtcbiAgICBsb2dvOiAnL2xvZ28ucG5nJywgLy8gUGxhc2Vhelx1MDEwMyBsb2dvLnBuZyBcdTAwRUVuIGZvbGRlcnVsIHB1YmxpY1xuICAgIFxuICAgIC8vIFx1RDgzRFx1REQwRCBJTlRFR1JBUkVBIFNJU1RFTVVMVUkgREUgQ1x1MDEwMlVUQVJFIFBSRU1JVU0gTkFUSVYgKE1pbmlTZWFyY2gpXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogJ2xvY2FsJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbG9jYWxlczoge1xuICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnU2VhcmNoIGd1aWRlcy4uLicsXG4gICAgICAgICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnU2VhcmNoIGRvY3VtZW50YXRpb24nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQgZm9yJyxcbiAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnQ2xlYXIgc2VhcmNoIHF1ZXJ5JyxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdFRleHQ6ICd0byBzZWxlY3QnLFxuICAgICAgICAgICAgICAgICAgbmF2aWdhdGVUZXh0OiAndG8gbmF2aWdhdGUnLFxuICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAndG8gY2xvc2UnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gVG9wIG5hdmlnYXRpb24gbWVudSAoTmF2IEJhcilcbiAgICBuYXY6IFtcbiAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcbiAgICAgIHsgdGV4dDogJ1RTNFggU3ludGgnLCBsaW5rOiAnL3RzNHgvJyB9LFxuICAgICAgeyB0ZXh0OiAnaS12b2x1dGlvbiBDb250cm9sbGVyJywgbGluazogJy9pLXZvbHV0aW9uLycgfSxcbiAgICAgIHsgdGV4dDogJ0UtTWFya2V0JywgbGluazogJy9lLW1hcmtldC8nIH0sXG4gICAgICB7IHRleHQ6ICdDbG91ZCAmIG15U3BhY2UnLCBsaW5rOiAnL2Nsb3VkLycgfSxcbiAgICAgIHJlY2VudFVwZGF0ZXNEcm9wZG93biAvLyBNZW5pdWwgZGluYW1pYyBjdSB1bHRpbWVsZSB1cGRhdGUtdXJpIFx1MDIxOWkgYXV0b3JpXG4gICAgXSxcblxuICAgIC8vIE1lbml1cmlsZSBTaWRlYmFyIG9yZ2FuaXphdGUgcGUgc2VjXHUwMjFCaXVuaSB0ZWhuaWNlXG4gICAgc2lkZWJhcjoge1xuICAgICAgJy9pLXZvbHV0aW9uLyc6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdpLXZvbHV0aW9uIENvbnRyb2xsZXInLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdJbnRyb2R1Y3Rpb24gJiBDb25jZXB0JywgbGluazogJy9pLXZvbHV0aW9uLycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ09MRUQgRGlzcGxheSBDb25maWd1cmF0aW9uJywgbGluazogJy9pLXZvbHV0aW9uL2NvbmZpZ3VyYXJlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTWFwcGluZyBTT0xPL0JBU1MgQWNjb3JkaW9uJywgbGluazogJy9pLXZvbHV0aW9uL21hcHBpbmcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdUZWNobmljYWwgU3BlY2lmaWNhdGlvbnMnLCBsaW5rOiAnL2ktdm9sdXRpb24vc3BlY2lmaWNhdGlpJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTUlESSAzLjAgQ29ubmVjdGlvbiBHdWlkZScsIGxpbms6ICcvaS12b2x1dGlvbi9taWRpLWludGVyY29ubmVjdGlvbicgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdNYWludGVuYW5jZSAmIFN1cHBvcnQnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdVcGRhdGUgRmlybXdhcmUnLCBsaW5rOiAnL2ktdm9sdXRpb24vZmlybXdhcmUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdUcm91Ymxlc2hvb3RpbmcgKEZBUSknLCBsaW5rOiAnL2ktdm9sdXRpb24vZmFxJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdLFxuXG4gICAgICAnL3RzNHgvJzogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1RTNFggU3ludGggRW5naW5lJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnQWJvdXQgVFM0WCBDb3JlIERTUCcsIGxpbms6ICcvdHM0eC8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdEZXNrdG9wICYgTW9iaWxlIEluc3RhbGxhdGlvbicsIGxpbms6ICcvdHM0eC9pbnN0YWxhcmUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdMYXRlbmN5IE9wdGltaXphdGlvbiAoPDEuOG1zKScsIGxpbms6ICcvdHM0eC9sYXRlbnRhJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnUHJvIExpY2Vuc2UgTWFuYWdlbWVudCcsIGxpbms6ICcvdHM0eC9saWNlbnRpZXJlJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1NvdW5kcyAmIE1hcHBpbmcnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdJbXBvcnQgQXVkaW8gU2FtcGxlcnMgKC53YXYpJywgbGluazogJy90czR4L3NhbXBsZXJzJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTG9vcGVycyAmIFN0ZXAgU2FtcGxlcnMnLCBsaW5rOiAnL3RzNHgvbG9vcGVycycgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcblxuICAgICAgJy9lLW1hcmtldC8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnRS1NYXJrZXQgTWFya2V0cGxhY2UnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdTZWxsZXIgR3VpZGUgKFByZXNldHMgJiBTb3VuZCBCYW5rcyknLCBsaW5rOiAnL2UtbWFya2V0LycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0xpc3RpbmcgUnVsZXMgJiAxNC1EYXkgVHJpYWwnLCBsaW5rOiAnL2UtbWFya2V0L2xpc3RhcmUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdBSSBTbWl0aCBJbnRlZ3JhdGlvbicsIGxpbms6ICcvZS1tYXJrZXQvYWktc21pdGgnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcbiAgICAgICcvY2xvdWQvJzogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ015Q2xvdWQgU3RvcmFnZScsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ215U3BhY2UgQWNjb3VudCBTZXR1cCcsIGxpbms6ICcvY2xvdWQvJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQXVkaW8gUHJvZmlsZSBTeW5jIChLT1JHL0dlbm9zKScsIGxpbms6ICcvY2xvdWQvc2luY3Jvbml6YXJlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnU2VjdXJlIDMwR0IgQmFja3VwJywgbGluazogJy9jbG91ZC9iYWNrdXAnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuXG4gICAgLy8gTGluayBjXHUwMTAzdHJlIHByb2ZpbHVsIGRlIEdpdEh1YlxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL0JtODcyNScgfVxuICAgIF0sXG5cbiAgICAvLyBGb290ZXIgZ2xvYmFsXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6ICdcdTAwQTkgQ29weXJpZ2h0IGlNSURJLmNvLnVrLiAnXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WCxTQUFTLG9CQUFvQjtBQUMzWixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsU0FBUyxnQkFBZ0I7QUFIekIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxlQUFlO0FBQUEsRUFDbkIsU0FBUztBQUFBLEVBQ1QsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsZ0JBQWdCO0FBQUEsRUFDaEIsd0JBQXdCO0FBQUEsRUFDeEIsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osZ0JBQWdCO0FBQUEsRUFDaEIsVUFBVTtBQUNaO0FBR0EsU0FBUyxhQUFhLFVBQVU7QUFDOUIsTUFBSTtBQUNGLFVBQU0sU0FBUyxTQUFTLHdDQUF3QyxRQUFRLEtBQUssRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDekcsV0FBTyxVQUFVO0FBQUEsRUFDbkIsU0FBUyxPQUFPO0FBQ2QsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUdBLFNBQVMsMEJBQTBCO0FBQ2pDLE1BQUk7QUFDRixV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
