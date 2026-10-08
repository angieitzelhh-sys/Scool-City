/**
 * SCHOOL CITY - GAME STATE MACHINE (js/game.js)
 * Máquina de estados del juego: TITLE, AUTH, AVATAR_CREATOR, TUTORIAL, MAP, VISUAL_NOVEL.
 */

const Game = (() => {
  let currentState = "TITLE";

  // Mapeo de nodos del mapa a escenas de la novela visual
  const nodeSceneMap = {
    school: "scene_school",
    lab: "scene_lab",
    library: "scene_library",
    museum: "scene_museum",
    shop: "scene_shop",
    park: "scene_park",
    travel: "scene_travel",
    arena: "scene_arena"
  };

  function init() {
    // Verificar si hay partida guardada
    const hasSave = SaveManager.hasSavedGame();
    const btnPlayLabel = document.getElementById("label-title-play");
    if (btnPlayLabel) {
      btnPlayLabel.textContent = hasSave ? "CONTINUAR" : "JUGAR";
    }

    // Inicializar estado de relaciones
    RelationshipsManager.initPlayerRelationships();

    // Arrancar en TITLE
    changeState("TITLE");
  }

  function changeState(newState, params = {}) {
    currentState = newState;

    switch (newState) {
      case "TITLE":
        UI.showScreen("screen-title");
        AudioManager.playBGM("title");
        break;

      case "AUTH":
        UI.showScreen("screen-auth");
        break;

      case "AVATAR_CREATOR":
        UI.showScreen("screen-avatar");
        UI.initAvatarCreator();
        AudioManager.playBGM("map");
        break;

      case "TUTORIAL":
        UI.showScreen("screen-vn");
        DialogueEngine.startScene("tutorial_intro");
        break;

      case "MAP":
        UI.showScreen("screen-map");
        UI.updateHUD();
        MissionsManager.checkMissions();
        AudioManager.playBGM("map");
        break;

      case "VISUAL_NOVEL":
        UI.showScreen("screen-vn");
        if (params.sceneId) {
          DialogueEngine.startScene(params.sceneId);
        }
        break;

      default:
        console.warn("Estado desconocido:", newState);
    }
  }

  function openNodeScene(nodeId) {
    const sceneId = nodeSceneMap[nodeId];
    if (sceneId) {
      AudioManager.playClick();
      changeState("VISUAL_NOVEL", { sceneId });
    }
  }

  function getCurrentState() {
    return currentState;
  }

  return {
    init,
    changeState,
    openNodeScene,
    getCurrentState
  };
})();
