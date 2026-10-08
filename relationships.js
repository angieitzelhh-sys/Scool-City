/**
 * SCHOOL CITY - RELATIONSHIPS MANAGER (js/relationships.js)
 * Calculadora de puntos de amistad, afinidad con PNJ y niveles de confianza académica.
 */

const RelationshipsManager = {
  // Puntos base si no existen en el perfil del jugador
  initPlayerRelationships() {
    if (!Player.data.relationships) {
      Player.data.relationships = {};
    }
    const chars = Object.keys(CharacterRegistry.characters);
    chars.forEach(charId => {
      if (typeof Player.data.relationships[charId] !== "number") {
        Player.data.relationships[charId] = 0;
      }
    });
  },

  addPoints(charId, points) {
    this.initPlayerRelationships();
    const current = Player.data.relationships[charId] || 0;
    const oldLevel = this.getLevel(current);
    Player.data.relationships[charId] = current + points;
    const newLevel = this.getLevel(Player.data.relationships[charId]);

    const char = CharacterRegistry.get(charId);
    const charName = char ? char.name : "Personaje";

    UI.showToast(`❤️ +${points} Afinidad con ${charName}`, "success");

    // Notificar si subió de nivel de amistad
    if (newLevel.tier > oldLevel.tier) {
      AudioManager.playVictory();
      UI.showToast(`✨ ¡Vínculo con ${charName} subió a '${newLevel.title}'!`, "reward");
      UI.addDiaryEntry(`Vínculo de amistad reforzado`, `Tu relación con ${charName} ha alcanzado el nivel de ${newLevel.title}.`);
      Player.addXP(30);
    }

    SaveManager.saveGame();
  },

  getPoints(charId) {
    this.initPlayerRelationships();
    return Player.data.relationships[charId] || 0;
  },

  getLevel(points) {
    if (points >= 200) {
      return { tier: 5, title: "Mentor y Confidente", min: 200, max: 300 };
    } else if (points >= 120) {
      return { tier: 4, title: "Colega de Estudio", min: 120, max: 200 };
    } else if (points >= 60) {
      return { tier: 3, title: "Buen Amigo", min: 60, max: 120 };
    } else if (points >= 25) {
      return { tier: 2, title: "Compañero de Clase", min: 25, max: 60 };
    }
    return { tier: 1, title: "Conocido", min: 0, max: 25 };
  }
};
