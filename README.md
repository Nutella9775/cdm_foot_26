# 🏆 Pronostics CDM 2026

Site de pronostics pour la Coupe du Monde 2026, hébergeable sur **GitHub Pages** sans base de données.  
Les données sont persistées **directement dans le repo** via l'API GitHub.

## 📁 Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page principale : classement + matchs + admin |
| `bet.html` | Page de saisie des pronostics |
| `style.css` | Styles |
| `matches.js` | 72 matchs de la phase de groupes (ne change jamais) |
| `players.js` | Pronostics des participants (écrit par l'admin via GitHub API) |
| `scores.js` | Scores réels des matchs (écrit par l'admin via GitHub API) |
| `app.js` | Logique + appels API GitHub |

## 🚀 Mise en ligne (une seule fois)

1. Créez un repo **public** sur GitHub (ex: `cdm2026`)
2. Uploadez **tous les fichiers** à la racine
3. **Settings → Pages → Deploy from branch → main / root**
4. Votre site est live sur `https://votrenom.github.io/cdm2026/`

## 🔑 Créer un token GitHub (admin uniquement)

1. Allez sur https://github.com/settings/tokens/new
2. Cochez le scope **repo**
3. Cliquez **Generate token** → copiez-le
4. **Ne partagez jamais ce token** — il donne accès en écriture à votre repo

## 🎯 Utilisation

### Participants
1. Ouvrir `bet.html`
2. Entrer son prénom + saisir les scores
3. Cliquer **Télécharger** → envoyer le fichier `.json` à l'admin

### Admin
1. Ouvrir `index.html` → section Admin
2. Entrer : mot de passe (`cdm_as`), token GitHub, pseudo GitHub, nom du repo
3. **Importer** les JSON des participants → écrit `players.js` dans le repo
4. **Saisir les vrais scores** match par match → écrit `scores.js` dans le repo
5. Le classement se recalcule en temps réel

> La connexion admin est maintenue pour toute la session navigateur (sessionStorage).  
> Fermer l'onglet = déconnexion automatique. Le token n'est jamais stocké durablement.

## 📊 Système de points

| Résultat | Points |
|---|---|
| Score exact | **3 pts** |
| Bon vainqueur / bonne égalité | **1 pt** |
| Mauvais résultat | **0 pt** |

## ⚙️ Personnalisation

**Mot de passe admin** → `app.js` ligne 1 : `const ADMIN_PASSWORD = "votre_mdp";`
