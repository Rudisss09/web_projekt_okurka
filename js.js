"use strict";

/* =========================================================
   CS2 CASE ODDS CALCULATOR
   MAIN.JS
   ČÁST 1/5
========================================================= */

/* =========================================================
   CS2 ODDS
========================================================= */

const ODDS = {
    milspec: 79.92,
    restricted: 15.98,
    classified: 3.20,
    covert: 0.64,
    knife: 0.26
};

const CASE_PRICE = 2.86;

/* =========================================================
   ITEM DATABASE
========================================================= */

const ITEMS = {
    milspec: [
        "M4A4 | Zubastick",
        "M249 | Bock Blocks",
        "Zeus x27 | Earth Mandala",
        "Glock-18 | Catacombs",
        "FAMAS | Survivor Z",
        "UMP-45 | Briefing",
        "Nova | Exo",
        "MAC-10 | Monkeyflage",
        "MP9 | Hot Rod",
    ],

    restricted: [
        "AK-47 | Slate",
        "AWP | Atheris",
        "Desert Eagle | Light Rail",
        "M4A4 | The Emperor",
        "AWP | Phobos",
        "M4A1-S | Nitro",
        "M4A4 | Griffin ",
        "FAMAS | ZX Spectron",
        "FAMAS | Prime Conspiracy",
        "P90 | Attack Vector",
        "Desert Eagle | Blaze", 
    ],

    classified: [
        "AK-47 | Ice Coaled",
        "USP-S | Cortex",
        "M4A4 | Tooth Fairy",
        "AK-47 | Phantom Disruptor",
        "AWP | Mortis",
        "AK-47 | Point Disarray",
        "AWP | Electric Hive",
        "USP-S | Neo-Noir",
        "M4A4 | Cyber Security",
        "Desert Eagle | Mecha Industries",
        "AK-47 | Crane Flight",
        "FAMAS | Mecha Industries",
        "UMP-45 | Fade",
        "AK-47 | Case Hardened",

    ],

    covert: [
        "AK-47 | Bloodsport",
        "AWP | Hyper Beast",
        "M4A4 | Asiimov",
        "USP-S | Kill Confirmed",
        "P90 | Death by Kitty",
        "Desert Eagle | Code Red",
        "AWP | Medusa",
        "M4A1-S | Hyper Beast",
        "Glock-18 | Gamma Doppler",
        "P250 | See Ya Later",
        "MP7 | Bloodsport",
        "Ak-47 |Redline",
        "AWP | Gungnir",
        "AK-47 | Wild Lotus",
        "AK-47 | Gold Arabesque",
        "AWP | Dragon Lore",
        "M4A1-S | Welcome to the Jungle",
        "Desert Eagle | Ocean Drive",
        "M4A4 | X-Ray",
        "AK-47 | The Empress",
        "AWP | Fade",
        "M4A1-S | Golden Coil",
        "USP-S | Kill Confirmed",


    ],

    knife: [
        "Karambit | Doppler",
        "Butterfly Knife | Fade",
        "M9 Bayonet | Marble Fade",
        "Skeleton Knife | Slaughter",
        "Sport Gloves | Vice",
        "Driver Gloves | Crimson Weave",
        "Shadow Daggers | Rust Coat",
        "Huntsman Knife | Blue Steel",
        "Gut Knife | Tiger Tooth",
        "M9 Bayonet | Ultra Violet",
        "Bayonet | Lore",
        "Gut Knife | Lore",
        "Karambit | Lore",
        "Butterfly Knife | Lore",
        "Shadow Daggers | Lore",
        "Huntsman Knife | Lore",
        "M9 Bayonet | Lore",
        "Bayonet | Fade",
        "Bayonet | Doppler",
        "Bayonet | Marble Fade",
        "Bayonet | Tiger Tooth",
        "Bayonet | Ultraviolet",
        "Gut Knife | Fade",
        "Gut Knife | Doppler",
        "Gut Knife | Marble Fade",
        "Gut Knife | Tiger Tooth",
        "Gut Knife | Ultraviolet",
        "Karambit | Fade",
        "Karambit | Doppler",
        "Karambit | Marble Fade",
        "Karambit | Tiger Tooth",
        "Karambit | Ultraviolet",
        "Butterfly Knife | Doppler",
        "Butterfly Knife | Marble Fade",
        "Specialist Gloves | Crimson Kimono",
        "Specialist Gloves | Pillow Punchers",
        "Specialist Gloves | Mogul",
        "Specialist Gloves | Emerald Web",
        "Sport Gloves | Superconductor",
        "Sport Gloves | Arid",
        "Sport Gloves | Haze",
        "Sport Gloves | Pandora's Box",
        "Driver Gloves | Lunar Weave",
        "Driver Gloves | Crimson Weave",
        "Driver Gloves | King Snake",
        "Driver Gloves | Overtake",
        "Driver Gloves | Racing Green",
        "Shadow Daggers | Fade",
        "Shadow Daggers | Doppler",
        "Shadow Daggers | Marble Fade",
        "Shadow Daggers | Tiger Tooth",
        "Shadow Daggers | Ultraviolet",
        "Huntsman Knife | Fade",
        "Huntsman Knife | Doppler",
        "Huntsman Knife | Marble Fade",
        "Huntsman Knife | Tiger Tooth",
        "Huntsman Knife | Ultraviolet",
    ]
};

