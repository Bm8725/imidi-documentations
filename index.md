---
layout: page
title: iMIDI Platform
---

<div class="im">
<!-- HERO -->
<header class="im-hero">
<span class="im-eyebrow">Documentation</span>
<h1 class="im-title">iMIDI Platform</h1>
<p class="im-sub">Shape the Digital Future</p>

<div class="im-actions">
<a href="/i-volution/" class="im-btn im-btn-primary">Open Documentation <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
<a href="https://imidi.co.uk/e-market" target="_blank" rel="noopener" class="im-btn im-btn-ghost">i-volution Market <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>
</div>
</header>
<!-- AT A GLANCE (cifre luate din textele de mai jos) -->
<dl class="im-stats">
<div><dt>TS4X execution latency</dt><dd>&lt; 1.8 ms</dd></div>
<div><dt>MyCloud dedicated storage</dt><dd>30 GB</dd></div>
<div><dt>Stereo DAC, minimum spec</dt><dd>24-bit / 192 kHz</dd></div>
</dl>
<!-- FEATURES -->
<section class="im-section">
<div class="im-head"><span class="im-eyebrow">Platform</span><h2>Hardware &amp; Software Production-Grade Utilities</h2></div>
<div class="im-grid">
<article class="im-card">
<span class="im-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 6v7M12 6v7M16 6v7"/></svg></span>
<h3>TS4X Synth Engine</h3>
<p>A hardware-accelerated live-performance synth engine built explicitly for stage environments. Features sub-1.8ms execution latency and cross-platform mobile or desktop standalone deployment.</p>
</article>
<article class="im-card">
<span class="im-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg></span>
<h3>Global E-Marketplace</h3>
<p>Distribute, sell, and download custom sound banks, presets, specialized scripts, and device maps instantly via automated high-speed cloud architecture.</p>
</article>
<article class="im-card">
<span class="im-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/></svg></span>
<h3>The MIDI 3.0 Concept</h3>
<p>A cutting-edge architecture bridging physical controller articulation with next-gen local DSP processing pipelines and unified cloud sharing nodes.</p>
</article>
</div>
</section>
<!-- TECHNICAL SPECS -->
<section class="im-section">
<div class="im-head"><span class="im-eyebrow">Specifications</span><h2>Engineered Technical Specifications</h2></div>
<div class="im-table-wrap">
<table class="im-table">
<thead>
<tr><th scope="col">Core Infrastructure</th><th scope="col">Minimum System Constraints</th><th scope="col">Architectural Optimization</th></tr>
</thead>
<tbody>
<tr><th scope="row">Processors</th><td>Intel x86_64 / ARM Cortex-A72</td><td>Apple Silicon (M1/M2/M3) or 3nm silicon nodes</td></tr>
<tr><th scope="row">Memory &amp; RAM</th><td>8GB LPDDR4 core allocation</td><td>16GB LPDDR5 optimization for multi-channel DSP</td></tr>
<tr><th scope="row">Storage Units</th><td>256GB Solid State Drive</td><td>512GB NVMe SSD optimized for real-time patch loading</td></tr>
<tr><th scope="row">Audio Routing</th><td>24-bit / 192kHz Stereo DAC</td><td>Native multi-channel USB compliance &amp; Bluetooth 5.0 IO</td></tr>
</tbody>
</table>
</div>
</section>
<!-- FAQ -->
<section class="im-section">
<div class="im-head"><span class="im-eyebrow">FAQ</span><h2>Frequently Asked Questions</h2></div>
<div class="im-faq">
<details>
<summary>Which accordion models are fully compatible with the i-volution controller?</summary>
<p>i-volution is engineered as a universal MIDI controller system. It integrates seamlessly with any accordion configured for standard MIDI channels, delivering comprehensive velocity-sensitive maps across both SOLO and BASS frames.</p>
</details>
<details>
<summary>How does MyCloud storage protect active performance profiles?</summary>
<p>MyCloud automatically pushes your system states, custom patch layers, and layout configurations into a secure, dedicated 30GB storage container, enabling real-time cross-device synchronization.</p>
</details>
<details>
<summary>Is standalone TS4X execution dependent on dedicated iMIDI hardware?</summary>
<p>No. The TS4X processing engine is fully standalone and compatible with standard desktop or mobile hardware. The physical i-volution hardware unit remains an optional expansion for authentic accordion articulation integration.</p>
</details>
</div>
</section>
<!-- CTA -->
<section class="im-cta">
<div>
<h2>Ready to configure your controller?</h2>
<p>Open the documentation for setup guides and reference manuals.</p>
</div>
<a href="/i-volution/" class="im-btn im-btn-primary">Open Documentation <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
</section>
<!-- FOOTER -->

</div>

<style>
.im {
  --im-accent: #0e7490;
  --im-accent-soft: rgba(14, 116, 144, 0.1);
  position: relative;
  isolation: isolate;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px 64px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
}
.dark .im {
  --im-accent: #22d3ee;
  --im-accent-soft: rgba(34, 211, 238, 0.12);
}
.im a { text-decoration: none; }
.im a:focus-visible, .im summary:focus-visible {
  outline: 2px solid var(--im-accent);
  outline-offset: 3px;
  border-radius: 6px;
}

