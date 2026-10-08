/**
 * SCHOOL CITY - PLAYER & AVATAR ENGINE (js/player.js)
 * Sistema de renderizado de avatar en capas SVG 100% armonizado con el estilo visual de los PNJ de School City,
 * con cuerpo completo (cabeza, torso, piernas y calzado) e integración dinámica de ropa inferior y calzado.
 */

const Player = {
  data: {
    name: "Alex",
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    coins: 1250,
    gems: 320,
    avatar: {
      skinColor: "#ffe0bd",
      hairStyle: "sophia_waves",
      hairColor: "#b07d62",
      eyeStyle: "normal",
      eyeColor: "#00b4d8",
      expression: "happy",
      topOutfit: "uniform_shirt",
      bottomOutfit: "uniform_pants",
      shoes: "sneakers_white",
      accessory: "none",
      pet: "kitsune_spirit"
    },
    inventory: [
      { id: "item_hint_5050", name: "Lupa de Pistas", qty: 2, type: "booster" },
      { id: "pack_subtraction", name: "Cuaderno de Restas", qty: 1, type: "exercise_pack" },
      { id: "item_time_potion", name: "Poción de Tiempo +10s", qty: 3, type: "booster" },
      { id: "item_shield", name: "Escudo de Error", qty: 1, type: "booster" }
    ],
    relationships: {},
    completedMissions: [],
    badges: ["badge_first_step"],
    tutorialCompleted: false
  },

  // Catálogo maestro estilizado de opciones
  customizationOptions: {
    skinColors: ["#ffe5d9", "#ffe0bd", "#fcd5ce", "#e2a77a", "#b77a4a", "#815330", "#4e2b17"],
    hairStyles: [
      // ESTILOS FEMENINOS Y UNISEX INSPIRADOS EN LA ERUDICIÓN DE SOPHIA
      { id: "sophia_waves", name: "Ondas de Seda Sophia", icon: "📖" },
      { id: "flow_long", name: "Melena Larga de Biblioteca", icon: "🌊" },
      { id: "academy_ponytail", name: "Coleta de Honor Académica", icon: "✨" },
      { id: "twin_ribbons", name: "Coletas de Seda con Lazos", icon: "🎀" },
      { id: "elegant_bob", name: "Bob Asimétrico de Seda", icon: "💎" },
      { id: "curly_fluffy", name: "Rizos Suaves de Ángel", icon: "☁️" },
      { id: "hime_bangs", name: "Corte Princesa de Seda Recto", icon: "👑" },
      // ESTILOS MASCULINOS Y URBANOS PARA HOMBRE
      { id: "kpop_curtain", name: "Cortina K-Pop Anime", icon: "💫" },
      { id: "messy_anime_boy", name: "Despeinado Shonen", icon: "🌪️" },
      { id: "fluffy_comma_hair", name: "Flequillo Coma K-Drama", icon: "✨" },
      { id: "classic_crop", name: "Corte Erudito Pulcro", icon: "🎩" },
      { id: "side_part_gentleman", name: "Raya Lateral Caballero", icon: "💼" },
      { id: "samurai_man_bun", name: "Moño Samurai Top Knot", icon: "🗡️" },
      { id: "undercut_modern", name: "Undercut Deportivo Urbano", icon: "🏃" },
      { id: "shonen_spiky", name: "Corte Dinámico Shonen", icon: "⚡" },
      { id: "scientist_wild", name: "Corte Erudito con Ahoge", icon: "🧪" },
      { id: "wolf_shag", name: "Capas Onduladas Wolf Cut", icon: "🐺" },
      { id: "buzz_fade_cool", name: "Fade Corto Deportivo", icon: "✂️" },
      { id: "dreadlocks_short", name: "Dreads Cortos Urbanos", icon: "🎵" }
    ],
    hairColors: [
      "#2b2d42", // Negro noche
      "#3d2645", // Castaño oscuro
      "#8d5b4c", // Caramelo avellana
      "#d4a373", // Rubio dorado
      "#b83b5e", // Carmesí borgoña
      "#00b4d8", // Azul zafiro neón
      "#8338ec", // Púrpura amatista
      "#e2e8f0", // Plata lunar
      "#06d6a0"  // Menta esmeralda
    ],
    expressions: [
      { id: "happy", name: "Sonrisa Cálida", icon: "😊" },
      { id: "serious", name: "Mirada Firme", icon: "🧐" },
      { id: "surprised", name: "Curiosidad", icon: "😮" },
      { id: "wink", name: "Guiño Pícaro", icon: "😉" }
    ],
    eyeColors: ["#00b4d8", "#06d6a0", "#8338ec", "#ffd166", "#ef476f", "#4a3b32", "#1d3557"],
    topOutfits: [
      { id: "uniform_shirt", name: "Blazer Escolar Mayor", icon: "👔" },
      { id: "scholar_dress", name: "Vestido Escolar Pinafore", icon: "👗" },
      { id: "spring_sundress", name: "Vestido Floral de Primavera", icon: "🌸" },
      { id: "gothic_dress", name: "Vestido Lolita Victoriano", icon: "🖤" },
      { id: "casual_sweater", name: "Suéter Oversized Pastel", icon: "🧶" },
      { id: "sailor_dress", name: "Vestido Marinero Escolar", icon: "⚓" },
      { id: "cyber_hoodie", name: "Sudadera Cyberpunk", icon: "🧥" },
      { id: "lab_coat", name: "Bata Quantum de Ciencia", icon: "🥼" },
      { id: "explorer_vest", name: "Chaqueta de Expedición", icon: "🦺" },
      { id: "scholar_robe", name: "Túnica de Gran Honor", icon: "🎓" }
    ],
    bottomOutfits: [
      { id: "uniform_pants", name: "Pantalón de Gala", icon: "👖" },
      { id: "uniform_skirt", name: "Falda Plisada Escolar", icon: "👗" },
      { id: "cargo_pants", name: "Pantalón Táctico Cargo", icon: "🎒" },
      { id: "frill_petticoat", name: "Cancán de Encaje / Medias", icon: "✨" },
      { id: "denim_shorts", name: "Shorts Denim con Medias", icon: "🩳" }
    ],
    shoes: [
      { id: "sneakers_white", name: "Zapatillas High-Top", icon: "👟" },
      { id: "boots_leather", name: "Botas de Explorador", icon: "🥾" },
      { id: "shoes_formal", name: "Mocasines Académicos", icon: "👞" },
      { id: "mary_janes", name: "Zapatos Mary Jane con Medias", icon: "👠" },
      { id: "ankle_boots", name: "Botines con Cordones", icon: "👢" }
    ],
    accessories: [
      { id: "none", name: "Sin accesorio", icon: "🚫" },
      { id: "glasses_gold", name: "Gafas de Oro Fino", icon: "👓" },
      { id: "cat_headphones", name: "Headset Orejas de Gato RGB", icon: "🎧" },
      { id: "laurel_crown", name: "Corona de Laureles de Oro", icon: "🌿" },
      { id: "beret_artist", name: "Boina con Pin de Honor", icon: "🎨" },
      { id: "hair_clips", name: "Pasadores Estrella Neón", icon: "⭐" },
      { id: "cyber_visor", name: "Visor Holográfico Scouter", icon: "👁️" }
    ],
    pets: [
      { id: "kitsune_spirit", name: "Kitsune Místico Sagrado", icon: "🦊" },
      { id: "robot_owl", name: "Búho Robótico Archimedes", icon: "🦉" },
      { id: "cyber_cat", name: "Gatita Kawaii Pixel", icon: "🐱" },
      { id: "hologram_pup", name: "Cachorro Holográfico Spark", icon: "🐶" },
      { id: "astral_dragon", name: "Mini Dragón Astral Draco", icon: "🐉" },
      { id: "mecha_bunny", name: "Conejita Mecha Usagi", icon: "🐰" },
      { id: "crystal_fox", name: "Zorrito Ártico de Nieve", icon: "❄️" },
      { id: "quantum_panda", name: "Panda Cuántico Bambu", icon: "🐼" },
      { id: "phoenix_chick", name: "Polluelo Fénix Sol", icon: "🐥" },
      { id: "magical_slime", name: "Slime Galáctico Pochi", icon: "🫧" },
      { id: "none", name: "Sin Mascota", icon: "🚫" }
    ]
  },

  getRankTitle() {
    const lvl = this.data.level;
    if (lvl < 2) return "Estudiante Novato";
    if (lvl < 4) return "Explorador de Aulas";
    if (lvl < 7) return "Investigador Becado";
    if (lvl < 10) return "Sabio de la Metrópolis";
    return "Leyenda de School City";
  },

  addXP(amount) {
    this.data.xp += amount;
    let leveledUp = false;

    while (this.data.xp >= this.data.nextLevelXp) {
      this.data.xp -= this.data.nextLevelXp;
      this.data.level++;
      this.data.nextLevelXp = Math.floor(100 * Math.pow(1.35, this.data.level - 1));
      leveledUp = true;
      this.addCoins(100 * this.data.level);
      this.addGems(15);
    }

    if (leveledUp) {
      if (typeof AudioManager !== "undefined") AudioManager.playLevelUp();
      if (window.UI) {
        UI.showToast(`🎉 ¡SUBISTE A NIVEL ${this.data.level}! Recompensas añadidas.`, "reward");
      }
    } else {
      if (window.UI) {
        UI.showToast(`+${amount} XP ganados`, "success");
      }
    }

    if (window.UI) UI.updateHUD();
    if (typeof SaveManager !== "undefined") SaveManager.saveGame();
    return leveledUp;
  },

  addCoins(amount) {
    this.data.coins += amount;
    if (typeof AudioManager !== "undefined") AudioManager.playCoin();
    if (window.UI) {
      UI.updateHUD();
      UI.showToast(`+${amount} Monedas Académicas`, "reward");
    }
    if (typeof SaveManager !== "undefined") SaveManager.saveGame();
  },

  spendCoins(amount) {
    if (this.data.coins >= amount) {
      this.data.coins -= amount;
      const elShop = document.getElementById("shop-coins-val");
      if (elShop) elShop.textContent = this.data.coins.toLocaleString();
      const elHud = document.getElementById("hud-coins");
      if (elHud) elHud.textContent = this.data.coins.toLocaleString();
      if (typeof UI !== "undefined") UI.updateHUD();
      if (typeof SaveManager !== "undefined") SaveManager.saveGame();
      return true;
    }
    return false;
  },

  addGems(amount) {
    this.data.gems += amount;
    if (typeof AudioManager !== "undefined") AudioManager.playSuccess();
    const elShop = document.getElementById("shop-gems-val");
    if (elShop) elShop.textContent = this.data.gems.toLocaleString();
    const elHud = document.getElementById("hud-gems");
    if (elHud) elHud.textContent = this.data.gems.toLocaleString();
    if (typeof UI !== "undefined") {
      UI.updateHUD();
      UI.showToast(`+${amount} Gemas de Conocimiento`, "reward");
    }
    if (typeof SaveManager !== "undefined") SaveManager.saveGame();
  },

  spendGems(amount) {
    if (this.data.gems >= amount) {
      this.data.gems -= amount;
      const elShop = document.getElementById("shop-gems-val");
      if (elShop) elShop.textContent = this.data.gems.toLocaleString();
      const elHud = document.getElementById("hud-gems");
      if (elHud) elHud.textContent = this.data.gems.toLocaleString();
      if (typeof UI !== "undefined") UI.updateHUD();
      if (typeof SaveManager !== "undefined") SaveManager.saveGame();
      return true;
    }
    return false;
  },

  addBadge(badgeId) {
    if (!this.data.badges.includes(badgeId)) {
      this.data.badges.push(badgeId);
      if (typeof AudioManager !== "undefined") AudioManager.playVictory();
      if (window.UI) {
        UI.showToast(`🏆 ¡Nueva Insignia Desbloqueada!`, "reward");
      }
      if (typeof SaveManager !== "undefined") SaveManager.saveGame();
    }
  },

  setAvatarProperty(prop, value) {
    if (this.data.avatar.hasOwnProperty(prop)) {
      this.data.avatar[prop] = value;
      this.renderCurrentAvatar();
    }
  },

  renderCurrentAvatar() {
    const previewEl = document.getElementById("avatar-render-target");
    if (previewEl) {
      previewEl.innerHTML = this.renderAvatarSVG(this.data.avatar, 270, 500);
    }
    const petEl = document.getElementById("pet-render-target");
    if (petEl) {
      petEl.innerHTML = this.renderPetSVG(this.data.avatar.pet, 85, 85);
    }
    const hudAvatar = document.getElementById("hud-avatar-preview");
    if (hudAvatar) {
      hudAvatar.innerHTML = this.renderAvatarSVG(this.data.avatar, 44, 44, true);
    }
    const profileAvatar = document.getElementById("profile-avatar-canvas");
    if (profileAvatar) {
      const petHtml = (this.data.avatar.pet && this.data.avatar.pet !== 'none')
        ? `<div style="position:absolute; bottom:6px; right:6px; width:56px; height:56px; z-index:3; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.6)); pointer-events:none;" class="animate-float">${this.renderPetSVG(this.data.avatar.pet, 56, 56)}</div>`
        : '';
      profileAvatar.innerHTML = `
        <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
          ${this.renderAvatarSVG(this.data.avatar, 136, 272)}
          ${petHtml}
        </div>
      `;
    }
  },

  // =========================================================================
  // RENDERIZADOR SVG VECTORIAL CUERPO COMPLETO Y MÁXIMO DETALLE
  // Mantiene compatibilidad total de capa y viewBox ampliado a (0 0 200 400)
  // =========================================================================
  renderAvatarSVG(avatar, width = 270, height = 500, isHeadOnly = false) {
    const skin = avatar.skinColor || "#ffe0bd";
    const hairC = avatar.hairColor || "#3d2645";
    const hairStyle = avatar.hairStyle || "elegant_bob";
    const eyeC = avatar.eyeColor || "#00b4d8";
    const expr = avatar.expression || "happy";
    const top = avatar.topOutfit || "uniform_shirt";
    const bottom = avatar.bottomOutfit || "uniform_pants";
    const shoes = avatar.shoes || "sneakers_white";
    const acc = avatar.accessory || "none";

    const viewBox = isHeadOnly ? "45 22 110 115" : "0 0 200 400";

    // -------------------------------------------------------------
    // EXPRESIONES FACIALES (OJOS, CEJAS, BOCA)
    // -------------------------------------------------------------
    let eyesSvg = '';
    let mouthSvg = '';

    if (expr === 'happy') {
      eyesSvg = `
        <!-- Cejas -->
        <path d="M78 73 Q86 69 94 73" stroke="#1b2a47" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <path d="M106 73 Q114 69 122 73" stroke="#1b2a47" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <!-- Pestañas y Base del Ojo -->
        <path d="M76 80 Q86 74 96 81" stroke="#1b2a47" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M104 81 Q114 74 124 80" stroke="#1b2a47" stroke-width="3" fill="none" stroke-linecap="round" />
        <ellipse cx="86" cy="85" rx="6.5" ry="7.5" fill="#1b2a47" />
        <ellipse cx="114" cy="85" rx="6.5" ry="7.5" fill="#1b2a47" />
        <ellipse cx="86" cy="86" rx="5" ry="6" fill="${eyeC}" />
        <ellipse cx="114" cy="86" rx="5" ry="6" fill="${eyeC}" />
        <ellipse cx="86" cy="86" rx="2.5" ry="3" fill="#0f172a" />
        <ellipse cx="114" cy="86" rx="2.5" ry="3" fill="#0f172a" />
        <!-- Destellos de Luz / Catchlights Anime -->
        <circle cx="83.5" cy="82.5" r="2.2" fill="#fff" />
        <circle cx="111.5" cy="82.5" r="2.2" fill="#fff" />
        <circle cx="88.5" cy="88" r="1.2" fill="#fff" />
        <circle cx="116.5" cy="88" r="1.2" fill="#fff" />
      `;
      mouthSvg = `
        <path d="M91 101 Q100 114 109 101 Z" fill="#e63946" stroke="#a02937" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M93 101 Q100 105 107 101" fill="#fff" />
        <path d="M94 108 Q100 114 106 108" fill="#ff758f" />
      `;
    } else if (expr === 'serious') {
      eyesSvg = `
        <!-- Cejas Firmes -->
        <line x1="77" y1="75" x2="94" y2="72" stroke="#1b2a47" stroke-width="2.4" stroke-linecap="round" />
        <line x1="106" y1="72" x2="123" y2="75" stroke="#1b2a47" stroke-width="2.4" stroke-linecap="round" />
        <!-- Ojos Determinados -->
        <path d="M78 80 L95 80" stroke="#1b2a47" stroke-width="3.2" stroke-linecap="round" />
        <path d="M105 80 L122 80" stroke="#1b2a47" stroke-width="3.2" stroke-linecap="round" />
        <ellipse cx="86" cy="85" rx="6" ry="6.5" fill="#1b2a47" />
        <ellipse cx="114" cy="85" rx="6" ry="6.5" fill="#1b2a47" />
        <ellipse cx="86" cy="85" rx="4.5" ry="5" fill="${eyeC}" />
        <ellipse cx="114" cy="85" rx="4.5" ry="5" fill="${eyeC}" />
        <ellipse cx="86" cy="85" rx="2.2" ry="2.5" fill="#0f172a" />
        <ellipse cx="114" cy="85" rx="2.2" ry="2.5" fill="#0f172a" />
        <circle cx="83.5" cy="83" r="1.8" fill="#fff" />
        <circle cx="111.5" cy="83" r="1.8" fill="#fff" />
      `;
      mouthSvg = `<line x1="93" y1="103" x2="107" y2="103" stroke="#9d2c3e" stroke-width="2.5" stroke-linecap="round" />`;
    } else if (expr === 'surprised') {
      eyesSvg = `
        <!-- Cejas Alzadas -->
        <path d="M78 71 Q86 66 94 71" stroke="#1b2a47" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <path d="M106 71 Q114 66 122 71" stroke="#1b2a47" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <!-- Ojos Redondos y Abiertos -->
        <ellipse cx="86" cy="84" rx="7.5" ry="8" fill="#fff" stroke="#1b2a47" stroke-width="2.2" />
        <ellipse cx="114" cy="84" rx="7.5" ry="8" fill="#fff" stroke="#1b2a47" stroke-width="2.2" />
        <circle cx="86" cy="84" r="5" fill="${eyeC}" />
        <circle cx="114" cy="84" r="5" fill="${eyeC}" />
        <circle cx="86" cy="84" r="2.5" fill="#0f172a" />
        <circle cx="114" cy="84" r="2.5" fill="#0f172a" />
        <circle cx="83.5" cy="81.5" r="2" fill="#fff" />
        <circle cx="111.5" cy="81.5" r="2" fill="#fff" />
      `;
      mouthSvg = `
        <ellipse cx="100" cy="104" rx="5" ry="6.5" fill="#a02937" stroke="#701824" stroke-width="1.5" />
        <ellipse cx="100" cy="103" rx="3.5" ry="4.5" fill="#d90429" />
      `;
    } else if (expr === 'wink') {
      eyesSvg = `
        <!-- Guiño Pícaro -->
        <path d="M78 73 Q86 69 94 73" stroke="#1b2a47" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M106 73 Q114 69 122 73" stroke="#1b2a47" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M76 84 Q86 78 96 85" stroke="#1b2a47" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <polygon points="72,80 75,82 73,85 71,82" fill="#ffd166" />
        <polygon points="98,80 101,82 99,85 97,82" fill="#ffd166" />
        <path d="M104 80 Q114 74 124 80" stroke="#1b2a47" stroke-width="3" fill="none" stroke-linecap="round" />
        <ellipse cx="114" cy="85" rx="6.5" ry="7.5" fill="#1b2a47" />
        <ellipse cx="114" cy="86" rx="5" ry="6" fill="${eyeC}" />
        <ellipse cx="114" cy="86" rx="2.5" ry="3" fill="#0f172a" />
        <circle cx="111.5" cy="82.5" r="2.2" fill="#fff" />
        <circle cx="116.5" cy="88" r="1.2" fill="#fff" />
      `;
      mouthSvg = `
        <path d="M92 101 Q100 112 109 102" stroke="#a02937" stroke-width="2.5" fill="#e63946" stroke-linecap="round" />
        <path d="M94 101 Q100 105 107 102" fill="#fff" />
      `;
    }

    // -------------------------------------------------------------
    // PEINADOS DE ALTA DEFINICIÓN ANIME (COBERTURA TOTAL SIN CALVAS)
    // Cúpula craneal hermética continua + sombra frontal + Angel Ring
    // -------------------------------------------------------------
    let hairBackSvg = '';
    let hairFrontSvg = '';

    // Sombra base del cuero cabelludo para garantizar cero transparencia tras el cuello
    const neckHairBacking = `
      <path d="M70 78 L130 78 L136 136 L64 136 Z" fill="${hairC}" opacity="0.99" />
      <path d="M74 94 L126 94 L130 136 L70 136 Z" fill="rgba(0,0,0,0.28)" />
    `;

    // Halo de brillo anime especular común de alta calidad (Angel Ring)
    const angelRingSvg = `
      <path d="M68 40 Q100 31 132 40" stroke="rgba(255,255,255,0.55)" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M74 44 Q100 35 126 44" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
      <circle cx="78" cy="40" r="1.8" fill="#fff" opacity="0.9" />
      <circle cx="122" cy="40" r="1.8" fill="#fff" opacity="0.9" />
    `;

    // Cobertura craneal hermética sólida continua (de sien a sien y coronilla a cejas sin huecos)
    const baseScalpSolid = `
      <path d="M46 76 C44 26 70 16 100 16 C130 16 156 26 154 76 C146 76 138 69 100 69 C62 69 54 76 46 76 Z" fill="${hairC}" />
    `;

    // Sombra suave proyectada bajo el flequillo sobre la frente (Ambient Occlusion Anime)
    const bangsDropShadow = `
      <path d="M60 69 Q100 81 140 69 Q100 85 60 69 Z" fill="rgba(0,0,0,0.16)" />
    `;

    if (hairStyle === 'sophia_waves') {
      // 1. ONDAS DE SEDA SOPHIA (Inspirado en la bibliotecaria Sophia: melena ondulada, diadema dorada y frente despejada sedosa)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 74 C42 30 70 16 100 16 C130 16 158 30 150 74 C162 110 166 156 156 186 C144 166 138 136 128 116 C116 104 84 104 72 116 C62 136 56 166 44 186 C34 156 38 110 50 74 Z" fill="${hairC}" />
        <path d="M40 134 C34 156 40 176 48 184 C54 170 56 148 52 132 Z" fill="${hairC}" />
        <path d="M160 134 C166 156 160 176 152 184 C146 170 144 148 148 132 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Diadema de oro académico de Sophia -->
        <path d="M66 54 Q100 38 134 54" stroke="#ffd166" stroke-width="2.8" fill="none" stroke-linecap="round" />
        <circle cx="100" cy="44" r="2.8" fill="#ffd166" />
        <circle cx="100" cy="44" r="1.3" fill="#ffffff" />
        <!-- Mechones de seda frontales ondulados sobre los hombros (Estilo Sophia) -->
        <path d="M48 72 C40 98 48 132 62 160 C68 134 66 98 58 74 Z" fill="${hairC}" />
        <path d="M152 72 C160 98 152 132 138 160 C132 134 134 98 142 74 Z" fill="${hairC}" />
        <!-- Caída frontal orgánica de seda que enmarca la frente sin ningún pico rígido -->
        <path d="M52 66 C70 58 88 56 96 68 C100 70 100 70 104 68 C112 56 130 58 148 66 C144 76 136 82 122 83 C112 84 106 76 100 71 C94 76 88 84 78 83 C64 82 56 76 52 66 Z" fill="${hairC}" />
        <!-- Mechones de ondas suaves curvadas a los lados -->
        <path d="M58 66 C72 74 86 82 94 82 C88 76 80 70 58 66 Z" fill="${hairC}" />
        <path d="M142 66 C128 74 114 82 106 82 C112 76 120 70 142 66 Z" fill="${hairC}" />
        ${angelRingSvg}
        <path d="M54 114 Q62 136 58 148" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M146 114 Q138 136 142 148" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round" fill="none" />
      `;
    } else if (hairStyle === 'kpop_curtain') {
      // 2. CORTINA DE SEDA SUAVE (Apertura central elegante y orgánica sin calvas ni picos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C144 108 136 124 100 124 C64 124 56 108 52 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Patillas y mechones de enmarque sedosos -->
        <path d="M52 74 C48 94 54 116 62 128 C66 112 66 90 58 76 Z" fill="${hairC}" />
        <path d="M148 74 C152 94 146 116 138 128 C134 112 134 90 142 76 Z" fill="${hairC}" />
        <!-- Caída cortina suave en C orgánica sin triángulos -->
        <path d="M54 66 C70 66 85 64 94 72 C98 74 100 70 100 70 C100 70 102 74 106 72 C115 64 130 66 146 66 C144 76 136 82 124 84 C114 85 106 78 100 73 C94 78 86 85 76 84 C64 82 56 76 54 66 Z" fill="${hairC}" />
        <path d="M60 67 C72 73 84 82 92 84 C86 78 78 72 60 67 Z" fill="${hairC}" />
        <path d="M140 67 C128 73 116 82 108 84 C114 78 122 72 140 67 Z" fill="${hairC}" />
        <path d="M72 70 Q88 82 92 90" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <path d="M128 70 Q112 82 108 90" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'classic_crop') {
      // 3. CORTE ERUDITO PULCRO (Raya lateral sedosa, peinado sofisticado sin huecos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 36 70 22 100 22 C130 22 154 36 148 76 C144 102 136 114 100 114 C64 114 56 102 52 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Patillas pulcras -->
        <rect x="54" y="74" width="7" height="20" rx="3" fill="${hairC}" />
        <rect x="139" y="74" width="7" height="20" rx="3" fill="${hairC}" />
        <!-- Barrido ladeado con curvatura natural suave -->
        <path d="M52 66 C68 54 94 56 118 68 C136 78 146 94 148 110 C140 110 132 94 122 84 C112 74 94 68 68 68 Z" fill="${hairC}" />
        <path d="M54 68 C66 68 76 66 86 74 C94 76 104 72 116 76 C128 80 136 90 144 98 C142 88 134 76 126 72 C114 66 84 66 54 68 Z" fill="${hairC}" />
        <line x1="78" y1="64" x2="136" y2="76" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" />
        <line x1="86" y1="70" x2="130" y2="82" stroke="rgba(255,255,255,0.2)" stroke-width="1.4" stroke-linecap="round" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'shonen_spiky') {
      // 4. CORTE DINÁMICO DE SEDA (Movimiento fluido con ondas anime sin triángulos rígidos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 72 C44 32 70 18 100 18 C130 18 156 32 150 72 C156 94 150 114 140 120 C128 108 120 94 100 94 C80 94 72 108 60 120 C50 114 44 94 50 72 Z" fill="${hairC}" />
        <path d="M44 68 Q30 58 44 52 Z" fill="${hairC}" />
        <path d="M40 82 Q26 76 40 70 Z" fill="${hairC}" />
        <path d="M156 68 Q170 58 156 52 Z" fill="${hairC}" />
        <path d="M160 82 Q174 76 160 70 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Patillas anime estilizadas -->
        <path d="M52 72 Q58 106 64 80 Z" fill="${hairC}" />
        <path d="M148 72 Q142 106 136 80 Z" fill="${hairC}" />
        <!-- Puntas superiores orgánicas redondeadas -->
        <path d="M82 24 Q88 6 94 22 Z" fill="${hairC}" />
        <path d="M96 20 Q106 4 114 22 Z" fill="${hairC}" />
        <path d="M112 22 Q124 10 128 26 Z" fill="${hairC}" />
        <!-- Caída de seda frontal en ondas suaves (sin picos duros) -->
        <path d="M54 68 C64 68 76 66 86 74 C92 76 98 70 102 70 C106 70 112 76 118 74 C126 66 136 68 146 68 C144 76 136 82 124 82 C114 83 108 76 100 73 C92 76 86 83 76 82 C64 82 56 76 54 68 Z" fill="${hairC}" />
        <path d="M66 66 Q78 80 88 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M92 68 Q102 82 112 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M112 68 Q122 80 132 68" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
        <path d="M86 68 L91 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round" />
      `;
    } else if (hairStyle === 'undercut_modern') {
      // 5. UNDERCUT DEPORTIVO URBANO (Volumen superior elevado y laterales fade)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M54 76 C50 38 72 24 100 24 C128 24 150 38 146 76 C142 98 136 108 100 108 C64 108 58 98 54 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Laterales recortados / Fade suave -->
        <path d="M52 74 L60 74 L58 96 L52 96 Z" fill="${hairC}" opacity="0.75" />
        <path d="M148 74 L140 74 L142 96 L148 96 Z" fill="${hairC}" opacity="0.75" />
        <!-- Tupé texturizado con ondas suaves hacia atrás -->
        <path d="M62 66 C72 50 90 44 108 46 C124 48 138 58 140 68 C132 72 120 74 106 72 C92 70 78 74 62 66 Z" fill="${hairC}" />
        <path d="M76 64 Q88 48 96 66 Z" fill="${hairC}" />
        <path d="M94 64 Q106 44 116 66 Z" fill="${hairC}" />
        <path d="M112 64 Q124 50 132 66 Z" fill="${hairC}" />
        <!-- Puntas dinámicas y textura -->
        <path d="M84 56 Q100 48 116 54" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'scientist_wild') {
      // 6. CORTE ERUDITO CON AHOGE (Estilo Dr. Gauss, mechones enérgicos con ahoge suave)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 74 C44 32 70 18 100 18 C130 18 156 32 150 74 C154 98 148 116 140 122 C128 110 120 96 100 96 C80 96 72 110 60 122 C52 116 46 98 50 74 Z" fill="${hairC}" />
        <path d="M44 52 Q30 42 42 36 Z" fill="${hairC}" />
        <path d="M40 70 Q26 66 38 60 Z" fill="${hairC}" />
        <path d="M156 52 Q170 42 158 36 Z" fill="${hairC}" />
        <path d="M160 70 Q174 66 162 60 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Ahoge rebelde suave en coronilla -->
        <path d="M100 18 Q108 2 120 6 Q114 12 102 20 Z" fill="${hairC}" />
        <path d="M52 72 Q58 102 64 80 Z" fill="${hairC}" />
        <path d="M148 72 Q142 102 136 80 Z" fill="${hairC}" />
        <!-- Ondas suaves enmarcadoras -->
        <path d="M54 68 C64 68 76 66 84 76 C90 77 96 68 100 68 C104 68 110 77 116 76 C124 66 136 68 146 68 C144 76 136 78 126 77 C116 82 108 81 100 76 C92 81 84 82 74 77 C64 78 56 76 54 68 Z" fill="${hairC}" />
        <path d="M68 68 Q78 82 88 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M88 68 Q98 84 108 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M106 68 Q116 82 126 68" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
        <path d="M92 72 L97 80" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round" />
      `;
    } else if (hairStyle === 'flow_long') {
      // 7. MELENA LARGA DE BIBLIOTECA (Caída suave más allá de hombros con ondas de seda sin triángulos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 74 C44 32 70 18 100 18 C130 18 156 32 150 74 C162 110 166 154 156 184 C144 164 138 136 128 116 C116 104 84 104 72 116 C62 136 56 166 44 184 C34 154 38 110 50 74 Z" fill="${hairC}" />
        <path d="M42 136 C36 158 42 178 50 186 C56 170 58 148 54 132 Z" fill="${hairC}" />
        <path d="M158 136 C164 158 158 178 150 186 C144 170 142 148 146 132 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Mechones frontales ondulados sobre hombros -->
        <path d="M48 72 C42 98 48 130 62 156 C68 132 66 100 58 76 Z" fill="${hairC}" />
        <path d="M152 72 C158 98 152 130 138 156 C132 132 134 100 142 76 Z" fill="${hairC}" />
        <!-- Caída de seda frontal en curva orgánica suave sin picos -->
        <path d="M54 66 C70 58 88 56 96 68 C100 70 100 70 104 68 C112 56 130 58 146 66 C142 76 134 82 122 83 C112 84 106 76 100 71 C94 76 88 84 78 83 C66 82 58 76 54 66 Z" fill="${hairC}" />
        <!-- Ondas laterales suaves -->
        <path d="M58 66 C72 74 86 82 94 82 C88 76 80 70 58 66 Z" fill="${hairC}" />
        <path d="M142 66 C128 74 114 82 106 82 C112 76 120 70 142 66 Z" fill="${hairC}" />
        ${angelRingSvg}
        <path d="M54 114 Q62 136 58 148" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <path d="M146 114 Q138 136 142 148" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
      `;
    } else if (hairStyle === 'academy_ponytail') {
      // 8. COLETA DE HONOR ACADÉMICA (Ponytail lateral con broche dorado y mechones envolventes en 'S')
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C144 104 136 118 100 118 C64 118 56 104 52 76 Z" fill="${hairC}" />
        <path d="M120 38 C148 28 172 58 170 104 C168 130 158 146 150 150 C146 138 148 114 148 94 C148 68 136 48 120 42 Z" fill="${hairC}" />
        <circle cx="124" cy="40" r="5.5" fill="#ffd166" stroke="#b45309" stroke-width="1.2" />
        <circle cx="124" cy="40" r="2.5" fill="#ffffff" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M50 74 C46 94 52 116 60 130 C64 112 64 90 58 76 Z" fill="${hairC}" />
        <path d="M150 74 C154 94 148 116 140 130 C136 112 136 90 142 76 Z" fill="${hairC}" />
        <!-- Caída de seda frontal en curva orgánica -->
        <path d="M54 66 C68 60 84 58 94 70 C98 72 102 72 106 70 C116 58 132 60 146 66 C142 76 132 82 120 83 C112 84 106 76 100 72 C94 76 88 84 80 83 C68 82 58 76 54 66 Z" fill="${hairC}" />
        <path d="M60 68 Q74 80 88 74" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M140 68 Q126 80 112 74" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        ${angelRingSvg}
        <path d="M152 74 Q162 98 158 126" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" fill="none" />
      `;
    } else if (hairStyle === 'twin_ribbons') {
      // 9. COLETAS DE SEDA CON LAZOS (Twintails con lazos carmesí y ondas suaves sin picos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C144 104 138 118 100 118 C62 118 56 104 52 76 Z" fill="${hairC}" />
        <path d="M48 66 C24 78 16 112 24 148 C30 162 38 164 42 148 C44 132 38 106 52 82 Z" fill="${hairC}" />
        <path d="M152 66 C176 78 184 112 176 148 C170 162 162 164 158 148 C156 132 162 106 148 82 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M50 74 C48 94 56 116 62 130 C66 114 66 92 60 76 Z" fill="${hairC}" />
        <path d="M150 74 C152 94 144 116 138 130 C134 114 134 92 140 76 Z" fill="${hairC}" />
        <!-- Lazos decorativos con perlas doradas -->
        <polygon points="46,68 34,60 38,74" fill="#f43f5e" stroke="#be123c" stroke-width="1.2" />
        <polygon points="46,68 34,76 42,78" fill="#f43f5e" stroke="#be123c" stroke-width="1.2" />
        <circle cx="45" cy="70" r="3.5" fill="#ffd166" />
        <polygon points="154,68 166,60 162,74" fill="#f43f5e" stroke="#be123c" stroke-width="1.2" />
        <polygon points="154,68 166,76 158,78" fill="#f43f5e" stroke="#be123c" stroke-width="1.2" />
        <circle cx="155" cy="70" r="3.5" fill="#ffd166" />
        <!-- Frente de seda con suave drapeado curvo -->
        <path d="M54 66 C68 58 84 58 94 68 C98 70 102 70 106 68 C116 58 132 58 146 66 C142 76 134 82 122 83 C112 84 106 76 100 72 C94 76 88 84 78 83 C66 82 58 76 54 66 Z" fill="${hairC}" />
        <path d="M64 68 Q78 80 92 76" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M136 68 Q122 80 108 76" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'elegant_bob') {
      // 10. BOB ASIMÉTRICO DE SEDA (Corte chic redondeado inspirado en Sophia)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C154 108 146 128 136 134 C124 118 118 96 100 96 C82 96 76 118 64 134 C54 128 46 108 52 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M50 74 C46 96 54 116 62 128 C66 112 66 90 60 76 Z" fill="${hairC}" />
        <path d="M150 74 C154 100 144 126 134 140 C128 118 132 90 138 76 Z" fill="${hairC}" />
        <!-- Caída asimétrica sedosa y envolvente -->
        <path d="M54 66 C70 58 90 58 100 68 C108 58 128 58 146 66 C144 76 136 82 124 84 C114 85 106 78 100 73 C94 78 86 85 76 84 C64 82 56 76 54 66 Z" fill="${hairC}" />
        <path d="M60 68 Q80 82 96 78" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M140 68 Q120 82 104 78" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        ${angelRingSvg}
        <path d="M136 94 Q142 116 138 130" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" fill="none" />
      `;
    } else if (hairStyle === 'wolf_shag') {
      // 11. CAPAS ONDULADAS SUAVES (Estilo a capas orgánicas sin triángulos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C158 106 160 138 152 160 C144 144 138 122 128 112 C116 102 84 102 72 112 C62 122 56 144 48 160 C40 138 42 106 52 76 Z" fill="${hairC}" />
        <path d="M46 128 Q32 142 46 146 Z" fill="${hairC}" />
        <path d="M154 128 Q168 142 154 146 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M50 74 C46 96 52 120 62 136 C66 118 66 94 58 76 Z" fill="${hairC}" />
        <path d="M150 74 C154 96 148 120 138 136 C134 118 134 94 142 76 Z" fill="${hairC}" />
        <!-- Ondas suaves enmarcadoras -->
        <path d="M54 66 C68 58 84 58 94 68 C98 70 102 70 106 68 C116 58 132 58 146 66 C142 76 134 82 122 83 C112 84 106 76 100 72 C94 76 88 84 78 83 C66 82 58 76 54 66 Z" fill="${hairC}" />
        <path d="M62 68 Q76 82 90 76" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M138 68 Q124 82 110 76" stroke="${hairC}" stroke-width="3" fill="none" stroke-linecap="round" />
        ${angelRingSvg}
        <path d="M78 72 L84 80" stroke="rgba(255,255,255,0.25)" stroke-width="1.3" stroke-linecap="round" />
        <path d="M102 72 L106 80" stroke="rgba(255,255,255,0.25)" stroke-width="1.3" stroke-linecap="round" />
      `;
    } else if (hairStyle === 'curly_fluffy') {
      // 12. RIZOS SUAVES DE ÁNGEL (Bucles esponjosos y suaves que coronan la cabeza sin picos)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 74 C42 34 68 16 100 16 C132 16 158 34 150 74 C158 104 154 130 144 140 C134 122 126 106 100 106 C74 106 66 122 56 140 C46 130 42 104 50 74 Z" fill="${hairC}" />
        <circle cx="48" cy="54" r="10" fill="${hairC}" />
        <circle cx="44" cy="72" r="9" fill="${hairC}" />
        <circle cx="48" cy="90" r="9" fill="${hairC}" />
        <circle cx="152" cy="54" r="10" fill="${hairC}" />
        <circle cx="156" cy="72" r="9" fill="${hairC}" />
        <circle cx="152" cy="90" r="9" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <circle cx="60" cy="40" r="9" fill="${hairC}" />
        <circle cx="76" cy="30" r="9" fill="${hairC}" />
        <circle cx="94" cy="26" r="9" fill="${hairC}" />
        <circle cx="112" cy="28" r="9" fill="${hairC}" />
        <circle cx="130" cy="38" r="9" fill="${hairC}" />
        <path d="M52 74 C48 94 56 116 64 128 C68 112 68 90 60 76 Z" fill="${hairC}" />
        <path d="M148 74 C152 94 144 116 136 128 C132 112 132 90 140 76 Z" fill="${hairC}" />
        <!-- Bucles frontales cubriendo la frente con volumen sin calvas -->
        <circle cx="72" cy="70" r="8" fill="${hairC}" />
        <circle cx="86" cy="72" r="8.5" fill="${hairC}" />
        <circle cx="100" cy="71" r="8.5" fill="${hairC}" />
        <circle cx="114" cy="72" r="8.5" fill="${hairC}" />
        <circle cx="128" cy="70" r="8" fill="${hairC}" />
        <path d="M68 68 Q74 74 72 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" />
        <path d="M96 68 Q102 74 100 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" />
        <path d="M110 68 Q116 74 114 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'messy_anime_boy') {
      // 13. DESPEINADO SHONEN (Pelo corto masculino anime con textura natural y caída suave sobre la frente)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C44 32 70 18 100 18 C130 18 156 32 148 76 C156 102 150 120 140 126 C128 114 120 98 100 98 C80 98 72 114 60 126 C50 120 44 102 52 76 Z" fill="${hairC}" />
        <path d="M46 62 Q32 54 44 46 Z" fill="${hairC}" />
        <path d="M42 78 Q28 72 42 66 Z" fill="${hairC}" />
        <path d="M154 62 Q168 54 156 46 Z" fill="${hairC}" />
        <path d="M158 78 Q172 72 158 66 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M52 72 Q58 104 64 82 Z" fill="${hairC}" />
        <path d="M148 72 Q142 104 136 82 Z" fill="${hairC}" />
        <!-- Mechones superiores orgánicos con volumen suave -->
        <path d="M80 24 Q86 8 94 22 Z" fill="${hairC}" />
        <path d="M96 18 Q106 6 114 20 Z" fill="${hairC}" />
        <path d="M112 22 Q124 10 126 26 Z" fill="${hairC}" />
        <!-- Caída frontal suave en capas naturales sobre la frente sin tapar ojos -->
        <path d="M54 66 C66 66 76 64 84 74 C90 75 96 68 100 68 C104 68 110 75 116 74 C124 64 134 66 146 66 C144 76 136 82 124 82 C114 83 108 76 100 73 C92 76 86 83 76 82 C64 82 56 76 54 66 Z" fill="${hairC}" />
        <path d="M66 66 Q80 80 88 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M86 68 Q98 84 106 70" stroke="${hairC}" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M106 68 Q118 80 128 68" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M86 70 L92 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.6" stroke-linecap="round" />
        <path d="M104 70 L108 78" stroke="rgba(255,255,255,0.3)" stroke-width="1.6" stroke-linecap="round" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'fluffy_comma_hair') {
      // 14. FLEQUILLO COMA K-DRAMA (Estilo estrella masculino con curvatura en 'C' elegante)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C144 106 136 122 100 122 C64 122 56 106 52 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <path d="M52 74 C48 94 54 116 62 126 C66 112 66 90 58 76 Z" fill="${hairC}" />
        <path d="M148 74 C152 94 146 116 138 126 C134 112 134 90 142 76 Z" fill="${hairC}" />
        <!-- Base superior con volumen ladeado -->
        <path d="M54 66 C70 56 90 56 102 68 C112 56 132 58 146 66 C144 76 136 82 126 83 C116 83 110 76 102 72 C94 76 86 84 76 83 C64 82 56 76 54 66 Z" fill="${hairC}" />
        <!-- La icónica 'coma' curvándose sobre la ceja con gracia -->
        <path d="M72 64 C84 62 96 68 94 82 C92 90 84 92 80 84 C78 78 84 72 74 68 Z" fill="${hairC}" />
        <path d="M78 68 Q88 74 88 82" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <!-- Lado derecho peinado hacia el lateral con volumen suave -->
        <path d="M102 68 Q124 74 138 70" stroke="${hairC}" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M106 72 Q126 78 136 76" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'side_part_gentleman') {
      // 15. RAYA LATERAL CABALLERO (Peinado clásico formal y sofisticado de estudiante modelo)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M54 76 C48 36 72 22 100 22 C128 22 152 36 146 76 C142 100 136 112 100 112 C64 112 58 100 54 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <rect x="54" y="74" width="7" height="18" rx="3" fill="${hairC}" />
        <rect x="139" y="74" width="7" height="18" rx="3" fill="${hairC}" />
        <!-- Raya lateral en x=72 con volumen barrido elegante -->
        <path d="M54 68 C64 64 70 66 74 72 C76 60 102 54 126 66 C140 74 148 90 148 104 C140 104 134 90 124 82 C114 74 98 70 76 72 Z" fill="${hairC}" />
        <line x1="72" y1="64" x2="72" y2="76" stroke="rgba(0,0,0,0.35)" stroke-width="1.5" />
        <path d="M76 68 Q100 62 134 74" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M82 74 Q106 68 132 80" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'samurai_man_bun') {
      // 16. MOÑO SAMURAI TOP KNOT (Moño alto masculino con laterales despejados y mechón sutil)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M54 76 C50 36 72 24 100 24 C128 24 150 36 146 76 C142 98 136 108 100 108 C64 108 58 98 54 76 Z" fill="${hairC}" />
        <!-- Moño alto en coronilla con nudo -->
        <ellipse cx="100" cy="18" rx="14" ry="12" fill="${hairC}" />
        <rect x="94" y="24" width="12" height="6" rx="2" fill="#d97706" />
        <circle cx="100" cy="18" r="4" fill="rgba(0,0,0,0.25)" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Laterales limpios -->
        <path d="M52 74 L60 74 L58 96 L52 96 Z" fill="${hairC}" opacity="0.6" />
        <path d="M148 74 L140 74 L142 96 L148 96 Z" fill="${hairC}" opacity="0.6" />
        <!-- Mechones finos laterales cayendo -->
        <path d="M60 74 Q56 98 62 118" stroke="${hairC}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M140 74 Q144 98 138 118" stroke="${hairC}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <!-- Cabello frontal peinado hacia atrás con textura y mechón fino rebelde -->
        <path d="M62 66 C72 54 90 48 100 48 C110 48 128 54 138 66 C130 70 118 72 100 70 C82 72 70 70 62 66 Z" fill="${hairC}" />
        <line x1="80" y1="64" x2="96" y2="48" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" />
        <line x1="100" y1="66" x2="100" y2="48" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" />
        <line x1="120" y1="64" x2="104" y2="48" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" />
        <!-- Mechón rebelde fino sobre la frente -->
        <path d="M96 66 Q92 78 88 84" stroke="${hairC}" stroke-width="2.2" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else if (hairStyle === 'buzz_fade_cool') {
      // 17. FADE CORTO DEPORTIVO (Corte militar / urbano nítido y moderno)
      hairBackSvg = `
        <path d="M54 74 C50 38 72 26 100 26 C128 26 150 38 146 74 C142 96 136 104 100 104 C64 104 58 96 54 74 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        <!-- Corte limpio con degradado y línea frontal nítida -->
        <path d="M52 74 C54 58 72 50 100 50 C128 50 146 58 148 74 C140 76 130 76 100 75 C70 76 60 76 52 74 Z" fill="${hairC}" />
        <path d="M52 74 L60 74 L58 96 L52 96 Z" fill="${hairC}" opacity="0.45" />
        <path d="M148 74 L140 74 L142 96 L148 96 Z" fill="${hairC}" opacity="0.45" />
        <path d="M70 54 Q100 48 130 54" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round" fill="none" />
      `;
    } else if (hairStyle === 'dreadlocks_short') {
      // 18. DREADS CORTOS URBANOS (Dreads juveniles estilizados con detalles dorados)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M52 76 C46 34 70 20 100 20 C130 20 154 34 148 76 C144 106 136 122 100 122 C64 122 56 106 52 76 Z" fill="${hairC}" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Dreads individuales organizados con caída y detalles dorados -->
        <path d="M64 40 Q58 65 60 92" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        <rect x="57" y="80" width="6" height="4" rx="1.5" fill="#ffd166" />
        <path d="M76 32 Q72 58 74 88" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        <path d="M90 28 Q88 56 86 84" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        <rect x="83" y="74" width="6" height="4" rx="1.5" fill="#ffd166" />
        <path d="M104 28 Q106 56 104 84" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        <path d="M118 32 Q122 58 120 88" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        <rect x="117" y="78" width="6" height="4" rx="1.5" fill="#ffd166" />
        <path d="M130 40 Q136 65 134 92" stroke="${hairC}" stroke-width="7" stroke-linecap="round" fill="none" />
        ${angelRingSvg}
      `;
    } else {
      // 13. CORTE PRINCESA DE SEDA RECTO ('hime_bangs' y fallback seguro sin calvas)
      hairBackSvg = `
        ${neckHairBacking}
        <path d="M50 74 C44 32 70 18 100 18 C130 18 156 32 150 74 C158 112 160 152 152 180 L48 180 C40 152 42 112 50 74 Z" fill="${hairC}" />
        <line x1="48" y1="180" x2="152" y2="180" stroke="rgba(0,0,0,0.25)" stroke-width="1.8" />
      `;
      hairFrontSvg = `
        ${baseScalpSolid}
        ${bangsDropShadow}
        <!-- Mechones Hime cortados a mandíbula -->
        <path d="M48 74 L48 126 L63 126 L63 74 Z" fill="${hairC}" />
        <line x1="48" y1="126" x2="63" y2="126" stroke="rgba(0,0,0,0.3)" stroke-width="1.6" />
        <path d="M152 74 L152 126 L137 126 L137 74 Z" fill="${hairC}" />
        <line x1="137" y1="126" x2="152" y2="126" stroke="rgba(0,0,0,0.3)" stroke-width="1.6" />
        <!-- Flequillo recto continuo de seda sin fisuras -->
        <path d="M54 66 L146 66 L146 76 Q100 78 54 76 Z" fill="${hairC}" />
        <line x1="54" y1="76" x2="146" y2="76" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        <line x1="72" y1="76" x2="72" y2="67" stroke="rgba(0,0,0,0.18)" stroke-width="1" />
        <line x1="88" y1="77" x2="88" y2="67" stroke="rgba(0,0,0,0.18)" stroke-width="1" />
        <line x1="100" y1="78" x2="100" y2="67" stroke="rgba(0,0,0,0.18)" stroke-width="1" />
        <line x1="112" y1="77" x2="112" y2="67" stroke="rgba(0,0,0,0.18)" stroke-width="1" />
        <line x1="128" y1="76" x2="128" y2="67" stroke="rgba(0,0,0,0.18)" stroke-width="1" />
        ${angelRingSvg}
      `;
    }

    // -------------------------------------------------------------
    // ACCESORIOS DECORATIVOS DE ALTA GAMA
    // -------------------------------------------------------------
    let accSvg = '';
    if (acc === 'glasses_gold') {
      accSvg = `
        <g id="acc-glasses">
          <ellipse cx="84" cy="85" rx="13" ry="11" fill="rgba(255,255,255,0.12)" stroke="#ffd166" stroke-width="2.2" />
          <ellipse cx="116" cy="85" rx="13" ry="11" fill="rgba(255,255,255,0.12)" stroke="#ffd166" stroke-width="2.2" />
          <path d="M97 83 Q100 80 103 83" stroke="#ffd166" stroke-width="2.2" fill="none" />
          <line x1="71" y1="83" x2="63" y2="81" stroke="#ffd166" stroke-width="1.8" />
          <line x1="129" y1="83" x2="137" y2="81" stroke="#ffd166" stroke-width="1.8" />
          <line x1="77" y1="80" x2="83" y2="88" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.65" />
          <line x1="109" y1="80" x2="115" y2="88" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.65" />
        </g>
      `;
    } else if (acc === 'cat_headphones') {
      accSvg = `
        <g id="acc-cat-headphones">
          <path d="M56 86 C50 32 150 32 144 86" fill="none" stroke="#1e293b" stroke-width="7" stroke-linecap="round" />
          <path d="M58 86 C52 36 148 36 142 86" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
          <polygon points="68,40 76,16 86,34" fill="#0f172a" stroke="#ef476f" stroke-width="2.5" />
          <polygon points="72,36 76,22 82,32" fill="#ef476f" />
          <polygon points="132,40 124,16 114,34" fill="#0f172a" stroke="#ef476f" stroke-width="2.5" />
          <polygon points="128,36 124,22 118,32" fill="#ef476f" />
          <rect x="50" y="76" width="13" height="26" rx="5" fill="#0f172a" stroke="#00f0ff" stroke-width="2" />
          <circle cx="56.5" cy="89" r="3.5" fill="#00f0ff" />
          <rect x="137" y="76" width="13" height="26" rx="5" fill="#0f172a" stroke="#00f0ff" stroke-width="2" />
          <circle cx="143.5" cy="89" r="3.5" fill="#00f0ff" />
        </g>
      `;
    } else if (acc === 'laurel_crown') {
      accSvg = `
        <g id="acc-laurel">
          <path d="M68 65 Q100 48 132 65" stroke="#ffd166" stroke-width="2.5" fill="none" />
          <ellipse cx="76" cy="60" rx="6" ry="3" fill="#ffd166" stroke="#b45309" stroke-width="1" transform="rotate(-25 76 60)" />
          <ellipse cx="88" cy="55" rx="6" ry="3" fill="#ffd166" stroke="#b45309" stroke-width="1" transform="rotate(-10 88 55)" />
          <ellipse cx="100" cy="52" rx="7" ry="3.5" fill="#ffd166" stroke="#b45309" stroke-width="1" />
          <ellipse cx="112" cy="55" rx="6" ry="3" fill="#ffd166" stroke="#b45309" stroke-width="1" transform="rotate(10 112 55)" />
          <ellipse cx="124" cy="60" rx="6" ry="3" fill="#ffd166" stroke="#b45309" stroke-width="1" transform="rotate(25 124 60)" />
          <circle cx="100" cy="52" r="3" fill="#38bdf8" />
        </g>
      `;
    } else if (acc === 'beret_artist') {
      accSvg = `
        <g id="acc-beret">
          <ellipse cx="100" cy="50" rx="42" ry="14" fill="#991b1b" stroke="#7f1d1d" stroke-width="2" transform="rotate(-8 100 50)" />
          <path d="M68 48 C72 26 128 26 132 48 Z" fill="#b91c1c" />
          <circle cx="100" cy="30" r="3" fill="#991b1b" />
          <circle cx="124" cy="46" r="4.5" fill="#ffd166" stroke="#b45309" stroke-width="1" />
        </g>
      `;
    } else if (acc === 'hair_clips') {
      accSvg = `
        <g id="acc-clips">
          <polygon points="68,64 71,67 76,66 73,70 74,75 70,72 66,74 67,69 64,66 69,66" fill="#ffd166" stroke="#f59e0b" stroke-width="1" />
          <circle cx="132" cy="68" r="4" fill="#f472b6" stroke="#db2777" stroke-width="1" />
          <circle cx="132" cy="68" r="1.5" fill="#fff" />
        </g>
      `;
    } else if (acc === 'cyber_visor') {
      accSvg = `
        <g id="acc-scouter">
          <path d="M106 82 L130 80 L136 94 L114 96 Z" fill="rgba(0,240,255,0.4)" stroke="#00f0ff" stroke-width="2" />
          <circle cx="136" cy="88" r="4" fill="#ffd166" />
          <line x1="112" y1="88" x2="128" y2="88" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
        </g>
      `;
    }

    // -------------------------------------------------------------
    // ATUENDOS SUPERIORES Y VESTIDOS (TORSO, VESTIDOS Y BRAZOS RECTOS)
    // Silueta adolescente estilizada: cintura delgada y brazos rectos bien proporcionados
    // -------------------------------------------------------------
    let topSvg = '';

 // Manos anime y silueta corporal ajustada perfectamente al vestido pinafore
const baseHandsSvg = `
  <g id="body-base">
    <!-- Cuello expuesto ajustado al escote de la blusa escolar -->
    <path d="M88 138 L100 144 L112 138 L108 148 L92 148 Z" fill="${skin}" />

    <!-- Brazos/Hombros internos tapados por la manga blanca; solo se dibujan las muñecas y manos saliendo del puño -->
    
    <!-- Muñeca y Mano Izquierda (Alineadas con la bocamanga X: 47..66, Y: 198) -->
    <rect x="47" y="200" width="18" height="8" rx="2" fill="${skin}" />
    <path d="M47 204 L47 218 C47 222 50 224 55 224 C60 224 63 222 63 218 L63 204 Z" fill="${skin}" stroke="rgba(0,0,0,0.15)" stroke-width="0.8" />
    <path d="M63 207 C66 208 67 212 65 214 C63 215 62 213 62 211 Z" fill="${skin}" />
    <line x1="52" y1="213" x2="52" y2="220" stroke="rgba(0,0,0,0.16)" stroke-width="0.8" />
    <line x1="56" y1="213" x2="56" y2="221" stroke="rgba(0,0,0,0.16)" stroke-width="0.8" />

    <!-- Muñeca y Mano Derecha (Alineadas con la bocamanga X: 134..153, Y: 198) -->
    <rect x="135" y="200" width="18" height="8" rx="2" fill="${skin}" />
    <path d="M137 204 L137 218 C137 222 140 224 145 224 C150 224 153 222 153 218 L153 204 Z" fill="${skin}" stroke="rgba(0,0,0,0.15)" stroke-width="0.8" />
    <path d="M137 207 C134 208 133 212 135 214 C137 215 138 213 138 211 Z" fill="${skin}" />
    <line x1="144" y1="213" x2="144" y2="221" stroke="rgba(0,0,0,0.16)" stroke-width="0.8" />
    <line x1="148" y1="213" x2="148" y2="220" stroke="rgba(0,0,0,0.16)" stroke-width="0.8" />

    <!-- Torso base contenido internamente en los límites del vestido (X:76 a 124, Y:138 a 195) -->
    <path d="M80 140 L120 140 L124 188 L76 188 Z" fill="${skin}" />
  </g>
`;
    if (top === 'scholar_dress') {
      // VESTIDO ESCOLAR PINAFORE (Pichi azul marino sobre blusa blanca con talle estilizado)
      topSvg = `
        ${baseHandsSvg}
        <!-- Mangas Blancas Perfectamente Conectadas a Hombros y Torso -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#f8fafc" />
        <rect x="47" y="198" width="19" height="6" rx="1.5" fill="#e2e8f0" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#f8fafc" />
        <rect x="134" y="198" width="19" height="6" rx="1.5" fill="#e2e8f0" />
        <!-- Blusa Cuello y Lazo Rojo Escolar -->
        <polygon points="100,138 88,168 112,168" fill="#f8fafc" />
        <path d="M86 138 C90 148 98 150 100 144 C102 150 110 148 114 138 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
        <circle cx="100" cy="148" r="3" fill="#e63946" />
        <polygon points="100,148 92,158 97,158" fill="#d90429" />
        <polygon points="100,148 108,158 103,158" fill="#d90429" />
        <!-- Tirantes y Pechera Entallados a la Cintura Femenina -->
        <polygon points="80,140 85,188 77,188 70,144" fill="#1b2a47" />
        <polygon points="120,140 115,188 123,188 130,144" fill="#1b2a47" />
        <rect x="80" y="158" width="40" height="30" fill="#1b2a47" />
        <circle cx="85" cy="162" r="1.8" fill="#ffd166" />
        <circle cx="115" cy="162" r="1.8" fill="#ffd166" />
        <!-- Cinturilla Delgada de Adolescente y Hebilla Dorada -->
        <rect x="76" y="188" width="48" height="7" rx="2" fill="#0f172a" />
        <rect x="96" y="187" width="8" height="9" rx="1.5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <!-- Falda del Vestido Pinafore Flotante -->
        <path d="M76 195 L124 195 L144 242 L56 242 Z" fill="#1b2a47" />
        <line x1="74" y1="195" x2="68" y2="242" stroke="#0f172a" stroke-width="1.8" />
        <line x1="88" y1="195" x2="86" y2="242" stroke="#0f172a" stroke-width="1.8" />
        <line x1="100" y1="195" x2="100" y2="242" stroke="#0f172a" stroke-width="1.8" />
        <line x1="112" y1="195" x2="114" y2="242" stroke="#0f172a" stroke-width="1.8" />
        <line x1="126" y1="195" x2="132" y2="242" stroke="#0f172a" stroke-width="1.8" />
        <line x1="56" y1="240" x2="144" y2="240" stroke="#ffd166" stroke-width="1.5" />
      `;
    } else if (top === 'spring_sundress') {
      // VESTIDO FLORAL DE PRIMAVERA (Brazos firmemente unidos a hombros sin cortes)
      topSvg = `
        ${baseHandsSvg}
        <!-- Brazos al descubierto perfectamente soldados a los hombros -->
        <path d="M74 142 L48 144 L48 204 L66 204 L72 154 Z" fill="${skin}" />
        <path d="M126 142 L152 144 L152 204 L134 204 L128 154 Z" fill="${skin}" />
        <!-- Tirantes con volantes blancos -->
        <path d="M78 138 Q74 144 76 156" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M122 138 Q126 144 124 156" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
        <!-- Corpiño Entallado en la Cintura Delgada -->
        <path d="M84 140 L70 154 Q75 174 78 190 L122 190 Q125 174 130 154 L116 140 Z" fill="#fda4af" />
        <path d="M84 142 Q100 152 116 142" stroke="#ffffff" stroke-width="2" fill="none" />
        <!-- Cinta Satinada y Lazo Lateral en la Cintura -->
        <rect x="76" y="190" width="48" height="6" fill="#f43f5e" />
        <circle cx="86" cy="193" r="3" fill="#f43f5e" />
        <polygon points="86,193 80,202 85,201" fill="#e11d48" />
        <!-- Falda Amplia Floral con Volante de Encaje -->
        <path d="M76 196 L124 196 L148 244 L52 244 Z" fill="#fecdd3" />
        <circle cx="82" cy="214" r="2.5" fill="#ffffff" />
        <circle cx="82" cy="214" r="1" fill="#f43f5e" />
        <circle cx="118" cy="212" r="2.5" fill="#ffffff" />
        <circle cx="118" cy="212" r="1" fill="#f43f5e" />
        <circle cx="100" cy="226" r="3" fill="#ffffff" />
        <circle cx="100" cy="226" r="1.2" fill="#f43f5e" />
        <circle cx="68" cy="232" r="2.5" fill="#ffffff" />
        <circle cx="68" cy="232" r="1" fill="#f43f5e" />
        <circle cx="132" cy="232" r="2.5" fill="#ffffff" />
        <circle cx="132" cy="232" r="1" fill="#f43f5e" />
        <path d="M52 244 Q60 248 68 244 Q76 248 84 244 Q92 248 100 244 Q108 248 116 244 Q124 248 132 244 Q140 248 148 244" stroke="#ffffff" stroke-width="2.5" fill="none" />
      `;
    } else if (top === 'gothic_dress') {
      // VESTIDO LOLITA VICTORIANO (Corsé ceñido gótico y mangas abullonadas enlazadas)
      topSvg = `
        ${baseHandsSvg}
        <!-- Mangas con Hombros Abullonados y Caída Recta Soldada al Torso -->
        <ellipse cx="57" cy="148" rx="13" ry="12" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
        <path d="M70 144 L48 146 L48 202 L66 202 L68 158 Z" fill="#27272a" />
        <path d="M48 200 Q57 205 66 200" stroke="#f8fafc" stroke-width="2.2" fill="none" />
        <ellipse cx="143" cy="148" rx="13" ry="12" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
        <path d="M130 144 L152 146 L152 202 L134 202 L132 158 Z" fill="#27272a" />
        <path d="M134 200 Q143 205 152 200" stroke="#f8fafc" stroke-width="2.2" fill="none" />
        <!-- Torso Corsé Negro Ceñido a Cintura Delgada -->
        <path d="M84 138 L70 148 Q75 174 78 192 L122 192 Q125 174 130 148 L116 138 Z" fill="#18181b" />
        <!-- Pechera de Encaje Blanco -->
        <polygon points="100,138 88,166 112,166" fill="#f8fafc" />
        <line x1="88" y1="148" x2="112" y2="148" stroke="#cbd5e1" stroke-width="1" />
        <line x1="90" y1="156" x2="110" y2="156" stroke="#cbd5e1" stroke-width="1" />
        <!-- Camafeo de Amatista y Cintas Cruzadas de Corsé -->
        <polygon points="100,166 94,178 100,186 106,178" fill="#881337" />
        <ellipse cx="100" cy="164" rx="4" ry="5" fill="#7b2cbf" stroke="#ffd166" stroke-width="1.2" />
        <circle cx="100" cy="164" r="1.5" fill="#ffffff" />
        <line x1="88" y1="172" x2="112" y2="182" stroke="#be123c" stroke-width="1.5" />
        <line x1="112" y1="172" x2="88" y2="182" stroke="#be123c" stroke-width="1.5" />
        <line x1="88" y1="182" x2="112" y2="190" stroke="#be123c" stroke-width="1.5" />
        <line x1="112" y1="182" x2="88" y2="190" stroke="#be123c" stroke-width="1.5" />
        <!-- Falda Acampanada de Doble Nivel con Volantes -->
        <path d="M76 192 L124 192 L150 248 L50 248 Z" fill="#18181b" />
        <path d="M60 220 L140 220 L146 236 L54 236 Z" fill="#881337" />
        <circle cx="76" cy="222" r="2.5" fill="#be123c" />
        <circle cx="124" cy="222" r="2.5" fill="#be123c" />
        <path d="M50 248 Q62 253 75 248 Q87 253 100 248 Q112 253 125 248 Q137 253 150 248" stroke="#f8fafc" stroke-width="2.5" fill="none" />
      `;
    } else if (top === 'casual_sweater') {
      // SUÉTER OVERSIZED PASTEL (Mangas rectas continuas y talle estilizado)
      topSvg = `
        <!-- Manos asomando sutilmente de las mangas -->
        <circle cx="56" cy="216" r="3.2" fill="${skin}" />
        <circle cx="144" cy="216" r="3.2" fill="${skin}" />
        <!-- Mangas Caídas Conectadas al Torso -->
        <path d="M72 142 L48 144 L48 214 L66 214 L70 156 Z" fill="#c084fc" />
        <rect x="47" y="208" width="19" height="7" rx="2" fill="#a855f7" />
        <line x1="48" y1="211" x2="66" y2="211" stroke="#e9d5ff" stroke-width="1" />
        <path d="M128 142 L152 144 L152 214 L134 214 L130 156 Z" fill="#c084fc" />
        <rect x="134" y="208" width="19" height="7" rx="2" fill="#a855f7" />
        <line x1="135" y1="211" x2="152" y2="211" stroke="#e9d5ff" stroke-width="1" />
        <!-- Torso Entallado con Estilo Suéter -->
        <path d="M84 138 L68 150 Q73 178 77 210 L123 210 Q127 178 132 150 L116 138 Z" fill="#c084fc" />
        <path d="M80 136 C84 148 116 148 120 136 C124 154 76 154 80 136 Z" fill="#d8b4fe" stroke="#a855f7" stroke-width="1" />
        <path d="M94 154 Q96 182 94 208" stroke="#e9d5ff" stroke-width="1.8" stroke-dasharray="4,3" fill="none" />
        <path d="M100 154 Q100 182 100 208" stroke="#e9d5ff" stroke-width="2" stroke-dasharray="4,3" fill="none" />
        <path d="M106 154 Q104 182 106 208" stroke="#e9d5ff" stroke-width="1.8" stroke-dasharray="4,3" fill="none" />
        <rect x="74" y="210" width="52" height="7" rx="2" fill="#a855f7" />
        <line x1="75" y1="213" x2="125" y2="213" stroke="#e9d5ff" stroke-width="1" />
      `;
    } else if (top === 'sailor_dress') {
      // VESTIDO MARINERO ESCOLAR (Seifuku clásico con unión total de mangas)
      topSvg = `
        ${baseHandsSvg}
        <!-- Mangas Rectas Azules con Unión Perfecta al Hombro -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#1e3a8a" />
        <line x1="48" y1="200" x2="66" y2="200" stroke="#ffffff" stroke-width="2" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#1e3a8a" />
        <line x1="134" y1="200" x2="152" y2="200" stroke="#ffffff" stroke-width="2" />
        <!-- Torso Entallado en la Cintura -->
        <path d="M86 138 L70 148 Q74 175 78 194 L122 194 Q126 175 130 148 L114 138 Z" fill="#1e3a8a" />
        <!-- Cuello Marinero Cuadrado Blanco -->
        <polygon points="86,138 68,148 68,172 86,172" fill="#f8fafc" />
        <line x1="71" y1="150" x2="71" y2="170" stroke="#1e3a8a" stroke-width="1.8" />
        <polygon points="114,138 132,148 132,172 114,172" fill="#f8fafc" />
        <line x1="129" y1="150" x2="129" y2="170" stroke="#1e3a8a" stroke-width="1.8" />
        <!-- V Frontal Blanco con Pañuelo Rojo Anudado -->
        <polygon points="100,138 88,168 112,168" fill="#f8fafc" />
        <circle cx="100" cy="162" r="3.5" fill="#dc2626" />
        <polygon points="100,162 93,184 98,184" fill="#ef476f" />
        <polygon points="100,162 107,184 102,184" fill="#ef476f" />
        <!-- Falda Marinera Flotante con Raya Blanca -->
        <path d="M76 194 L124 194 L146 242 L54 242 Z" fill="#1e3a8a" />
        <line x1="74" y1="194" x2="68" y2="242" stroke="#172554" stroke-width="1.8" />
        <line x1="88" y1="194" x2="84" y2="242" stroke="#172554" stroke-width="1.8" />
        <line x1="100" y1="194" x2="100" y2="242" stroke="#172554" stroke-width="1.8" />
        <line x1="112" y1="194" x2="116" y2="242" stroke="#172554" stroke-width="1.8" />
        <line x1="126" y1="194" x2="132" y2="242" stroke="#172554" stroke-width="1.8" />
        <line x1="56" y1="238" x2="144" y2="238" stroke="#ffffff" stroke-width="2.5" />
      `;
    } else if (top === 'lab_coat') {
      // BATA QUANTUM DE CIENCIA (Mangas unificadas y bata abierta sobre talle esbelto)
      topSvg = `
        ${baseHandsSvg}
        <!-- Chaleco Científico Interior Ceñido -->
        <polygon points="100,138 86,176 114,176" fill="#1e293b" />
        <polygon points="100,138 92,156 108,156" fill="#f8fafc" />
        <polygon points="100,156 96,168 100,192 104,168" fill="#00b4d8" />
        <!-- Bata Abierta de Laboratorio Marcando la Cintura -->
        <path d="M86 138 L80 236 L66 236 Q74 186 70 150 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
        <path d="M114 138 L120 236 L134 236 Q126 186 130 150 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
        <line x1="80" y1="138" x2="80" y2="236" stroke="#00f0ff" stroke-width="1.8" />
        <line x1="120" y1="138" x2="120" y2="236" stroke="#00f0ff" stroke-width="1.8" />
        <rect x="71" y="174" width="8" height="12" rx="1.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
        <rect x="72" y="170" width="2" height="6" rx="1" fill="#00f0ff" />
        <rect x="75" y="169" width="2" height="7" rx="1" fill="#06d6a0" />
        <!-- Mangas de la Bata Perfectamente Soldadas a Hombros -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
        <line x1="48" y1="200" x2="66" y2="200" stroke="#00f0ff" stroke-width="2.2" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
        <line x1="134" y1="200" x2="152" y2="200" stroke="#00f0ff" stroke-width="2.2" />
      `;
    } else if (top === 'explorer_vest') {
      // CHAQUETA DE EXPEDICIÓN (Chaleco de cuero entallado y mangas continuas)
      topSvg = `
        ${baseHandsSvg}
        <!-- Camisa Safari Cordada -->
        <polygon points="100,138 90,168 110,168" fill="#f4e8c1" />
        <line x1="94" y1="148" x2="106" y2="156" stroke="#8c6d48" stroke-width="1.5" />
        <!-- Chaleco de Cuero Ceñido a Cintura -->
        <path d="M86 138 L70 150 Q75 178 78 208 L97 208 L97 168 Z" fill="#8c6d48" stroke="#5c4328" stroke-width="1" />
        <path d="M114 138 L130 150 Q125 178 122 208 L103 208 L103 168 Z" fill="#8c6d48" stroke="#5c4328" stroke-width="1" />
        <line x1="100" y1="168" x2="100" y2="208" stroke="#ffd166" stroke-width="2" stroke-dasharray="3,1" />
        <rect x="73" y="178" width="11" height="12" rx="2" fill="#6d5438" />
        <circle cx="78" cy="181" r="1.5" fill="#ffd166" />
        <rect x="116" y="178" width="11" height="12" rx="2" fill="#6d5438" />
        <circle cx="121" cy="181" r="1.5" fill="#ffd166" />
        <!-- Mangas Continuas de Safari -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#f4e8c1" />
        <rect x="47" y="198" width="19" height="6" rx="2" fill="#e8d7a7" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#f4e8c1" />
        <rect x="134" y="198" width="19" height="6" rx="2" fill="#e8d7a7" />
      `;
    } else if (top === 'cyber_hoodie') {
      // SUDADERA CYBERPUNK (Corte techwear moderno entallado a cintura y mangas continuas)
      topSvg = `
        ${baseHandsSvg}
        <!-- Torso Sudadera Obsidian Ceñido -->
        <path d="M86 138 L68 150 Q74 178 78 208 L122 208 Q126 178 132 150 L114 138 Z" fill="#181c2e" />
        <!-- Capucha Techwear Envolvente -->
        <path d="M82 138 C86 154 114 154 118 138 C116 160 84 160 82 138 Z" fill="#2d3748" stroke="#00f0ff" stroke-width="1.8" />
        <line x1="94" y1="154" x2="92" y2="174" stroke="#f8fafc" stroke-width="1.5" />
        <circle cx="92" cy="175" r="1.5" fill="#00f0ff" />
        <line x1="106" y1="154" x2="108" y2="174" stroke="#f8fafc" stroke-width="1.5" />
        <circle cx="108" cy="175" r="1.5" fill="#00f0ff" />
        <polygon points="100,174 106,182 100,190 94,182" fill="#ef476f" />
        <polygon points="100,177 104,182 100,187 96,182" fill="#00f0ff" />
        <!-- Mangas Techwear Perfectamente Enlazadas -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#181c2e" />
        <line x1="56" y1="148" x2="56" y2="200" stroke="#00f0ff" stroke-width="2.2" />
        <rect x="47" y="198" width="19" height="6" rx="2" fill="#2d3748" stroke="#ef476f" stroke-width="1" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#181c2e" />
        <line x1="144" y1="148" x2="144" y2="200" stroke="#00f0ff" stroke-width="2.2" />
        <rect x="134" y="198" width="19" height="6" rx="2" fill="#2d3748" stroke="#ef476f" stroke-width="1" />
      `;
    } else if (top === 'scholar_robe') {
      // TÚNICA DE GRAN HONOR (Túnica ceremonial entallada con faja dorada)
      topSvg = `
        ${baseHandsSvg}
        <polygon points="100,138 88,172 112,172" fill="#ffd166" />
        <polygon points="100,140 90,170 110,170" fill="#10002b" />
        <path d="M86 138 L68 150 Q74 178 78 208 L122 208 Q126 178 132 150 L114 138 Z" fill="#3c096c" />
        <path d="M86 138 C88 164 112 164 114 138" stroke="#ffd166" stroke-width="2" fill="none" />
        <circle cx="100" cy="162" r="5" fill="#00b4d8" stroke="#ffd166" stroke-width="1.8" />
        <circle cx="100" cy="162" r="2" fill="#ffffff" />
        <rect x="97" y="172" width="6" height="36" fill="#ffd166" />
        <!-- Mangas Ornamentadas Sin Separación -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#3c096c" />
        <line x1="48" y1="202" x2="66" y2="202" stroke="#ffd166" stroke-width="2.5" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#3c096c" />
        <line x1="134" y1="202" x2="152" y2="202" stroke="#ffd166" stroke-width="2.5" />
      `;
    } else {
      // Default: Blazer Escolar Mayor ('uniform_shirt' y fallbacks)
      topSvg = `
        ${baseHandsSvg}
        <!-- Torso Blazer Azul Marino Ceñido a Cintura Delgada de Adolescente -->
        <path d="M86 138 L68 144 Q73 174 78 192 Q79 202 75 210 L125 210 Q121 202 122 192 Q127 174 132 144 L114 138 Z" fill="#1d3557" />
        <!-- Camisa Blanca de Cuello -->
        <polygon points="100,138 86,170 114,170" fill="#f8fafc" />
        <!-- Corbata de Rayas Doradas y Carmesí -->
        <polygon points="100,154 94,170 100,200 106,170" fill="#d90429" />
        <line x1="95" y1="174" x2="105" y2="178" stroke="#ffd166" stroke-width="1.8" />
        <line x1="96" y1="186" x2="104" y2="190" stroke="#ffd166" stroke-width="1.8" />
        <!-- Solapas Elegantes del Blazer -->
        <polygon points="86,138 98,174 84,174 74,144" fill="#14213d" stroke="#0f172a" stroke-width="1" />
        <polygon points="114,138 102,174 116,174 126,144" fill="#14213d" stroke="#0f172a" stroke-width="1" />
        <line x1="100" y1="174" x2="100" y2="210" stroke="#14213d" stroke-width="2" />
        <circle cx="100" cy="182" r="2.5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <circle cx="100" cy="196" r="2.5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <!-- Insignia de Honor Escolar -->
        <path d="M74 174 L83 174 L83 182 Q78.5 186 74 182 Z" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <circle cx="78.5" cy="178" r="1.8" fill="#00b4d8" />
        <!-- Mangas Perfectamente Enlazadas al Blazer (Hombros sin huecos) -->
        <path d="M72 142 L48 144 L48 204 L66 204 L70 154 Z" fill="#1d3557" />
        <rect x="47" y="198" width="19" height="6" rx="1.5" fill="#14213d" />
        <circle cx="52" cy="201" r="1.3" fill="#ffd166" />
        <circle cx="58" cy="201" r="1.3" fill="#ffd166" />
        <path d="M128 142 L152 144 L152 204 L134 204 L130 154 Z" fill="#1d3557" />
        <rect x="134" y="198" width="19" height="6" rx="1.5" fill="#14213d" />
        <circle cx="142" cy="201" r="1.3" fill="#ffd166" />
        <circle cx="148" cy="201" r="1.3" fill="#ffd166" />
      `;
    }

    // -------------------------------------------------------------
    // ROPA INFERIOR (PIERNAS, PANTALONES, FALDAS, MEDIAS)
    // Cintura estrecha en $y=206..212$ acorde con la anatomía adolescente
    // -------------------------------------------------------------
    let bottomSvg = '';
    if (bottom === 'uniform_skirt') {
      bottomSvg = `
        <!-- Pretina de Falda Escolar Carmesí Estrecha -->
        <rect x="74" y="206" width="52" height="6" rx="2" fill="#800f2f" />
        <circle cx="100" cy="209" r="2" fill="#ffd166" />
        <!-- Falda Plisada con Tablas Acampanada -->
        <path d="M74 212 L126 212 L144 246 L56 246 Z" fill="#9e0031" />
        <line x1="74" y1="212" x2="66" y2="246" stroke="#590d22" stroke-width="1.8" />
        <line x1="88" y1="212" x2="84" y2="246" stroke="#590d22" stroke-width="1.8" />
        <line x1="100" y1="212" x2="100" y2="246" stroke="#590d22" stroke-width="1.8" />
        <line x1="112" y1="212" x2="116" y2="246" stroke="#590d22" stroke-width="1.8" />
        <line x1="126" y1="212" x2="134" y2="246" stroke="#590d22" stroke-width="1.8" />
        <!-- Piernas al descubierto estilizadas -->
        <rect x="74" y="246" width="16" height="18" rx="2" fill="${skin}" />
        <rect x="110" y="246" width="16" height="18" rx="2" fill="${skin}" />
        <!-- Medias Altas de Academia (Knee-high socks) -->
        <rect x="73" y="264" width="18" height="24" rx="3" fill="#1e293b" />
        <line x1="73" y1="267" x2="91" y2="267" stroke="#ffffff" stroke-width="1.5" />
        <line x1="73" y1="270" x2="91" y2="270" stroke="#ffffff" stroke-width="1.5" />
        <rect x="109" y="264" width="18" height="24" rx="3" fill="#1e293b" />
        <line x1="109" y1="267" x2="127" y2="267" stroke="#ffffff" stroke-width="1.5" />
        <line x1="109" y1="270" x2="127" y2="270" stroke="#ffffff" stroke-width="1.5" />
      `;
    } else if (bottom === 'frill_petticoat') {
      // CANCÁN DE ENCAJE / MEDIAS CON LAZOS
      bottomSvg = `
        <!-- Cinturilla de Encaje Estrecha -->
        <rect x="74" y="206" width="52" height="6" rx="2" fill="#4a044e" />
        <!-- Cancán de Doble Volante con Scallops -->
        <path d="M74 212 L126 212 L142 236 L58 236 Z" fill="#701a75" />
        <path d="M58 236 Q68 240 78 236 Q88 240 100 236 Q112 240 122 236 Q132 240 142 236" stroke="#fdf4ff" stroke-width="2.2" fill="none" />
        <path d="M60 236 L140 236 L144 246 L56 246 Z" fill="#86198f" opacity="0.9" />
        <path d="M56 246 Q67 250 78 246 Q89 250 100 246 Q111 250 122 246 Q133 250 144 246" stroke="#ffffff" stroke-width="2.5" fill="none" />
        <!-- Medias Finas con Lazos Laterales -->
        <rect x="73" y="246" width="17" height="42" rx="3" fill="#2e1065" opacity="0.8" />
        <circle cx="88" cy="264" r="2.2" fill="#f472b6" />
        <rect x="110" y="246" width="17" height="42" rx="3" fill="#2e1065" opacity="0.8" />
        <circle cx="112" cy="264" r="2.2" fill="#f472b6" />
      `;
    } else if (bottom === 'denim_shorts') {
      // SHORTS DENIM CON MEDIAS
      bottomSvg = `
        <!-- Cinturilla Denim Estrecha con Remaches -->
        <rect x="74" y="206" width="52" height="6" rx="2" fill="#1e3a8a" />
        <circle cx="78" cy="209" r="1.5" fill="#f59e0b" />
        <circle cx="122" cy="209" r="1.5" fill="#f59e0b" />
        <!-- Shorts Lavados con Dobladillo -->
        <path d="M74 212 L98 212 L96 236 L70 236 Z" fill="#2563eb" />
        <path d="M102 212 L126 212 L130 236 L104 236 Z" fill="#2563eb" />
        <line x1="70" y1="236" x2="96" y2="236" stroke="#60a5fa" stroke-width="2" />
        <line x1="104" y1="236" x2="130" y2="236" stroke="#60a5fa" stroke-width="2" />
        <!-- Medias Semi-Transparentes -->
        <rect x="72" y="236" width="18" height="52" rx="3" fill="#1e293b" opacity="0.85" />
        <rect x="110" y="236" width="18" height="52" rx="3" fill="#1e293b" opacity="0.85" />
      `;
    } else if (bottom === 'cargo_pants') {
      bottomSvg = `
        <!-- Cintura Táctica Estrecha -->
        <rect x="74" y="206" width="52" height="6" rx="2" fill="#1f2937" />
        <rect x="94" y="205" width="12" height="8" rx="2" fill="#00f0ff" stroke="#0284c7" stroke-width="1" />
        <!-- Joggers Cargo Estilizados -->
        <path d="M74 212 L98 212 L96 256 L88 284 L68 284 L66 256 Z" fill="#374151" />
        <path d="M102 212 L126 212 L134 256 L132 284 L112 284 L104 256 Z" fill="#374151" />
        <rect x="62" y="236" width="10" height="18" rx="2" fill="#1f2937" stroke="#4b5563" stroke-width="1" />
        <line x1="62" y1="242" x2="72" y2="242" stroke="#00f0ff" stroke-width="1.3" />
        <rect x="128" y="236" width="10" height="18" rx="2" fill="#1f2937" stroke="#4b5563" stroke-width="1" />
        <line x1="128" y1="242" x2="138" y2="242" stroke="#00f0ff" stroke-width="1.3" />
        <rect x="67" y="284" width="22" height="5" rx="1.5" fill="#1f2937" />
        <rect x="111" y="284" width="22" height="5" rx="1.5" fill="#1f2937" />
      `;
    } else {
      // Default: Pantalón de Gala ('uniform_pants' y fallbacks)
      bottomSvg = `
        <!-- Cinturón y Hebilla de Gala Estrechos -->
        <rect x="74" y="206" width="52" height="6" rx="2" fill="#0f172a" />
        <rect x="95" y="205" width="10" height="8" rx="2" fill="#ffd166" stroke="#b45309" stroke-width="1" />
        <!-- Pantalón Izquierdo -->
        <path d="M74 212 L98 212 L95 256 L88 288 L68 288 L66 256 Z" fill="#1d3557" />
        <line x1="80" y1="214" x2="78" y2="288" stroke="#14213d" stroke-width="1.5" />
        <!-- Pantalón Derecho -->
        <path d="M102 212 L126 212 L134 256 L132 288 L112 288 L105 256 Z" fill="#1d3557" />
        <line x1="120" y1="214" x2="122" y2="288" stroke="#14213d" stroke-width="1.5" />
      `;
    }

    // -------------------------------------------------------------
    // CALZADO Y PIES (ZAPATOS DETALLADOS)
    // Posicionados en la nueva base compacta (y ~286 a 312)
    // -------------------------------------------------------------
    let shoesSvg = '';
    if (shoes === 'mary_janes') {
      // ZAPATOS MARY JANE CON MEDIAS Y HEBILLA
      shoesSvg = `
        <!-- Zapato Izquierdo -->
        <path d="M68 284 Q78 280 88 284" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M62 288 L90 288 C96 288 98 298 95 306 C92 310 58 310 56 306 C54 300 56 288 62 288 Z" fill="#881337" stroke="#4c0519" stroke-width="1.2" />
        <rect x="56" y="306" width="39" height="4" rx="1" fill="#030712" />
        <!-- Correa e instep buckle -->
        <line x1="64" y1="294" x2="88" y2="294" stroke="#ffffff" stroke-width="2" />
        <rect x="74" y="292" width="5" height="5" rx="1" fill="#cbd5e1" stroke="#475569" stroke-width="0.8" />
        <path d="M64 290 Q76 288 88 290" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none" />
        <!-- Zapato Derecho -->
        <path d="M112 284 Q122 280 132 284" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M110 288 L138 288 C144 288 146 298 143 306 C140 310 106 310 104 306 C102 300 104 288 110 288 Z" fill="#881337" stroke="#4c0519" stroke-width="1.2" />
        <rect x="105" y="306" width="39" height="4" rx="1" fill="#030712" />
        <!-- Correa e instep buckle -->
        <line x1="112" y1="294" x2="136" y2="294" stroke="#ffffff" stroke-width="2" />
        <rect x="121" y="292" width="5" height="5" rx="1" fill="#cbd5e1" stroke="#475569" stroke-width="0.8" />
        <path d="M112 290 Q124 288 136 290" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none" />
      `;
    } else if (shoes === 'ankle_boots') {
      // BOTINES CON CORDONES
      shoesSvg = `
        <!-- Botín Izquierdo -->
        <path d="M62 284 L90 284 L94 306 C93 310 56 310 55 306 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
        <rect x="55" y="306" width="39" height="4" rx="1" fill="#020617" />
        <line x1="68" y1="288" x2="84" y2="292" stroke="#ffd166" stroke-width="1.5" />
        <line x1="84" y1="292" x2="68" y2="296" stroke="#ffd166" stroke-width="1.5" />
        <line x1="68" y1="296" x2="84" y2="300" stroke="#ffd166" stroke-width="1.5" />
        <!-- Botín Derecho -->
        <path d="M110 284 L138 284 L145 306 C144 310 107 310 106 306 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
        <rect x="106" y="306" width="39" height="4" rx="1" fill="#020617" />
        <line x1="116" y1="288" x2="132" y2="292" stroke="#ffd166" stroke-width="1.5" />
        <line x1="132" y1="292" x2="116" y2="296" stroke="#ffd166" stroke-width="1.5" />
        <line x1="116" y1="296" x2="132" y2="300" stroke="#ffd166" stroke-width="1.5" />
      `;
    } else if (shoes === 'boots_leather') {
      shoesSvg = `
        <!-- Bota Izquierda -->
        <path d="M62 284 L90 284 L94 306 C93 310 56 310 55 306 Z" fill="#6d4c41" stroke="#3e2723" stroke-width="1.5" />
        <rect x="55" y="306" width="39" height="4" rx="1" fill="#2d1d17" />
        <rect x="62" y="288" width="28" height="3" fill="#4e342e" />
        <rect x="73" y="287" width="5" height="5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <rect x="60" y="296" width="32" height="3" fill="#4e342e" />
        <rect x="73" y="295" width="5" height="5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <!-- Bota Derecha -->
        <path d="M110 284 L138 284 L145 306 C144 310 107 310 106 306 Z" fill="#6d4c41" stroke="#3e2723" stroke-width="1.5" />
        <rect x="106" y="306" width="39" height="4" rx="1" fill="#2d1d17" />
        <rect x="110" y="288" width="28" height="3" fill="#4e342e" />
        <rect x="121" y="287" width="5" height="5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <rect x="108" y="296" width="32" height="3" fill="#4e342e" />
        <rect x="121" y="295" width="5" height="5" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
      `;
    } else if (shoes === 'shoes_formal') {
      shoesSvg = `
        <!-- Mocasín Izquierdo -->
        <path d="M62 288 L90 288 C96 288 98 298 95 306 C92 310 58 310 56 306 C54 300 56 288 62 288 Z" fill="#111827" />
        <rect x="56" y="306" width="39" height="4" rx="1" fill="#030712" />
        <path d="M64 290 Q76 287 88 290" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none" />
        <rect x="68" y="294" width="18" height="3.5" rx="1" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
        <!-- Mocasín Derecho -->
        <path d="M110 288 L138 288 C144 288 146 298 143 306 C140 310 106 310 104 306 C102 300 104 288 110 288 Z" fill="#111827" />
        <rect x="105" y="306" width="39" height="4" rx="1" fill="#030712" />
        <path d="M112 290 Q124 287 136 290" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none" />
        <rect x="114" y="294" width="18" height="3.5" rx="1" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />
      `;
    } else {
      // Default: Zapatillas High-Top ('sneakers_white' y fallbacks)
      shoesSvg = `
        <!-- Zapatilla Izquierda -->
        <path d="M62 286 L90 286 C96 286 98 298 97 306 C96 310 58 310 56 306 C54 298 56 286 62 286 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
        <path d="M56 304 L97 304 L96 310 L56 310 Z" fill="#00b4d8" />
        <rect x="66" y="305" width="12" height="2.5" rx="1" fill="#ffffff" />
        <line x1="68" y1="292" x2="86" y2="292" stroke="#00b4d8" stroke-width="1.5" stroke-linecap="round" />
        <line x1="70" y1="297" x2="88" y2="297" stroke="#00b4d8" stroke-width="1.5" stroke-linecap="round" />
        <!-- Zapatilla Derecha -->
        <path d="M110 286 L138 286 C144 286 146 298 144 306 C142 310 104 310 103 306 C102 298 104 286 110 286 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
        <path d="M103 304 L144 304 L144 310 L103 310 Z" fill="#00b4d8" />
        <rect x="122" y="305" width="12" height="2.5" rx="1" fill="#ffffff" />
        <line x1="114" y1="292" x2="132" y2="292" stroke="#00b4d8" stroke-width="1.5" stroke-linecap="round" />
        <line x1="112" y1="297" x2="130" y2="297" stroke="#00b4d8" stroke-width="1.5" stroke-linecap="round" />
      `;
    }

    return `
      <svg viewBox="${viewBox}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <filter id="charShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-opacity="0.4" />
        </filter>

        <!-- Sombra en el suelo ajustada a la nueva estatura más baja -->
        ${!isHeadOnly ? `<ellipse cx="100" cy="318" rx="48" ry="7.5" fill="rgba(0,0,0,0.28)" />` : ''}

        <g filter="url(#charShadow)">
          <!-- CABELLO TRASERO CON VOLUMEN -->
          <g id="layer-hair-back">${hairBackSvg}</g>

          <!-- CALZADO Y PIES -->
          ${!isHeadOnly ? `<g id="layer-shoes">${shoesSvg}</g>` : ''}

          <!-- ROPA INFERIOR (PIERNAS / PANTALONES / FALDA) -->
          ${!isHeadOnly ? `<g id="layer-bottom">${bottomSvg}</g>` : ''}

          <!-- CUERPO / ATUENDO PRINCIPAL / VESTIDO -->
          ${!isHeadOnly ? `<g id="layer-top">${topSvg}</g>` : ''}

          <!-- CUELLO ANATÓMICO CON SOMBRA BAJO MENTÓN -->
          <g id="layer-neck">
            <path d="M91 114 L91 138 L109 138 L109 114 Z" fill="${skin}" />
            <path d="M91 114 Q100 124 109 114 L109 121 Q100 128 91 121 Z" fill="rgba(0,0,0,0.14)" />
            <line x1="93" y1="134" x2="98" y2="137" stroke="rgba(0,0,0,0.12)" stroke-width="1.5" stroke-linecap="round" />
            <line x1="107" y1="134" x2="102" y2="137" stroke="rgba(0,0,0,0.12)" stroke-width="1.5" stroke-linecap="round" />
          </g>

          <!-- CABEZA Y ROSTRO ARMONIZADOS CON ESTILO NOVELA VISUAL -->
          <g id="layer-head">
            <!-- Orejas anatómicas -->
            <path d="M66 78 C59 78 59 92 66 94 Z" fill="${skin}" />
            <path d="M65 81 C61 82 61 89 65 91" stroke="rgba(0,0,0,0.14)" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M134 78 C141 78 141 92 134 94 Z" fill="${skin}" />
            <path d="M135 81 C139 82 139 89 135 91" stroke="rgba(0,0,0,0.14)" stroke-width="1.5" fill="none" stroke-linecap="round" />

            <!-- Cara base estilizada con mentón elegante -->
            <path d="M66 82 C65 52 76 44 100 44 C124 44 135 52 134 82 C134 102 120 123 100 124 C80 123 66 102 66 82 Z" fill="${skin}" />

            <!-- Rubor en mejillas y destellos anime -->
            <ellipse cx="79" cy="94" rx="7" ry="3.5" fill="#ff758f" opacity="0.4" />
            <ellipse cx="121" cy="94" rx="7" ry="3.5" fill="#ff758f" opacity="0.4" />
            <circle cx="77" cy="93" r="1.2" fill="#fff" opacity="0.8" />
            <circle cx="123" cy="93" r="1.2" fill="#fff" opacity="0.8" />

            <!-- Nariz anime delicada -->
            <path d="M100 91 L99 94" stroke="#c97a63" stroke-width="1.6" stroke-linecap="round" opacity="0.65" />

            <!-- Ojos expresivos -->
            <g id="layer-eyes">${eyesSvg}</g>

            <!-- Boca -->
            <g id="layer-mouth">${mouthSvg}</g>

            <!-- CABELLO FRONTAL ELEGANTE -->
            <g id="layer-hair-front">${hairFrontSvg}</g>

            <!-- ACCESORIOS DECORATIVOS -->
            <g id="layer-accessories">${accSvg}</g>
          </g>
        </g>
      </svg>
    `;
  },

  // Generador de SVG para la mascota de acompañamiento (Ultra Adorables Chibi)
  renderPetSVG(petId, width = 85, height = 85) {
    if (!petId || petId === 'none') return '';

    if (petId === 'kitsune_spirit') {
      // KITSUNE MÍSTICO CELESTIAL: Zorrito Sagrado con Fuego Espiritual Kitsunebi
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="kitsuneGlow" x="-35%" y="-35%" width="170%" height="170%">
              <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#f43f5e" flood-opacity="0.65" />
            </filter>
            <radialGradient id="kitsunebiGrad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="35%" stop-color="#00f0ff" />
              <stop offset="75%" stop-color="#3b82f6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="kitsunebiGrad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="35%" stop-color="#ffd166" />
              <stop offset="75%" stop-color="#f43f5e" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#881337" stop-opacity="0" />
            </radialGradient>
          </defs>
          <g filter="url(#kitsuneGlow)">
            <!-- Orbes flotantes de fuego fatuo místico (Kitsunebi) -->
            <circle cx="15" cy="38" r="9" fill="url(#kitsunebiGrad1)" />
            <circle cx="15" cy="38" r="2.5" fill="#ffffff" />
            <polygon points="15,26 17,32 23,34 17,36 15,42 13,36 7,34 13,32" fill="#00f0ff" opacity="0.85" />

            <circle cx="85" cy="34" r="9" fill="url(#kitsunebiGrad2)" />
            <circle cx="85" cy="34" r="2.5" fill="#ffffff" />
            <polygon points="85,22 87,28 93,30 87,32 85,38 83,32 77,30 83,28" fill="#ffd166" opacity="0.85" />

            <circle cx="82" cy="74" r="2" fill="#ffd166" opacity="0.9" />
            <circle cx="18" cy="72" r="2" fill="#00f0ff" opacity="0.9" />

            <!-- Colas Esponjosas Místicas en Abanico (Nueve Colas Sagradas) -->
            <!-- Cola 1 (Extrema Izquierda) -->
            <path d="M38 68 C16 70 4 52 10 36 C16 26 26 34 22 46 C20 54 26 62 38 68" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
            <path d="M10 36 C12 30 20 28 22 34 C18 40 14 44 10 36" fill="#f43f5e" />

            <!-- Cola 2 (Izquierda Media) -->
            <path d="M42 66 C22 58 14 38 24 24 C32 16 38 26 34 38 C32 46 36 56 44 64" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
            <path d="M24 24 C28 18 34 18 36 24 C32 30 28 34 24 24" fill="#f43f5e" />

            <!-- Cola 3 (Central Elevada) -->
            <path d="M50 62 C42 42 48 20 52 14 C58 18 64 36 54 58" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
            <path d="M50 20 C52 14 56 14 56 20 C54 26 52 26 50 20" fill="#f43f5e" />

            <!-- Cola 4 (Derecha Media) -->
            <path d="M58 66 C78 58 86 38 76 24 C68 16 62 26 66 38 C68 46 64 56 56 64" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
            <path d="M76 24 C72 18 66 18 64 24 C68 30 72 34 76 24" fill="#f43f5e" />

            <!-- Cola 5 (Extrema Derecha) -->
            <path d="M62 68 C84 70 96 52 90 36 C84 26 74 34 78 46 C80 54 74 62 62 68" fill="#ffffff" stroke="#f43f5e" stroke-width="1.6" />
            <path d="M90 36 C88 30 80 28 78 34 C82 40 86 44 90 36" fill="#f43f5e" />

            <!-- Cuerpo Chibi Blanco Suave de Zorrito -->
            <ellipse cx="50" cy="66" rx="22" ry="19" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
            <ellipse cx="50" cy="67" rx="14" ry="13" fill="#ffe4e6" opacity="0.6" />

            <!-- Collar Sagrado Shimenawa Trenzado Rojo con Borlas -->
            <path d="M34 62 Q50 70 66 62" stroke="#dc2626" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M36 63 Q50 71 64 63" stroke="#ffd166" stroke-width="1.2" stroke-dasharray="3,2" fill="none" />
            <!-- Borlas ceremoniales colgantes -->
            <line x1="44" y1="67" x2="42" y2="74" stroke="#dc2626" stroke-width="2" stroke-linecap="round" />
            <line x1="56" y1="67" x2="58" y2="74" stroke="#dc2626" stroke-width="2" stroke-linecap="round" />

            <!-- Cascabel Suzu Dorado Brillante Central con Hendidura -->
            <circle cx="50" cy="68" r="5" fill="#ffd166" stroke="#b45309" stroke-width="1.2" />
            <circle cx="50" cy="67" r="1.6" fill="#ffffff" />
            <line x1="47" y1="70" x2="53" y2="70" stroke="#78350f" stroke-width="1" />
            <circle cx="50" cy="71" r="0.8" fill="#78350f" />

            <!-- Patitas Delanteras con Almohadillas Rosadas Achuchables -->
            <ellipse cx="40" cy="81" rx="6.5" ry="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="40" cy="81" r="2" fill="#fb7185" />
            <circle cx="38" cy="79" r="1" fill="#fb7185" />
            <circle cx="42" cy="79" r="1" fill="#fb7185" />
            <ellipse cx="60" cy="81" rx="6.5" ry="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="60" cy="81" r="2" fill="#fb7185" />
            <circle cx="58" cy="79" r="1" fill="#fb7185" />
            <circle cx="62" cy="79" r="1" fill="#fb7185" />

            <!-- Cabeza Redondita de Zorrito Chibi -->
            <circle cx="50" cy="46" r="25" fill="#ffffff" stroke="#e2e8f0" stroke-width="2.2" />

            <!-- Orejotas Grandes de Kitsune con Interior Carmesí y Mechones Blancos -->
            <polygon points="24,36 26,8 44,28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
            <polygon points="28,32 29,12 41,26" fill="#f43f5e" />
            <path d="M28 26 Q35 28 32 35 Q38 32 40 36" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round" />

            <polygon points="76,36 74,8 56,28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
            <polygon points="72,32 71,12 59,26" fill="#f43f5e" />
            <path d="M72 26 Q65 28 68 35 Q62 32 60 36" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round" />

            <!-- Marcas Sagradas Inari en la Frente (Llama Divina) -->
            <path d="M50 26 C47 31 47 36 50 40 C53 36 53 31 50 26 Z" fill="#e11d48" />
            <circle cx="50" cy="24" r="1.8" fill="#ffd166" />
            <circle cx="44" cy="32" r="1.5" fill="#e11d48" />
            <circle cx="56" cy="32" r="1.5" fill="#e11d48" />

            <!-- Delineado Místico Kumadori en las Mejillas -->
            <path d="M26 46 Q33 48 31 54" stroke="#e11d48" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M74 46 Q67 48 69 54" stroke="#e11d48" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Ojos Enormes Anime Rubí / Oro con Destello de Luna y Estrella -->
            <ellipse cx="37" cy="46" rx="7.5" ry="9" fill="#0f172a" stroke="#f43f5e" stroke-width="1.8" />
            <ellipse cx="37" cy="46" rx="5.5" ry="7" fill="#f43f5e" />
            <ellipse cx="37" cy="47" rx="3.5" ry="4" fill="#ffd166" />
            <circle cx="35" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="39" cy="48" r="1.4" fill="#ffffff" />
            <polygon points="35.5,48 36.5,49.5 38,50 36.5,50.5 35.5,52 34.5,50.5 33,50 34.5,49.5" fill="#ffffff" opacity="0.9" />

            <ellipse cx="63" cy="46" rx="7.5" ry="9" fill="#0f172a" stroke="#f43f5e" stroke-width="1.8" />
            <ellipse cx="63" cy="46" rx="5.5" ry="7" fill="#f43f5e" />
            <ellipse cx="63" cy="47" rx="3.5" ry="4" fill="#ffd166" />
            <circle cx="61" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="65" cy="48" r="1.4" fill="#ffffff" />
            <polygon points="61.5,48 62.5,49.5 64,50 62.5,50.5 61.5,52 60.5,50.5 59,50 60.5,49.5" fill="#ffffff" opacity="0.9" />

            <!-- Naricita y Sonrisa Fina Anime ":3" -->
            <polygon points="50,51 47.5,53.5 52.5,53.5" fill="#0f172a" />
            <path d="M46 55 Q48.5 58 50 55 Q51.5 58 54 55" stroke="#475569" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Mejillas Ruborizadas Rosadas Supertiernas -->
            <ellipse cx="27" cy="53" rx="5" ry="2.6" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="73" cy="53" rx="5" ry="2.6" fill="#f43f5e" opacity="0.6" />
          </g>
        </svg>
      `;
    } else if (petId === 'robot_owl') {
      // BÚHO ROBÓTICO ARCHIMEDES: Ultra Adorable Chibi Polluelo Sabio
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="owlGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#00f0ff" flood-opacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#owlGlow)">
            <!-- Estrellitas y notas musicales flotantes de felicidad -->
            <polygon points="16,24 17.5,27 21,28 17.5,29 16,32 14.5,29 11,28 14.5,27" fill="#ffd166" opacity="0.9" />
            <polygon points="84,18 85.5,21 89,22 85.5,23 84,26 82.5,23 79,22 82.5,21" fill="#00f0ff" opacity="0.9" />
            <circle cx="82" cy="68" r="1.8" fill="#ffd166" opacity="0.8" />
            <circle cx="18" cy="70" r="1.5" fill="#00f0ff" opacity="0.8" />

            <!-- Minichorros de propulsión tiernos en las patitas -->
            <ellipse cx="43" cy="85" rx="4" ry="2.5" fill="#00f0ff" opacity="0.8" />
            <polygon points="41,85 45,85 43,92" fill="#00f0ff" opacity="0.9" />
            <circle cx="43" cy="92" r="1.2" fill="#ffffff" />
            <ellipse cx="57" cy="85" rx="4" ry="2.5" fill="#00f0ff" opacity="0.8" />
            <polygon points="55,85 59,85 57,92" fill="#00f0ff" opacity="0.9" />
            <circle cx="57" cy="92" r="1.2" fill="#ffffff" />

            <!-- Patitas mecánicas redondeadas y rechonchas -->
            <rect x="40" y="80" width="6" height="5" rx="2.5" fill="#ffd166" />
            <rect x="54" y="80" width="6" height="5" rx="2.5" fill="#ffd166" />

            <!-- Alitas rechonchas aleteando con emoción -->
            <path d="M26 50 C12 48 8 62 14 74 C22 78 28 68 30 58 Z" fill="#1b2a47" stroke="#00f0ff" stroke-width="1.8" />
            <path d="M16 62 C13 68 17 72 22 72" stroke="#00f0ff" stroke-width="1.3" fill="none" />
            <path d="M74 50 C88 48 92 62 86 74 C78 78 72 68 70 58 Z" fill="#1b2a47" stroke="#00f0ff" stroke-width="1.8" />
            <path d="M84 62 C87 68 83 72 78 72" stroke="#00f0ff" stroke-width="1.3" fill="none" />

            <!-- Cuerpo Chibi Redondito y Achuchable -->
            <ellipse cx="50" cy="56" rx="28" ry="29" fill="#1b2a47" stroke="#38bdf8" stroke-width="2.2" />
            <ellipse cx="50" cy="62" rx="19" ry="20" fill="#0f172a" />

            <!-- Corazón Reactor en el Pecho (Arc-Heart) -->
            <path d="M50 72 C50 72 43 67 43 63 C43 60 45.5 58.5 48 60.5 C49 61.5 50 62.5 50 62.5 C50 62.5 51 61.5 52 60.5 C54.5 58.5 57 60 57 63 C57 67 50 72 50 72 Z" fill="#ffd166" stroke="#f59e0b" stroke-width="0.8" />
            <circle cx="50" cy="64" r="1.5" fill="#ffffff" />

            <!-- Gafas Enormes Redondas Doradas con Puente -->
            <circle cx="36" cy="46" r="14" fill="#050b14" stroke="#ffd166" stroke-width="2.5" />
            <circle cx="64" cy="46" r="14" fill="#050b14" stroke="#ffd166" stroke-width="2.5" />
            <line x1="49" y1="46" x2="51" y2="46" stroke="#ffd166" stroke-width="3" />

            <!-- Iris Gigantes Anime con Brillo Cian Holográfico -->
            <circle cx="36" cy="46" r="10" fill="#00b4d8" opacity="0.3" />
            <circle cx="64" cy="46" r="10" fill="#00b4d8" opacity="0.3" />
            <circle cx="36" cy="46" r="7.5" fill="#00f0ff" />
            <circle cx="64" cy="46" r="7.5" fill="#00f0ff" />
            <circle cx="36" cy="46" r="4" fill="#050b14" />
            <circle cx="64" cy="46" r="4" fill="#050b14" />
            <!-- Múltiples Destellos de Ternura (Catchlights) -->
            <circle cx="33.5" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="61.5" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="38.5" cy="48" r="1.5" fill="#ffffff" />
            <circle cx="66.5" cy="48" r="1.5" fill="#ffffff" />
            <circle cx="33" cy="48.5" r="1" fill="#ffffff" />
            <circle cx="61" cy="48.5" r="1" fill="#ffffff" />

            <!-- Mejillas Ruborizadas Rosadas Supertiernas -->
            <ellipse cx="27" cy="55" rx="5" ry="2.8" fill="#f43f5e" opacity="0.65" />
            <ellipse cx="73" cy="55" rx="5" ry="2.8" fill="#f43f5e" opacity="0.65" />

            <!-- Piquito Dorado Abierto Feliz -->
            <polygon points="50,49 45,55 55,55" fill="#ffd166" stroke="#b45309" stroke-width="1" />
            <path d="M47 55 Q50 59 53 55 Z" fill="#ff758f" />

            <!-- Orejitas / Antenas de Pluma Neón -->
            <path d="M25 32 Q32 40 25 43" fill="#00f0ff" />
            <path d="M75 32 Q68 40 75 43" fill="#00f0ff" />

            <!-- Birrete Académico Ladeado y Adorable -->
            <polygon points="48,15 70,24 50,32 28,24" fill="#0f172a" stroke="#ffd166" stroke-width="1.5" transform="rotate(-6 50 24)" />
            <rect x="42" y="27" width="16" height="6" rx="2" fill="#1e293b" transform="rotate(-6 50 27)" />
            <circle cx="49" cy="24" r="2.5" fill="#ffd166" />
            <path d="M49 24 Q63 26 66 36" stroke="#ffd166" stroke-width="1.5" fill="none" />
            <rect x="64" y="36" width="3.5" height="6" rx="1" fill="#ffd166" />
          </g>
        </svg>
      `;
    } else if (petId === 'cyber_cat') {
      // GATO CIBERNÉTICO PIXEL: Gatita Anime Chibi Kawaii con Patita Saludadora
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="catGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#ff007f" flood-opacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#catGlow)">
            <!-- Corazoncitos flotantes de amor cibernético -->
            <path d="M20 25 C20 25 15 20 15 16 C15 13 17.5 11.5 20 13.5 C21 14.5 22 15.5 22 15.5 C22 15.5 23 14.5 24 13.5 C26.5 11.5 29 13 29 16 C29 20 22 25 22 25 Z" fill="#ff007f" opacity="0.85" transform="scale(0.8) translate(3, 4)" />
            <polygon points="84,20 85.5,23 89,24 85.5,25 84,28 82.5,25 79,24 82.5,23" fill="#00f0ff" opacity="0.9" />
            <circle cx="88" cy="62" r="1.5" fill="#ff007f" opacity="0.8" />

            <!-- Colita Robótica Curvada y Esponjosa con Punta de Corazón Neón -->
            <path d="M68 64 C86 64 96 46 88 32 C84 22 72 26 76 34 C78 40 82 48 68 54" fill="none" stroke="#7b2cbf" stroke-width="6.5" stroke-linecap="round" />
            <path d="M68 64 C86 64 96 46 88 32 C84 22 72 26 76 34 C78 40 82 48 68 54" fill="none" stroke="#ff007f" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="88" cy="32" r="4" fill="#00f0ff" />
            <circle cx="88" cy="32" r="2" fill="#ffffff" />

            <!-- Cuerpo Chibi Redondito Púrpura -->
            <ellipse cx="50" cy="64" rx="23" ry="19" fill="#5a189a" stroke="#e0aaff" stroke-width="2" />
            <ellipse cx="50" cy="65" rx="15" ry="14" fill="#f8fafc" />

            <!-- Patita Derecha Apoyada y Patita Izquierda Levantada (Kawaii Paw Wave!) -->
            <!-- Patita Derecha -->
            <ellipse cx="65" cy="80" rx="6.5" ry="4.5" fill="#f8fafc" stroke="#e0aaff" stroke-width="1.5" />
            <circle cx="65" cy="80" r="2" fill="#ff007f" />
            <circle cx="63" cy="77" r="1" fill="#ff007f" />
            <circle cx="67" cy="77" r="1" fill="#ff007f" />
            <ellipse cx="65" cy="86" rx="8" ry="2" fill="none" stroke="#00f0ff" stroke-width="1.2" opacity="0.8" />
            <!-- Patita Izquierda Levantada Saludando ("Nya!") -->
            <ellipse cx="32" cy="64" rx="6" ry="6" fill="#f8fafc" stroke="#e0aaff" stroke-width="1.5" />
            <!-- Almohadilla rosa (Toe beans) -->
            <ellipse cx="32" cy="64" rx="2.8" ry="2.2" fill="#ff007f" />
            <circle cx="29" cy="60.5" r="1.1" fill="#ff007f" />
            <circle cx="32" cy="59.5" r="1.1" fill="#ff007f" />
            <circle cx="35" cy="60.5" r="1.1" fill="#ff007f" />
            <circle cx="32" cy="64" r="1" fill="#ffffff" opacity="0.7" />

            <!-- Cabeza Redonda y Expresiva Chibi -->
            <circle cx="50" cy="45" r="25" fill="#7b2cbf" stroke="#e0aaff" stroke-width="2.2" />

            <!-- Orejitas Grandes de Gato con Sensores de Audio Rosa Neón -->
            <!-- Oreja Izquierda -->
            <polygon points="26,34 33,10 46,26" fill="#5a189a" stroke="#e0aaff" stroke-width="2" />
            <polygon points="30,30 35,14 43,25" fill="#ff007f" />
            <line x1="31" y1="20" x2="39" y2="25" stroke="#ffffff" stroke-width="1.3" />
            <!-- Oreja Derecha -->
            <polygon points="74,34 67,10 54,26" fill="#5a189a" stroke="#e0aaff" stroke-width="2" />
            <polygon points="70,30 65,14 57,25" fill="#ff007f" />
            <line x1="69" y1="20" x2="61" y2="25" stroke="#ffffff" stroke-width="1.3" />

            <!-- Joya Holográfica en la Frente -->
            <polygon points="50,26 53,31 50,36 47,31" fill="#00f0ff" />
            <circle cx="50" cy="31" r="1" fill="#ffffff" />

            <!-- Ojos Enormes Anime Esmeralda con Reflejo de Corazón -->
            <!-- Ojo Izquierdo -->
            <ellipse cx="37" cy="45" rx="7.5" ry="9" fill="#050b14" stroke="#06d6a0" stroke-width="1.8" />
            <ellipse cx="37" cy="45" rx="5.5" ry="7" fill="#06d6a0" />
            <ellipse cx="37" cy="45" rx="2" ry="5.5" fill="#050b14" />
            <circle cx="35" cy="42" r="2.6" fill="#ffffff" />
            <circle cx="39" cy="47" r="1.3" fill="#ffffff" />
            <circle cx="35.5" cy="48" r="0.9" fill="#ffffff" />
            <!-- Ojo Derecho -->
            <ellipse cx="63" cy="45" rx="7.5" ry="9" fill="#050b14" stroke="#06d6a0" stroke-width="1.8" />
            <ellipse cx="63" cy="45" rx="5.5" ry="7" fill="#06d6a0" />
            <ellipse cx="63" cy="45" rx="2" ry="5.5" fill="#050b14" />
            <circle cx="61" cy="42" r="2.6" fill="#ffffff" />
            <circle cx="65" cy="47" r="1.3" fill="#ffffff" />
            <circle cx="61.5" cy="48" r="0.9" fill="#ffffff" />

            <!-- Naricita Rosa y Sonrisa Anime ":3" -->
            <polygon points="50,51 47.5,53.5 52.5,53.5" fill="#ff007f" />
            <path d="M45 55 Q47.5 58 50 55 Q52.5 58 55 55" stroke="#f8fafc" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Bigotes Neón Luminosos -->
            <line x1="28" y1="50" x2="16" y2="48" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" />
            <line x1="27" y1="54" x2="15" y2="55" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" />
            <line x1="72" y1="50" x2="84" y2="48" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" />
            <line x1="73" y1="54" x2="85" y2="55" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" />

            <!-- Mejillas Ruborizadas Rosa Intenso -->
            <ellipse cx="29" cy="52" rx="4.5" ry="2.2" fill="#ff007f" opacity="0.65" />
            <ellipse cx="71" cy="52" rx="4.5" ry="2.2" fill="#ff007f" opacity="0.65" />
            <circle cx="28" cy="51.5" r="0.9" fill="#ffffff" />
            <circle cx="72" cy="51.5" r="0.9" fill="#ffffff" />

            <!-- Collarín con Cascabel Dorado y Dije de Estrella Holográfica -->
            <path d="M34 62 Q50 69 66 62" stroke="#ff007f" stroke-width="3" fill="none" stroke-linecap="round" />
            <circle cx="50" cy="67" r="4.5" fill="#ffd166" stroke="#b45309" stroke-width="1" />
            <circle cx="50" cy="67" r="1.8" fill="#d90429" />
          </g>
        </svg>
      `;
    } else if (petId === 'hologram_pup') {
      // CACHORRO HOLOGRÁFICO SPARK: Perrito Chibi Ultra Tierno con Orejitas Caídas y Lengüita
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="pupGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#ffb703" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#pupGlow)">
            <!-- Estrellas y Huesito Holográfico Flotante -->
            <polygon points="16,26 18,29 22,30 18,31 16,35 14,31 10,30 14,29" fill="#ffffff" opacity="0.9" />
            <polygon points="84,22 85.5,25 89,26 85.5,27 84,30 82.5,27 79,26 82.5,25" fill="#ffd166" opacity="0.9" />
            <circle cx="20" cy="72" r="1.5" fill="#ffd166" opacity="0.8" />
            <circle cx="80" cy="74" r="1.5" fill="#00f0ff" opacity="0.8" />

            <!-- Colita Moviéndose con Alegría (Wagging tail con destellos) -->
            <path d="M68 64 Q88 60 90 46 Q84 44 72 56" fill="rgba(255, 183, 3, 0.95)" stroke="#fb8500" stroke-width="1.8" />
            <circle cx="90" cy="44" r="3" fill="#ffffff" />
            <polygon points="90,38 91.5,41 95,42 91.5,43 90,46 88.5,43 85,42 88.5,41" fill="#ffd166" opacity="0.8" />

            <!-- Cuerpo Chibi Redondito y Achuchable -->
            <ellipse cx="50" cy="65" rx="24" ry="20" fill="rgba(255, 183, 3, 0.9)" stroke="#fb8500" stroke-width="2" />
            <!-- Pechito blanco esponjoso -->
            <ellipse cx="50" cy="66" rx="14" ry="12" fill="rgba(255, 255, 255, 0.95)" />

            <!-- Patitas Delanteras con Almohadillas en Forma de Corazón -->
            <ellipse cx="38" cy="80" rx="7.5" ry="5.5" fill="#fb8500" stroke="#ffd166" stroke-width="1.5" />
            <circle cx="38" cy="80" r="2.2" fill="#ffffff" />
            <circle cx="35" cy="77" r="1.2" fill="#ffffff" />
            <circle cx="41" cy="77" r="1.2" fill="#ffffff" />
            <ellipse cx="62" cy="80" rx="7.5" ry="5.5" fill="#fb8500" stroke="#ffd166" stroke-width="1.5" />
            <circle cx="62" cy="80" r="2.2" fill="#ffffff" />
            <circle cx="59" cy="77" r="1.2" fill="#ffffff" />
            <circle cx="65" cy="77" r="1.2" fill="#ffffff" />

            <!-- Cabeza Redondita de Cachorro Chibi -->
            <circle cx="50" cy="46" r="26" fill="rgba(255, 183, 3, 0.92)" stroke="#fb8500" stroke-width="2.2" />

            <!-- Orejitas Caídas Suaves y Esponjosas -->
            <!-- Oreja Izquierda -->
            <path d="M28 34 C16 34 14 56 24 62 C30 62 33 50 31 38 Z" fill="#fb8500" stroke="#d97706" stroke-width="1.8" />
            <ellipse cx="22" cy="54" rx="3" ry="5" fill="#ea580c" opacity="0.5" />
            <!-- Oreja Derecha -->
            <path d="M72 34 C84 34 86 56 76 62 C70 62 67 50 69 38 Z" fill="#fb8500" stroke="#d97706" stroke-width="1.8" />
            <ellipse cx="78" cy="54" rx="3" ry="5" fill="#ea580c" opacity="0.5" />

            <!-- Mancha Blanca del Hocico -->
            <ellipse cx="50" cy="52" rx="13" ry="11" fill="rgba(255, 255, 255, 0.95)" />

            <!-- Cejitas de Cachorro Inocente -->
            <ellipse cx="36" cy="36" rx="3.5" ry="2" fill="#d97706" opacity="0.8" />
            <ellipse cx="64" cy="36" rx="3.5" ry="2" fill="#d97706" opacity="0.8" />

            <!-- Ojos Enormes Brillantes "Puppy Eyes" Imposibles de Resistir -->
            <!-- Ojo Izquierdo -->
            <circle cx="37" cy="44" r="7" fill="#0f172a" />
            <circle cx="37" cy="44" r="5" fill="#451a03" />
            <circle cx="34.5" cy="41.5" r="2.8" fill="#ffffff" />
            <circle cx="39.5" cy="46" r="1.4" fill="#ffffff" />
            <circle cx="35" cy="47" r="0.9" fill="#ffffff" />
            <!-- Ojo Derecho -->
            <circle cx="63" cy="44" r="7" fill="#0f172a" />
            <circle cx="63" cy="44" r="5" fill="#451a03" />
            <circle cx="60.5" cy="41.5" r="2.8" fill="#ffffff" />
            <circle cx="65.5" cy="46" r="1.4" fill="#ffffff" />
            <circle cx="61" cy="47" r="0.9" fill="#ffffff" />

            <!-- Naricita Redonda Negra Brillante -->
            <ellipse cx="50" cy="48" rx="3.5" ry="2.5" fill="#0f172a" />
            <circle cx="49" cy="47" r="1" fill="#ffffff" />

            <!-- Sonrisa de Perrito Feliz con Lengüita Asomando (Blep!) -->
            <path d="M45 53 Q50 57 55 53" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M47 54 C47 54 47 62 50 62 C53 62 53 54 53 54 Z" fill="#ff758f" stroke="#e11d48" stroke-width="0.8" />
            <line x1="50" y1="56" x2="50" y2="60" stroke="#e11d48" stroke-width="0.8" />

            <!-- Mejillas Sonrosadas Dulces -->
            <ellipse cx="28" cy="51" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="72" cy="51" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.6" />

            <!-- Collarín Futurista Cian Neón con Huesito Holográfico -->
            <path d="M34 60 Q50 67 66 60" stroke="#00f0ff" stroke-width="3.2" fill="none" stroke-linecap="round" />
            <!-- Dije de Hueso Holográfico Dorado -->
            <rect x="46" y="65" width="8" height="3.5" rx="1.5" fill="#ffd166" />
            <circle cx="46" cy="65" r="2" fill="#ffd166" />
            <circle cx="46" cy="68.5" r="2" fill="#ffd166" />
            <circle cx="54" cy="65" r="2" fill="#ffd166" />
            <circle cx="54" cy="68.5" r="2" fill="#ffd166" />
            <circle cx="50" cy="66.5" r="1" fill="#ffffff" />
          </g>
        </svg>
      `;
    } else if (petId === 'astral_dragon') {
      // MINI DRAGÓN ASTRAL DRACO: Chibi Dragón Cósmico con Alitas y Cuernos de Oro
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="dragonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#8b5cf6" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#dragonGlow)">
            <!-- Estrellas y polvo cósmico flotante -->
            <polygon points="16,22 17.5,25 21,26 17.5,27 16,30 14.5,27 11,26 14.5,25" fill="#ffd166" opacity="0.9" />
            <polygon points="86,18 87.5,21 91,22 87.5,23 86,26 84.5,23 81,22 84.5,21" fill="#00f0ff" opacity="0.9" />
            <circle cx="82" cy="72" r="1.8" fill="#ffd166" opacity="0.8" />
            <circle cx="18" cy="74" r="1.5" fill="#c084fc" opacity="0.8" />

            <!-- Colita de Dragón con Estrella Cósmica -->
            <path d="M66 68 C84 68 96 52 86 38 C82 30 72 34 76 42 C78 48 80 56 66 60" fill="none" stroke="#6366f1" stroke-width="6" stroke-linecap="round" />
            <path d="M66 68 C84 68 96 52 86 38 C82 30 72 34 76 42 C78 48 80 56 66 60" fill="none" stroke="#a5b4fc" stroke-width="2" stroke-linecap="round" />
            <polygon points="86,38 88,32 94,36 88,40 86,46 84,40 78,36 84,32" fill="#ffd166" />
            <circle cx="86" cy="38" r="2" fill="#ffffff" />

            <!-- Alitas de Murciélago Dragón Translúcidas -->
            <path d="M30 46 C16 38 12 52 14 62 C22 62 26 56 30 52 Z" fill="#c084fc" stroke="#818cf8" stroke-width="1.5" opacity="0.9" />
            <path d="M14 62 Q20 54 28 50" stroke="#00f0ff" stroke-width="1.2" fill="none" />
            <path d="M70 46 C84 38 88 52 86 62 C78 62 74 56 70 52 Z" fill="#c084fc" stroke="#818cf8" stroke-width="1.5" opacity="0.9" />
            <path d="M86 62 Q80 54 72 50" stroke="#00f0ff" stroke-width="1.2" fill="none" />

            <!-- Cuerpo Chibi Redondito Violeta Cósmico -->
            <ellipse cx="50" cy="65" rx="24" ry="20" fill="#6366f1" stroke="#a5b4fc" stroke-width="2" />
            <!-- Pechito Celeste Brillante -->
            <ellipse cx="50" cy="67" rx="14" ry="13" fill="#a5f3fc" />
            <line x1="42" y1="65" x2="58" y2="65" stroke="#38bdf8" stroke-width="1.2" opacity="0.6" />
            <line x1="44" y1="71" x2="56" y2="71" stroke="#38bdf8" stroke-width="1.2" opacity="0.6" />

            <!-- Patitas Delanteras con Garras Suaves -->
            <ellipse cx="38" cy="80" rx="6.5" ry="4.5" fill="#4338ca" stroke="#ffd166" stroke-width="1.2" />
            <circle cx="38" cy="80" r="1.8" fill="#ffd166" />
            <ellipse cx="62" cy="80" rx="6.5" ry="4.5" fill="#4338ca" stroke="#ffd166" stroke-width="1.2" />
            <circle cx="62" cy="80" r="1.8" fill="#ffd166" />

            <!-- Cabeza Redondita de Dragón Chibi -->
            <circle cx="50" cy="46" r="26" fill="#6366f1" stroke="#a5b4fc" stroke-width="2.2" />

            <!-- Cuernitos Dorados Curvos de Dragón -->
            <path d="M34 28 C30 14 38 8 42 12 C38 18 38 24 38 30 Z" fill="#ffd166" stroke="#b45309" stroke-width="1.2" />
            <path d="M66 28 C70 14 62 8 58 12 C62 18 62 24 62 30 Z" fill="#ffd166" stroke="#b45309" stroke-width="1.2" />

            <!-- Joya Cósmica en la Frente -->
            <polygon points="50,28 54,34 50,40 46,34" fill="#00f0ff" stroke="#38bdf8" stroke-width="1" />
            <circle cx="50" cy="34" r="1.5" fill="#ffffff" />

            <!-- Ojos Enormes Anime Amatista Cósmica -->
            <ellipse cx="37" cy="46" rx="7.5" ry="9" fill="#050b14" stroke="#a855f7" stroke-width="1.8" />
            <ellipse cx="37" cy="46" rx="5.5" ry="7" fill="#a855f7" />
            <ellipse cx="37" cy="46" rx="2" ry="5.5" fill="#050b14" />
            <circle cx="35" cy="43" r="2.6" fill="#ffffff" />
            <circle cx="39" cy="48" r="1.3" fill="#ffffff" />
            <ellipse cx="63" cy="46" rx="7.5" ry="9" fill="#050b14" stroke="#a855f7" stroke-width="1.8" />
            <ellipse cx="63" cy="46" rx="5.5" ry="7" fill="#a855f7" />
            <ellipse cx="63" cy="46" rx="2" ry="5.5" fill="#050b14" />
            <circle cx="61" cy="43" r="2.6" fill="#ffffff" />
            <circle cx="65" cy="48" r="1.3" fill="#ffffff" />

            <!-- Hocico Dulce de Dragón y Sonrisa Tierna -->
            <ellipse cx="50" cy="52" rx="4" ry="2.8" fill="#4338ca" />
            <circle cx="48" cy="51.5" r="0.8" fill="#a5b4fc" />
            <circle cx="52" cy="51.5" r="0.8" fill="#a5b4fc" />
            <path d="M46 54 Q50 58 54 54" stroke="#a5f3fc" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Mejillas Sonrosadas -->
            <ellipse cx="28" cy="53" rx="4.5" ry="2.2" fill="#f43f5e" opacity="0.65" />
            <ellipse cx="72" cy="53" rx="4.5" ry="2.2" fill="#f43f5e" opacity="0.65" />
          </g>
        </svg>
      `;
    } else if (petId === 'mecha_bunny') {
      // CONEJITA MECHA USAGI: Conejita Cibernética Blanca y Rosa con Zanahoria Holográfica
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="bunnyGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#ff007f" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#bunnyGlow)">
            <!-- Corazones y destellos flotantes -->
            <path d="M18 26 C18 26 14 21 14 18 C14 15 16 14 18 15.5 C19 16.5 20 17 20 17 C20 17 21 16.5 22 15.5 C24 14 26 15 26 18 C26 21 18 26 18 26 Z" fill="#ff007f" opacity="0.8" />
            <polygon points="84,20 85.5,23 89,24 85.5,25 84,28 82.5,25 79,24 82.5,23" fill="#00f0ff" opacity="0.9" />

            <!-- Orejotas Mecha de Conejita -->
            <path d="M34 38 L24 6 C24 2 34 2 36 6 L44 38 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
            <path d="M29 32 L26 10 C26 7 32 7 33 10 L38 32 Z" fill="#ff007f" />
            <line x1="29.5" y1="12" x2="33.5" y2="30" stroke="#ffffff" stroke-width="1.3" />
            <path d="M66 38 L76 6 C76 2 66 2 64 6 L56 38 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
            <path d="M71 32 L74 10 C74 7 68 7 67 10 L62 32 Z" fill="#ff007f" />
            <line x1="70.5" y1="12" x2="66.5" y2="30" stroke="#ffffff" stroke-width="1.3" />

            <!-- Colita de Algodón Esponjosa -->
            <circle cx="26" cy="72" r="7" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <circle cx="26" cy="72" r="3.5" fill="#fbcfe8" />

            <!-- Cuerpo Chibi Blanco Redondito -->
            <ellipse cx="50" cy="66" rx="23" ry="19" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
            <ellipse cx="50" cy="67" rx="14" ry="12" fill="#fbcfe8" opacity="0.8" />

            <!-- Patitas Delanteras con Almohadillas -->
            <ellipse cx="40" cy="80" rx="6" ry="4.5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="40" cy="80" r="1.8" fill="#ff007f" />
            <ellipse cx="60" cy="80" rx="6" ry="4.5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="60" cy="80" r="1.8" fill="#ff007f" />

            <!-- Mini Zanahoria Holográfica Flotante entre sus patitas -->
            <polygon points="50,68 45,78 55,78" fill="#fb923c" stroke="#ea580c" stroke-width="1" />
            <path d="M46 68 Q50 63 50 60 Q50 63 54 68" stroke="#00f0ff" stroke-width="2" fill="none" />

            <!-- Cabeza Redonda y Esponjosa -->
            <circle cx="50" cy="46" r="25" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2.2" />

            <!-- Ojos Enormes Anime Rubí con Destello de Corazón -->
            <ellipse cx="37" cy="46" rx="7.5" ry="9" fill="#050b14" stroke="#ff007f" stroke-width="1.8" />
            <ellipse cx="37" cy="46" rx="5.5" ry="7" fill="#ff007f" />
            <circle cx="35" cy="43" r="2.6" fill="#ffffff" />
            <circle cx="39" cy="48" r="1.3" fill="#ffffff" />
            <ellipse cx="63" cy="46" rx="7.5" ry="9" fill="#050b14" stroke="#ff007f" stroke-width="1.8" />
            <ellipse cx="63" cy="46" rx="5.5" ry="7" fill="#ff007f" />
            <circle cx="61" cy="43" r="2.6" fill="#ffffff" />
            <circle cx="65" cy="48" r="1.3" fill="#ffffff" />

            <!-- Naricita Rosa y Sonrisa Anime ":3" -->
            <polygon points="50,51 48,53 52,53" fill="#ff007f" />
            <path d="M46 55 Q48.5 58 50 55 Q51.5 58 54 55" stroke="#475569" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Bigotitos Cyber Rosa -->
            <line x1="28" y1="51" x2="18" y2="50" stroke="#ff007f" stroke-width="1.3" stroke-linecap="round" />
            <line x1="28" y1="55" x2="18" y2="57" stroke="#ff007f" stroke-width="1.3" stroke-linecap="round" />
            <line x1="72" y1="51" x2="82" y2="50" stroke="#ff007f" stroke-width="1.3" stroke-linecap="round" />
            <line x1="72" y1="55" x2="82" y2="57" stroke="#ff007f" stroke-width="1.3" stroke-linecap="round" />

            <!-- Mejillas Ruborizadas -->
            <ellipse cx="29" cy="53" rx="4.5" ry="2.2" fill="#ff007f" opacity="0.6" />
            <ellipse cx="71" cy="53" rx="4.5" ry="2.2" fill="#ff007f" opacity="0.6" />
          </g>
        </svg>
      `;
    } else if (petId === 'crystal_fox') {
      // KITSUNE DE CRISTAL KIRA: Zorro Ártico Místico con 3 Colas de Hielo y Marcas de Santuario
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="foxGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#00f0ff" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#foxGlow)">
            <!-- Cristales de nieve flotantes -->
            <polygon points="16,22 18,25 22,26 18,27 16,30 14,27 10,26 14,25" fill="#38bdf8" opacity="0.9" />
            <polygon points="86,20 87.5,23 91,24 87.5,25 86,28 84.5,25 81,24 84.5,23" fill="#e0f2fe" opacity="0.9" />
            <circle cx="82" cy="74" r="1.5" fill="#38bdf8" opacity="0.8" />

            <!-- Tres Colitas de Cristal de Hielo Ondulantes -->
            <path d="M34 68 C16 66 10 50 18 36 C24 28 32 36 28 46 C26 54 30 62 36 66" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" />
            <path d="M66 68 C84 66 90 50 82 36 C76 28 68 36 72 46 C74 54 70 62 64 66" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" />
            <path d="M50 64 C50 44 64 30 56 22 C48 18 42 30 46 44 C48 52 50 58 50 64" fill="#bae6fd" stroke="#00f0ff" stroke-width="1.8" />

            <!-- Cuerpo Chibi Blanco de Nieve -->
            <ellipse cx="50" cy="65" rx="22" ry="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
            <ellipse cx="50" cy="66" rx="13" ry="12" fill="#e0f2fe" />

            <!-- Collar de Santuario Rojo con Cascabel Dorado y Magatama -->
            <path d="M35 62 Q50 68 65 62" stroke="#dc2626" stroke-width="3" fill="none" stroke-linecap="round" />
            <circle cx="50" cy="67" r="4.5" fill="#ffd166" stroke="#b45309" stroke-width="1" />
            <circle cx="50" cy="67" r="1.8" fill="#06d6a0" />

            <!-- Patitas Delanteras con Almohadillas Icy -->
            <ellipse cx="40" cy="79" rx="6.5" ry="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="40" cy="79" r="1.8" fill="#38bdf8" />
            <ellipse cx="60" cy="79" rx="6.5" ry="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="60" cy="79" r="1.8" fill="#38bdf8" />

            <!-- Cabeza Redondita de Kitsune -->
            <circle cx="50" cy="46" r="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.2" />

            <!-- Orejas Grandes de Zorro con Interior Bermellón -->
            <polygon points="26,36 28,10 44,28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
            <polygon points="30,32 31,14 41,26" fill="#ef4444" />
            <polygon points="74,36 72,10 56,28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
            <polygon points="70,32 69,14 59,26" fill="#ef4444" />

            <!-- Marcas Faciales de Santuario Kitsune -->
            <path d="M50 28 L52 34 L50 40 L48 34 Z" fill="#dc2626" />
            <circle cx="50" cy="27" r="1.5" fill="#dc2626" />
            <path d="M28 44 Q32 46 32 50" stroke="#dc2626" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M72 44 Q68 46 68 50" stroke="#dc2626" stroke-width="1.5" fill="none" stroke-linecap="round" />

            <!-- Ojos Enormes Anime Zafiro Místico -->
            <circle cx="37" cy="46" r="7" fill="#0f172a" />
            <circle cx="37" cy="46" r="5" fill="#0284c7" />
            <circle cx="35" cy="43.5" r="2.6" fill="#ffffff" />
            <circle cx="39" cy="48" r="1.2" fill="#ffffff" />
            <circle cx="63" cy="46" r="7" fill="#0f172a" />
            <circle cx="63" cy="46" r="5" fill="#0284c7" />
            <circle cx="61" cy="43.5" r="2.6" fill="#ffffff" />
            <circle cx="65" cy="48" r="1.2" fill="#ffffff" />

            <!-- Nariz y Sonrisa Fina de Zorro -->
            <polygon points="50,51 48,53 52,53" fill="#0f172a" />
            <path d="M47 55 Q50 58 53 55" stroke="#475569" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Mejillas Sonrosadas -->
            <ellipse cx="28" cy="53" rx="4" ry="2" fill="#f43f5e" opacity="0.5" />
            <ellipse cx="72" cy="53" rx="4" ry="2" fill="#f43f5e" opacity="0.5" />
          </g>
        </svg>
      `;
    } else if (petId === 'quantum_panda') {
      // PANDA CUÁNTICO BAMBU: Osito Panda Espacial en Escafandra con Jetpack y Bambú Estelar
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="pandaGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#06d6a0" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#pandaGlow)">
            <!-- Estrellitas orbitales -->
            <polygon points="16,22 17.5,25 21,26 17.5,27 16,30 14.5,27 11,26 14.5,25" fill="#06d6a0" opacity="0.9" />
            <polygon points="86,18 87.5,21 91,22 87.5,23 86,26 84.5,23 81,22 84.5,21" fill="#ffd166" opacity="0.9" />

            <!-- Jetpack Espacial en la Espalda con Llamitas Cian -->
            <rect x="22" y="58" width="10" height="18" rx="3" fill="#1e293b" stroke="#00f0ff" stroke-width="1.2" />
            <ellipse cx="27" cy="78" rx="4" ry="2" fill="#00f0ff" />
            <polygon points="25,78 29,78 27,85" fill="#00f0ff" />
            <circle cx="27" cy="85" r="1.2" fill="#ffffff" />
            <rect x="68" y="58" width="10" height="18" rx="3" fill="#1e293b" stroke="#00f0ff" stroke-width="1.2" />
            <ellipse cx="73" cy="78" rx="4" ry="2" fill="#00f0ff" />
            <polygon points="71,78 75,78 73,85" fill="#00f0ff" />
            <circle cx="73" cy="85" r="1.2" fill="#ffffff" />

            <!-- Cuerpo Chibi de Panda Regordete con Traje Espacial -->
            <ellipse cx="50" cy="66" rx="24" ry="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
            <ellipse cx="50" cy="67" rx="14" ry="12" fill="#0f172a" />
            <circle cx="50" cy="67" r="3" fill="#06d6a0" />

            <!-- Patitas de Panda con Tallo de Bambú Cósmico Neón -->
            <ellipse cx="38" cy="81" rx="7" ry="5" fill="#0f172a" />
            <ellipse cx="62" cy="81" rx="7" ry="5" fill="#0f172a" />
            <rect x="64" y="52" width="5" height="24" rx="2" fill="#06d6a0" stroke="#047857" stroke-width="1" transform="rotate(-15 64 52)" />
            <circle cx="62" cy="54" r="3" fill="#34d399" />
            <circle cx="68" cy="62" r="3" fill="#34d399" />

            <!-- Orejitas Redondas Negras de Panda -->
            <circle cx="28" cy="28" r="9" fill="#0f172a" />
            <circle cx="28" cy="28" r="4" fill="#334155" />
            <circle cx="72" cy="28" r="9" fill="#0f172a" />
            <circle cx="72" cy="28" r="4" fill="#334155" />

            <!-- Cabeza Blanca de Panda -->
            <circle cx="50" cy="46" r="25" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />

            <!-- Parches Negros en los Ojos Típicos de Panda -->
            <ellipse cx="36" cy="45" rx="8" ry="10" fill="#0f172a" transform="rotate(-15 36 45)" />
            <ellipse cx="64" cy="45" rx="8" ry="10" fill="#0f172a" transform="rotate(15 64 45)" />

            <!-- Ojos Brillantes Esmeralda Anime -->
            <circle cx="36" cy="45" r="5" fill="#06d6a0" />
            <circle cx="36" cy="45" r="2.5" fill="#0f172a" />
            <circle cx="34" cy="43" r="2" fill="#ffffff" />
            <circle cx="64" cy="45" r="5" fill="#06d6a0" />
            <circle cx="64" cy="45" r="2.5" fill="#0f172a" />
            <circle cx="62" cy="43" r="2" fill="#ffffff" />

            <!-- Naricita de Panda y Sonrisa Feliz -->
            <ellipse cx="50" cy="52" rx="4" ry="2.8" fill="#0f172a" />
            <path d="M46 55 Q50 58 54 55" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Mejillas Sonrosadas -->
            <ellipse cx="28" cy="52" rx="4" ry="2.2" fill="#ff758f" opacity="0.6" />
            <ellipse cx="72" cy="52" rx="4" ry="2.2" fill="#ff758f" opacity="0.6" />

            <!-- Escafandra / Burbuja de Casco Espacial Translúcida -->
            <circle cx="50" cy="46" r="28" fill="rgba(6,214,160,0.12)" stroke="#06d6a0" stroke-width="2" />
            <path d="M34 26 Q50 20 66 26" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8" />
            <circle cx="68" cy="30" r="1.5" fill="#ffffff" opacity="0.8" />
          </g>
        </svg>
      `;
    } else if (petId === 'phoenix_chick') {
      // POLLUELO FÉNIX SOL: Baby Firebird Chibi con Plumaje Incandescente y Coronita
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="phoenixGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#ffb703" flood-opacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#phoenixGlow)">
            <!-- Chispas solares y notas de fuego -->
            <polygon points="16,22 18,25 22,26 18,27 16,30 14,27 10,26 14,25" fill="#ffd166" opacity="0.9" />
            <polygon points="86,18 87.5,21 91,22 87.5,23 86,26 84.5,23 81,22 84.5,21" fill="#ef233c" opacity="0.9" />
            <circle cx="82" cy="72" r="2" fill="#ffb703" opacity="0.8" />
            <circle cx="20" cy="70" r="1.5" fill="#fb8500" opacity="0.8" />

            <!-- Colita Llameante del Fénix -->
            <path d="M50 70 C42 86 50 96 50 96 C50 96 58 86 50 70 Z" fill="#ef233c" />
            <path d="M50 70 C46 82 50 90 50 90 C50 90 54 82 50 70 Z" fill="#ffd166" />

            <!-- Alitas Aleteantes de Fuego -->
            <path d="M26 52 C12 48 8 64 16 74 C24 76 28 68 30 58 Z" fill="#fb8500" stroke="#ffd166" stroke-width="1.8" />
            <path d="M16 64 C13 70 18 72 22 72" stroke="#ef233c" stroke-width="1.5" fill="none" />
            <path d="M74 52 C88 48 92 64 84 74 C76 76 72 68 70 58 Z" fill="#fb8500" stroke="#ffd166" stroke-width="1.8" />
            <path d="M84 64 C87 70 82 72 78 72" stroke="#ef233c" stroke-width="1.5" fill="none" />

            <!-- Cuerpo Chibi Redondito y Achuchable Dorado -->
            <ellipse cx="50" cy="62" rx="26" ry="24" fill="#ffb703" stroke="#fb8500" stroke-width="2.2" />
            <ellipse cx="50" cy="65" rx="16" ry="15" fill="#fef08a" />

            <!-- Patitas Adorables -->
            <ellipse cx="42" cy="84" rx="5" ry="3.5" fill="#fb8500" />
            <ellipse cx="58" cy="84" rx="5" ry="3.5" fill="#fb8500" />

            <!-- Penacho de Plumas Llameantes en la Cabeza -->
            <path d="M50 24 C44 10 50 4 54 2 C58 8 56 16 56 24 Z" fill="#ef233c" />
            <polygon points="46,16 52,6 56,16" fill="#ffd166" />
            <circle cx="53" cy="5" r="2" fill="#ffffff" />

            <!-- Coronita de Sol Chibi -->
            <polygon points="44,25 47,19 50,23 53,19 56,25" fill="#ffd166" stroke="#b45309" stroke-width="0.8" />

            <!-- Ojos Enormes Anime Ámbar Fuego -->
            <circle cx="37" cy="48" r="7" fill="#0f172a" />
            <circle cx="37" cy="48" r="5" fill="#ea580c" />
            <circle cx="34.5" cy="45.5" r="2.8" fill="#ffffff" />
            <circle cx="39.5" cy="50" r="1.3" fill="#ffffff" />
            <circle cx="63" cy="48" r="7" fill="#0f172a" />
            <circle cx="63" cy="48" r="5" fill="#ea580c" />
            <circle cx="60.5" cy="45.5" r="2.8" fill="#ffffff" />
            <circle cx="65.5" cy="50" r="1.3" fill="#ffffff" />

            <!-- Piquito Dorado Abierto Feliz Cantando -->
            <polygon points="50,52 45,58 55,58" fill="#fb8500" stroke="#b45309" stroke-width="1" />
            <path d="M47 58 Q50 62 53 58 Z" fill="#ef233c" />

            <!-- Mejillas Ruborizadas Naranja Cálido -->
            <ellipse cx="27" cy="56" rx="4.5" ry="2.5" fill="#ef4444" opacity="0.6" />
            <ellipse cx="73" cy="56" rx="4.5" ry="2.5" fill="#ef4444" opacity="0.6" />
          </g>
        </svg>
      `;
    } else if (petId === 'magical_slime') {
      // SLIME GALÁCTICO POCHI: Gotita Mágica Translúcida con Coronita y Destellos Estelares
      return `
        <svg viewBox="0 0 100 100" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="slimeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#a855f7" flood-opacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#slimeGlow)">
            <!-- Burbujitas mágicas y estrellitas -->
            <polygon points="16,24 17.5,27 21,28 17.5,29 16,32 14.5,29 11,28 14.5,27" fill="#ffd166" opacity="0.9" />
            <polygon points="86,22 87.5,25 91,26 87.5,27 86,30 84.5,27 81,26 84.5,25" fill="#38bdf8" opacity="0.9" />
            <circle cx="82" cy="74" r="2.5" fill="#e0e7ff" opacity="0.7" />
            <circle cx="18" cy="72" r="3" fill="#e0e7ff" opacity="0.7" />

            <!-- Coronita Dorada de Príncipe Slime Ladeada -->
            <polygon points="34,22 39,12 44,18 49,12 54,22" fill="#ffd166" stroke="#b45309" stroke-width="1.2" transform="rotate(-10 44 17)" />
            <circle cx="43" cy="18" r="2" fill="#ef4444" transform="rotate(-10 44 17)" />

            <!-- Cuerpo Chibi de Slime Gota Gelatinosa Traslúcida -->
            <path d="M50 28 C34 28 20 48 20 66 C20 80 34 88 50 88 C66 88 80 80 80 66 C80 48 66 28 50 28 Z" fill="#818cf8" stroke="#c084fc" stroke-width="2.5" />
            <path d="M50 40 C38 40 28 54 28 68 C28 78 38 82 50 82 C62 82 72 78 72 68 C72 54 62 40 50 40 Z" fill="#a5b4fc" opacity="0.5" />

            <!-- Reflejo Especular Gelatinoso Curvado -->
            <path d="M34 40 C42 34 58 34 66 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85" />
            <circle cx="32" cy="46" r="2.5" fill="#ffffff" opacity="0.85" />
            <circle cx="70" cy="54" r="2" fill="#ffffff" opacity="0.6" />

            <!-- Ojos Enormes Anime Estrellados -->
            <ellipse cx="40" cy="60" rx="6.5" ry="8" fill="#0f172a" />
            <ellipse cx="40" cy="60" rx="4.5" ry="6" fill="#4338ca" />
            <polygon points="38,56 39,58 41,58.5 39,59 38,61 37,59 35,58.5 37,58" fill="#ffffff" />
            <circle cx="41" cy="63" r="1.3" fill="#ffffff" />
            <ellipse cx="60" cy="60" rx="6.5" ry="8" fill="#0f172a" />
            <ellipse cx="60" cy="60" rx="4.5" ry="6" fill="#4338ca" />
            <polygon points="58,56 59,58 61,58.5 59,59 58,61 57,59 55,58.5 57,58" fill="#ffffff" />
            <circle cx="61" cy="63" r="1.3" fill="#ffffff" />

            <!-- Sonrisa Anime ":3" Super Tierna -->
            <path d="M46 67 Q48.5 70 50 67 Q51.5 70 54 67" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round" />

            <!-- Mejillas Ruborizadas Rositas -->
            <ellipse cx="30" cy="64" rx="4" ry="2.2" fill="#f43f5e" opacity="0.65" />
            <ellipse cx="70" cy="64" rx="4" ry="2.2" fill="#f43f5e" opacity="0.65" />
          </g>
        </svg>
      `;
    }
    return '';
  }
};