/**
 * SCHOOL CITY - CHOICES ENGINE (js/choices.js)
 * Manejador de decisiones interactivas, ramificaciones de guión y puntos de amistad.
 */

const ChoicesEngine = {
  renderChoices(choices, container) {
    if (!container || !choices || !choices.length) return;
    container.innerHTML = "";

    choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "vn-choice-btn";
      btn.style.animationDelay = `${index * 0.1}s`;

      const contentSpan = document.createElement("span");
      contentSpan.className = "choice-text";
      contentSpan.innerHTML = choice.text;

      btn.appendChild(contentSpan);

      // Si otorga puntos de afinidad, mostrar badge
      if (choice.relationshipChar && choice.points) {
        const tag = document.createElement("span");
        tag.className = "choice-tag";
        tag.textContent = `+${choice.points} Afinidad ❤️`;
        btn.appendChild(tag);
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        AudioManager.playClick();
        this.selectChoice(choice, container);
      });

      container.appendChild(btn);
    });
  },

  selectChoice(choice, container) {
    container.innerHTML = "";

    // Puntos de afinidad con PNJ
    if (choice.relationshipChar && choice.points) {
      RelationshipsManager.addPoints(choice.relationshipChar, choice.points);
    }

    // Recompensa de XP
    if (choice.xpReward) {
      Player.addXP(choice.xpReward);
    }

    // Registro en el diario si tiene descripción
    if (choice.diaryTitle) {
      UI.addDiaryEntry(choice.diaryTitle, choice.diaryDesc || choice.text);
    }

    // Acción callback directa (ej. abrir minijuego, abrir tienda)
    if (typeof choice.action === "function") {
      choice.action();
      return;
    }

    // Salto a otro paso del diálogo de la escena
    if (typeof choice.nextDialogueIndex === "number") {
      DialogueEngine.renderStep(choice.nextDialogueIndex);
    } else {
      DialogueEngine.advance();
    }
  }
};
