/**
 * SCHOOL CITY - INVENTORY & SHOP SYSTEM (js/inventory.js)
 * Catálogo de objetos, consumibles de apoyo para retos, cuadernos de matemáticas y tienda escolar.
 */

const InventoryManager = {
  // Catálogo maestro de todos los ítems del juego
  catalog: {
    // POTENCIADORES DE APOYO (BOOSTERS)
    item_time_potion: {
      id: "item_time_potion",
      name: "Poción de Tiempo +10s",
      type: "booster",
      icon: "⏳",
      priceCoins: 80,
      priceGems: 0,
      desc: "Añade +10 segundos al cronómetro de cualquier reto o examen bajo presión.",
      effect: "add_time"
    },
    item_hint_5050: {
      id: "item_hint_5050",
      name: "Lupa de Pistas 50/50",
      type: "booster",
      icon: "🔍",
      priceCoins: 120,
      priceGems: 0,
      desc: "Descarta automáticamente dos opciones incorrectas en preguntas de opción múltiple.",
      effect: "eliminate_two"
    },
    item_calculator: {
      id: "item_calculator",
      name: "Calculadora Mágica",
      type: "booster",
      icon: "🧮",
      priceCoins: 150,
      priceGems: 0,
      desc: "Resalta de inmediato la respuesta correcta en ejercicios de cálculo.",
      effect: "reveal_answer"
    },
    item_shield: {
      id: "item_shield",
      name: "Escudo de Error",
      type: "booster",
      icon: "🛡️",
      priceCoins: 140,
      priceGems: 0,
      desc: "Protege tu racha y evita perder una vida al cometer un fallo en un minijuego.",
      effect: "shield_mistake"
    },

    // CUADERNOS DE EJERCICIOS MATEMÁTICOS (EXERCISE PACKS)
    pack_addition: {
      id: "pack_addition",
      name: "Cuaderno de Sumas Rápidas",
      type: "exercise_pack",
      subType: "addition",
      icon: "➕",
      priceCoins: 60,
      priceGems: 0,
      cashback: 100,
      xpBonus: 40,
      desc: "5 ejercicios de adición mental. Al completarlo recibes 100 monedas de cashback y +40 XP."
    },
    pack_subtraction: {
      id: "pack_subtraction",
      name: "Cuaderno de Restas Ágiles",
      type: "exercise_pack",
      subType: "subtraction",
      icon: "➖",
      priceCoins: 75,
      priceGems: 0,
      cashback: 125,
      xpBonus: 50,
      desc: "5 desafíos de sustracción. Otorga 125 monedas de reembolso académico y +50 XP al finalizar."
    },
    pack_multiplication: {
      id: "pack_multiplication",
      name: "Cuaderno de Tablas de Multiplicar",
      type: "exercise_pack",
      subType: "multiplication",
      icon: "✖️",
      priceCoins: 90,
      priceGems: 0,
      cashback: 160,
      xpBonus: 65,
      desc: "Multiplicaciones de dos factores. Otorga 160 monedas y +65 XP al dominar el set."
    },
    pack_division: {
      id: "pack_division",
      name: "Cuaderno de Divisiones Exactas",
      type: "exercise_pack",
      subType: "division",
      icon: "➗",
      priceCoins: 110,
      priceGems: 0,
      cashback: 200,
      xpBonus: 80,
      desc: "Ejercicios de reparto y división entera. Otorga 200 monedas de reembolso y +80 XP."
    },
    pack_equations: {
      id: "pack_equations",
      name: "Cuaderno de Ecuaciones de 1er Grado",
      type: "exercise_pack",
      subType: "equations",
      icon: "📐",
      priceCoins: 160,
      priceGems: 0,
      cashback: 300,
      xpBonus: 120,
      desc: "Despeja la incógnita 'x'. Recompensa magistral de 300 monedas y +120 XP."
    },

    // ROPA Y COSMÉTICOS
    cosmetic_lab_coat: {
      id: "cosmetic_lab_coat",
      name: "Bata de Investigador",
      type: "cosmetic",
      category: "topOutfit",
      targetVal: "lab_coat",
      icon: "🥼",
      priceCoins: 250,
      priceGems: 10,
      desc: "Atuendo formal de laboratorio para mentes dedicadas a la ciencia."
    },
    cosmetic_explorer_vest: {
      id: "cosmetic_explorer_vest",
      name: "Chaleco de Explorador",
      type: "cosmetic",
      category: "topOutfit",
      targetVal: "explorer_vest",
      icon: "🦺",
      priceCoins: 250,
      priceGems: 10,
      desc: "Resistente y con múltiples bolsillos para brújulas y notas de campo."
    },
    cosmetic_cyber_hoodie: {
      id: "cosmetic_cyber_hoodie",
      name: "Sudadera Cyberpunk Neón",
      type: "cosmetic",
      category: "topOutfit",
      targetVal: "cyber_hoodie",
      icon: "🧥",
      priceCoins: 350,
      priceGems: 25,
      desc: "Diseño urbano moderno con tiras luminiscentes."
    },
    cosmetic_scholar_robe: {
      id: "cosmetic_scholar_robe",
      name: "Túnica de Gran Honor",
      type: "cosmetic",
      category: "topOutfit",
      targetVal: "scholar_robe",
      icon: "🎓",
      priceCoins: 400,
      priceGems: 30,
      desc: "Capa ceremonial púrpura con broche de zafiro de los mejores estudiantes."
    },
    acc_glasses_gold: {
      id: "acc_glasses_gold",
      name: "Gafas de Oro Fino",
      type: "cosmetic",
      category: "accessory",
      targetVal: "glasses_gold",
      icon: "👓",
      priceCoins: 200,
      priceGems: 15,
      desc: "Gafas de montura metálica pulida con reflejos intelectuales."
    },
    acc_cat_headphones: {
      id: "acc_cat_headphones",
      name: "Headset Orejas de Gato RGB",
      type: "cosmetic",
      category: "accessory",
      targetVal: "cat_headphones",
      icon: "🎧",
      priceCoins: 300,
      priceGems: 20,
      desc: "Auriculares para audición concentrada con orejitas iluminadas en neón."
    },
    acc_laurel_crown: {
      id: "acc_laurel_crown",
      name: "Corona de Laureles Dorados",
      type: "cosmetic",
      category: "accessory",
      targetVal: "laurel_crown",
      icon: "🌿",
      priceCoins: 380,
      priceGems: 25,
      desc: "Corona romana de hojas doradas para los campeones del saber."
    },

    // MASCOTAS DE ACOMPAÑAMIENTO
    pet_cyber_cat: {
      id: "pet_cyber_cat",
      name: "Gato Cibernético Pixel",
      type: "pet",
      targetVal: "cyber_cat",
      icon: "🐱",
      priceCoins: 500,
      priceGems: 40,
      desc: "Un minino robótico que te acompaña con maullidos digitales y alegría."
    },
    pet_hologram_pup: {
      id: "pet_hologram_pup",
      name: "Cachorro Holográfico Spark",
      type: "pet",
      targetVal: "hologram_pup",
      icon: "🐶",
      priceCoins: 500,
      priceGems: 40,
      desc: "Proyección holográfica de un perrito curioso y leal."
    },
    pet_astral_dragon: {
      id: "pet_astral_dragon",
      name: "Mini Dragón Astral Draco",
      type: "pet",
      targetVal: "astral_dragon",
      icon: "🐉",
      priceCoins: 650,
      priceGems: 45,
      desc: "Chibi dragón cósmico con cuernos luminosos y orbe de energía estelar."
    },
    pet_mecha_bunny: {
      id: "pet_mecha_bunny",
      name: "Conejita Mecha Usagi",
      type: "pet",
      targetVal: "mecha_bunny",
      icon: "🐰",
      priceCoins: 550,
      priceGems: 40,
      desc: "Adorable conejita androide con orejas articuladas y visor LED emocional."
    },
    pet_kitsune_spirit: {
      id: "pet_kitsune_spirit",
      name: "Kitsune Místico Sagrado",
      type: "pet",
      targetVal: "kitsune_spirit",
      icon: "🦊",
      priceCoins: 750,
      priceGems: 50,
      desc: "Zorrito sagrado de nueve colas con fuego kitsunebi espiritual, collar shimenawa y sabiduría celestial."
    },
    pet_crystal_fox: {
      id: "pet_crystal_fox",
      name: "Kitsune de Cristal Kira",
      type: "pet",
      targetVal: "crystal_fox",
      icon: "🦊",
      priceCoins: 600,
      priceGems: 45,
      desc: "Zorrito místico de cuarzo con runa frontal y tres colas espectrales."
    },
    pet_quantum_panda: {
      id: "pet_quantum_panda",
      name: "Panda Cuántico Bambu",
      type: "pet",
      targetVal: "quantum_panda",
      icon: "🐼",
      priceCoins: 580,
      priceGems: 40,
      desc: "Cachorro de panda tech con anteojos cibernéticos y caña de bambú de plasma."
    },
    pet_phoenix_chick: {
      id: "pet_phoenix_chick",
      name: "Polluelo Fénix Sol",
      type: "pet",
      targetVal: "phoenix_chick",
      icon: "🐥",
      priceCoins: 700,
      priceGems: 50,
      desc: "Ave de fuego legendaria en versión chibi con cresta radiante y destellos solares."
    },
    pet_magical_slime: {
      id: "pet_magical_slime",
      name: "Slime Galáctico Pochi",
      type: "pet",
      targetVal: "magical_slime",
      icon: "🫧",
      priceCoins: 450,
      priceGems: 35,
      desc: "Criatura gelatinosa traslúcida con burbujas estelares y corona flotante."
    }
  },

  getItem(itemId) {
    return this.catalog[itemId] || null;
  },

  addItem(itemId, qty = 1) {
    const itemDef = this.getItem(itemId);
    if (!itemDef) return;

    if (!Player.data.inventory) {
      Player.data.inventory = [];
    }

    const existing = Player.data.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.qty += qty;
    } else {
      Player.data.inventory.push({
        id: itemId,
        name: itemDef.name,
        qty: qty,
        type: itemDef.type
      });
    }

    SaveManager.saveGame();
  },

  removeItem(itemId, qty = 1) {
    if (!Player.data.inventory) return false;
    const index = Player.data.inventory.findIndex(i => i.id === itemId);
    if (index !== -1) {
      const item = Player.data.inventory[index];
      if (item.qty >= qty) {
        item.qty -= qty;
        if (item.qty <= 0) {
          Player.data.inventory.splice(index, 1);
        }
        SaveManager.saveGame();
        return true;
      }
    }
    return false;
  },

  hasItem(itemId, qty = 1) {
    if (!Player.data.inventory) return false;
    const item = Player.data.inventory.find(i => i.id === itemId);
    return item ? item.qty >= qty : false;
  },

  getItemQty(itemId) {
    if (!Player.data.inventory) return 0;
    const item = Player.data.inventory.find(i => i.id === itemId);
    return item ? item.qty : 0;
  },

  // Comprar un ítem de la tienda
  buyItem(itemId) {
    const itemDef = this.getItem(itemId);
    if (!itemDef) return;

    if (itemDef.priceCoins > 0 && Player.data.coins < itemDef.priceCoins) {
      if (typeof UI !== "undefined") UI.showToast("No tienes suficientes monedas académicas 🪙", "error");
      if (typeof AudioManager !== "undefined") AudioManager.playWrong();
      return;
    }

    if (itemDef.priceGems > 0 && Player.data.gems < itemDef.priceGems) {
      if (typeof UI !== "undefined") UI.showToast("No tienes suficientes gemas / diamantes 💎", "error");
      if (typeof AudioManager !== "undefined") AudioManager.playWrong();
      return;
    }

    // Cobrar
    if (itemDef.priceCoins > 0) Player.spendCoins(itemDef.priceCoins);
    if (itemDef.priceGems > 0) Player.spendGems(itemDef.priceGems);

    this.addItem(itemId, 1);
    if (typeof AudioManager !== "undefined") AudioManager.playSuccess();
    
    const costStr = (itemDef.priceCoins > 0 ? `-${itemDef.priceCoins} 🪙 ` : '') + (itemDef.priceGems > 0 ? `-${itemDef.priceGems} 💎` : '');
    if (typeof UI !== "undefined") {
      UI.updateHUD();
      UI.showToast(`¡Compraste ${itemDef.name}! (${costStr})`, "reward");
      if (itemDef.type === "exercise_pack") {
        UI.showToast(`📚 ¡Cuaderno listo! Resuélvelo en tu mochila o en la tienda para ganar cashback.`, "success");
      }
      UI.renderInventory();
      UI.renderShop();
    }
    if (typeof MissionsManager !== "undefined") MissionsManager.checkMissions();
  },

  // Usar o equipar un ítem desde la mochila
  useItem(itemId) {
    const itemDef = this.getItem(itemId);
    if (!itemDef) return;

    if (itemDef.type === "booster") {
      UI.showToast("💡 Los potenciadores se activan dentro de los retos o en la Arena de Torneo.", "info");
      return;
    }

    if (itemDef.type === "exercise_pack") {
      // Iniciar el minijuego de cálculo asignado al cuaderno
      UI.closeModal("inventory");
      MinigamesEngine.startExercisePack(itemDef);
      return;
    }

    if (itemDef.type === "cosmetic") {
      Player.setAvatarProperty(itemDef.category, itemDef.targetVal);
      UI.showToast(`¡Equipaste: ${itemDef.name}!`, "reward");
      AudioManager.playSuccess();
      SaveManager.saveGame();
      return;
    }

    if (itemDef.type === "pet") {
      Player.setAvatarProperty("pet", itemDef.targetVal);
      UI.showToast(`¡Tu mascota ${itemDef.name} ahora te acompaña!`, "reward");
      AudioManager.playSuccess();
      SaveManager.saveGame();
      return;
    }
  }
};
