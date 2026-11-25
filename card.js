// ===== Données du jeu : raretés et cartes =====
// Modifie ici les taux et les cartes, toutes les pages en profitent.

const RARETES = {
  rare:       { label: "Rare",       couleur: "#4aa3ff", taux: 60 },
  super_rare: { label: "Super rare", couleur: "#3ddc84", taux: 25 },
  epique:     { label: "Épique",     couleur: "#b06bff", taux: 10 },
  mythique:   { label: "Mythique",   couleur: "#ff4d6d", taux: 4 },
  legendaire: { label: "Légendaire", couleur: "#ffc933", taux: 1 }
};

const ORDRE = ["rare", "super_rare", "epique", "mythique", "legendaire"];

const CARTES = [
  // Rares
  { id: 1,  nom: "Gobelin farceur",   rarete: "rare",       icone: "🧌", atk: 2, def: 1, desc: "Il cache toujours tes clés." },
  { id: 2,  nom: "Renard des brumes", rarete: "rare",       icone: "🦊", atk: 3, def: 1, desc: "Invisible dans le brouillard." },
  { id: 3,  nom: "Lanterne vivante",  rarete: "rare",       icone: "🏮", atk: 1, def: 3, desc: "Elle éclaire les couloirs sombres." },
  { id: 4,  nom: "Champignon garde",  rarete: "rare",       icone: "🍄", atk: 2, def: 2, desc: "Petit mais têtu." },
  // Super rares
  { id: 5,  nom: "Chevalier d'argent", rarete: "super_rare", icone: "🛡️", atk: 4, def: 5, desc: "Son armure ne rouille jamais." },
  { id: 6,  nom: "Sirène des récifs",  rarete: "super_rare", icone: "🧜", atk: 5, def: 3, desc: "Son chant hypnotise les marins." },
  { id: 7,  nom: "Golem de mousse",    rarete: "super_rare", icone: "🗿", atk: 3, def: 6, desc: "Il dort depuis mille ans." },
  { id: 8,  nom: "Hibou lunaire",      rarete: "super_rare", icone: "🦉", atk: 4, def: 4, desc: "Il voit ce que les autres ignorent." },
  // Épiques
  { id: 9,  nom: "Dragonnet de braise",   rarete: "epique", icone: "🐲", atk: 7, def: 5, desc: "Son souffle fait fondre l'acier." },
  { id: 10, nom: "Sorcière des tempêtes", rarete: "epique", icone: "🧙", atk: 8, def: 4, desc: "Elle chevauche la foudre." },
  { id: 11, nom: "Phénix naissant",       rarete: "epique", icone: "🔥", atk: 6, def: 6, desc: "Il renaît toujours de ses cendres." },
  // Mythiques
  { id: 12, nom: "Kraken abyssal",  rarete: "mythique", icone: "🦑", atk: 10, def: 9,  desc: "Les océans tremblent à son réveil." },
  { id: 13, nom: "Licorne astrale", rarete: "mythique", icone: "🦄", atk: 9,  def: 10, desc: "Sa corne guide les étoiles." },
  { id: 14, nom: "Roi des ombres",  rarete: "mythique", icone: "👑", atk: 11, def: 8,  desc: "Son royaume n'a pas de lumière." },
  // Légendaires
  { id: 15, nom: "Dragon du Chaos", rarete: "legendaire", icone: "🐉", atk: 15, def: 12, desc: "Né avant le premier jour." },
  { id: 16, nom: "Titan du Temps",  rarete: "legendaire", icone: "⏳", atk: 13, def: 15, desc: "Il plie les secondes à sa volonté." }
];

// ===== Tirage =====

// Choisit une rareté selon les taux. Si "minimum" est donné (ex. "super_rare"),
// on ne peut pas tomber en dessous.
function tirerRarete(minimum) {
  const depart = minimum ? ORDRE.indexOf(minimum) : 0;
  const possibles = ORDRE.slice(depart);
  const total = possibles.reduce((s, r) => s + RARETES[r].taux, 0);
  let n = Math.random() * total;
  for (const r of possibles) {
    n -= RARETES[r].taux;
    if (n < 0) return r;
  }
  return possibles[possibles.length - 1];
}

function tirerCarte(rarete) {
  const pool = CARTES.filter(c => c.rarete === rarete);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===== Affichage =====

// Crée l'élément HTML d'une carte. Si "retournee" est vrai, la face est visible.
function creerCarteHTML(carte, retournee = false) {
  const r = RARETES[carte.rarete];
  const el = document.createElement("div");
  el.className = "carte r-" + carte.rarete + (retournee ? " retournee" : "");
  el.style.setProperty("--c", r.couleur);
  el.innerHTML = `
    <div class="inner">
      <div class="dos">✦</div>
      <div class="face">
        <div class="rarete">${r.label}</div>
        <div class="icone">${carte.icone}</div>
        <div class="nom">${carte.nom}</div>
        <div class="stats"><span>⚔️ ${carte.atk}</span><span>🛡️ ${carte.def}</span></div>
        <div class="desc">${carte.desc}</div>
      </div>
    </div>`;
  return el;
}

// Carte non découverte (collection)
function creerCarteInconnue() {
  const el = document.createElement("div");
  el.className = "carte inconnue";
  el.innerHTML = `<div class="inner"><div class="dos">?</div></div>`;
  return el;
}