/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
    totalOpens: 0,
    totalSpent: 0,
    knives: 0,
    coverts: 0,
    stattrak: 0,
    opensSinceKnife: 0,

    rarityCounts: {
        milspec: 0,
        restricted: 0,
        classified: 0,
        covert: 0,
        knife: 0
    },

    history: []
};

/* =========================================================
   DOM
========================================================= */

const dom = {
    mobileMenu: document.getElementById("mobile-menu"),
    navToggle: document.querySelector(".nav-toggle"),

    calculateBtn: document.getElementById("calculate-btn"),
    resultsOutput: document.getElementById("results-output"),

    numOpens: document.getElementById("num-opens"),
    targetRarity: document.getElementById("target-rarity"),
    budget: document.getElementById("budget"),

    openCaseBtn: document.getElementById("open-case-btn"),
    resetSimBtn: document.getElementById("reset-sim-btn"),

    totalOpens: document.getElementById("total-opens"),
    totalSpent: document.getElementById("total-spent"),
    knivesCount: document.getElementById("knives-count"),
    covertsCount: document.getElementById("coverts-count"),
    stattrakCount: document.getElementById("stattrak-count"),
    lastKnife: document.getElementById("last-knife"),

    historyList: document.getElementById("history-list"),
    historyCount: document.getElementById("history-count"),

    breakdownBars: document.getElementById("breakdown-bars"),

    rollIdle: document.getElementById("roll-idle"),
    rollResult: document.getElementById("roll-result"),

    resultCard: document.getElementById("result-card"),
    resultName: document.getElementById("result-item-name"),
    resultTier: document.getElementById("result-item-tier"),
    resultRarityBar: document.getElementById("result-rarity-bar"),
    resultStatTrak: document.getElementById("result-stattrak")
};

/* =========================================================
   HELPERS
========================================================= */

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function formatMoney(value) {
    return `$${value.toFixed(2)}`;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function percent(value) {
    return `${value.toFixed(2)}%`;
}

/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    if (!dom.navToggle) return;

    dom.navToggle.addEventListener("click", () => {

        const expanded =
            dom.navToggle.getAttribute("aria-expanded") === "true";

        dom.navToggle.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

        if (expanded) {
            dom.mobileMenu.hidden = true;
        } else {
            dom.mobileMenu.hidden = false;
        }
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            dom.mobileMenu.hidden = true;

            dom.navToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}

/* =========================================================
   PROBABILITY BARS ANIMATION
========================================================= */

function animateProbabilityBars() {

    const bars =
        document.querySelectorAll(".bar-fill");

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const target =
                    entry.target.dataset.target;

                entry.target.style.width =
                    `${target}%`;

                observer.unobserve(entry.target);
            });

        }, {
            threshold: 0.3
        });

    bars.forEach(bar => observer.observe(bar));
}

