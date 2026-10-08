/**
 * SCHOOL CITY - DIALOGUE & VISUAL NOVEL ENGINE (js/dialogue.js)
 * Motor de renderizado typewriter, animaciones de sprites, reproducción automática y log histórico.
 */

const DialogueEngine = (() => {
  let currentScene = null;
  let currentStepIndex = 0;
  let isTyping = false;
  let typingTimer = null;
  let currentFullText = "";
  let currentDisplayedCharIndex = 0;
  let textSpeedMs = 28; // ms por carácter
  let isAutoPlay = false;
  let autoTimer = null;
  const dialogueHistory = [];

  // Elementos DOM de la Novela Visual
  let elStage = null;
  let elBackground = null;
  let elLocationTitle = null;
  let elSpeakerName = null;
  let elSpeakerIcon = null;
  let elSpeakerPlate = null;
  let elTextContent = null;
  let elCursor = null;
  let elContinueArrow = null;
  let elChoicesWrapper = null;
  let elSlotLeft = null;
  let elSlotCenter = null;
  let elSlotRight = null;

  function initDOM() {
    elStage = document.getElementById("screen-vn");
    elBackground = document.getElementById("vn-stage-background");
    elLocationTitle = document.getElementById("vn-location-title");
    elSpeakerName = document.getElementById("vn-speaker-text");
    elSpeakerIcon = document.getElementById("vn-speaker-icon");
    elSpeakerPlate = document.getElementById("vn-speaker-name");
    elTextContent = document.getElementById("vn-text-content");
    elCursor = document.querySelector(".vn-cursor");
    elContinueArrow = document.getElementById("vn-continue-arrow");
    elChoicesWrapper = document.getElementById("vn-choices-wrapper");
    elSlotLeft = document.getElementById("vn-sprite-left");
    elSlotCenter = document.getElementById("vn-sprite-center");
    elSlotRight = document.getElementById("vn-sprite-right");

    const elBox = document.getElementById("vn-textbox");
    if (elBox) {
      elBox.addEventListener("click", onTextBoxClick);
    }

    const btnSkip = document.getElementById("btn-vn-skip");
    if (btnSkip) {
      btnSkip.addEventListener("click", skipDialogue);
    }

    const btnAuto = document.getElementById("btn-vn-auto");
    if (btnAuto) {
      btnAuto.addEventListener("click", toggleAutoPlay);
    }

    const btnLog = document.getElementById("btn-vn-log");
    if (btnLog) {
      btnLog.addEventListener("click", showHistoryLog);
    }
  }

  // Iniciar una escena
  function startScene(sceneId, startStep = 0) {
    initDOM();
    const scene = StoryDatabase.getScene(sceneId);
    if (!scene) {
      console.error("Escena no encontrada:", sceneId);
      return;
    }

    currentScene = scene;
    currentStepIndex = startStep;

    // Configurar telón y título
    if (elBackground) {
      elBackground.className = "vn-backdrop " + (scene.bgClass || "bg-school-entrance");
    }
    if (elLocationTitle) {
      elLocationTitle.textContent = scene.locationTitle || "School City";
    }

    // Iniciar BGM del escenario
    if (scene.bgm && window.AudioManager) {
      AudioManager.playBGM(scene.bgm);
    }

    // Limpiar slots de personajes
    clearSprites();

    // Renderizar primer paso
    renderStep(currentStepIndex);
  }

  // Renderizar un paso de diálogo específico
  function renderStep(index) {
    if (!currentScene || !currentScene.dialogues || index >= currentScene.dialogues.length) {
      endScene();
      return;
    }

    currentStepIndex = index;
    const step = currentScene.dialogues[index];

    // Ocultar elecciones previas
    if (elChoicesWrapper) {
      elChoicesWrapper.innerHTML = "";
    }
    if (elContinueArrow) {
      elContinueArrow.style.display = "none";
    }

    // Formatear texto con variables
    const rawText = step.text || "";
    currentFullText = rawText.replace(/\{PLAYER_NAME\}/g, Player.data.name || "Alex");

    // Configurar hablante
    const char = CharacterRegistry.get(step.speakerId);
    const speakerName = step.speakerName || (char ? char.name : "Estudiante");
    const speakerIcon = char ? char.icon : "🎓";

    if (elSpeakerName) elSpeakerName.textContent = speakerName;
    if (elSpeakerIcon) elSpeakerIcon.textContent = speakerIcon;

    // Registrar en historial
    dialogueHistory.push({
      speaker: speakerName,
      text: currentFullText
    });

    // Actualizar sprites y slots
    updateCharacterStage(step);

    // Iniciar efecto máquina de escribir
    startTypewriter(currentFullText, () => {
      // Callback al completar escritura
      if (step.choices && step.choices.length > 0) {
        ChoicesEngine.renderChoices(step.choices, elChoicesWrapper);
      } else {
        if (elContinueArrow) elContinueArrow.style.display = "block";
        if (isAutoPlay) {
          autoTimer = setTimeout(() => {
            advance();
          }, 1800);
        }
      }

      // Disparar hook de completado si existe
      if (typeof step.onComplete === "function") {
        step.onComplete();
      }
    });
  }

  // Actualizar sprites en escena
  function updateCharacterStage(step) {
    // Atenuar todos los slots
    [elSlotLeft, elSlotCenter, elSlotRight].forEach(slot => {
      if (slot) {
        slot.classList.remove("speaking");
      }
    });

    const slotId = step.slot || "center";
    let targetSlot = elSlotCenter;
    if (slotId === "left") targetSlot = elSlotLeft;
    if (slotId === "right") targetSlot = elSlotRight;

    if (step.speakerId && targetSlot) {
      const expr = step.expression || "neutral";
      if (step.speakerId === "player" || step.speakerId === "alex") {
        targetSlot.innerHTML = Player.renderAvatarSVG(Player.data.avatar, 270, 400);
      } else {
        targetSlot.innerHTML = CharacterRegistry.renderNPCSVG(step.speakerId, expr, 270, 400);
      }
      targetSlot.classList.add("active");
      targetSlot.classList.add("speaking");
    }
  }

  function clearSprites() {
    [elSlotLeft, elSlotCenter, elSlotRight].forEach(slot => {
      if (slot) {
        slot.innerHTML = "";
        slot.classList.remove("active", "speaking");
      }
    });
  }

  // Efecto Typewriter nativo con blip sonoro
  function startTypewriter(text, onFinished) {
    if (typingTimer) clearInterval(typingTimer);
    isTyping = true;
    currentDisplayedCharIndex = 0;
    if (elTextContent) elTextContent.textContent = "";

    typingTimer = setInterval(() => {
      if (currentDisplayedCharIndex < text.length) {
        const char = text.charAt(currentDisplayedCharIndex);
        if (elTextContent) elTextContent.textContent += char;
        currentDisplayedCharIndex++;

        // Sonido leve cada 3 caracteres
        if (currentDisplayedCharIndex % 3 === 0 && AudioManager) {
          AudioManager.playTypewriter();
        }
      } else {
        finishTypewriter();
        if (typeof onFinished === "function") onFinished();
      }
    }, textSpeedMs);
  }

  function finishTypewriter() {
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
    isTyping = false;
    if (elTextContent) {
      elTextContent.textContent = currentFullText;
    }
  }

  // Interacción al hacer clic en la caja de texto
  function onTextBoxClick() {
    // Si hay botones de decisión activos en pantalla, no avanzar por clic en caja
    const step = currentScene ? currentScene.dialogues[currentStepIndex] : null;
    if (step && step.choices && step.choices.length > 0 && !isTyping) {
      return;
    }

    if (isTyping) {
      // Completar inmediatamente el texto
      finishTypewriter();
      if (step && step.choices && step.choices.length > 0) {
        ChoicesEngine.renderChoices(step.choices, elChoicesWrapper);
      } else {
        if (elContinueArrow) elContinueArrow.style.display = "block";
      }
      if (typeof step.onComplete === "function") {
        step.onComplete();
      }
    } else {
      advance();
    }
  }

  // Avanzar al siguiente paso del diálogo
  function advance() {
    if (!currentScene) return;
    const step = currentScene.dialogues[currentStepIndex];

    if (step && step.choices && step.choices.length > 0) {
      // No avanzar automáticamente si hay decisiones pendientes
      return;
    }

    if (step && typeof step.jumpTo === "number") {
      renderStep(step.jumpTo);
    } else {
      renderStep(currentStepIndex + 1);
    }
  }

  function skipDialogue() {
    if (!currentScene) return;
    // Busca el final de la escena o la siguiente decisión obligatoria
    for (let i = currentStepIndex; i < currentScene.dialogues.length; i++) {
      const step = currentScene.dialogues[i];
      if (step.choices && step.choices.length > 0) {
        renderStep(i);
        return;
      }
    }
    // Si no hay decisiones, terminar escena y volver al mapa
    endScene();
  }

  function toggleAutoPlay() {
    isAutoPlay = !isAutoPlay;
    const btn = document.getElementById("btn-vn-auto");
    if (btn) {
      btn.classList.toggle("active", isAutoPlay);
    }
    if (isAutoPlay && !isTyping) {
      advance();
    }
  }

  function showHistoryLog() {
    if (dialogueHistory.length === 0) {
      UI.showToast("No hay diálogos registrados aún", "info");
      return;
    }
    const logText = dialogueHistory.map(entry => `<b>${entry.speaker}:</b> ${entry.text}`).join("<br><br>");
    alert("HISTORIAL DE DIÁLOGOS:\n\n" + dialogueHistory.map(e => `${e.speaker}: ${e.text}`).join("\n\n"));
  }

  function endScene() {
    if (typingTimer) clearInterval(typingTimer);
    if (autoTimer) clearTimeout(autoTimer);
    isTyping = false;
    currentScene = null;
    Game.changeState("MAP");
  }

  function setTextSpeed(speedMs) {
    textSpeedMs = speedMs;
  }

  return {
    startScene,
    renderStep,
    advance,
    finishTypewriter,
    setTextSpeed,
    endScene
  };
})();