/* HERO */
.im-hero { position: relative; text-align: center; padding: 96px 0 64px; }
.im-hero::before {
  content: "";
  position: absolute;
  inset: -80px -24px 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 60% 55% at 50% 0%, var(--im-accent-soft), transparent 70%),
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px) 0 0 / 56px 56px,
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px) 0 0 / 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 75%);
  opacity: 0.55;
}
.im-eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--im-accent);
}
.im-title {
  margin: 0 0 8px;
  font-size: clamp(40px, 7vw, 64px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}
.im-sub {
  margin: 0 0 18px;
  font-size: clamp(20px, 3.4vw, 28px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-2);
}
.im-tag {
  max-width: 560px;
  margin: 0 auto 32px;
  font-size: 16px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
.im-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

/* BUTTONS */
.im-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.im-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.im-btn-primary { background: var(--vp-c-text-1); color: var(--vp-c-bg); }
.im-btn-primary:hover { background: var(--vp-c-text-2); color: var(--vp-c-bg); }
.im-btn-ghost { background: transparent; color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.im-btn-ghost:hover { border-color: var(--vp-c-text-3); }

/* STATS */
.im-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.im-stats > div { padding: 22px 24px; border-right: 1px solid var(--vp-c-divider); }
.im-stats > div:last-child { border-right: none; }
.im-stats dt { order: 2; margin-top: 4px; font-size: 13px; color: var(--vp-c-text-2); }
.im-stats dd { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: var(--vp-c-text-1); }
.im-stats > div { display: flex; flex-direction: column; }

/* SECTIONS */
.im-section { margin-top: 88px; }
.im-head { margin-bottom: 28px; }
.im-head h2 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

/* CARDS */
.im-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.im-card {
  padding: 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s ease, transform 0.2s ease;
}
.im-card:hover { border-color: var(--vp-c-text-3); transform: translateY(-2px); }
.im-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 18px;
  border-radius: 10px;
  background: var(--im-accent-soft);
  color: var(--im-accent);
}
.im-icon svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.im-card h3 { margin: 0 0 8px; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: var(--vp-c-text-1); }
.im-card p { margin: 0; font-size: 14px; line-height: 1.65; color: var(--vp-c-text-2); }

/* TABLE */
.im-table-wrap { overflow-x: auto; border: 1px solid var(--vp-c-divider); border-radius: 12px; }
.im-table { width: 100%; min-width: 640px; margin: 0; border-collapse: collapse; font-size: 14px; display: table; }
.im-table th, .im-table td { padding: 14px 18px; text-align: left; border: none; border-bottom: 1px solid var(--vp-c-divider); background: transparent; }
.im-table thead th { background: var(--vp-c-bg-soft); font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vp-c-text-2); }
.im-table tbody th { font-weight: 600; color: var(--vp-c-text-1); }
.im-table td { color: var(--vp-c-text-2); }
.im-table tbody tr:last-child th, .im-table tbody tr:last-child td { border-bottom: none; }
.im-table tbody tr:hover td, .im-table tbody tr:hover th { background: var(--vp-c-bg-soft); }

/* FAQ */
.im-faq { display: flex; flex-direction: column; gap: 10px; }
.im-faq details { border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg-soft); transition: border-color 0.15s ease; }
.im-faq details[open] { border-color: var(--vp-c-text-3); }
.im-faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 550;
  color: var(--vp-c-text-1);
  cursor: pointer;
  list-style: none;
}
.im-faq summary::-webkit-details-marker { display: none; }
.im-faq summary::after {
  content: "";
  flex: none;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--vp-c-text-3);
  border-bottom: 2px solid var(--vp-c-text-3);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}
.im-faq details[open] summary::after { transform: rotate(-135deg); }
.im-faq details p { margin: 0; padding: 0 20px 18px; font-size: 14px; line-height: 1.7; color: var(--vp-c-text-2); }

/* CTA */
.im-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 88px;
  padding: 32px 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: linear-gradient(135deg, var(--im-accent-soft), transparent 60%), var(--vp-c-bg-soft);
}
.im-cta h2 { margin: 0 0 4px; padding: 0; border: none; font-size: 22px; font-weight: 650; letter-spacing: -0.02em; color: var(--vp-c-text-1); }
.im-cta p { margin: 0; font-size: 14px; color: var(--vp-c-text-2); }

/* FOOTER */
.im-footer { margin-top: 96px; padding-top: 40px; border-top: 1px solid var(--vp-c-divider); }
.im-foot-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px; }
.im-logo { font-size: 16px; font-weight: 700; letter-spacing: -0.01em; color: var(--vp-c-text-1); }
.im-foot-brand p { max-width: 300px; margin: 10px 0 0; font-size: 13px; line-height: 1.6; color: var(--vp-c-text-2); }
.im-foot-links { display: flex; flex-wrap: wrap; gap: 56px; }
.im-foot-links h4 { margin: 0 0 14px; font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.im-foot-links a { display: block; margin-bottom: 10px; font-size: 13px; color: var(--vp-c-text-2); transition: color 0.15s ease; }
.im-foot-links a:hover { color: var(--vp-c-text-1); }
.im-copy { margin: 40px 0 0; padding-top: 18px; border-top: 1px solid var(--vp-c-divider); font-size: 12px; color: var(--vp-c-text-3); }

@media (max-width: 640px) {
  .im { padding: 0 18px 48px; }
  .im-hero { padding: 64px 0 48px; }
  .im-stats > div { border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
  .im-stats > div:last-child { border-bottom: none; }
  .im-cta { padding: 26px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .im-card, .im-btn, .im-faq summary::after { transition: none; }
  .im-card:hover { transform: none; }
}


/* MOBIL: meniul rămâne fix sus la scroll.
   VitePress îl lasă în fluxul paginii sub 960px; aici îl fixăm doar pe această pagină (html:has(.im)). */
@media (max-width: 959px) {
  html:has(.im) .VPNav { position: fixed; }
  html:has(.im) .VPContent { padding-top: var(--vp-nav-height); }
}
</style>