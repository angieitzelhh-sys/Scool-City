/**
 * SCHOOL CITY - MAIN ENTRY POINT (js/main.js)
 * Inicializador global, registro de escuchadores de eventos y orquestación de la UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar audio al primer toque o clic
  const initAudioOnFirstGesture = () => {
    AudioManager.init();
    document.removeEventListener("pointerdown", initAudioOnFirstGesture);
  };
  document.addEventListener("pointerdown", initAudioOnFirstGesture);

  // -----------------------------------------------------------
  // BOTONES DE PANTALLA 1: INICIO (TITLE SCREEN)
  // -----------------------------------------------------------
  const btnPlay = document.getElementById("btn-title-play");
  if (btnPlay) {
    btnPlay.addEventListener("click", () => {
      AudioManager.playClick();
      if (SaveManager.hasSavedGame()) {
        SaveManager.loadGame();
        Game.changeState("MAP");
      } else {
        Game.changeState("AUTH");
      }
    });
  }

  const btnOptions = document.getElementById("btn-title-options");
  if (btnOptions) {
    btnOptions.addEventListener("click", () => {
      UI.openModal("settings");
    });
  }

  // -----------------------------------------------------------
  // PANTALLA 2: AUTH SCREEN (LOGIN / REGISTRO / GUEST)
  // -----------------------------------------------------------
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const authSubmitLabel = document.getElementById("auth-submit-label");
  const authUsername = document.getElementById("auth-username");
  const btnAuthSubmit = document.getElementById("btn-auth-submit");
  const btnAuthGuest = document.getElementById("btn-auth-guest");
  const btnAuthBack = document.getElementById("btn-auth-back");

  let isRegisterMode = false;

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener("click", () => {
      AudioManager.playClick();
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      isRegisterMode = false;
      authSubmitLabel.textContent = "ENTRAR A CLASE";
    });

    tabRegister.addEventListener("click", () => {
      AudioManager.playClick();
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      isRegisterMode = true;
      authSubmitLabel.textContent = "CREAR ESTUDIANTE";
    });
  }

  if (btnAuthSubmit) {
    btnAuthSubmit.addEventListener("click", () => {
      const name = authUsername.value.trim();
      if (!name) {
        UI.showToast("Por favor, ingresa tu nombre de estudiante", "error");
        return;
      }
      AudioManager.playSuccess();
      Player.data.name = name;

      if (isRegisterMode) {
        // Nuevo estudiante: ir al Creador de Avatar
        Game.changeState("AVATAR_CREATOR");
      } else {
        // Login: cargar partida si existe, o ir a Avatar
        if (SaveManager.hasSavedGame()) {
          SaveManager.loadGame();
          Game.changeState("MAP");
        } else {
          Game.changeState("AVATAR_CREATOR");
        }
      }
    });
  }

  if (btnAuthGuest) {
    btnAuthGuest.addEventListener("click", () => {
      AudioManager.playClick();
      const guestId = "Guest_" + Math.floor(1000 + Math.random() * 9000);
      Player.data.name = guestId;
      Game.changeState("AVATAR_CREATOR");
    });
  }

  if (btnAuthBack) {
    btnAuthBack.addEventListener("click", () => {
      AudioManager.playClick();
      Game.changeState("TITLE");
    });
  }

  // -----------------------------------------------------------
  // PANTALLA 5: MAPA GENERAL (8 NODOS EDUCATIVOS)
  // -----------------------------------------------------------
  const mapNodes = document.querySelectorAll(".map-node");
  mapNodes.forEach(node => {
    node.addEventListener("click", () => {
      const nodeId = node.dataset.node;
      Game.openNodeScene(nodeId);
    });
  });

  // HUD Top Profile Click
  const hudProfile = document.getElementById("hud-profile-trigger");
  if (hudProfile) {
    hudProfile.addEventListener("click", () => {
      UI.openModal("profile");
    });
  }

  const btnQuickSettings = document.getElementById("btn-quick-settings");
  if (btnQuickSettings) {
    btnQuickSettings.addEventListener("click", () => {
      UI.openModal("settings");
    });
  }

  // -----------------------------------------------------------
  // DOCK LATERAL / MENÚ FLOTANTE DEL MAPA
  // -----------------------------------------------------------
  const dockButtons = document.querySelectorAll(".dock-btn");
  dockButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action) {
        UI.openModal(action);
      }
    });
  });

  // -----------------------------------------------------------
  // CIERRE DE MODALES GENÉRICOS (BOTONES CON data-close)
  // -----------------------------------------------------------
  const closeButtons = document.querySelectorAll("[data-close]");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalName = btn.dataset.close;
      AudioManager.playClick();
      UI.closeModal(modalName);
    });
  });

  // Cerrar al hacer clic fuera del contenido del modal
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        m.classList.remove("active");
      }
    });
  });

  // -----------------------------------------------------------
  // PESTAÑAS DENTRO DE MODALES
  // -----------------------------------------------------------
  // Inventario
  const invTabs = document.querySelectorAll(".inv-tab");
  invTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      AudioManager.playClick();
      invTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      UI.activeInvCategory = tab.dataset.invcat;
      UI.renderInventory();
    });
  });

  // Tienda
  const shopTabs = document.querySelectorAll(".shop-tab");
  shopTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      AudioManager.playClick();
      shopTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      UI.activeShopCategory = tab.dataset.shopcat;
      UI.renderShop();
    });
  });

  // Misiones
  const missionFilterTabs = document.querySelectorAll(".mission-filter-btn");
  missionFilterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      AudioManager.playClick();
      missionFilterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      UI.activeMissionFilter = tab.dataset.filter;
      UI.renderMissions();
    });
  });

  // -----------------------------------------------------------
  // AJUSTES GENERALES (CONTROLES)
  // -----------------------------------------------------------
  const musicSlider = document.getElementById("setting-music-vol");
  const musicLabel = document.getElementById("label-music-vol");
  if (musicSlider) {
    musicSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      if (musicLabel) musicLabel.textContent = `${val}%`;
      AudioManager.setMusicVolume(val / 100);
    });
  }

  const sfxSlider = document.getElementById("setting-sfx-vol");
  const sfxLabel = document.getElementById("label-sfx-vol");
  if (sfxSlider) {
    sfxSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      if (sfxLabel) sfxLabel.textContent = `${val}%`;
      AudioManager.setSfxVolume(val / 100);
    });
  }

  const speedSlider = document.getElementById("setting-text-speed");
  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      DialogueEngine.setTextSpeed(val);
    });
  }

  const btnManualSave = document.getElementById("btn-save-manual");
  if (btnManualSave) {
    btnManualSave.addEventListener("click", () => {
      SaveManager.saveGame();
      AudioManager.playSuccess();
      UI.showToast("💾 Partida guardada con éxito en tu navegador", "success");
    });
  }

  const btnExport = document.getElementById("btn-export-save");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      SaveManager.exportSave();
    });
  }

  const btnReset = document.getElementById("btn-reset-save");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      SaveManager.resetSave();
    });
  }

  // -----------------------------------------------------------
  // ARRANQUE DEL JUEGO
  // -----------------------------------------------------------
  Game.init();
});
