/**
 * SCHOOL CITY - UI & DOM MANAGER (js/ui.js)
 * Controlador de capas DOM, modales, HUD, avatar creator, tienda, inventario y toasts.
 */

const UI = (() => {
  let activeModal = null;
  let activeAvatarCategory = "skin";
  let activeInvCategory = "all";
  let activeShopCategory = "boosters";
  let activeMissionFilter = "all";
  let selectedInvItem = null;
  let activeChatFriendId = "prof_luna";

  const diaryEntries = [
    {
      date: "Día 1 de Matrícula",
      title: "Llegada a School City",
      desc: "Has formalizado tu registro como nuevo estudiante de la Academia Metropolitana. La aventura académica da inicio."
    }
  ];

  // Cambio de pantalla activo
  function showScreen(screenId) {
    const screens = document.querySelectorAll(".game-screen");
    screens.forEach(s => s.classList.remove("active"));

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
    }
  }

  // Modales
  function openModal(modalName) {
    closeAllModals();
    AudioManager.playClick();
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
      modal.classList.add("active");
      activeModal = modalName;

      // Renderizar contenido según modal
      if (modalName === "profile") renderProfile();
      if (modalName === "inventory") renderInventory();
      if (modalName === "shop") renderShop();
      if (modalName === "missions") renderMissions();
      if (modalName === "achievements") renderAchievements();
      if (modalName === "friends") renderFriends();
      if (modalName === "diary") renderDiary();
    }
  }

  function closeModal(modalName) {
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
      modal.classList.remove("active");
      if (activeModal === modalName) activeModal = null;
    }
  }

  function closeAllModals() {
    const modals = document.querySelectorAll(".modal-overlay");
    modals.forEach(m => m.classList.remove("active"));
    activeModal = null;
  }

  // -----------------------------------------------------------
  // ACTUALIZACIÓN DEL HUD SUPERIOR
  // -----------------------------------------------------------
  function updateHUD() {
    const elName = document.getElementById("hud-player-name");
    const elLevel = document.getElementById("hud-player-level");
    const elXpFill = document.getElementById("hud-xp-fill");
    const elXpText = document.getElementById("hud-xp-text");
    const elCoins = document.getElementById("hud-coins");
    const elGems = document.getElementById("hud-gems");
    const shopCoins = document.getElementById("shop-coins-val");
    const shopGems = document.getElementById("shop-gems-val");

    if (elName) elName.textContent = Player.data.name || "Alex";
    if (elLevel) elLevel.textContent = `Nv. ${Player.data.level}`;

    const pct = Math.min(100, Math.round((Player.data.xp / Player.data.nextLevelXp) * 100));
    if (elXpFill) elXpFill.style.width = `${pct}%`;
    if (elXpText) elXpText.textContent = `${Player.data.xp} / ${Player.data.nextLevelXp} XP`;

    if (elCoins) elCoins.textContent = Player.data.coins.toLocaleString();
    if (elGems) elGems.textContent = Player.data.gems.toLocaleString();
    if (shopCoins) shopCoins.textContent = Player.data.coins.toLocaleString();
    if (shopGems) shopGems.textContent = Player.data.gems.toLocaleString();

    Player.renderCurrentAvatar();
  }

  // -----------------------------------------------------------
  // PANTALLA 3: CREADOR DE AVATAR CONTROLES
  // -----------------------------------------------------------
  function initAvatarCreator() {
    const inputName = document.getElementById("avatar-input-name");
    const previewName = document.getElementById("preview-student-name");

    if (inputName) {
      inputName.value = Player.data.name || "Alex";
      inputName.addEventListener("input", (e) => {
        Player.data.name = e.target.value.trim() || "Alex";
        if (previewName) previewName.textContent = Player.data.name;
      });
    }

    const catButtons = document.querySelectorAll(".avatar-cat-btn");
    catButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        AudioManager.playClick();
        catButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeAvatarCategory = btn.dataset.cat;
        renderAvatarCategoryOptions();
      });
    });

    const btnRandom = document.getElementById("btn-avatar-random");
    if (btnRandom) {
      btnRandom.onclick = randomizeAvatar;
    }

    const btnConfirm = document.getElementById("btn-avatar-confirm");
    if (btnConfirm) {
      btnConfirm.onclick = () => {
        AudioManager.playSuccess();
        SaveManager.saveGame();
        updateHUD();
        // Si ya completó o vio el tutorial, volver directamente al mapa sin repetir el tutorial
        if (Player.data && Player.data.tutorialCompleted) {
          UI.showToast("✨ ¡Avatar actualizado con éxito!", "success");
          Game.changeState("MAP");
        } else {
          // Solo la primera vez al crear estudiante entra al Tutorial
          if (Player.data) Player.data.tutorialCompleted = true;
          SaveManager.saveGame();
          Game.changeState("TUTORIAL");
        }
      };
    }

    renderAvatarCategoryOptions();
    Player.renderCurrentAvatar();
  }

  function renderAvatarCategoryOptions() {
    const container = document.getElementById("avatar-options-container");
    if (!container) return;
    container.innerHTML = "";

    const opts = Player.customizationOptions;
    const curAvatar = Player.data.avatar;

    if (activeAvatarCategory === "skin") {
      const palette = document.createElement("div");
      palette.className = "avatar-color-palette";
      opts.skinColors.forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = "color-swatch" + (curAvatar.skinColor === color ? " active" : "");
        swatch.style.backgroundColor = color;
        swatch.onclick = () => {
          Player.setAvatarProperty("skinColor", color);
          renderAvatarCategoryOptions();
        };
        palette.appendChild(swatch);
      });
      container.appendChild(palette);
    } else if (activeAvatarCategory === "hair") {
      // Estilos de cabello
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      opts.hairStyles.forEach(style => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.hairStyle === style.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${style.icon}</span><span class="style-name">${style.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("hairStyle", style.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);

      // Colores de cabello
      const pTitle = document.createElement("div");
      pTitle.style.fontSize = "0.8rem";
      pTitle.style.marginTop = "14px";
      pTitle.style.color = "var(--text-muted)";
      pTitle.textContent = "Color del Tinte:";
      container.appendChild(pTitle);

      const palette = document.createElement("div");
      palette.className = "avatar-color-palette";
      opts.hairColors.forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = "color-swatch" + (curAvatar.hairColor === color ? " active" : "");
        swatch.style.backgroundColor = color;
        swatch.onclick = () => {
          Player.setAvatarProperty("hairColor", color);
          renderAvatarCategoryOptions();
        };
        palette.appendChild(swatch);
      });
      container.appendChild(palette);
    } else if (activeAvatarCategory === "eyes") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      opts.expressions.forEach(expr => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.expression === expr.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${expr.icon}</span><span class="style-name">${expr.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("expression", expr.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    } else if (activeAvatarCategory === "top") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      // Las ropas de la tienda solo aparecen cuando se compran (están en el inventario o desbloqueadas)
      const shopExclusiveTops = ["lab_coat", "explorer_vest", "cyber_hoodie", "scholar_robe"];
      const availableTops = opts.topOutfits.filter(outfit => {
        if (!shopExclusiveTops.includes(outfit.id)) return true;
        // Solo si fue comprado en la tienda
        return Player.data.inventory && Player.data.inventory.some(i => {
          const itemDef = InventoryManager.getItem(i.id);
          return itemDef && itemDef.targetVal === outfit.id;
        });
      });
      availableTops.forEach(outfit => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.topOutfit === outfit.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${outfit.icon}</span><span class="style-name">${outfit.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("topOutfit", outfit.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    } else if (activeAvatarCategory === "bottom") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      opts.bottomOutfits.forEach(bottom => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.bottomOutfit === bottom.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${bottom.icon}</span><span class="style-name">${bottom.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("bottomOutfit", bottom.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    } else if (activeAvatarCategory === "shoes") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      opts.shoes.forEach(s => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.shoes === s.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${s.icon}</span><span class="style-name">${s.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("shoes", s.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    } else if (activeAvatarCategory === "accessory") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      // Accesorios de la tienda solo cuando se compran
      const shopExclusiveAcc = ["glasses_gold", "cat_headphones", "laurel_crown"];
      const availableAcc = opts.accessories.filter(acc => {
        if (!shopExclusiveAcc.includes(acc.id)) return true;
        return Player.data.inventory && Player.data.inventory.some(i => {
          const itemDef = InventoryManager.getItem(i.id);
          return itemDef && itemDef.targetVal === acc.id;
        });
      });
      availableAcc.forEach(acc => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.accessory === acc.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${acc.icon}</span><span class="style-name">${acc.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("accessory", acc.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    } else if (activeAvatarCategory === "pet") {
      const grid = document.createElement("div");
      grid.className = "avatar-styles-grid";
      // Mascotas adorables disponibles para acompañar al estudiante
      const availablePets = opts.pets;
      availablePets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "style-card" + (curAvatar.pet === pet.id ? " active" : "");
        card.innerHTML = `<span class="style-icon">${pet.icon}</span><span class="style-name">${pet.name}</span>`;
        card.onclick = () => {
          Player.setAvatarProperty("pet", pet.id);
          renderAvatarCategoryOptions();
        };
        grid.appendChild(card);
      });
      container.appendChild(grid);
    }
  }

  function randomizeAvatar() {
    AudioManager.playClick();
    const opts = Player.customizationOptions;
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    const shopExclusiveTops = ["lab_coat", "explorer_vest", "cyber_hoodie", "scholar_robe"];
    const availableTops = opts.topOutfits.filter(outfit => {
      if (!shopExclusiveTops.includes(outfit.id)) return true;
      return Player.data.inventory && Player.data.inventory.some(i => {
        const def = InventoryManager.getItem(i.id);
        return def && def.targetVal === outfit.id;
      });
    });

    const shopExclusiveAcc = ["glasses_gold", "cat_headphones", "laurel_crown"];
    const availableAcc = opts.accessories.filter(acc => {
      if (!shopExclusiveAcc.includes(acc.id)) return true;
      return Player.data.inventory && Player.data.inventory.some(i => {
        const def = InventoryManager.getItem(i.id);
        return def && def.targetVal === acc.id;
      });
    });

    const shopExclusivePets = [
      "cyber_cat", "hologram_pup", "astral_dragon", "mecha_bunny", 
      "crystal_fox", "quantum_panda", "phoenix_chick", "magical_slime"
    ];
    const availablePets = opts.pets.filter(pet => {
      if (!shopExclusivePets.includes(pet.id)) return true;
      return Player.data.inventory && Player.data.inventory.some(i => {
        const def = InventoryManager.getItem(i.id);
        return def && def.targetVal === pet.id;
      });
    });

    Player.data.avatar.skinColor = pick(opts.skinColors);
    Player.data.avatar.hairStyle = pick(opts.hairStyles).id;
    Player.data.avatar.hairColor = pick(opts.hairColors);
    Player.data.avatar.expression = pick(opts.expressions).id;
    Player.data.avatar.topOutfit = pick(availableTops).id;
    Player.data.avatar.bottomOutfit = pick(opts.bottomOutfits).id;
    Player.data.avatar.shoes = pick(opts.shoes).id;
    Player.data.avatar.accessory = pick(availableAcc).id;
    Player.data.avatar.pet = pick(availablePets).id;

    Player.renderCurrentAvatar();
    renderAvatarCategoryOptions();
  }

  // -----------------------------------------------------------
  // PANTALLA 6: PERFIL DEL ESTUDIANTE
  // -----------------------------------------------------------
  function renderProfile() {
    const elName = document.getElementById("profile-name-display");
    const elLevelBadge = document.getElementById("profile-level-badge");
    const elRankBadge = document.getElementById("profile-rank-badge");
    const elXpFill = document.getElementById("profile-xp-fill");
    const elXpDetail = document.getElementById("profile-xp-detail");
    const statMissions = document.getElementById("profile-stat-missions");
    const statBadges = document.getElementById("profile-stat-achievements");
    const badgesRow = document.getElementById("profile-badges-row");

    if (elName) elName.textContent = Player.data.name || "Alex";
    if (elLevelBadge) elLevelBadge.textContent = `Nivel ${Player.data.level}`;
    if (elRankBadge) elRankBadge.textContent = Player.getRankTitle();

    const pct = Math.min(100, Math.round((Player.data.xp / Player.data.nextLevelXp) * 100));
    if (elXpFill) elXpFill.style.width = `${pct}%`;
    if (elXpDetail) elXpDetail.textContent = `${Player.data.xp} / ${Player.data.nextLevelXp} XP para Nivel ${Player.data.level + 1}`;

    if (statMissions) statMissions.textContent = Player.data.completedMissions.length;
    if (statBadges) statBadges.textContent = Player.data.badges.length;

    // Badges en el perfil
    if (badgesRow) {
      badgesRow.innerHTML = "";
      const allBadges = [
        { id: "badge_first_step", name: "Iniciación", icon: "🌱" },
        { id: "badge_master_quiz", name: "Erudito", icon: "⭐" },
        { id: "badge_arena_champion", name: "Gladiador", icon: "⚡" },
        { id: "badge_math_genius", name: "Genio de Mates", icon: "📐" }
      ];

      allBadges.forEach(b => {
        const unlocked = Player.data.badges.includes(b.id);
        const bEl = document.createElement("div");
        bEl.className = "profile-chip" + (unlocked ? " level-chip" : "");
        bEl.style.opacity = unlocked ? "1" : "0.35";
        bEl.innerHTML = `${b.icon} ${b.name}`;
        badgesRow.appendChild(bEl);
      });
    }

    const btnCustomize = document.getElementById("btn-profile-customize");
    if (btnCustomize) {
      btnCustomize.onclick = () => {
        closeModal("profile");
        Game.changeState("AVATAR_CREATOR");
      };
    }

    const btnEditName = document.getElementById("btn-profile-edit-name");
    if (btnEditName) {
      btnEditName.onclick = () => {
        const n = prompt("Ingresa tu nuevo nombre de estudiante:", Player.data.name);
        if (n && n.trim()) {
          Player.data.name = n.trim().substring(0, 16);
          updateHUD();
          renderProfile();
          SaveManager.saveGame();
        }
      };
    }

    Player.renderCurrentAvatar();
  }

  // -----------------------------------------------------------
  // PANTALLA 17: INVENTARIO / MOCHILA
  // -----------------------------------------------------------
  function renderInventory() {
    const grid = document.getElementById("inv-grid-container");
    const detail = document.getElementById("inv-detail-panel");
    const capText = document.getElementById("inv-capacity-text");
    if (!grid) return;

    grid.innerHTML = "";
    const items = Player.data.inventory || [];
    if (capText) capText.textContent = `Objetos en Mochila: ${items.length}`;

    // Filtrado
    const filtered = items.filter(it => {
      if (activeInvCategory === "all") return true;
      return it.type === activeInvCategory;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="inv-empty-hint">No tienes objetos en esta sección.</div>`;
    }

    filtered.forEach(it => {
      const def = InventoryManager.getItem(it.id);
      if (!def) return;

      const card = document.createElement("div");
      card.className = "item-card" + (selectedInvItem && selectedInvItem.id === it.id ? " active" : "");
      card.innerHTML = `
        <div class="item-icon-box">${def.icon}</div>
        <div class="item-name">${def.name}</div>
        <span class="item-qty-badge">x${it.qty}</span>
      `;
      card.onclick = () => {
        AudioManager.playClick();
        selectedInvItem = it;
        renderInventory();
      };
      grid.appendChild(card);
    });

    // Detalle del objeto
    if (detail) {
      if (selectedInvItem) {
        const def = InventoryManager.getItem(selectedInvItem.id);
        detail.innerHTML = `
          <div class="inv-detail-content">
            <div class="inv-detail-icon">${def.icon}</div>
            <div class="inv-detail-type">${def.type.replace('_', ' ')}</div>
            <div class="inv-detail-title">${def.name}</div>
            <div class="inv-detail-desc">${def.desc}</div>
            <div style="font-size: 0.85rem; font-weight:700; color:var(--accent-gold);">Cantidad: x${selectedInvItem.qty}</div>
          </div>
          <button id="btn-inv-use-item" class="btn btn-primary btn-block" style="margin-top: 15px;">
            ${def.type === 'exercise_pack' ? '📖 Resolver Cuaderno' : (def.type === 'booster' ? '⚡ Ver en Reto' : '✨ Equipar')}
          </button>
        `;
        document.getElementById("btn-inv-use-item").onclick = () => {
          InventoryManager.useItem(selectedInvItem.id);
          renderInventory();
        };
      } else {
        detail.innerHTML = `<div class="inv-empty-hint">Selecciona un objeto para ver sus detalles</div>`;
      }
    }
  }

  // -----------------------------------------------------------
  // PANTALLA 11 & 22: TIENDA DE MATEMÁTICAS & BAZAR
  // -----------------------------------------------------------
  function renderShop() {
    const grid = document.getElementById("shop-grid-container");
    if (!grid) return;
    grid.innerHTML = "";

    const sCoins = document.getElementById("shop-coins-val");
    const sGems = document.getElementById("shop-gems-val");
    if (sCoins) sCoins.textContent = Player.data.coins.toLocaleString();
    if (sGems) sGems.textContent = Player.data.gems.toLocaleString();

    const catalog = InventoryManager.catalog;
    const items = Object.values(catalog);

    // Filtrar por pestaña
    const filtered = items.filter(it => {
      if (activeShopCategory === "boosters") return it.type === "booster";
      if (activeShopCategory === "exercise_packs") return it.type === "exercise_pack";
      if (activeShopCategory === "financial") return false; // sección interactiva especial
      if (activeShopCategory === "cosmetics") return it.type === "cosmetic" || it.type === "pet";
      return true;
    });

    if (activeShopCategory === "financial") {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 20px; text-align: center; background: rgba(0,0,0,0.3); border-radius: 12px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">💰</div>
          <h3>Simulador Financiero de Madame Decimal</h3>
          <p style="color: var(--text-muted); margin: 10px 0 20px 0;">Aprende a devolver el cambio exacto y calcular descuentos comerciales para ganar monedas y XP extra.</p>
          <button id="btn-launch-cashier" class="btn btn-primary btn-large glow-effect">
            🚀 Iniciar Simulador de Caja y Vueltos
          </button>
        </div>
      `;
      document.getElementById("btn-launch-cashier").onclick = () => {
        closeModal("shop");
        MinigamesEngine.startChallenge("financial_cashier");
      };
      return;
    }

    filtered.forEach(it => {
      const card = document.createElement("div");
      card.className = "shop-item-card";
      card.innerHTML = `
        <div class="shop-item-icon">${it.icon}</div>
        <div class="shop-item-title">${it.name}</div>
        <div class="shop-item-desc">${it.desc}</div>
        <div class="shop-item-price">
          ${it.priceCoins > 0 ? `<span>🪙 ${it.priceCoins}</span>` : ''}
          ${it.priceGems > 0 ? `<span>💎 ${it.priceGems}</span>` : ''}
        </div>
        <button class="btn btn-secondary btn-mini btn-buy" style="margin-top: 6px;">Comprar</button>
      `;
      card.querySelector(".btn-buy").onclick = () => {
        InventoryManager.buyItem(it.id);
      };
      grid.appendChild(card);
    });
  }

  // -----------------------------------------------------------
  // PANTALLA 15: DETALLE DE MISIÓN Y TABLÓN
  // -----------------------------------------------------------
  function renderMissions() {
    const list = document.getElementById("missions-list-container");
    if (!list) return;
    list.innerHTML = "";

    const missions = MissionsManager.getAll(activeMissionFilter);
    missions.forEach(m => {
      const card = document.createElement("div");
      card.className = `mission-card status-${m.status.toLowerCase()}`;
      card.innerHTML = `
        <div class="mission-info">
          <h4>${m.title}</h4>
          <p>${m.desc}</p>
          <div class="mission-rewards-preview">
            <span>⭐ +${m.rewards.xp} XP</span>
            <span>🪙 +${m.rewards.coins} Monedas</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-mini">${m.status === 'COMPLETED' ? '✅ Hecho' : (m.status === 'ACTIVE' ? '▶ En Curso' : 'Ver Detalle')}</button>
      `;
      card.onclick = () => {
        openMissionDetail(m.id);
      };
      list.appendChild(card);
    });
  }

  function openMissionDetail(missionId) {
    const m = MissionsManager.get(missionId);
    if (!m) return;

    const giver = CharacterRegistry.get(m.giverId);
    document.getElementById("mdet-title").textContent = m.title;
    document.getElementById("mdet-giver-name").textContent = giver ? giver.name : "Academia";
    document.getElementById("mdet-giver-avatar").textContent = giver ? giver.icon : "🎓";
    document.getElementById("mdet-desc").textContent = m.desc;

    const objList = document.getElementById("mdet-obj-list");
    objList.innerHTML = m.objectives.map(o => `
      <li>${o.done ? '✅' : '⚪'} ${o.text}</li>
    `).join('');

    const rewardsRow = document.getElementById("mdet-rewards-row");
    rewardsRow.innerHTML = `
      <div class="reward-pill"><span class="reward-icon">⭐</span> +${m.rewards.xp} XP</div>
      <div class="reward-pill"><span class="reward-icon">🪙</span> +${m.rewards.coins} Monedas</div>
      ${m.rewards.item ? `<div class="reward-pill"><span class="reward-icon">🎁</span> Objeto</div>` : ''}
    `;

    const btnStart = document.getElementById("btn-start-mission");
    if (m.status === "COMPLETED") {
      btnStart.textContent = "✅ MISIÓN COMPLETADA";
      btnStart.disabled = true;
    } else {
      btnStart.textContent = "🚀 INICIAR MISIÓN";
      btnStart.disabled = false;
      btnStart.onclick = () => {
        MissionsManager.startMission(m.id);
        // Si la misión apunta a un nodo, llevarlo allí
        if (giver && giver.location) {
          Game.openNodeScene(giver.location);
        }
      };
    }

    openModal("mission-detail");
  }

  // -----------------------------------------------------------
  // PANTALLA 16: PANTALLA DE MISIÓN COMPLETADA (RESULTADOS)
  // -----------------------------------------------------------
  function showMissionCompletedModal(title, stars = 3, xp = 150, coins = 100, item = null) {
    const elName = document.getElementById("victory-mission-name");
    const elStars = document.getElementById("victory-stars");
    const elXp = document.getElementById("victory-xp-val");
    const elCoins = document.getElementById("victory-coins-val");
    const elItemPill = document.getElementById("victory-item-pill");
    const elItemVal = document.getElementById("victory-item-val");

    if (elName) elName.textContent = title;
    if (elXp) elXp.textContent = `+${xp} XP`;
    if (elCoins) elCoins.textContent = `+${coins} Monedas`;

    if (elStars) {
      const starSpans = elStars.querySelectorAll(".star-icon");
      starSpans.forEach((s, idx) => {
        s.classList.toggle("achieved", idx < stars);
      });
    }

    if (elItemPill) {
      if (item) {
        elItemPill.style.display = "flex";
        if (elItemVal) elItemVal.textContent = item;
      } else {
        elItemPill.style.display = "none";
      }
    }

    const btnClaim = document.getElementById("btn-claim-rewards");
    btnClaim.onclick = () => {
      AudioManager.playCoin();
      closeModal("mission-completed");
    };

    openModal("mission-completed");
  }

  // -----------------------------------------------------------
  // LOGROS E INSIGNIAS (PANTALLA 18)
  // -----------------------------------------------------------
  function renderAchievements() {
    const list = document.getElementById("achievements-list-container");
    if (!list) return;
    list.innerHTML = "";

    const catalog = [
      { id: "badge_first_step", name: "Primer Paso Académico", desc: "Completa el registro y la orientación inicial.", xp: 50, coins: 50 },
      { id: "badge_master_quiz", name: "Maestro de Evaluaciones", desc: "Supera con éxito un examen o reto disciplinar.", xp: 100, coins: 150 },
      { id: "badge_arena_champion", name: "Gladiador de la Mente", desc: "Conquista el torneo contrarreloj en la Arena.", xp: 200, coins: 300 },
      { id: "badge_math_genius", name: "Genio Financiero", desc: "Domina el simulador de vuelto de Madame Decimal.", xp: 120, coins: 180 }
    ];

    catalog.forEach(ach => {
      const unlocked = Player.data.badges.includes(ach.id);
      const card = document.createElement("div");
      card.className = "mission-card" + (unlocked ? " status-completed" : "");
      card.innerHTML = `
        <div class="mission-info">
          <h4>${unlocked ? '🏆' : '🔒'} ${ach.name}</h4>
          <p>${ach.desc}</p>
          <div class="mission-rewards-preview">
            <span>+${ach.xp} XP</span>
            <span>+${ach.coins} Monedas</span>
          </div>
        </div>
        <span class="profile-chip ${unlocked ? 'level-chip' : ''}">${unlocked ? 'Completado' : 'Bloqueado'}</span>
      `;
      list.appendChild(card);
    });
  }

  // -----------------------------------------------------------
  // AMIGOS Y CHAT INTERACTIVO (PANTALLA 19 Y 20)
  // -----------------------------------------------------------
  function renderFriends() {
    const sidebar = document.getElementById("friends-list-container");
    const chatWin = document.getElementById("friends-chat-container");
    if (!sidebar) return;

    sidebar.innerHTML = "";
    const chars = Object.values(CharacterRegistry.characters);

    chars.forEach(c => {
      const item = document.createElement("div");
      item.className = "friend-item" + (c.id === activeChatFriendId ? " active" : "");
      item.innerHTML = `
        <div class="friend-avatar">
          ${c.icon}
          <span class="friend-status-dot ${c.isOnline ? 'status-online' : 'status-busy'}"></span>
        </div>
        <div class="friend-info">
          <span class="friend-name">${c.name}</span>
          <span class="friend-role">${c.chatStatus}</span>
        </div>
      `;
      item.onclick = () => {
        activeChatFriendId = c.id;
        renderFriends();
      };
      sidebar.appendChild(item);
    });

    // Ventana de chat
    const curFriend = CharacterRegistry.get(activeChatFriendId);
    if (chatWin && curFriend) {
      chatWin.innerHTML = `
        <div style="padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.4rem;">${curFriend.icon}</span>
          <div>
            <div style="font-weight: 700; color: #fff;">${curFriend.name}</div>
            <div style="font-size: 0.72rem; color: var(--accent-emerald);">● ${curFriend.chatStatus}</div>
          </div>
        </div>

        <div class="chat-history" id="chat-messages-box">
          <div class="chat-bubble npc-bubble">
            ¡Hola, ${Player.data.name}! ${curFriend.chatResponses[0]}
          </div>
        </div>

        <div class="chat-input-bar">
          <input type="text" id="chat-user-input" placeholder="Escribe un mensaje de consulta escolar...">
          <button id="btn-chat-send" class="btn btn-primary btn-mini">Enviar</button>
        </div>
      `;

      const input = document.getElementById("chat-user-input");
      const btnSend = document.getElementById("btn-chat-send");
      const msgBox = document.getElementById("chat-messages-box");

      const sendMsg = () => {
        const txt = input.value.trim();
        if (!txt) return;

        AudioManager.playClick();
        const userBubble = document.createElement("div");
        userBubble.className = "chat-bubble player-bubble";
        userBubble.textContent = txt;
        msgBox.appendChild(userBubble);
        input.value = "";

        setTimeout(() => {
          AudioManager.playTypewriter();
          const npcBubble = document.createElement("div");
          npcBubble.className = "chat-bubble npc-bubble";
          const randomReply = curFriend.chatResponses[Math.floor(Math.random() * curFriend.chatResponses.length)];
          npcBubble.textContent = randomReply;
          msgBox.appendChild(npcBubble);
          msgBox.scrollTop = msgBox.scrollHeight;
        }, 700);
      };

      btnSend.onclick = sendMsg;
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMsg();
      });
    }
  }

  // -----------------------------------------------------------
  // DIARIO DE AVENTURAS (PANTALLA 21)
  // -----------------------------------------------------------
  function addDiaryEntry(title, desc) {
    diaryEntries.unshift({
      date: `Nivel ${Player.data.level} - Registro Académico`,
      title,
      desc
    });
    SaveManager.saveGame();
  }

  function renderDiary() {
    const container = document.getElementById("diary-entries-container");
    if (!container) return;
    container.innerHTML = "";

    diaryEntries.forEach(entry => {
      const card = document.createElement("div");
      card.className = "diary-entry-card animate-zoom-in";
      card.innerHTML = `
        <div class="diary-date">${entry.date}</div>
        <div class="diary-title">${entry.title}</div>
        <div class="diary-desc">${entry.desc}</div>
      `;
      container.appendChild(card);
    });
  }

  // -----------------------------------------------------------
  // TOAST NOTIFICATIONS
  // -----------------------------------------------------------
  function showToast(message, type = "info") {
    const stack = document.getElementById("toast-container");
    if (!stack) return;

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "reward") icon = "✨";
    if (type === "error") icon = "⚠️";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    stack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function renderAllModals() {
    renderProfile();
    renderInventory();
    renderShop();
    renderMissions();
    renderAchievements();
  }

  return {
    showScreen,
    openModal,
    closeModal,
    closeAllModals,
    updateHUD,
    initAvatarCreator,
    renderAvatarCategoryOptions,
    renderProfile,
    renderInventory,
    renderShop,
    renderMissions,
    openMissionDetail,
    showMissionCompletedModal,
    renderAchievements,
    renderFriends,
    renderDiary,
    addDiaryEntry,
    showToast,
    renderAllModals,
    get diaryEntries() { return diaryEntries; },
    set diaryEntries(val) { diaryEntries.length = 0; diaryEntries.push(...val); },
    get activeInvCategory() { return activeInvCategory; },
    set activeInvCategory(val) { activeInvCategory = val; },
    get activeShopCategory() { return activeShopCategory; },
    set activeShopCategory(val) { activeShopCategory = val; },
    get activeMissionFilter() { return activeMissionFilter; },
    set activeMissionFilter(val) { activeMissionFilter = val; }
  };
})();

window.UI = UI;