/* =========================================================
   FADE-IN SECTIONS
========================================================= */

function initSectionAnimations() {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("fade-in-section");
    });

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15
        });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    animateProbabilityBars();

    initSectionAnimations();

});

/* =========================================================
   CALCULATOR
========================================================= */

const RARITY_DATA = {
    milspec: {
        chance: 79.92,
        name: "Mil-Spec"
    },

    restricted: {
        chance: 15.98,
        name: "Restricted"
    },

    classified: {
        chance: 3.20,
        name: "Classified"
    },

    covert: {
        chance: 0.64,
        name: "Covert"
    },

    knife: {
        chance: 0.26,
        name: "Knife / Gloves"
    },

    "stattrak-covert": {
        chance: 0.064,
        name: "StatTrak™ Covert"
    },

    "stattrak-knife": {
        chance: 0.026,
        name: "StatTrak™ Knife"
    }
};

/* =========================================================
   PROBABILITY FORMULAS
========================================================= */

/*
    Šance získat alespoň jeden drop:

    P = 1 - (1 - p)^n
*/

function calculateAtLeastOne(probability, opens) {

    const p = probability / 100;

    return (
        1 - Math.pow(1 - p, opens)
    ) * 100;
}

/*
    Očekávaný počet dropů
*/

function calculateExpected(probability, opens) {

    const p = probability / 100;

    return opens * p;
}

/*
    Kolik otevření je průměrně potřeba
*/

function averageOpens(probability) {

    const p = probability / 100;

    return 1 / p;
}

/* =========================================================
   RESULT HTML
========================================================= */

function createResultBlock(
    label,
    value,
    subtext,
    type = ""
) {

    return `
        <div class="result-block ${type}">
            <div class="result-label">
                ${label}
            </div>

            <div class="result-value">
                ${value}
            </div>

            ${
                subtext
                    ? `<div class="result-sub">${subtext}</div>`
                    : ""
            }
        </div>
    `;
}

/* =========================================================
   CALCULATE
========================================================= */

function runCalculation() {

    const opens =
        clamp(
            parseInt(dom.numOpens.value) || 1,
            1,
            100000
        );

    const rarity =
        dom.targetRarity.value;

    const budget =
        parseFloat(dom.budget.value) || 0;

    const data =
        RARITY_DATA[rarity];

    const probability =
        data.chance;

    const chance =
        calculateAtLeastOne(
            probability,
            opens
        );

    const expected =
        calculateExpected(
            probability,
            opens
        );

    const avgOpens =
        averageOpens(probability);

    const estimatedCost =
        avgOpens * CASE_PRICE;

    const affordableCases =
        budget > 0
            ? Math.floor(
                budget / CASE_PRICE
              )
            : 0;

    const budgetChance =
        budget > 0
            ? calculateAtLeastOne(
                probability,
                affordableCases
              )
            : null;

    let html = "";

    html += createResultBlock(
        "Šance získat alespoň 1×",
        percent(chance),
        `${data.name} během ${opens} otevření`,
        chance >= 50
            ? "success"
            : "danger"
    );

    html += createResultBlock(
        "Očekávaný počet dropů",
        expected.toFixed(2),
        "Statistický průměr",
        "info"
    );

    html += createResultBlock(
        "Průměrně potřebných otevření",
        Math.round(avgOpens),
        `Pro získání ${data.name}`
    );

    html += createResultBlock(
        "Průměrná cena",
        formatMoney(estimatedCost),
        "Dlouhodobý statistický průměr"
    );

    if (budget > 0) {

        html += createResultBlock(
            "Šance podle rozpočtu",
            percent(budgetChance),
            `${affordableCases} beden za ${formatMoney(budget)}`,
            "success"
        );
    }

    dom.resultsOutput.innerHTML = html;
}

/* =========================================================
   BUTTON EVENTS
========================================================= */

