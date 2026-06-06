⬡ CS2 Case Odds Calculator

Ročníková práce z předmětu Webové technologie (2. ročník)

Webová aplikace pro výpočet a simulaci pravděpodobností otevírání beden ve hře Counter-Strike 2. Umožňuje hráčům zjistit reálné šance na získání skinů různých raritet, vizualizovat statistiky a bezplatně simulovat otevírání beden bez jakéhokoli rizika.
🔗 Živý web: https://yourusername.github.io/cs2-case-calculator/
📦 Repozitář: https://github.com/yourusername/cs2-case-calculator

📋 Obsah

Použité technologie
Adresářová struktura
Technický rozbor

Výkon (Performance)
SEO
Přístupnost (Accessibility)
Sociální sítě
UI/UX
AI Integrace


AI Deník
Instalace a spuštění
Galerie


🛠️ Použité technologie
TechnologieVerze / PopisHTML5Sémantické značky, ARIA atributy, strukturovaná data (JSON-LD)CSS3Flexbox, CSS Grid, Custom Properties, animace, Media QueriesJavaScriptVanilla ES6+ (třídy, arrow funkce, destructuring, Canvas API, Intersection Observer API)Google FontsRajdhani, Share Tech Mono, Barlow CondensedIDEVisual Studio Code 1.89NasazeníGitHub Pages

⚠️ Bez frameworků: Projekt záměrně nepoužívá žádné JS frameworky (React, Vue, Angular) ani CSS frameworky (Bootstrap, Tailwind). Vše je napsáno ručně od základu.


📁 Adresářová struktura
cs2-case-calculator/
│
├── index.html          # Hlavní (a jediná) HTML stránka
├── README.md           # Tato dokumentace
├── sitemap.xml         # Sitemap pro vyhledávače
├── robots.txt          # Instrukce pro crawlery
│
├── css/
│   └── style.css       # Veškeré styly (Mobile First, CSS proměnné)
│
├── js/
│   └── main.js         # Veškerá logika (kalkulačka, simulátor, animace)
│
└── images/
    └── og-image.png    # Náhledový obrázek pro sdílení na sociálních sítích
Projekt je záměrně navržen jako single-page application bez build toolů – stačí otevřít index.html v prohlížeči nebo přes Live Server.

🔧 Technický rozbor
1. Výkon (Performance)
Teoretický popis:
Výkon webu ovlivňuje uživatelský zážitek i SEO hodnocení. Klíčové metriky jsou Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS) a First Input Delay (FID). Minimalizací HTTP požadavků, správným načítáním fontů a odkládáním JavaScriptu lze dosáhnout vysokého Lighthouse skóre.
Řešení v projektu:
html<!-- Preconnect pro rychlejší připojení k Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Script načítán s atributem defer – nablokuje renderování HTML -->
<script src="js/main.js" defer></script>
Atribut defer zajistí, že prohlížeč nemusí čekat na zpracování JS při sestavování DOMu. preconnect vytvoří TCP/TLS spojení s fontovým serverem dopředu, čímž eliminuje latenci.
css/* Lazy loading animací přes Intersection Observer v JS */
.fade-in-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}
javascript// Intersection Observer – sekce se animují až při vstupu do viewportu
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Odpojení po první animaci
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
Tímto způsobem se CSS animace spouštějí jen pro prvky viditelné na obrazovce, nikoli pro celou stránku najednou, což šetří výkon při načtení.

2. SEO
Teoretický popis:
Search Engine Optimization zajišťuje, že vyhledávače stránku správně indexují a zobrazují v relevantních výsledcích. Klíčové jsou sémantické HTML tagy, meta tagy, strukturovaná data (JSON-LD) a technické soubory jako sitemap.xml a robots.txt.
Řešení v projektu:
html<!-- Základní meta tagy -->
<meta name="description" content="CS2 Case Opening Odds Calculator – zjisti pravděpodobnost získání skinů z CS2 beden. Vypočítej šanci na Covert, StatTrak, Knife a další vzácné předměty." />
<meta name="keywords" content="CS2, Counter-Strike 2, case calculator, bedna, šance, odds, knife, StatTrak, Covert, skin" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://yourusername.github.io/cs2-case-calculator/" />
html<!-- Strukturovaná data JSON-LD – Google zobrazí rozšířené výsledky -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CS2 Case Odds Calculator",
  "description": "Kalkulačka pravděpodobností pro CS2 bedny...",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "url": "https://yourusername.github.io/cs2-case-calculator/"
}
</script>
html<!-- Sémantické HTML – správná hierarchie nadpisů a role -->
<header role="banner">
  <nav role="navigation" aria-label="Hlavní navigace">...</nav>
