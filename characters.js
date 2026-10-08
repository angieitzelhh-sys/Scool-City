/**
 * SCHOOL CITY - CHARACTERS REGISTRY (js/characters.js)
 * Catálogo de PNJ, descripciones, retratos SVG expresivos y sistema de estados.
 */

const CharacterRegistry = {
  characters: {
    prof_luna: {
      id: "prof_luna",
      name: "Prof. Luna",
      title: "Decana de la Escuela Mayor",
      location: "school",
      icon: "👩‍🏫",
      color: "#2a75d3",
      bio: "Cálida, exigente y brillante. Cree firmemente que cada error es el primer borrador del éxito.",
      chatStatus: "En clase magistral",
      isOnline: true,
      chatResponses: [
        "¡Bienvenido, estudiante! Cada día en School City es una oportunidad para superar tus propios límites.",
        "Si necesitas repasar materias, el Laboratorio o la Biblioteca tienen recursos excelentes.",
        "No temas equivocarte en las evaluaciones: la ciencia y las matemáticas se construyen a base de hipótesis y correcciones."
      ]
    },
    dr_gauss: {
      id: "dr_gauss",
      name: "Dr. Gauss",
      title: "Jefe de Laboratorio de Ciencias",
      location: "lab",
      icon: "👨‍🔬",
      color: "#06d6a0",
      bio: "Un físico-químico excéntrico obsesionado con los enlaces atómicos, las reacciones redox y el café filtrado.",
      chatStatus: "Sintetizando polímeros",
      isOnline: true,
      chatResponses: [
        "¡Eureka! Cuidado con ese mechero Bunsen, joven colega.",
        "El método científico no es solo para el laboratorio, ¡es una forma de pensar el universo!",
        "¿Sabías que la fotosíntesis convierte fotones solares en glucosa? ¡Energía pura!"
      ]
    },
    sophia: {
      id: "sophia",
      name: "Bibliotecaria Sophia",
      title: "Custodia de la Biblioteca Central",
      location: "library",
      icon: "👩‍💼",
      color: "#ffd166",
      bio: "Erudita, amante de los manuscritos antiguos y las etimologías. Puede encontrar cualquier libro en 3 segundos.",
      chatStatus: "Catalogando incunables",
      isOnline: true,
      chatResponses: [
        "Shh... respeta el silencio del templo de las letras, o mejor aún, ¡déjate seducir por un buen clásico!",
        "La ortografía no es una regla arbitraria: es el puente para que tus ideas lleguen nítidas al lector.",
        "Tengo retos de comprensión lectora esperándote si te atreves a descifrar textos antiguos."
      ]
    },
    don_cronos: {
      id: "don_cronos",
      name: "Don Cronos",
      title: "Arqueólogo del Museo Universal",
      location: "museum",
      icon: "🕵️‍♂️",
      color: "#9d4edd",
      bio: "Guardián de reliquias históricas. Viste siempre con gabardina de expedición y un reloj de arena de bronce.",
      chatStatus: "Restaurando vasija micénica",
      isOnline: true,
      chatResponses: [
        "El tiempo es un río incesante, pero los monumentos y hechos del pasado son sus faros.",
        "Aquel que no conoce su historia está condenado a repetir los mismos fallos en el examen trimestral.",
        "¿Te apasiona Egipto, Grecia o el Renacimiento? En el Museo cada siglo tiene su propia sala."
      ]
    },
    madame_decimal: {
      id: "madame_decimal",
      name: "Madame Decimal",
      title: "Gerente del Bazar & Tienda de Mates",
      location: "shop",
      icon: "👩‍💻",
      color: "#f39c12",
      bio: "Economista e ingeniera de software. Para ella, los números son el lenguaje poético con el que funciona el mundo.",
      chatStatus: "Auditando inventario",
      isOnline: true,
      chatResponses: [
        "¡Bienvenido a mi bazar! Recuerda: el mejor rendimiento no solo está en las monedas, ¡sino en tu capacidad de cálculo!",
        "Compra cuadernos de ejercicios: cuando los resuelves en la tienda te devuelvo cashback con intereses educativos.",
        "¿Necesitas ventajas en la Arena? Mis pociones de tiempo y lupas 50/50 están al mejor precio del mercado."
      ]
    },
    mateo: {
      id: "mateo",
      name: "Mateo",
      title: "Líder de Juegos del Parque",
      location: "park",
      icon: "🏃‍♂️",
      color: "#10b981",
      bio: "Estratega nato, fanático del ajedrez, los juegos de reflejos y las carreras de orientación botánica.",
      chatStatus: "Entrenando en el césped",
      isOnline: true,
      chatResponses: [
        "¡Eh, hola! El cerebro también es un músculo: si no lo ejercitas con juegos de memoria y agilidad, se entumece.",
        "Ven a jugar unas partidas de memoria en las mesas del parque cuando necesites despejarte de las clases.",
        "La diversión y la agilidad mental van de la mano aquí en la naturaleza urbana."
      ]
    },
    cap_atlas: {
      id: "cap_atlas",
      name: "Capitana Atlas",
      title: "Directora del Centro de Viajes",
      location: "travel",
      icon: "🧭",
      color: "#00b4d8",
      bio: "Ha navegado por los siete mares y sobrevolado todas las cordilleras. Conoce cada bandera y huso horario.",
      chatStatus: "Trazando ruta transcontinental",
      isOnline: true,
      chatResponses: [
        "¡Alza la vista al horizonte, grumete! El planeta es un mapa vivo lleno de culturas fascinantes.",
        "¿Sabrías ubicar la capital de Madagascar o reconocer la bandera de Noruega a primera vista?",
        "Tengo expediciones virtuales listas en el centro para cuando quieras ganar sellos de pasaporte."
      ]
    },
    maestro_nova: {
      id: "maestro_nova",
      name: "Maestro Nova",
      title: "Gran Campeón de la Arena",
      location: "arena",
      icon: "⚡",
      color: "#ef476f",
      bio: "Un estratega implacable pero motivador que coordina los torneos de velocidad mental y cálculo extremo.",
      chatStatus: "Ajustando cronómetros del ring",
      isOnline: true,
      chatResponses: [
        "¡Solo los más veloces y concentrados logran el trofeo de la Arena de Retos!",
        "Aquí un segundo de distracción te cuesta la racha. Ven con tus mejores consumibles de la tienda.",
        "Los multiplicadores de XP de la Arena son los más altos de toda School City. ¿Te atreves a probar?"
      ]
    }
  },

  get(charId) {
    return this.characters[charId] || null;
  },

  // Retorna el SVG del personaje con la emoción correspondiente
  renderNPCSVG(charId, expression = "neutral", width = 280, height = 420) {
    const char = this.get(charId);
    if (!char) return '';

    // Colores específicos por personaje
    let coatColor = "#2a75d3";
    let hairColor = "#333333";
    let skinColor = "#fcd5ce";
    let hairPath = "";
    let specialAcc = "";

    if (charId === "prof_luna") {
      coatColor = "#1d3557";
      hairColor = "#3d2645";
      skinColor = "#ffe0bd";
      hairPath = `
        <path d="M70 70 C70 30 130 30 130 70 C145 60 145 100 135 120 C125 70 120 50 100 50 C80 50 75 70 65 120 C55 100 55 60 70 70 Z" fill="${hairColor}" />
        <ellipse cx="100" cy="30" rx="14" ry="12" fill="${hairColor}" />
      `;
      specialAcc = `
        <rect x="78" y="78" width="18" height="12" rx="3" fill="none" stroke="#ffd166" stroke-width="2" />
        <rect x="104" y="78" width="18" height="12" rx="3" fill="none" stroke="#ffd166" stroke-width="2" />
        <line x1="96" y1="84" x2="104" y2="84" stroke="#ffd166" stroke-width="2" />
        <line x1="72" y1="82" x2="78" y2="82" stroke="#ffd166" stroke-width="2" />
        <line x1="122" y1="82" x2="128" y2="82" stroke="#ffd166" stroke-width="2" />
      `;
    } else if (charId === "dr_gauss") {
      coatColor = "#ffffff";
      hairColor = "#e2e8f0";
      skinColor = "#fcd5ce";
      hairPath = `
        <path d="M55 75 L45 40 L65 45 L70 20 L95 35 L105 15 L125 35 L145 25 L140 50 L155 45 L145 75 C135 55 115 48 100 48 C85 48 65 55 55 75 Z" fill="${hairColor}" />
      `;
      specialAcc = `
        <rect x="74" y="75" width="22" height="16" rx="4" fill="none" stroke="#00f0ff" stroke-width="2.5" />
        <rect x="104" y="75" width="22" height="16" rx="4" fill="none" stroke="#00f0ff" stroke-width="2.5" />
        <line x1="96" y1="83" x2="104" y2="83" stroke="#00f0ff" stroke-width="2.5" />
      `;
    } else if (charId === "sophia") {
      coatColor = "#4a3b32";
      hairColor = "#b07d62";
      skinColor = "#fceade";
      hairPath = `
        <path d="M65 80 C60 40 80 30 100 30 C120 30 140 40 135 80 C130 95 132 140 125 150 C120 120 115 60 100 60 C85 60 80 120 75 150 C68 140 70 95 65 80 Z" fill="${hairColor}" />
      `;
      specialAcc = `<path d="M68 60 Q100 40 132 60" stroke="#ffd166" stroke-width="3" fill="none" />`;
    } else if (charId === "don_cronos") {
      coatColor = "#5c4d3c";
      hairColor = "#94a3b8";
      skinColor = "#e2a77a";
      hairPath = `
        <path d="M65 80 C60 50 75 35 100 35 C125 35 140 50 135 80 Z" fill="${hairColor}" />
        <!-- Sombrero explorador -->
        <ellipse cx="100" cy="50" rx="44" ry="12" fill="#8c6d48" stroke="#5c4328" stroke-width="2" />
        <path d="M72 48 C74 25 126 25 128 48 Z" fill="#6d5438" />
        <rect x="73" y="44" width="54" height="6" fill="#ffd166" />
      `;
    } else if (charId === "madame_decimal") {
      coatColor = "#2b2d42";
      hairColor = "#8338ec";
      skinColor = "#ffe0bd";
      hairPath = `
        <path d="M60 85 C55 35 80 25 100 25 C120 25 145 35 140 85 C145 110 135 135 130 140 C125 80 115 50 100 50 C85 50 75 80 70 140 C65 135 55 110 60 85 Z" fill="${hairColor}" />
      `;
      specialAcc = `<circle cx="126" cy="95" r="4" fill="#ffd166" stroke="#f39c12" stroke-width="1.5" />`;
    } else if (charId === "mateo") {
      coatColor = "#06d6a0";
      hairColor = "#111827";
      skinColor = "#d8a47f";
      hairPath = `
        <path d="M64 80 L68 45 L85 50 L100 32 L115 50 L132 45 L136 80 Z" fill="${hairColor}" />
        <path d="M66 60 Q100 50 134 60" stroke="#ef476f" stroke-width="4" fill="none" />
      `;
    } else if (charId === "cap_atlas") {
      coatColor = "#023e8a";
      hairColor = "#e76f51";
      skinColor = "#fcd5ce";
      hairPath = `
        <path d="M65 80 C60 40 80 30 100 30 C120 30 140 40 135 80 Z" fill="${hairColor}" />
        <circle cx="130" cy="70" r="16" fill="${hairColor}" />
      `;
      specialAcc = `
        <!-- Gorra de capitana -->
        <path d="M68 52 C70 30 130 30 132 52 Z" fill="#03045e" stroke="#00b4d8" stroke-width="2" />
        <ellipse cx="100" cy="52" rx="36" ry="6" fill="#0077b6" />
        <polygon points="100,38 97,44 103,44" fill="#ffd166" />
      `;
    } else if (charId === "maestro_nova") {
      coatColor = "#d90429";
      hairColor = "#2b2d42";
      skinColor = "#fcd5ce";
      hairPath = `
        <path d="M60 80 L65 35 L80 48 L100 22 L120 48 L135 35 L140 80 Z" fill="${hairColor}" />
      `;
      specialAcc = `
        <line x1="65" y1="120" x2="135" y2="120" stroke="#ffd166" stroke-width="3" />
        <polygon points="100,110 94,124 106,124" fill="#ffd166" />
      `;
    }

    // Expresión facial en SVG
    let eyesSvg = `
      <ellipse cx="86" cy="85" rx="5" ry="6" fill="#1b2a47" />
      <ellipse cx="114" cy="85" rx="5" ry="6" fill="#1b2a47" />
      <circle cx="88" cy="83" r="2" fill="#fff" />
      <circle cx="116" cy="83" r="2" fill="#fff" />
    `;
    let mouthSvg = `<path d="M92 102 Q100 110 108 102" stroke="#b04a5a" stroke-width="2.5" fill="none" stroke-linecap="round" />`;

    if (expression === "happy") {
      eyesSvg = `
        <path d="M80 85 Q86 80 92 85" stroke="#1b2a47" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M108 85 Q114 80 120 85" stroke="#1b2a47" stroke-width="3" fill="none" stroke-linecap="round" />
      `;
      mouthSvg = `<path d="M90 100 Q100 114 110 100" stroke="#b04a5a" stroke-width="2.5" fill="#fff" stroke-linecap="round" />`;
    } else if (expression === "surprised") {
      eyesSvg = `
        <circle cx="86" cy="85" r="6" fill="#fff" stroke="#1b2a47" stroke-width="2" />
        <circle cx="114" cy="85" r="6" fill="#fff" stroke="#1b2a47" stroke-width="2" />
        <circle cx="86" cy="85" r="3" fill="#1b2a47" />
        <circle cx="114" cy="85" r="3" fill="#1b2a47" />
      `;
      mouthSvg = `<ellipse cx="100" cy="104" rx="4" ry="6" fill="#802838" />`;
    } else if (expression === "thinking") {
      eyesSvg = `
        <line x1="81" y1="84" x2="91" y2="82" stroke="#1b2a47" stroke-width="3" stroke-linecap="round" />
        <line x1="109" y1="82" x2="119" y2="84" stroke="#1b2a47" stroke-width="3" stroke-linecap="round" />
      `;
      mouthSvg = `<line x1="93" y1="103" x2="107" y2="101" stroke="#b04a5a" stroke-width="2.5" stroke-linecap="round" />`;
    }

    return `
      <svg viewBox="0 0 200 280" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <filter id="charShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <g filter="url(#charShadow)">
          <!-- ROPA / CUERPO -->
          <path d="M60 140 L40 280 L160 280 L140 140 Z" fill="${coatColor}" />
          <polygon points="100,140 85,175 115,175" fill="#f8fafc" />
          <line x1="100" y1="175" x2="100" y2="280" stroke="#cbd5e1" stroke-width="2" />
          
          <!-- CUELLO -->
          <rect x="92" y="112" width="16" height="20" fill="${skinColor}" rx="3" />
          
          <!-- CABEZA -->
          <circle cx="68" cy="88" r="7" fill="${skinColor}" />
          <circle cx="132" cy="88" r="7" fill="${skinColor}" />
          <ellipse cx="100" cy="88" rx="34" ry="38" fill="${skinColor}" />
          <ellipse cx="82" cy="95" rx="5" ry="3" fill="#ff758f" opacity="0.3" />
          <ellipse cx="118" cy="95" rx="5" ry="3" fill="#ff758f" opacity="0.3" />
          
          <!-- EXPRESIONES -->
          ${eyesSvg}
          ${mouthSvg}
          
          <!-- CABELLO -->
          ${hairPath}
          
          <!-- ACCESORIOS ESPECIALES -->
          ${specialAcc}
        </g>
      </svg>
    `;
  }
};