function initCalculator() {

    if (!dom.calculateBtn) return;

    dom.calculateBtn.addEventListener(
        "click",
        runCalculation
    );

    dom.numOpens.addEventListener(
        "keydown",
        e => {

            if (e.key === "Enter") {
                runCalculation();
            }
        }
    );

    dom.budget.addEventListener(
        "keydown",
        e => {

            if (e.key === "Enter") {
                runCalculation();
            }
        }
    );
}

/* =========================================================
   AUTO CALCULATE FIRST LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initCalculator();

        setTimeout(
            runCalculation,
            300
        );
    }
);

/* =========================================================
   SIMULATOR
========================================================= */

let currentOpenCount = 1;

/* =========================================================
   PRESET BUTTONS
========================================================= */

function initSimulatorPresets() {

    const buttons =
        document.querySelectorAll(
            ".sim-preset-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                    btn.setAttribute(
                        "aria-pressed",
                        "false"
                    );
                });

                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );

                currentOpenCount =
                    Number(
                        button.dataset.count
                    );
            }
        );
    });
}

/* =========================================================
   RARITY GENERATOR
========================================================= */

/*
   Reálné CS2 odds

   Knife       0.26%
   Covert      0.64%
   Classified  3.20%
   Restricted 15.98%
   MilSpec    79.92%
*/

function rollRarity() {

    const roll =
        Math.random() * 100;

    if (roll <= 0.26) {
        return "knife";
    }

    if (roll <= 0.90) {
        return "covert";
    }

    if (roll <= 4.10) {
        return "classified";
    }

    if (roll <= 20.08) {
        return "restricted";
    }

    return "milspec";
}

/* =========================================================
   STATTRAK
========================================================= */

function rollStatTrak() {

    return Math.random() < 0.10;
}

/* =========================================================
   ITEM GENERATION
========================================================= */

function generateItem() {

    const rarity =
        rollRarity();

    const stattrak =
        rollStatTrak();

    const item =
        randomItem(
            ITEMS[rarity]
        );

    return {
        rarity,
        stattrak,
        name: item
    };
}

/* =========================================================
   RARITY COLORS
========================================================= */

function getRarityColor(rarity) {

    switch (rarity) {

        case "milspec":
            return "var(--milspec)";

        case "restricted":
            return "var(--restricted)";

        case "classified":
            return "var(--classified)";

        case "covert":
            return "var(--covert)";

        case "knife":
            return "var(--knife)";
    }

    return "white";
}

function getGlowClass(rarity) {

    switch (rarity) {

        case "milspec":
            return "glow-milspec";

        case "restricted":
            return "glow-restricted";

        case "classified":
            return "glow-classified";

        case "covert":
            return "glow-covert";

        case "knife":
            return "glow-knife";
    }

    return "";
}

function getTierName(rarity) {

    switch (rarity) {

        case "milspec":
            return "MIL-SPEC";

        case "restricted":
            return "RESTRICTED";

        case "classified":
            return "CLASSIFIED";

        case "covert":
            return "COVERT";

        case "knife":
            return "KNIFE / GLOVES";
    }

    return rarity;
}

/* =========================================================
   DISPLAY RESULT
========================================================= */

function displayResult(item) {

    dom.rollIdle.hidden = true;

    dom.rollResult.hidden = false;

    dom.resultName.textContent =
        item.name;

    dom.resultTier.textContent =
        getTierName(item.rarity);

    dom.resultRarityBar.style.background =
        getRarityColor(item.rarity);

    dom.resultCard.className =
        "result-item-card";

    dom.resultCard.classList.add(
        getGlowClass(item.rarity)
    );

    if (item.stattrak) {

        dom.resultStatTrak.hidden =
            false;

    } else {

        dom.resultStatTrak.hidden =
            true;
    }
}

/* =========================================================
   OPEN CASE
========================================================= */

function openSingleCase() {

    const item =
        generateItem();

    updateStatistics(item);

    displayResult(item);

    addHistoryItem(item);

    return item;
}

/* =========================================================
   MULTI OPEN
========================================================= */

async function openMultipleCases(count) {

    dom.openCaseBtn.disabled = true;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const item =
            openSingleCase();

        /*
           Animace pouze
           při menších počtech
        */

        if (count <= 10) {

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        180
                    )
            );
        }
    }

    dom.openCaseBtn.disabled =
        false;
}

