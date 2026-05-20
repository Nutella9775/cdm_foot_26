// ============================================================
//  CDM 2026 – app.js (Version Locale / Sans Token)
// ============================================================

const ADMIN_PASSWORD = "cdm_as"; 
let isAdmin = false;
let currentFilter = "all";

// ============================================================
//  CHARGEMENT LOCALSTORAGE (Survit au refresh)
// ============================================================

function initData() {
  // Charge les joueurs depuis le localStorage s'ils existent, sinon garde ceux du fichier players.js
  const localPlayers = localStorage.getItem("cdm_players");
  if (localPlayers) {
    players = JSON.parse(localPlayers);
  }

  // Charge les scores depuis le localStorage
  const localScores = localStorage.getItem("cdm_scores");
  let scoresToApply = typeof matchScores !== "undefined" ? matchScores : [];
  if (localScores) {
    scoresToApply = JSON.parse(localScores);
  }

  // Applique les scores aux matchs
  scoresToApply.forEach(s => {
    const m = matches.find(x => x.id === s.id);
    if (m) { m.score1 = s.score1; m.score2 = s.score2; }
  });
}

function saveToLocalStorage() {
  localStorage.setItem("cdm_players", JSON.stringify(players));
  const scores = matches.map(m => ({ id: m.id, score1: m.score1, score2: m.score2 }));
  localStorage.setItem("cdm_scores", JSON.stringify(scores));
}

// ============================================================
//  TÉLÉCHARGEMENT "EN DUR"
// ============================================================

function downloadPlayersJS() {
  const content = `let players = ${JSON.stringify(players, null, 2)};\n`;
  const blob = new Blob([content], { type: "text/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "players.js";
  a.click();
}

function downloadScoresJS() {
  const scores = matches.map(m => ({ id: m.id, score1: m.score1, score2: m.score2 }));
  const content = `// Scores CDM 2026 – mis à jour automatiquement\nconst matchScores = ${JSON.stringify(scores, null, 2)};\n`;
  const blob = new Blob([content], { type: "text/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "scores.js";
  a.click();
}

// ============================================================
//  ADMIN LOGIN / LOGOUT
// ============================================================

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass !== ADMIN_PASSWORD) { showMsg("❌ Mot de passe incorrect.", "error"); return; }

  isAdmin = true;
  sessionStorage.setItem("gh_admin", "1");
  showAdminPanel();
  displayMatches();
}

function showAdminPanel() {
  document.getElementById("adminPanel").style.display = "block";
  document.getElementById("adminLoginForm").style.display = "none";
}

function logoutAdmin() {
  sessionStorage.removeItem("gh_admin");
  isAdmin = false;
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("adminLoginForm").style.display = "block";
  document.getElementById("adminPass").value = "";
  displayMatches();
}

function restoreSession() {
  if (sessionStorage.getItem("gh_admin") === "1") {
    isAdmin = true;
    showAdminPanel();
  }
}

// ============================================================
//  MESSAGES & UTILITAIRES
// ============================================================

function showMsg(txt, type) {
  const el = document.getElementById(isAdmin ? "adminMsgPanel" : "adminMsg");
  if (!el) return;
  el.textContent = txt;
  el.className = "admin-msg " + type;
  setTimeout(() => { el.textContent = ""; el.className = "admin-msg"; }, 5000);
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

function updateScore(id) {
  const m  = matches.find(x => x.id === id);
  const v1 = document.getElementById(`score1-${id}`).value;
  const v2 = document.getElementById(`score2-${id}`).value;
  m.score1 = v1 !== "" ? parseInt(v1) : null;
  m.score2 = v2 !== "" ? parseInt(v2) : null;

  saveToLocalStorage();
  displayRanking();
  showMsg(`✅ Score #${id} actualisé ! (N'oublie pas d'exporter en dur)`, "success");
}

// ============================================================
//  POINTS & CLASSEMENT
// ============================================================

function getPoints(bet, m) {
  if (m.score1 === null || m.score2 === null) return 0;
  if (bet.bet1 === m.score1 && bet.bet2 === m.score2) return 3;
  const bd = bet.bet1 - bet.bet2, rd = m.score1 - m.score2;
  if ((bd > 0 && rd > 0) || (bd < 0 && rd < 0) || (bd === 0 && rd === 0)) return 1;
  return 0;
}

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
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.name || !data.bets) throw new Error("Format invalide");

      const bets = {};
      for (const [k, v] of Object.entries(data.bets)) bets[parseInt(k)] = v;
      data.bets = bets;

      const existing = players.findIndex(p => p.name === data.name);
      const isUpdate = existing >= 0;
      if (isUpdate) players[existing] = data; else players.push(data);

      saveToLocalStorage();
      displayRanking();
      document.getElementById("fileInput").value = "";
      showMsg(`✅ ${data.name} intégré ! (N'oublie pas d'exporter en dur)`, "success");
    } catch(err) {
      showMsg("❌ Fichier JSON invalide : " + err.message, "error");
    }
  };
  reader.readAsText(file);
}

// ============================================================
//  RESET
// ============================================================

function resetData() {
  if (!confirm("Effacer TOUS les pronostics et scores de ton navigateur ?")) return;
  players.length = 0;
  matches.forEach(m => { m.score1 = null; m.score2 = null; });
  localStorage.removeItem("cdm_players");
  localStorage.removeItem("cdm_scores");
  
  displayRanking();
  displayMatches();
  showMsg("✅ Données réinitialisées.", "success");
}

// ============================================================
//  INIT
// ============================================================

initData();
restoreSession();
buildFilterBar();
displayRanking();
displayMatches();
