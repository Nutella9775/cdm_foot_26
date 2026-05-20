// ============================================================
//  CDM 2026 – app.js
//  Persistance via API GitHub : chaque sauvegarde écrit
//  players.js et/ou matches.js directement dans le repo.
// ============================================================

const ADMIN_PASSWORD = "cdm_as";
let isAdmin = false;
let currentFilter = "all";

// ---- Config GitHub (en dur) ----


// ============================================================
//  API GITHUB
// ============================================================

async function ghGet(path) {
  const r = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}?ref=${GH_BRANCH}`, {
    headers: { Authorization: `token ${GH_TOKEN}`, Accept: "application/vnd.github+json" }
  });
  if (!r.ok) throw new Error(`GitHub GET ${path} → ${r.status}`);
  return r.json();
}

async function ghPut(path, content, message, sha) {
  const body = { message, content: btoa(unescape(encodeURIComponent(content))), branch: GH_BRANCH };
  if (sha) body.sha = sha;
  const r = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const err = await r.json();
    throw new Error(err.message || `GitHub PUT ${path} → ${r.status}`);
  }
  return r.json();
}

// Récupère le SHA actuel d'un fichier (nécessaire pour le mettre à jour)
async function getSha(path) {
  try {
    const data = await ghGet(path);
    return data.sha;
  } catch { return null; }
}

// ============================================================
//  SAUVEGARDE GITHUB
// ============================================================

function serializePlayers() {
  return `let players = ${JSON.stringify(players, null, 2)};\n`;
}

function serializeMatches() {
  // On sérialise uniquement les scores (le reste ne change pas)
  const scores = matches.map(m => ({ id: m.id, score1: m.score1, score2: m.score2 }));
  return `// Scores CDM 2026 – mis à jour automatiquement\nconst matchScores = ${JSON.stringify(scores, null, 2)};\n`;
}

async function pushPlayers(msg) {
  const sha = await getSha("players.js");
  await ghPut("players.js", serializePlayers(), msg, sha);
}

async function pushScores(msg) {
  const sha = await getSha("scores.js");
  await ghPut("scores.js", serializeMatches(), msg, sha);
}

// ============================================================
//  CHARGEMENT DES SCORES (fichier scores.js injecté dans la page)
// ============================================================

function applyScores() {
  if (typeof matchScores === "undefined") return;
  matchScores.forEach(s => {
    const m = matches.find(x => x.id === s.id);
    if (m) { m.score1 = s.score1; m.score2 = s.score2; }
  });
}

// ============================================================
//  ADMIN LOGIN
// ============================================================

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass !== ADMIN_PASSWORD) { showMsg("❌ Mot de passe incorrect.", "error"); return; }

  isAdmin = true;
  sessionStorage.setItem("gh_admin", "1");

  document.getElementById("adminPanel").style.display = "block";
  document.getElementById("adminLoginForm").style.display = "none";
  displayMatches();
  showMsg("✅ Connecté !", "success");
}

function restoreSession() {
  if (sessionStorage.getItem("gh_admin") === "1") {
    isAdmin = true;
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("adminLoginForm").style.display = "none";
  }
}

// ============================================================
//  MESSAGES
// ============================================================

function showMsg(txt, type) {
  const el = document.getElementById("adminMsg");
  if (!el) return;
  el.textContent = txt;
  el.className = "admin-msg " + type;
  setTimeout(() => { el.textContent = ""; el.className = "admin-msg"; }, 5000);
}

function setLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  btn.dataset.orig = btn.dataset.orig || btn.textContent;
  btn.textContent = loading ? "⏳ En cours…" : btn.dataset.orig;
}

// ============================================================
//  FILTER
// ============================================================

function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  const btn = document.querySelector(`.filter-btn[data-group="${f}"]`);
  if (btn) btn.classList.add("active");
  displayMatches();
}

function buildFilterBar() {
  const bar = document.getElementById("filterBar");
  if (!bar) return;
  const groups = [...new Set(matches.map(m => m.group))];
  let html = `<button class="filter-btn active" data-group="all" onclick="setFilter('all')">Tous</button>`;
  groups.forEach(g => {
    const letter = g.replace("Groupe ", "");
    html += `<button class="filter-btn" data-group="${g}" onclick="setFilter('${g}')">${letter}</button>`;
  });
  bar.innerHTML = html;
}

// ============================================================
//  UPDATE SCORE
// ============================================================

async function updateScore(id) {
  const m  = matches.find(x => x.id === id);
  const v1 = document.getElementById(`score1-${id}`).value;
  const v2 = document.getElementById(`score2-${id}`).value;
  m.score1 = v1 !== "" ? parseInt(v1) : null;
  m.score2 = v2 !== "" ? parseInt(v2) : null;

  const btn = document.querySelector(`button[onclick="updateScore(${id})"]`);
  setLoading(btn, true);
  try {
    await pushScores(`Score match #${id} : ${m.team1} ${m.score1??'?'}-${m.score2??'?'} ${m.team2}`);
    displayRanking();
    showMsg(`✅ Score #${id} sauvegardé sur GitHub !`, "success");
  } catch(e) {
    showMsg("❌ Erreur GitHub : " + e.message, "error");
  } finally {
    setLoading(btn, false);
  }
}

// ============================================================
//  POINTS
// ============================================================

