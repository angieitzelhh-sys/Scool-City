/**
 * SCHOOL CITY - MISSIONS MANAGER (js/missions.js)
 * Gestor del tablón escolar: estados LOCKED, AVAILABLE, ACTIVE, COMPLETED y entregas de misiones.
 */

const MissionsManager = {
  list: [
    {
      id: "m_welcome",
      title: "Primeros Pasos en School City",
      giverId: "prof_luna",
      category: "Escuela",
      desc: "Habla con la Profesora Luna en el Aula Magna y completa tu orientación estudiantil.",
      status: "COMPLETED", // Ya completada en el tutorial
      objectives: [
        { text: "Completar la entrevista de orientación con la Prof. Luna", done: true }
      ],
      rewards: { xp: 50, coins: 100, item: "item_hint_5050" }
    },
    {
      id: "m_science_init",
      title: "El Enlace de los Elementos",
      giverId: "dr_gauss",
      category: "Ciencias",
      desc: "El Dr. Gauss necesita asistencia en el reactor de síntesis. Resuelve el test de química y fotosíntesis.",
      status: "AVAILABLE",
      objectives: [
        { text: "Superar el experimento en el Laboratorio", done: false }
      ],
      rewards: { xp: 120, coins: 150, item: "item_shield" }
    },
    {
      id: "m_math_merchant",
      title: "Finanzas y Cálculo Rápido",
      giverId: "madame_decimal",
      category: "Matemáticas",
      desc: "Madame Decimal premia a quienes ejercitan su agilidad matemática. Resuelve un cuaderno de cálculo o simula el cambio.",
      status: "AVAILABLE",
      objectives: [
        { text: "Completar un cuaderno de ejercicios o el simulador de vuelto", done: false }
      ],
      rewards: { xp: 140, coins: 200, item: "item_time_potion" }
    },
    {
      id: "m_library_scroll",
      title: "El Manuscrito de las Letras",
      giverId: "sophia",
      category: "Lengua",
      desc: "Descifra los enigmas de ortografía y comprensión textual que custodia la Biblioteca Central.",
      status: "AVAILABLE",
      objectives: [
        { text: "Aprobar el reto ortográfico de la Bibliotecaria Sophia", done: false }
      ],
      rewards: { xp: 130, coins: 140, item: "item_hint_5050" }
    },
    {
      id: "m_history_chronos",
      title: "La Grieta Temporal del Museo",
      giverId: "don_cronos",
      category: "Historia",
      desc: "Ayuda a Don Cronos a reconstruir los hitos cruciales de las civilizaciones antiguas.",
      status: "AVAILABLE",
      objectives: [
        { text: "Resolver el desafío de historia en el Museo Universal", done: false }
      ],
      rewards: { xp: 150, coins: 180, item: "item_shield" }
    },
    {
      id: "m_world_traveler",
      title: "Pasaporte de la Metrópolis",
      giverId: "cap_atlas",
      category: "Geografía",
      desc: "Demuestra tu conocimiento de las capitales y banderas del planeta en el Centro de Viajes.",
      status: "AVAILABLE",
      objectives: [
        { text: "Completar la expedición geográfica de la Capitana Atlas", done: false }
      ],
      rewards: { xp: 135, coins: 160, item: "item_time_potion" }
    },
    {
      id: "m_park_zen",
      title: "Concentración en la Pérgola",
      giverId: "mateo",
      category: "Lógica",
      desc: "Mateo te desafía a una partida de memoria para agudizar tus reflejos cognitivos.",
      status: "AVAILABLE",
      objectives: [
        { text: "Despejar todas las parejas en las mesas del Parque Central", done: false }
      ],
      rewards: { xp: 110, coins: 120, item: "item_hint_5050" }
    },
    {
      id: "m_arena_champion",
      title: "El Gran Torneo de la Arena",
      giverId: "maestro_nova",
      category: "Torneo",
      desc: "Supera el reto de 60 segundos bajo presión contrarreloj en la Arena de Retos.",
      status: "LOCKED",
      objectives: [
        { text: "Alcanzar nivel 2 de estudiante", done: false },
        { text: "Ganar el torneo de velocidad en la Arena", done: false }
      ],
      rewards: { xp: 250, coins: 400, item: "badge_arena_champion" }
    }
  ],

  get(missionId) {
    return this.list.find(m => m.id === missionId);
  },

  getAll(filter = "all") {
    if (filter === "active") {
      return this.list.filter(m => m.status === "ACTIVE");
    } else if (filter === "completed") {
      return this.list.filter(m => m.status === "COMPLETED");
    }
    return this.list;
  },

  startMission(missionId) {
    const mission = this.get(missionId);
    if (!mission) return;

    if (mission.status === "AVAILABLE") {
      mission.status = "ACTIVE";
      UI.showToast(`📋 ¡Misión iniciada: ${mission.title}!`, "reward");
      AudioManager.playSuccess();
      UI.closeModal("mission-detail");
      UI.renderMissions();
      SaveManager.saveGame();
    }
  },

  completeMission(missionId) {
    const mission = this.get(missionId);
    if (!mission || mission.status === "COMPLETED") return;

    mission.status = "COMPLETED";
    mission.objectives.forEach(o => o.done = true);

    if (!Player.data.completedMissions.includes(missionId)) {
      Player.data.completedMissions.push(missionId);
    }

    // Entregar recompensas
    if (mission.rewards.xp) Player.addXP(mission.rewards.xp);
    if (mission.rewards.coins) Player.addCoins(mission.rewards.coins);
    if (mission.rewards.item) {
      if (mission.rewards.item.startsWith("badge_")) {
        Player.addBadge(mission.rewards.item);
      } else {
        InventoryManager.addItem(mission.rewards.item, 1);
      }
    }

    // Registrar en diario
    UI.addDiaryEntry(`Misión Cumplida: ${mission.title}`, `Has satisfecho todos los requerimientos académicos con honores.`);

    // Mostrar modal de victoria (Pantalla 16)
    UI.showMissionCompletedModal(
      mission.title,
      3,
      mission.rewards.xp,
      mission.rewards.coins,
      mission.rewards.item ? "Objeto Especial" : null
    );

    SaveManager.saveGame();
  },

  checkMissions() {
    // Desbloquear Arena si el jugador es nivel >= 2
    const arenaM = this.get("m_arena_champion");
    if (arenaM && arenaM.status === "LOCKED" && Player.data.level >= 2) {
      arenaM.status = "AVAILABLE";
      arenaM.objectives[0].done = true;
      UI.showToast("⚡ ¡Arena de Retos desbloqueada en el Tablón de Misiones!", "reward");
    }

    // Indicador en el dock
    const activeCount = this.list.filter(m => m.status === "ACTIVE" || m.status === "AVAILABLE").length;
    const badgeEl = document.getElementById("dock-mission-badge");
    if (badgeEl) {
      badgeEl.classList.toggle("active", activeCount > 0);
    }
  }
};