/* =========================================================
   OPEN BUTTON
========================================================= */

function initOpenCaseButton() {

    if (!dom.openCaseBtn) return;

    dom.openCaseBtn.addEventListener(
        "click",
        async () => {

            await openMultipleCases(
                currentOpenCount
            );
        }
    );
}

/* =========================================================
   START SIMULATOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initSimulatorPresets();

        initOpenCaseButton();
    }
);

/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics(item) {

    state.totalOpens++;
    state.totalSpent += CASE_PRICE;

    state.opensSinceKnife++;

    state.rarityCounts[item.rarity]++;

    if (item.stattrak) {
        state.stattrak++;
    }

    if (item.rarity === "covert") {
        state.coverts++;
    }

    if (item.rarity === "knife") {

        state.knives++;

        state.opensSinceKnife = 0;
    }

    renderStatistics();
}

/* =========================================================
   RENDER STATS
========================================================= */

function renderStatistics() {

    dom.totalOpens.textContent =
        state.totalOpens.toLocaleString();

    dom.totalSpent.textContent =
        formatMoney(state.totalSpent);

    dom.knivesCount.textContent =
        state.knives;

    dom.covertsCount.textContent =
        state.coverts;

    dom.stattrakCount.textContent =
        state.stattrak;

    dom.lastKnife.textContent =
        state.opensSinceKnife;

    renderBreakdown();
}

/* =========================================================
   BREAKDOWN GRAPH
========================================================= */

function renderBreakdown() {

    const total =
        state.totalOpens;

    if (total === 0) {

        dom.breakdownBars.innerHTML = "";

        return;
    }

    const rarities = [
        {
            key: "milspec",
            color: "var(--milspec)"
        },
        {
            key: "restricted",
            color: "var(--restricted)"
        },
        {
            key: "classified",
            color: "var(--classified)"
        },
        {
            key: "covert",
            color: "var(--covert)"
        },
        {
            key: "knife",
            color: "var(--knife)"
        }
    ];

    dom.breakdownBars.innerHTML =
        rarities
            .map(rarity => {

                const count =
                    state.rarityCounts[
                        rarity.key
                    ];

                const percent =
                    (count / total) * 100;

                return `
                    <div
                        class="breakdown-segment"
                        title="${rarity.key}: ${count}"
                        style="
                            width:${percent}%;
                            background:${rarity.color};
                        "
                    ></div>
                `;
            })
            .join("");
}

/* =========================================================
   HISTORY
========================================================= */

function addHistoryItem(item) {

    state.history.unshift(item);

    /*
       posledních 100 záznamů
    */

    if (state.history.length > 100) {

        state.history.pop();
    }

    renderHistory();
}

/* =========================================================
   HISTORY BADGES
========================================================= */

function rarityBadgeColor(rarity) {

    switch (rarity) {

        case "milspec":
            return "var(--milspec)";

        case "restricted":
            return "var(--restricted)";

        case "classified":
            return "var(--classified)";

        case "covert":
            return "var(--covert)";

        case "knife":
            return "var(--knife)";
    }

    return "#fff";
}

/* =========================================================
   RENDER HISTORY
========================================================= */

function renderHistory() {

    dom.historyCount.textContent =
        `(${state.history.length})`;

    if (state.history.length === 0) {

        dom.historyList.innerHTML =
            `
            <p class="history-empty">
                Zatím žádná otevření...
            </p>
            `;

        return;
    }

    dom.historyList.innerHTML =
        state.history
            .map(item => {

                return `
                <div class="history-item">

                    <span
                        class="history-dot"
                        style="
                        background:${rarityBadgeColor(
                            item.rarity
                        )};
                        "
                    ></span>

                    <span class="history-name">
                        ${item.name}
                    </span>

                    ${
                        item.stattrak
                        ?
                        `
                        <span
                            class="history-badge"
                            style="
                            background:rgba(207,106,50,.2);
                            color:var(--stattrak);
                            border:1px solid var(--stattrak);
                            "
                        >
                            ST
                        </span>
                        `
                        :
                        ""
                    }

                </div>
                `;
            })
            .join("");
}

