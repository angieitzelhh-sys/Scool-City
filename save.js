/**
 * SCHOOL CITY - PERSISTENCE & SAVE SYSTEM (js/save.js)
 * Persistencia mediante localStorage, exportación/importación JSON y gestión de perfiles.
 */

const SaveManager = {
  SAVE_KEY: "school_city_save_v2",

  hasSavedGame() {
    try {
      const data = localStorage.getItem(this.SAVE_KEY);
      return !!data;
    } catch (e) {
      return false;
    }
  },

  saveGame() {
    try {
      const bundle = {
        player: Player.data,
        missions: MissionsManager.list,
        diary: UI.diaryEntries,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(bundle));
      return true;
    } catch (e) {
      console.warn("Error al guardar en localStorage:", e);
      return false;
    }
  },

  loadGame() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (!raw) return false;

      const bundle = JSON.parse(raw);
      if (bundle.player) {
        // Combinar datos preservando la estructura
        Object.assign(Player.data, bundle.player);
      }
      if (bundle.missions && Array.isArray(bundle.missions)) {
        MissionsManager.list = bundle.missions;
      }
      if (bundle.diary && Array.isArray(bundle.diary)) {
        UI.diaryEntries = bundle.diary;
      }

      RelationshipsManager.initPlayerRelationships();
      return true;
    } catch (e) {
      console.error("Error al cargar partida:", e);
      return false;
    }
  },

  exportSave() {
    this.saveGame();
    const raw = localStorage.getItem(this.SAVE_KEY);
    if (!raw) return null;

    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SchoolCity_Save_${Player.data.name || "Alex"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    UI.showToast("📤 Datos de partida exportados correctamente", "success");
  },

  importSave() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed.player) {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(parsed));
            this.loadGame();
            UI.updateHUD();
            UI.renderAllModals();
            UI.showToast("Partida restaurada con éxito", "reward");
          }
        } catch (err) {
          alert("Error: El archivo JSON de partida es inválido.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  resetSave() {
    if (confirm("¿Estás seguro de que deseas reiniciar todos tus progresos en School City?")) {
      localStorage.removeItem(this.SAVE_KEY);
      window.location.reload();
    }
  }
};
