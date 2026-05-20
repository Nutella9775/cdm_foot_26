// CDM 2026 - Phase de groupes (12 groupes × 3 matchs = 36 matchs ×  2 matchs finaux = 72 matchs)
// Format : {id, group, team1, flag1, team2, flag2, date, score1:null, score2:null}

const matches = [
  // GROUPE A
  { id: 1,  group:"Groupe A", team1:"Canada",    flag1:"🇨🇦", team2:"Maroc",       flag2:"🇲🇦", date:"12/06/2026", score1:null, score2:null },
  { id: 2,  group:"Groupe A", team1:"Portugal",  flag1:"🇵🇹", team2:"Algérie",     flag2:"🇩🇿", date:"13/06/2026", score1:null, score2:null },
  { id: 3,  group:"Groupe A", team1:"Canada",    flag1:"🇨🇦", team2:"Portugal",   flag2:"🇵🇹", date:"17/06/2026", score1:null, score2:null },
  { id: 4,  group:"Groupe A", team1:"Algérie",   flag1:"🇩🇿", team2:"Maroc",       flag2:"🇲🇦", date:"17/06/2026", score1:null, score2:null },
  { id: 5,  group:"Groupe A", team1:"Maroc",     flag1:"🇲🇦", team2:"Portugal",   flag2:"🇵🇹", date:"22/06/2026", score1:null, score2:null },
  { id: 6,  group:"Groupe A", team1:"Algérie",   flag1:"🇩🇿", team2:"Canada",      flag2:"🇨🇦", date:"22/06/2026", score1:null, score2:null },

  // GROUPE B
  { id: 7,  group:"Groupe B", team1:"Argentine", flag1:"🇦🇷", team2:"Islande",    flag2:"🇮🇸", date:"12/06/2026", score1:null, score2:null },
  { id: 8,  group:"Groupe B", team1:"Chili",     flag1:"🇨🇱", team2:"Pérou",      flag2:"🇵🇪", date:"13/06/2026", score1:null, score2:null },
  { id: 9,  group:"Groupe B", team1:"Argentine", flag1:"🇦🇷", team2:"Chili",      flag2:"🇨🇱", date:"17/06/2026", score1:null, score2:null },
  { id: 10, group:"Groupe B", team1:"Pérou",     flag1:"🇵🇪", team2:"Islande",    flag2:"🇮🇸", date:"17/06/2026", score1:null, score2:null },
  { id: 11, group:"Groupe B", team1:"Islande",   flag1:"🇮🇸", team2:"Chili",      flag2:"🇨🇱", date:"22/06/2026", score1:null, score2:null },
  { id: 12, group:"Groupe B", team1:"Pérou",     flag1:"🇵🇪", team2:"Argentine",  flag2:"🇦🇷", date:"22/06/2026", score1:null, score2:null },

  // GROUPE C
  { id: 13, group:"Groupe C", team1:"Mexique",   flag1:"🇲🇽", team2:"Angola",     flag2:"🇦🇴", date:"12/06/2026", score1:null, score2:null },
  { id: 14, group:"Groupe C", team1:"Etats-Unis",flag1:"🇺🇸", team2:"Panama",     flag2:"🇵🇦", date:"12/06/2026", score1:null, score2:null },
  { id: 15, group:"Groupe C", team1:"Etats-Unis",flag1:"🇺🇸", team2:"Mexique",    flag2:"🇲🇽", date:"18/06/2026", score1:null, score2:null },
  { id: 16, group:"Groupe C", team1:"Panama",    flag1:"🇵🇦", team2:"Angola",     flag2:"🇦🇴", date:"18/06/2026", score1:null, score2:null },
  { id: 17, group:"Groupe C", team1:"Mexique",   flag1:"🇲🇽", team2:"Panama",     flag2:"🇵🇦", date:"22/06/2026", score1:null, score2:null },
  { id: 18, group:"Groupe C", team1:"Angola",    flag1:"🇦🇴", team2:"Etats-Unis", flag2:"🇺🇸", date:"22/06/2026", score1:null, score2:null },

  // GROUPE D
  { id: 19, group:"Groupe D", team1:"Brésil",    flag1:"🇧🇷", team2:"Rép. dominicaine", flag2:"🇩🇴", date:"13/06/2026", score1:null, score2:null },
  { id: 20, group:"Groupe D", team1:"Paraguay",  flag1:"🇵🇾", team2:"Cameroun",   flag2:"🇨🇲", date:"13/06/2026", score1:null, score2:null },
  { id: 21, group:"Groupe D", team1:"Brésil",    flag1:"🇧🇷", team2:"Paraguay",   flag2:"🇵🇾", date:"18/06/2026", score1:null, score2:null },
  { id: 22, group:"Groupe D", team1:"Cameroun",  flag1:"🇨🇲", team2:"Rép. dominicaine", flag2:"🇩🇴", date:"18/06/2026", score1:null, score2:null },
  { id: 23, group:"Groupe D", team1:"Rép. dominicaine", flag1:"🇩🇴", team2:"Paraguay", flag2:"🇵🇾", date:"23/06/2026", score1:null, score2:null },
  { id: 24, group:"Groupe D", team1:"Cameroun",  flag1:"🇨🇲", team2:"Brésil",     flag2:"🇧🇷", date:"23/06/2026", score1:null, score2:null },

  // GROUPE E
  { id: 25, group:"Groupe E", team1:"France",    flag1:"🇫🇷", team2:"Arabie Saoudite", flag2:"🇸🇦", date:"14/06/2026", score1:null, score2:null },
  { id: 26, group:"Groupe E", team1:"Danemark",  flag1:"🇩🇰", team2:"Guinée",     flag2:"🇬🇳", date:"14/06/2026", score1:null, score2:null },
  { id: 27, group:"Groupe E", team1:"France",    flag1:"🇫🇷", team2:"Danemark",   flag2:"🇩🇰", date:"19/06/2026", score1:null, score2:null },
  { id: 28, group:"Groupe E", team1:"Guinée",    flag1:"🇬🇳", team2:"Arabie Saoudite", flag2:"🇸🇦", date:"19/06/2026", score1:null, score2:null },
  { id: 29, group:"Groupe E", team1:"Arabie Saoudite",flag1:"🇸🇦",team2:"Danemark",flag2:"🇩🇰", date:"24/06/2026", score1:null, score2:null },
  { id: 30, group:"Groupe E", team1:"Guinée",    flag1:"🇬🇳", team2:"France",     flag2:"🇫🇷", date:"24/06/2026", score1:null, score2:null },

  // GROUPE F
  { id: 31, group:"Groupe F", team1:"Espagne",   flag1:"🇪🇸", team2:"Japon",      flag2:"🇯🇵", date:"14/06/2026", score1:null, score2:null },
  { id: 32, group:"Groupe F", team1:"Australie", flag1:"🇦🇺", team2:"Côte d'Ivoire", flag2:"🇨🇮", date:"15/06/2026", score1:null, score2:null },
  { id: 33, group:"Groupe F", team1:"Espagne",   flag1:"🇪🇸", team2:"Australie",  flag2:"🇦🇺", date:"19/06/2026", score1:null, score2:null },
  { id: 34, group:"Groupe F", team1:"Côte d'Ivoire",flag1:"🇨🇮",team2:"Japon",   flag2:"🇯🇵", date:"19/06/2026", score1:null, score2:null },
  { id: 35, group:"Groupe F", team1:"Japon",     flag1:"🇯🇵", team2:"Australie",  flag2:"🇦🇺", date:"24/06/2026", score1:null, score2:null },
  { id: 36, group:"Groupe F", team1:"Côte d'Ivoire",flag1:"🇨🇮",team2:"Espagne", flag2:"🇪🇸", date:"24/06/2026", score1:null, score2:null },

  // GROUPE G
  { id: 37, group:"Groupe G", team1:"Allemagne", flag1:"🇩🇪", team2:"Kosovo",     flag2:"🇽🇰", date:"14/06/2026", score1:null, score2:null },
  { id: 38, group:"Groupe G", team1:"Corée du Sud",flag1:"🇰🇷",team2:"Afrique du Sud",flag2:"🇿🇦", date:"15/06/2026", score1:null, score2:null },
  { id: 39, group:"Groupe G", team1:"Allemagne", flag1:"🇩🇪", team2:"Corée du Sud",flag2:"🇰🇷", date:"20/06/2026", score1:null, score2:null },
  { id: 40, group:"Groupe G", team1:"Afrique du Sud",flag1:"🇿🇦",team2:"Kosovo", flag2:"🇽🇰", date:"20/06/2026", score1:null, score2:null },
  { id: 41, group:"Groupe G", team1:"Kosovo",    flag1:"🇽🇰", team2:"Corée du Sud",flag2:"🇰🇷", date:"25/06/2026", score1:null, score2:null },
  { id: 42, group:"Groupe G", team1:"Afrique du Sud",flag1:"🇿🇦",team2:"Allemagne",flag2:"🇩🇪",date:"25/06/2026", score1:null, score2:null },

  // GROUPE H
  { id: 43, group:"Groupe H", team1:"Hollande",  flag1:"🇳🇱", team2:"Turquie",    flag2:"🇹🇷", date:"15/06/2026", score1:null, score2:null },
  { id: 44, group:"Groupe H", team1:"Sénégal",   flag1:"🇸🇳", team2:"Chine",      flag2:"🇨🇳", date:"15/06/2026", score1:null, score2:null },
  { id: 45, group:"Groupe H", team1:"Hollande",  flag1:"🇳🇱", team2:"Sénégal",    flag2:"🇸🇳", date:"20/06/2026", score1:null, score2:null },
  { id: 46, group:"Groupe H", team1:"Chine",     flag1:"🇨🇳", team2:"Turquie",    flag2:"🇹🇷", date:"20/06/2026", score1:null, score2:null },
  { id: 47, group:"Groupe H", team1:"Turquie",   flag1:"🇹🇷", team2:"Sénégal",    flag2:"🇸🇳", date:"25/06/2026", score1:null, score2:null },
  { id: 48, group:"Groupe H", team1:"Chine",     flag1:"🇨🇳", team2:"Hollande",   flag2:"🇳🇱", date:"25/06/2026", score1:null, score2:null },

  // GROUPE I
  { id: 49, group:"Groupe I", team1:"Angleterre",flag1:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2:"Nouvelle-Zélande",flag2:"🇳🇿", date:"15/06/2026", score1:null, score2:null },
  { id: 50, group:"Groupe I", team1:"Uruguay",   flag1:"🇺🇾", team2:"Irak",       flag2:"🇮🇶", date:"16/06/2026", score1:null, score2:null },
  { id: 51, group:"Groupe I", team1:"Angleterre",flag1:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2:"Uruguay",    flag2:"🇺🇾", date:"20/06/2026", score1:null, score2:null },
  { id: 52, group:"Groupe I", team1:"Irak",      flag1:"🇮🇶", team2:"Nouvelle-Zélande",flag2:"🇳🇿", date:"21/06/2026", score1:null, score2:null },
  { id: 53, group:"Groupe I", team1:"Nouvelle-Zélande",flag1:"🇳🇿",team2:"Uruguay",flag2:"🇺🇾", date:"25/06/2026", score1:null, score2:null },
  { id: 54, group:"Groupe I", team1:"Irak",      flag1:"🇮🇶", team2:"Angleterre", flag2:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", date:"25/06/2026", score1:null, score2:null },

  // GROUPE J
  { id: 55, group:"Groupe J", team1:"Colombie",  flag1:"🇨🇴", team2:"Nigéria",    flag2:"🇳🇬", date:"16/06/2026", score1:null, score2:null },
  { id: 56, group:"Groupe J", team1:"Belgique",  flag1:"🇧🇪", team2:"Ukraine",    flag2:"🇺🇦", date:"16/06/2026", score1:null, score2:null },
  { id: 57, group:"Groupe J", team1:"Colombie",  flag1:"🇨🇴", team2:"Belgique",   flag2:"🇧🇪", date:"21/06/2026", score1:null, score2:null },
  { id: 58, group:"Groupe J", team1:"Ukraine",   flag1:"🇺🇦", team2:"Nigéria",    flag2:"🇳🇬", date:"21/06/2026", score1:null, score2:null },
  { id: 59, group:"Groupe J", team1:"Nigéria",   flag1:"🇳🇬", team2:"Belgique",   flag2:"🇧🇪", date:"26/06/2026", score1:null, score2:null },
  { id: 60, group:"Groupe J", team1:"Ukraine",   flag1:"🇺🇦", team2:"Colombie",   flag2:"🇨🇴", date:"26/06/2026", score1:null, score2:null },

  // GROUPE K
  { id: 61, group:"Groupe K", team1:"Croatie",   flag1:"🇭🇷", team2:"Iran",       flag2:"🇮🇷", date:"16/06/2026", score1:null, score2:null },
  { id: 62, group:"Groupe K", team1:"Ghana",     flag1:"🇬🇭", team2:"Serbie",     flag2:"🇷🇸", date:"16/06/2026", score1:null, score2:null },
  { id: 63, group:"Groupe K", team1:"Croatie",   flag1:"🇭🇷", team2:"Ghana",      flag2:"🇬🇭", date:"21/06/2026", score1:null, score2:null },
  { id: 64, group:"Groupe K", team1:"Serbie",    flag1:"🇷🇸", team2:"Iran",       flag2:"🇮🇷", date:"22/06/2026", score1:null, score2:null },
  { id: 65, group:"Groupe K", team1:"Iran",      flag1:"🇮🇷", team2:"Ghana",      flag2:"🇬🇭", date:"26/06/2026", score1:null, score2:null },
  { id: 66, group:"Groupe K", team1:"Serbie",    flag1:"🇷🇸", team2:"Croatie",    flag2:"🇭🇷", date:"26/06/2026", score1:null, score2:null },

  // GROUPE L
  { id: 67, group:"Groupe L", team1:"Italie",    flag1:"🇮🇹", team2:"Venezuela",  flag2:"🇻🇪", date:"17/06/2026", score1:null, score2:null },
  { id: 68, group:"Groupe L", team1:"Equateur",  flag1:"🇪🇨", team2:"Suisse",     flag2:"🇨🇭", date:"17/06/2026", score1:null, score2:null },
  { id: 69, group:"Groupe L", team1:"Italie",    flag1:"🇮🇹", team2:"Equateur",   flag2:"🇪🇨", date:"22/06/2026", score1:null, score2:null },
  { id: 70, group:"Groupe L", team1:"Suisse",    flag1:"🇨🇭", team2:"Venezuela",  flag2:"🇻🇪", date:"22/06/2026", score1:null, score2:null },
  { id: 71, group:"Groupe L", team1:"Venezuela", flag1:"🇻🇪", team2:"Equateur",   flag2:"🇪🇨", date:"26/06/2026", score1:null, score2:null },
  { id: 72, group:"Groupe L", team1:"Suisse",    flag1:"🇨🇭", team2:"Italie",     flag2:"🇮🇹", date:"26/06/2026", score1:null, score2:null },
];