</header>
<main role="main">
  <section aria-labelledby="calc-title">
    <h2 id="calc-title">Pravděpodobnostní Kalkulačka</h2>
  </section>
</main>
<footer role="contentinfo">...</footer>
Správná sémantika pomáhá crawlerům pochopit strukturu stránky. JSON-LD data mohou vést ke zobrazení tzv. rich snippets ve výsledcích vyhledávání.

3. Přístupnost (Accessibility)
Teoretický popis:
Přístupnost (a11y) zajišťuje, že web mohou používat i lidé se zdravotním postižením – slabozrací, nevidomí (čtečky obrazovky) nebo lidé ovládající web pouze klávesnicí. Standard WCAG 2.1 úrovně AA definuje konkrétní požadavky.
Řešení v projektu:
html<!-- Skip link – přeskočení navigace pro klávesnicové uživatele -->
<a href="#main-content" class="skip-link">Přeskočit na hlavní obsah</a>
css/* Skip link je viditelný pouze při focusu (klávesnice) */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--accent);
  color: #000;
  padding: 8px 16px;
  transition: top 0.25s ease;
}
.skip-link:focus {
  top: 16px; /* Zobrazí se až při focusu Tab klávesou */
}
html<!-- ARIA atributy pro dynamický obsah -->
<div
  class="calc-results card"
  aria-live="polite"
  aria-atomic="true"
  role="region"
  aria-label="Výsledky kalkulačky"
>
  ...
</div>

<!-- Progress bar se správnými ARIA atributy -->
<div
  class="bar-track"
  role="progressbar"
  aria-valuenow="79.92"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Mil-Spec 79.92%"
>
css/* Viditelný focus styl pro klávesnicovou navigaci (WCAG 2.4.7) */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Podpora pro uživatele preferující redukci pohybu (WCAG 2.3.3) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
aria-live="polite" informuje čtečky obrazovky o dynamicky měnícím se obsahu (výsledky kalkulačky, simulátor) bez přerušení aktuálního čtení.

4. Sociální sítě
Teoretický popis:
Open Graph protokol (Facebook, LinkedIn) a Twitter/X Cards definují, jak se odkaz zobrazí při sdílení na sociálních sítích – náhledový obrázek, titulek a popis. Bez těchto tagů by sdílení zobrazovalo náhodný obsah stránky.
Řešení v projektu:
html<!-- Open Graph – Facebook, LinkedIn, WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:title" content="CS2 Case Odds Calculator" />
<meta property="og:description" content="Zjisti přesnou pravděpodobnost získání skinů z CS2 beden. Kalkulačka šancí pro nože, StatTrak a vzácné skiny." />
<meta property="og:image" content="https://yourusername.github.io/cs2-case-calculator/images/og-image.png" />
<meta property="og:url" content="https://yourusername.github.io/cs2-case-calculator/" />
<meta property="og:site_name" content="CS2 Case Odds Calculator" />
<meta property="og:locale" content="cs_CZ" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="CS2 Case Odds Calculator" />
<meta name="twitter:description" content="Zjisti přesnou pravděpodobnost získání skinů z CS2 beden." />
<meta name="twitter:image" content="https://yourusername.github.io/cs2-case-calculator/images/og-image.png" />
Typ summary_large_image pro Twitter Cards zajistí zobrazení velkého náhledového obrázku (minimálně 600×314 px), což výrazně zvyšuje míru prokliku (CTR) sdíleného příspěvku. OG obrázek by měl mít rozměry 1200×630 px.

5. UI/UX
Teoretický popis:
Mobile First přístup znamená, že nejprve designujeme pro nejmenší obrazovky a poté přidáváme styly pro větší zařízení pomocí min-width media queries. CSS Grid a Flexbox zajišťují adaptivní rozvržení bez nutnosti JS. Typografický rytmus, kontrast a vizuální hierarchie zlepšují čitelnost a použitelnost.
Řešení v projektu:
css/* Mobile First – výchozí je mobilní layout (1 sloupec) */
.calculator-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobilní: 1 sloupec */
  gap: 24px;
}

