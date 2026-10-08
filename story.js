/**
 * SCHOOL CITY - STORY & SCRIPT DATABASE (js/story.js)
 * Guiones interactivos, ramas de diálogo, escenas educativas y disparadores de eventos.
 */

const StoryDatabase = {
  scenes: {
    // ----------------------------------------------------
    // PANTALLA 4: TUTORIAL / BIENVENIDA A SCHOOL CITY
    // ----------------------------------------------------
    tutorial_intro: {
      id: "tutorial_intro",
      locationTitle: "Entrada Principal de School City",
      bgClass: "bg-school-entrance",
      bgm: "school",
      dialogues: [
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "happy",
          text: "¡Te doy la más cordial bienvenida a School City! Soy la Profesora Luna, decana de la Academia y tu mentora en esta metrópolis del saber."
        },
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "neutral",
          text: "Aquí cada edificio, parque y avenida está consagrado a una rama del conocimiento humano: desde las ciencias exactas y la literatura, hasta la historia y la economía."
        },
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "thinking",
          text: "Dime, {PLAYER_NAME}... para registrar tu expediente de honores, ¿cuál es el área que más despierta tu curiosidad intelectual?",
          choices: [
            {
              text: "🔬 Ciencias Naturales y la experimentación",
              relationshipChar: "dr_gauss",
              points: 10,
              xpReward: 20,
              nextDialogueIndex: 3
            },
            {
              text: "📐 Matemáticas, lógica y finanzas",
              relationshipChar: "madame_decimal",
              points: 10,
              xpReward: 20,
              nextDialogueIndex: 4
            },
            {
              text: "📚 Letras, ortografía y narrativas",
              relationshipChar: "sophia",
              points: 10,
              xpReward: 20,
              nextDialogueIndex: 5
            }
          ]
        },
        // Respuesta Ciencias (index 3)
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "happy",
          text: "¡Fascinante! El Dr. Gauss en el Laboratorio estará encantado de poner a prueba tus dotes científicas con la tabla periódica y la fotosíntesis.",
          jumpTo: 6
        },
        // Respuesta Mates (index 4)
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "excited",
          text: "¡Excelente elección! Madame Decimal en la Tienda de Matemáticas tiene cuadernos de cálculo y desafíos de cambio que desafiarán tu velocidad mental.",
          jumpTo: 6
        },
        // Respuesta Letras (index 5)
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "happy",
          text: "¡Una mente letrada! La bibliotecaria Sophia custodia manuscritos y enigmas de ortografía que sin duda cautivarán tu ingenio.",
          jumpTo: 6
        },
        // Conclusión del Tutorial (index 6)
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "neutral",
          text: "A través del Mapa General podrás visitar libremente los 8 distritos, aceptar misiones escolares en el tablón y ganar insignias de maestría."
        },
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "happy",
          text: "Te he acreditado tus primeros 20 XP y una beca inicial de monedas. ¡El futuro de School City comienza hoy contigo!",
          onComplete: () => {
            Player.data.tutorialCompleted = true;
            Player.addXP(20);
            MissionsManager.checkMissions();
            if (typeof SaveManager !== "undefined") SaveManager.saveGame();
            Game.changeState("MAP");
          }
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 7: ESCUELA MAYOR
    // ----------------------------------------------------
    scene_school: {
      id: "scene_school",
      locationTitle: "Aula Magna - Escuela Mayor",
      bgClass: "bg-classroom",
      bgm: "school",
      dialogues: [
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "happy",
          text: "¡Bienvenido al Aula Magna! Aquí evaluamos tus conocimientos multidisciplinarios y coordinamos las misiones centrales del campus."
        },
        {
          speakerId: "prof_luna",
          speakerName: "Prof. Luna",
          slot: "center",
          expression: "neutral",
          text: "¿Te gustaría someterte al Examen General de Competencias o revisar el tablón de tareas académicas?",
          choices: [
            {
              text: "📝 Tomar el Examen Multidisciplinar",
              action: () => MinigamesEngine.startChallenge("school_quiz")
            },
            {
              text: "📋 Ver el Tablón de Misiones",
              action: () => UI.openModal("missions")
            },
            {
              text: "🗺️ Volver al Mapa de la Ciudad",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 8: LABORATORIO DE CIENCIAS
    // ----------------------------------------------------
    scene_lab: {
      id: "scene_lab",
      locationTitle: "Laboratorio de Síntesis y Enlaces",
      bgClass: "bg-lab",
      bgm: "lab",
      dialogues: [
        {
          speakerId: "dr_gauss",
          speakerName: "Dr. Gauss",
          slot: "center",
          expression: "excited",
          text: "¡Por las barbas de Mendeleiev! Justo a tiempo, colega. Estamos calibrando el reactor de elementos y estudiando los ciclos bioquímicos."
        },
        {
          speakerId: "dr_gauss",
          speakerName: "Dr. Gauss",
          slot: "center",
          expression: "thinking",
          text: "¿Te atreves a poner a prueba tus conocimientos sobre la tabla periódica, la fotosíntesis y las mezclas moleculares?",
          choices: [
            {
              text: "🧪 Iniciar el Experimento de Ciencias",
              action: () => MinigamesEngine.startChallenge("science_quiz")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 9: BIBLIOTECA CENTRAL
    // ----------------------------------------------------
    scene_library: {
      id: "scene_library",
      locationTitle: "Sala de Incunables - Biblioteca Central",
      bgClass: "bg-library",
      bgm: "school",
      dialogues: [
        {
          speakerId: "sophia",
          speakerName: "Bibliotecaria Sophia",
          slot: "center",
          expression: "happy",
          text: "Bienvenido al santuario del lenguaje. Aquí las palabras cobran vida y cada acento cuenta para desvelar enigmas milenarios."
        },
        {
          speakerId: "sophia",
          speakerName: "Bibliotecaria Sophia",
          slot: "center",
          expression: "neutral",
          text: "He preparado una prueba de ortografía, vocabulario y comprensión de textos. ¿Deseas poner a prueba tu pluma?",
          choices: [
            {
              text: "📖 Aceptar el Reto de Ortografía y Lectura",
              action: () => MinigamesEngine.startChallenge("language_quiz")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 10: MUSEO UNIVERSAL
    // ----------------------------------------------------
    scene_museum: {
      id: "scene_museum",
      locationTitle: "Galería de las Épocas - Museo Histórico",
      bgClass: "bg-museum",
      bgm: "school",
      dialogues: [
        {
          speakerId: "don_cronos",
          speakerName: "Don Cronos",
          slot: "center",
          expression: "neutral",
          text: "Saludos, joven viajero temporal. Nuestras líneas cronológicas han sufrido pequeñas anomalías y necesitamos ordenar acontecimientos históricos clave."
        },
        {
          speakerId: "don_cronos",
          speakerName: "Don Cronos",
          slot: "center",
          expression: "thinking",
          text: "¿Podrás identificar hechos determinantes de las civilizaciones antiguas y los grandes descubrimientos?",
          choices: [
            {
              text: "🏛️ Resolver el Reto de Historia Universal",
              action: () => MinigamesEngine.startChallenge("history_quiz")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 11: TIENDA DE MATEMÁTICAS & FINANZAS
    // ----------------------------------------------------
    scene_shop: {
      id: "scene_shop",
      locationTitle: "Bazar Matemático de Madame Decimal",
      bgClass: "bg-math-shop",
      bgm: "school",
      dialogues: [
        {
          speakerId: "madame_decimal",
          speakerName: "Madame Decimal",
          slot: "center",
          expression: "happy",
          text: "¡Hola, mente calculadora! En mi establecimiento no solo comercias con objetos: ¡practicas el cálculo financiero real!"
        },
        {
          speakerId: "madame_decimal",
          speakerName: "Madame Decimal",
          slot: "center",
          expression: "excited",
          text: "Puedes adquirir consumibles para los retos, comprar cuadernos de ejercicios matemáticos o practicar el cálculo de vueltos y descuentos en mi simulador.",
          choices: [
            {
              text: "🛒 Abrir Catálogo de la Tienda de Mates",
              action: () => UI.openModal("shop")
            },
            {
              text: "💰 Reto Financiero: Simulación de Vuelto & %",
              action: () => MinigamesEngine.startChallenge("financial_cashier")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 12: PARQUE CENTRAL
    // ----------------------------------------------------
    scene_park: {
      id: "scene_park",
      locationTitle: "Pérgola de Estrategia - Parque Central",
      bgClass: "bg-park",
      bgm: "map",
      dialogues: [
        {
          speakerId: "mateo",
          speakerName: "Mateo",
          slot: "center",
          expression: "happy",
          text: "¡Qué tal! El aire fresco del parque es perfecto para despejar la mente y entrenar la memoria de trabajo."
        },
        {
          speakerId: "mateo",
          speakerName: "Mateo",
          slot: "center",
          expression: "neutral",
          text: "¿Te apetece una partida del juego de parejas de memoria? Veamos cuántos turnos necesitas para despejar el tablero.",
          choices: [
            {
              text: "🃏 Jugar al Reto de Memoria y Parejas",
              action: () => MinigamesEngine.startChallenge("memory_cards")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 13: CENTRO DE VIAJES
    // ----------------------------------------------------
    scene_travel: {
      id: "scene_travel",
      locationTitle: "Terminal de Exploración - Centro de Viajes",
      bgClass: "bg-travel",
      bgm: "map",
      dialogues: [
        {
          speakerId: "cap_atlas",
          speakerName: "Capitana Atlas",
          slot: "center",
          expression: "excited",
          text: "¡Tierra a la vista! Bienvenidos a la terminal geográfica de School City. Aquí trazamos meridianos, capitales y banderas del globo terráqueo."
        },
        {
          speakerId: "cap_atlas",
          speakerName: "Capitana Atlas",
          slot: "center",
          expression: "thinking",
          text: "¿Listo para subir a bordo de nuestra expedición de geografía mundial?",
          choices: [
            {
              text: "🧭 Desafío de Banderas y Capitales del Mundo",
              action: () => MinigamesEngine.startChallenge("geo_quiz")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    },

    // ----------------------------------------------------
    // ESCENARIO 14: ARENA DE RETOS
    // ----------------------------------------------------
    scene_arena: {
      id: "scene_arena",
      locationTitle: "Coliseo de Torneo - Arena de Retos",
      bgClass: "bg-arena",
      bgm: "quiz",
      dialogues: [
        {
          speakerId: "maestro_nova",
          speakerName: "Maestro Nova",
          slot: "center",
          expression: "excited",
          text: "¡Atención a todos los contendientes! La Arena de Retos pone a prueba tu velocidad de cálculo y conocimientos bajo presión de tiempo."
        },
        {
          speakerId: "maestro_nova",
          speakerName: "Maestro Nova",
          slot: "center",
          expression: "thinking",
          text: "Tendrás 60 segundos con multiplicadores de XP acumulativos. Recuerda que puedes usar tus potenciadores de la tienda (pociones de tiempo, lupas 50/50 o escudos).",
          choices: [
            {
              text: "⚡ ¡Entrar al Gran Torneo Contrarreloj!",
              action: () => MinigamesEngine.startChallenge("arena_blitz")
            },
            {
              text: "🗺️ Volver al Mapa",
              action: () => Game.changeState("MAP")
            }
          ]
        }
      ]
    }
  },

  getScene(sceneId) {
    const rawScene = this.scenes[sceneId];
    if (!rawScene) return null;
    if (sceneId === "tutorial_intro") return rawScene;

    const sceneMeta = {
      scene_school: {
        charId: "prof_luna",
        name: "Prof. Luna",
        quizId: "school_quiz",
        quizLabel: "Examen Trimestral",
        t1Text: "¡Bienvenido al Aula Magna, {PLAYER_NAME}! Empecemos con conceptos elementales para evaluar tus bases académicas.",
        t2Text: "¡Qué gusto verte de nuevo, {PLAYER_NAME}! Ya eres un compañero activo de clase. Hoy profundizaremos en materias intermedias.",
        t3Text: "¡Mi buen amigo {PLAYER_NAME}! Tu dedicación motiva a toda la Escuela Mayor. He preparado un reto más exigente para poner a prueba tu agilidad mental.",
        t4Text: "¡Estimado colega {PLAYER_NAME}! Tu rendimiento se sitúa entre los más destacados de la Academia. Resolvamos juntos este examen de nivel superior.",
        t5Text: "¡Mi estudiante de honor y gran confidente! Has alcanzado la cima académica en la Escuela Mayor. ¡Es momento de demostrar tu maestría definitiva!",
        extraAction: { text: "📋 Ver el Tablón de Misiones", action: () => UI.openModal("missions") }
      },
      scene_lab: {
        charId: "dr_gauss",
        name: "Dr. Gauss",
        quizId: "science_quiz",
        quizLabel: "Experimento de Ciencias",
        t1Text: "¡Por las barbas de Mendeleiev! Bienvenido al Laboratorio, {PLAYER_NAME}. Comencemos con experimentos básicos y seguros.",
        t2Text: "¡Hola, compañero de probeta! Me alegra ver que tus hipótesis iniciales fueron acertadas. Calibremos mezclas un poco más complejas.",
        t3Text: "¡{PLAYER_NAME}, mi estimado cómplice científico! Entre amigos de la ciencia los enigmas moleculares son más divertidos. ¡Acepta este reto intermedio!",
        t4Text: "¡Colega investigador! Tu dominio de la tabla periódica y las reacciones orgánicas es formidable. Resolvamos un experimento avanzado.",
        t5Text: "¡Eureka absoluta! Eres mi colega de laboratorio más brillante. Juntos publicaremos los descubrimientos más asombrosos de School City."
      },
      scene_library: {
        charId: "sophia",
        name: "Bibliotecaria Sophia",
        quizId: "language_quiz",
        quizLabel: "Enigmas de Lengua y Ortografía",
        t1Text: "Bienvenido al santuario de las letras, {PLAYER_NAME}. He dispuesto textos sencillos para conocer tu dominio de la ortografía.",
        t2Text: "¡Hola, compañero lector! Es gratificante ver cómo enriqueces tu vocabulario. Pasemos a textos de mayor profundidad.",
        t3Text: "¡{PLAYER_NAME}, qué alegría tener a un buen amigo entre las estanterías! He seleccionado poemas y figuras retóricas desafiantes.",
        t4Text: "¡Colega filólogo! Tu sensibilidad lingüística y precisión gramatical son admirables. Superemos este enigma de nivel avanzado.",
        t5Text: "¡Custodio de honor de la Biblioteca! Tu pluma es legendaria en toda la metrópolis. Es un privilegio absoluto leer tus respuestas."
      },
      scene_museum: {
        charId: "don_cronos",
        name: "Don Cronos",
        quizId: "history_quiz",
        quizLabel: "Líneas Temporales de Historia",
        t1Text: "Saludos, joven viajero temporal. Nuestras primeras salas albergan los grandes hitos iniciales de la humanidad.",
        t2Text: "¡Bienvenido de nuevo, compañero de expedición! Has demostrado buen ojo para las eras históricas. Avancemos a siglos más complejos.",
        t3Text: "¡Mi estimado amigo {PLAYER_NAME}! El reloj de arena nos sonríe. Te he preparado enigmas sobre revoluciones e imperios fascinantes.",
        t4Text: "¡Colega historiador! Interpretas las fuentes primarias como los grandes arqueólogos. Resolvamos esta cronología avanzada.",
        t5Text: "¡Gran cronista del tiempo universal! Tu sabiduría sobre las civilizaciones es inigualable. ¡Abramos la sala de reliquias secretas!"
      },
      scene_shop: {
        charId: "madame_decimal",
        name: "Madame Decimal",
        quizId: "financial_cashier",
        quizLabel: "Simulador de Caja & Finanzas",
        t1Text: "¡Bienvenido a mi bazar, {PLAYER_NAME}! Empecemos con cálculos comerciales sencillos para que te familiarices con la caja.",
        t2Text: "¡Hola, compañero economista! Tu rapidez al contar monedas va en aumento. Probemos con transacciones comerciales más variadas.",
        t3Text: "¡{PLAYER_NAME}, mi gran amigo de los números! Recuerda que en mi tienda siempre hay ventajas para mentes despiertas. ¡A por el reto!",
        t4Text: "¡Colega financiera! Calculas porcentajes y márgenes con precisión matemática pura. Resolvamos estas compras de alta dificultad.",
        t5Text: "¡Mente maestra del mercado! Eres la persona más hábil administrando finanzas que ha pisado este bazar. ¡Tienes mi admiración!",
        extraAction: { text: "🛒 Abrir Catálogo de la Tienda de Mates", action: () => UI.openModal("shop") }
      },
      scene_park: {
        charId: "mateo",
        name: "Mateo",
        quizId: "memory_cards",
        quizLabel: "Reto de Memoria y Concentración",
        t1Text: "¡Qué onda, {PLAYER_NAME}! El aire fresco del parque despeja las neuronas. Echemos una partida de memoria para calentar.",
        t2Text: "¡Hola, compañero de entrenamiento! Veo que tus reflejos y retención visual están subiendo de nivel. ¡Vamos con otra ronda!",
        t3Text: "¡{PLAYER_NAME}, mi hermano de estrategia! Jugar contigo en el parque siempre es un partidazo. Veamos qué tan rápido despejas la mesa.",
        t4Text: "¡Campeón táctico! Tu memoria de trabajo es imparable. Demostremos esa concentración de nivel pro.",
        t5Text: "¡Leyenda del Parque Central! Nadie en toda School City tiene tu agilidad mental. ¡Es un honor jugar contigo!"
      },
      scene_travel: {
        charId: "cap_atlas",
        name: "Capitana Atlas",
        quizId: "geo_quiz",
        quizLabel: "Expedición de Geografía Mundial",
        t1Text: "¡Bienvenido a bordo, {PLAYER_NAME}! Trazaremos rutas básicas para identificar continentes y banderas conocidas.",
        t2Text: "¡Hola, compañero grumete! Tu brújula interna está bien afinada. Subamos la marea hacia capitales más exóticas.",
        t3Text: "¡{PLAYER_NAME}, mi estimado navegante! Qué gusto explorar el planisferio con un buen amigo. ¡Acepta este viaje intermedio!",
        t4Text: "¡Colega cartógrafo! Conoces cada meridiano y estrecho marítimo como la palma de tu mano. ¡Rumbo a aguas complejas!",
        t5Text: "¡Almirante de honor del globo terráqueo! Has completado el atlas mundial con honores supremos. ¡Eres el orgullo del Centro de Viajes!"
      },
      scene_arena: {
        charId: "maestro_nova",
        name: "Maestro Nova",
        quizId: "arena_blitz",
        quizLabel: "Arena Blitz Contrarreloj",
        t1Text: "¡Bienvenido a la Arena, {PLAYER_NAME}! Aquí el reloj no perdona. Comencemos con una ronda de prueba accesible.",
        t2Text: "¡Hola, contendiente perseverante! Tu ritmo de respuesta ha mejorado notablemente. La Arena eleva el ritmo para ti.",
        t3Text: "¡{PLAYER_NAME}, mi gran amigo de batalla mental! Cuando compites tú, el público de la arena ruge de emoción. ¡A por la gloria!",
        t4Text: "¡Gladiador de élite! Tus multiplicadores de racha son de los más altos registrados en el coliseo. ¡Desafío de alto voltaje!",
        t5Text: "¡Gran Campeón Supremo de la Arena! Tu nombre está grabado en letras de oro en el podio. ¡Bríndanos un torneo legendario!"
      }
    };

    const meta = sceneMeta[sceneId];
    if (!meta || typeof RelationshipsManager === "undefined") {
      return rawScene;
    }

    const points = RelationshipsManager.getPoints(meta.charId);
    const level = RelationshipsManager.getLevel(points);
    const tier = level.tier; // 1 a 5
    const playerName = (typeof Player !== "undefined" && Player.data.name) ? Player.data.name : "Estudiante";

    let speechText = meta.t1Text.replace("{PLAYER_NAME}", playerName);
    let diffBadge = "Fácil ⭐";
    if (tier === 2) {
      speechText = meta.t2Text.replace("{PLAYER_NAME}", playerName);
      diffBadge = "Medio ⭐⭐";
    } else if (tier === 3) {
      speechText = meta.t3Text.replace("{PLAYER_NAME}", playerName);
      diffBadge = "Medio ⭐⭐";
    } else if (tier === 4) {
      speechText = meta.t4Text.replace("{PLAYER_NAME}", playerName);
      diffBadge = "Avanzado ⭐⭐⭐";
    } else if (tier >= 5) {
      speechText = meta.t5Text.replace("{PLAYER_NAME}", playerName);
      diffBadge = "Maestro ⭐⭐⭐";
    }

    const choices = [];
    if (meta.extraAction) {
      choices.push(meta.extraAction);
    }
    choices.push({
      text: `🎯 ${meta.quizLabel} [${diffBadge}]`,
      action: () => MinigamesEngine.startChallenge(meta.quizId)
    });
    choices.push({
      text: "🗺️ Volver al Mapa de la Ciudad",
      action: () => Game.changeState("MAP")
    });

    return {
      id: rawScene.id,
      locationTitle: `${rawScene.locationTitle} • ${level.title}`,
      bgClass: rawScene.bgClass,
      bgm: rawScene.bgm,
      dialogues: [
        {
          speakerId: meta.charId,
          speakerName: `${meta.name} (${level.title})`,
          slot: "center",
          expression: tier >= 3 ? "excited" : (tier === 2 ? "happy" : "neutral"),
          text: speechText,
          choices: choices
        }
      ]
    };
  }
};