/* =========================================================
   RESET SIMULATOR
========================================================= */

function resetSimulator() {

    state.totalOpens = 0;
    state.totalSpent = 0;

    state.knives = 0;
    state.coverts = 0;
    state.stattrak = 0;

    state.opensSinceKnife = 0;

    state.history = [];

    state.rarityCounts = {
        milspec: 0,
        restricted: 0,
        classified: 0,
        covert: 0,
        knife: 0
    };

    dom.rollIdle.hidden = false;

    dom.rollResult.hidden = true;

    renderStatistics();

    renderHistory();
}

/* =========================================================
   RESET BUTTON
========================================================= */

function initResetButton() {

    if (!dom.resetSimBtn) return;

    dom.resetSimBtn.addEventListener(
        "click",
        resetSimulator
    );
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderStatistics();

        renderHistory();

        initResetButton();
    }
);

/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEY =
    "cs2_case_calculator_save";

function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );

    } catch (error) {

        console.error(
            "Chyba ukládání:",
            error
        );
    }
}

function loadData() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!saved) return;

        const data =
            JSON.parse(saved);

        Object.assign(
            state,
            data
        );

        renderStatistics();
        renderHistory();

    } catch (error) {

        console.error(
            "Chyba načítání:",
            error
        );
    }
}

/* =========================================================
   AUTO SAVE
========================================================= */

function setupAutoSave() {

    setInterval(() => {

        saveData();

    }, 5000);

    window.addEventListener(
        "beforeunload",
        saveData
    );
}

/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

class Particle {

    constructor(canvas) {

        this.canvas = canvas;

        this.reset();
    }

    reset() {

        this.x =
            Math.random() *
            this.canvas.width;

        this.y =
            Math.random() *
            this.canvas.height;

        this.size =
            Math.random() * 2 + 1;

        this.speedX =
            (Math.random() - 0.5) * 0.3;

        this.speedY =
            (Math.random() - 0.5) * 0.3;

        this.alpha =
            Math.random() * 0.5 + 0.1;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > this.canvas.width ||
            this.y < 0 ||
            this.y > this.canvas.height
        ) {
            this.reset();
        }
    }

    draw(ctx) {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(232,160,32,${this.alpha})`;

        ctx.fill();
    }
}

/* =========================================================
   PARTICLE SYSTEM
========================================================= */

function initParticles() {

    const canvas =
        document.getElementById(
            "bg-canvas"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );

    const particles = [];

    const particleCount =
        window.innerWidth > 1000
            ? 80
            : 40;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new Particle(canvas)
        );
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.update();

            particle.draw(ctx);
        });

        requestAnimationFrame(
            animate
        );
    }

    animate();
}

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        e => {

            if (
                e.target.tagName ===
                "INPUT"
            ) return;

            if (
                e.key.toLowerCase() ===
                "o"
            ) {

                dom.openCaseBtn.click();
            }

            if (
                e.key.toLowerCase() ===
                "r"
            ) {

                resetSimulator();
            }
        }
    );
}

/* =========================================================
   FUN FACTS
========================================================= */

function checkMilestones() {

    if (
        state.totalOpens === 100
    ) {

        console.log(
            "🎉 100 otevřených beden!"
        );
    }

    if (
        state.totalOpens === 1000
    ) {

        console.log(
            "🎉 1000 otevřených beden!"
        );
    }

    if (
        state.knives === 1
    ) {

        console.log(
            "🔪 První nůž!"
        );
    }
}

/* =========================================================
   OVERRIDE UPDATE STATISTICS
========================================================= */

const originalUpdateStatistics =
    updateStatistics;

updateStatistics = function(item) {

    originalUpdateStatistics(item);

    checkMilestones();

    saveData();
};

/* =========================================================
   APPLICATION START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadData();

        setupAutoSave();

        initParticles();

        initKeyboardShortcuts();

        console.log(`
==================================
 CS2 CASE ODDS CALCULATOR
==================================
 Loaded successfully.
==================================
        `);
    }
);