/* Tablet a výše: 2 sloupce vedle sebe */
@media (min-width: 768px) {
  .calculator-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Simulátor: složitější CSS Grid layout pro desktop */
@media (min-width: 900px) {
  .simulator-wrapper {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
  .case-roll-area { grid-column: 2; grid-row: 1 / 3; }
  .sim-history  { grid-column: 1 / 3; }
}
css/* CSS proměnné (Design Tokens) – konzistentní design system */
:root {
  --accent: #e8a020;           /* Primární akcent */
  --font-display: 'Rajdhani';  /* Font pro nadpisy */
  --gap-lg: 24px;              /* Konzistentní spacing */
  --radius-lg: 12px;           /* Zaoblení karet */
  --transition: 0.25s ease;    /* Rychlost přechodů */
}
css/* Fluid typography pomocí clamp() – plynulé škálování bez breakpointů */
.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
}
clamp(min, preferred, max) zajistí, že nadpis plynule roste s šířkou viewportu – žádné skokové změny velikosti písma na breakpointech.

6. AI Integrace
Teoretický popis:
Umělá inteligence byla v projektu využita jako nástroj pro urychlení vývoje, generování obsahu a ověřování správnosti implementací. AI nenahradila kreativní rozhodnutí ani kód jako celek, ale sloužila jako inteligentní asistent – podobně jako zkušený kolega, kterého se lze zeptat.
Konkrétní příklady využití:

Generování herního obsahu: AI vygenerovala seznam realisticky znějících CS2 skinů pro simulátor (AWP | Dragon Lore, AK-47 | Fire Serpent apod.) a jejich příslušnost k raritním tierům.
Kontrola přístupnosti: AI prošla HTML strukturu a navrhla chybějící ARIA atributy a upozornila na potenciálně nízký kontrast barev.
Optimalizace kódu: AI navrhla použití Intersection Observer API jako výkonnější alternativu ke scroll event listeneru.
Dokumentace: Tento README byl strukturován a sepsán ve spolupráci s AI, která navrhla osnovu a pomohla s formulací technických popisů.

Kompletní přehled promptů je v sekci AI Deník níže.

🤖 AI Deník
Chronologický přehled zajímavých promptů použitých během vývoje projektu a jejich přínos.

Prompt 1 – Zahájení projektu a architektura

"Chci vytvořit školní webovou prezentaci o CS2 bednách jako kalkulačku pravděpodobností. Téma je gaming. Napiš mi kompletní HTML5 strukturu se správnou sémantikou, ARIA atributy a SEO meta tagy. Bez frameworků, čisté HTML."

Co AI přinesla: Vygenerovala kompletní sémantický skelet stránky se správnou hierarchií nadpisů (h1 → h2 → h3), role atributy, skip linkem pro přístupnost a všemi potřebnými meta tagy včetně Open Graph a Twitter Cards. Ušetřila cca 2 hodiny psaní boilerplate kódu.

Prompt 2 – Design system a CSS proměnné

"Vytvoř CSS design system pro dark-themed gaming web inspirovaný CS2 estetikou. Potřebuji paletu barev pro jednotlivé rarity (Mil-Spec, Restricted, Classified, Covert, Knife), typografii a spacing systém jako CSS custom properties."

Co AI přinesla: Navrhla kompletní sadu CSS proměnných (--milspec: #4b69ff, --covert: #eb4b4b atd.) odpovídající skutečným barvám CS2 raritet. Doporučila fonty Rajdhani a Share Tech Mono jako gaming-friendly alternativy s dobrou čitelností. Přidala --transition a --radius tokeny pro konzistentnost.

Prompt 3 – Matematická logika kalkulačky

"Napiš JavaScript funkci, která vypočítá pravděpodobnost získání alespoň jednoho předmětu dané rarity při N otevřeních bedny. Použij správný pravděpodobnostní vzorec (binomické rozdělení / komplementární pravděpodobnost)."

Co AI přinesla: Vysvětlila rozdíl mezi naivním přístupem (p * n) a správným výpočtem pomocí komplementární pravděpodobnosti P(alespoň 1) = 1 - (1 - p)^n. Tento vzorec je klíčový – pro 100 otevření a šanci 0.26% dává výsledek 22.8%, ne 26%. Bez AI bych pravděpodobně použil nesprávný vzorec.
javascript// Výsledný vzorec navržený AI:
const probAtLeastOne = 1 - Math.pow(1 - probability, numOpens);

Prompt 4 – Obsah simulátoru (herní skiny)

"Vygeneruj JSON seznam 30 CS2 skinů rozdělených do raritet (milspec, restricted, classified, covert, knife) se jmény ve formátu 'Zbraň | Název'. Skiny by měly znít autenticky jako skutečné CS2 skiny."

Co AI přinesla: Vygenerovala věrohodně znějící skins jako AK-47 | Redline, M4A4 | Howl nebo Karambit | Tiger Tooth. Výstup byl rovnou ve formátu JSON použitelném v kódu. Ruční vymýšlení 30 názvů by zabralo zbytečně mnoho času.

Prompt 5 – Kontrola přístupnosti

"Projdi tuto HTML strukturu a zkontroluj ji z pohledu WCAG 2.1 AA standardů. Na co si dát pozor? Co mi chybí?"

Co AI přinesla: Upozornila na chybějící aria-pressed u toggle tlačítek simulátoru, navrhla přidat aria-live="assertive" na oblast výsledku simulátoru (okamžité oznámení čtečce), a připomněla, že <table> potřebuje <caption> nebo aria-describedby pro screenreadery.

Prompt 6 – Canvas animace pozadí

"Napiš Vanilla JS Canvas animaci pro dark gaming background – floating particles, které budou propojeny linkami při blízkosti. Optimalizuj pro výkon pomocí requestAnimationFrame."

Co AI přinesla: Vygenerovala kompletní particle systém s requestAnimationFrame smyčkou, výpočtem vzdáleností a plynulým fade-in/out linek. Připomněla důležité optimalizace: clearRect pouze na změněné oblasti, omezení počtu částic na základě velikosti viewportu a pauzu animace při document.hidden.

💻 Instalace a spuštění
Možnost A – Live Server (doporučeno)

Naklonuj repozitář:

bash   git clone https://github.com/yourusername/cs2-case-calculator.git
   cd cs2-case-calculator

Otevři složku ve Visual Studio Code
Nainstaluj rozšíření Live Server (Ritwick Dey) pokud ho ještě nemáš
Klikni pravým tlačítkem na index.html → "Open with Live Server"
Prohlížeč se otevře na http://127.0.0.1:5500

Možnost B – Přímé otevření
Stačí otevřít soubor index.html přímo v prohlížeči (dvojklik). Pozor: Canvas animace a některé funkce mohou být omezeny kvůli CORS při přímém otevření bez serveru.
Možnost C – GitHub Pages (živý web)
Web je automaticky nasazen přes GitHub Pages při každém push do větve main. Dostupný na adrese ve hlavičce tohoto README.

🖼️ Galerie

Screenshoty jsou orientační – nahraď je skutečnými záběry svého webu.

Desktop – Hero sekce
[Screenshot: Celá hero sekce s 3D animací bedny, statistikami a CTA tlačítkem]
Doporučené rozlišení: 1920×1080
Desktop – Kalkulačka
[Screenshot: Sekce kalkulačky s inputy vlevo a výsledky vpravo]
Doporučené rozlišení: 1440×900
Desktop – Simulátor
[Screenshot: Simulátor s výslednou kartou skinu, statistikami a historií]
Doporučené rozlišení: 1440×900
Mobile – Hero + Navigace
[Screenshot: Mobilní zobrazení hero sekce, hamburger menu]
Doporučené rozlišení: 390×844 (iPhone 14)
Mobile – Kalkulačka
[Screenshot: Kalkulačka v mobilním 1-sloupcovém layoutu]
Doporučené rozlišení: 390×844
Lighthouse skóre
[Screenshot z Chrome DevTools Lighthouse reportu]
Cílové hodnoty:
  Performance:    90+
  Accessibility:  95+
  Best Practices: 90+
  SEO:            100

📜 Licence
Projekt byl vytvořen jako školní ročníková práce. Jedná se o neoficiální fanouškovský nástroj bez vztahu ke společnosti Valve Corporation. Counter-Strike 2 a veškeré herní prvky jsou majetkem Valve Corporation.

Vytvořeno s ❤️ a spoustou otevřených beden (virtuálních) | 2025Share