function getPoints(bet, m) {
  if (m.score1 === null || m.score2 === null) return 0;
  if (bet.bet1 === m.score1 && bet.bet2 === m.score2) return 3;
  const bd = bet.bet1 - bet.bet2, rd = m.score1 - m.score2;
  if ((bd > 0 && rd > 0) || (bd < 0 && rd < 0) || (bd === 0 && rd === 0)) return 1;
  return 0;
}

// ============================================================
//  CLASSEMENT
// ============================================================

function displayRanking() {
  const div = document.getElementById("ranking");
  if (!div) return;

  if (players.length === 0) {
    div.innerHTML = `<p class="empty-state">Aucun pronostic importé pour l'instant.</p>`;
    return;
  }

  const ranked = players.map(p => {
    let total = 0, exact = 0;
    matches.forEach(m => {
      if (p.bets && p.bets[m.id]) {
        const pts = getPoints(p.bets[m.id], m);
        total += pts;
        if (pts === 3) exact++;
      }
    });
    return { name: p.name, score: total, exact };
  }).sort((a, b) => b.score - a.score);

  const medals = ["🥇", "🥈", "🥉"];
  div.innerHTML = ranked.map((r, i) => `
    <div class="rank-card ${i < 3 ? "rank-top rank-"+(i+1) : ""}">
      <span class="rank-pos">${medals[i] || (i+1)+"."}</span>
      <span class="rank-name">${r.name}</span>
      <span class="rank-stats">
        <span class="rank-exact" title="Scores exacts">🎯 ${r.exact}</span>
        <span class="rank-score">${r.score} pts</span>
      </span>
    </div>`).join("");
}

// ============================================================
//  MATCHS
// ============================================================

function displayMatches() {
  const div = document.getElementById("matches");
  if (!div) return;
  div.innerHTML = "";

  const filtered = currentFilter === "all" ? matches : matches.filter(m => m.group === currentFilter);
  const groups = {};
  filtered.forEach(m => { if (!groups[m.group]) groups[m.group] = []; groups[m.group].push(m); });

  for (const g in groups) {
    let html = `<div class="group-block"><div class="group-header">${g}</div><ul class="match-list">`;
    groups[g].forEach(m => {
      const played = m.score1 !== null && m.score2 !== null;
      const scoreHtml = isAdmin
        ? `<div class="score-edit">
            <input type="number" id="score1-${m.id}" value="${m.score1??""}" min="0" max="20" class="score-input-admin">
            <span>–</span>
            <input type="number" id="score2-${m.id}" value="${m.score2??""}" min="0" max="20" class="score-input-admin">
            <button onclick="updateScore(${m.id})" class="btn-save">💾</button>
           </div>`
        : `<span class="score-badge ${played?"played":"pending"}">${played ? m.score1+" – "+m.score2 : m.date}</span>`;

      html += `<li class="match-item ${played?"played":""}">
        <div class="match-teams">
          <span class="team">${m.flag1} ${m.team1}</span>
          ${scoreHtml}
          <span class="team team-r">${m.team2} ${m.flag2}</span>
        </div></li>`;
    });
    html += "</ul></div>";
    div.innerHTML += html;
  }
}

// ============================================================
//  IMPORT JSON PRONOSTIC
// ============================================================

function importBets() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) { showMsg("⚠️ Sélectionnez un fichier JSON.", "error"); return; }

  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.name || !data.bets) throw new Error("Format invalide");

      // Normalise les clés en entiers
      const bets = {};
      for (const [k, v] of Object.entries(data.bets)) bets[parseInt(k)] = v;
      data.bets = bets;

      const existing = players.findIndex(p => p.name === data.name);
      const isUpdate = existing >= 0;
      if (isUpdate) players[existing] = data; else players.push(data);

      const btn = document.getElementById("importBtn");
      setLoading(btn, true);
      try {
        await pushPlayers(isUpdate
          ? `Mise à jour pronostics de ${data.name}`
          : `Ajout pronostics de ${data.name}`);
        displayRanking();
        document.getElementById("fileInput").value = "";
        showMsg(`✅ ${data.name} ${isUpdate ? "mis à jour" : "ajouté"} et sauvegardé sur GitHub !`, "success");
      } catch(e) {
        showMsg("❌ Erreur GitHub : " + e.message, "error");
      } finally {
        setLoading(btn, false);
      }
    } catch(err) {
      showMsg("❌ Fichier JSON invalide : " + err.message, "error");
    }
  };
  reader.readAsText(file);
}

// ============================================================
//  RESET
// ============================================================

async function resetData() {
  if (!confirm("Effacer TOUS les pronostics et scores ? Irréversible.")) return;
  players.length = 0;
  matches.forEach(m => { m.score1 = null; m.score2 = null; });

  const btn = document.getElementById("resetBtn");
  setLoading(btn, true);
  try {
    await pushPlayers("Reset : suppression de tous les pronostics");
    await pushScores("Reset : suppression de tous les scores");
    displayRanking();
    displayMatches();
    showMsg("✅ Données réinitialisées sur GitHub.", "success");
  } catch(e) {
    showMsg("❌ Erreur GitHub : " + e.message, "error");
  } finally {
    setLoading(btn, false);
  }
}

// ============================================================
//  INIT
// ============================================================

applyScores();
restoreSession();
buildFilterBar();
displayRanking();
displayMatches();
