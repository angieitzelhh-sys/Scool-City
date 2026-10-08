/**
 * SCHOOL CITY - EDUCATIONAL MINIGAMES ENGINE (js/minigames.js)
 * Motor unificado de retos educativos sin repetición: Ciencias, Lengua, Matemáticas, Finanzas, Historia, Geografía y Lógica.
 * Incluye banco expandido y algoritmo anti-repetición con memoria de preguntas ya resueltas.
 */

const MinigamesEngine = (() => {
  let activeChallenge = null;
  let timerInterval = null;
  let remainingTime = 45;
  let currentScore = 0;
  let lives = 3;
  let activeShield = false;
  let currentQuestionIndex = 0;
  let questionsPool = [];
  let onCompleteCallback = null;

  // Registro de preguntas ya realizadas para evitar repeticiones
  const askedQuestionsHistory = new Set();
  const askedMathHistory = new Set();

  // DOM elements
  let elModal = null;
  let elBadgeSubject = null;
  let elTitle = null;
  let elTimerBox = null;
  let elTimerVal = null;
  let elScoreVal = null;
  let elLivesIcons = null;
  let elBoostersBar = null;
  let elStage = null;
  let elFeedback = null;
  let btnQuit = null;

  function initDOM() {
    elModal = document.getElementById("modal-minigame");
    elBadgeSubject = document.getElementById("mg-badge-subject");
    elTitle = document.getElementById("mg-title");
    elTimerBox = document.getElementById("mg-timer-box");
    elTimerVal = document.getElementById("mg-timer-val");
    elScoreVal = document.getElementById("mg-score-val");
    elLivesIcons = document.getElementById("mg-lives-icons");
    elBoostersBar = document.getElementById("mg-boosters-container");
    elStage = document.getElementById("mg-stage-container");
    elFeedback = document.getElementById("mg-feedback");
    btnQuit = document.getElementById("btn-mg-quit");

    if (btnQuit) {
      btnQuit.onclick = quitChallenge;
    }
  }

  // -----------------------------------------------------------
  // MAPEO DE RETOS EDUCATIVOS A PERSONAJES Y ÁREAS DE SCHOOL CITY
  // Permite subir afinidad y adaptar la dificultad de cada área
  // -----------------------------------------------------------
  const challengeAreaMap = {
    school_quiz: { charId: "prof_luna", area: "Escuela Mayor" },
    science_quiz: { charId: "dr_gauss", area: "Laboratorio de Ciencias" },
    language_quiz: { charId: "sophia", area: "Biblioteca Central" },
    history_quiz: { charId: "don_cronos", area: "Museo Universal" },
    financial_cashier: { charId: "madame_decimal", area: "Tienda de Matemáticas" },
    exercise_pack: { charId: "madame_decimal", area: "Tienda de Matemáticas" },
    memory_cards: { charId: "mateo", area: "Parque Central" },
    geo_quiz: { charId: "cap_atlas", area: "Centro de Viajes" },
    arena_blitz: { charId: "maestro_nova", area: "Arena de Retos" }
  };

  // -----------------------------------------------------------
  // BANCO EXPANDIDO DE PREGUNTAS EDUCATIVAS CON DIFICULTAD ESCALONADA
  // difficulty 1 = Fácil (inicial), 2 = Medio, 3 = Avanzado / Experto
  // -----------------------------------------------------------
  const questionBanks = {
    science_quiz: {
      subject: "CIENCIAS Y QUÍMICA",
      title: "Desafío del Laboratorio Molecular",
      time: 45,
      questions: [
        // DIFICULTAD 1: FÁCIL (Conceptos fundamentales intuitivos)
        { id: "sci_ez_1", difficulty: 1, q: "¿En qué estado físico se encuentra el agua cuando se congela en forma de hielo?", options: ["Sólido", "Líquido", "Gaseoso", "Plasma"], correct: 0, hint: "Tiene forma rígida y definida." },
        { id: "sci_ez_2", difficulty: 1, q: "¿Qué estrella gigante ilumina y brinda calor a nuestro planeta durante el día?", options: ["La Luna", "El Sol", "Marte", "La Estrella Polar"], correct: 1, hint: "Centro de nuestro sistema planetario." },
        { id: "sci_ez_3", difficulty: 1, q: "¿Cuántos sentidos principales posee el ser humano (vista, oído, tacto, olfato y gusto)?", options: ["3", "4", "5", "7"], correct: 2, hint: "Contando los ojos, oídos, piel, nariz y lengua." },
        { id: "sci_ez_4", difficulty: 1, q: "¿Qué absorben las raíces de las plantas para nutrirse y crecer?", options: ["Petróleo", "Agua y sales minerales", "Gasolina", "Plástico"], correct: 1, hint: "Se encuentra disuelto en la tierra fértil." },
        { id: "sci_ez_5", difficulty: 1, q: "¿Cuál de estos seres vivos es un mamífero que respira por pulmones?", options: ["Delfín", "Tiburón blanco", "Sardina", "Medusa"], correct: 0, hint: "Al nacer se alimenta de leche materna." },
        // DIFICULTAD 2: MEDIA
        { id: "sci_1", difficulty: 2, q: "¿Cuál es el gas que las plantas absorben de la atmósfera durante la fotosíntesis?", options: ["Dióxido de carbono (CO2)", "Oxígeno (O2)", "Nitrógeno (N2)", "Metano (CH4)"], correct: 0, hint: "Es el gas expulsado en la respiración animal." },
        { id: "sci_2", difficulty: 2, q: "¿Cuál es el símbolo químico del Oro en la tabla periódica?", options: ["Ag", "Au", "Fe", "Cu"], correct: 1, hint: "Proviene del latín 'Aurum'." },
        { id: "sci_6", difficulty: 2, q: "¿Cuál es el órgano responsable de bombear la sangre por todo el cuerpo humano?", options: ["Pulmón", "Hígado", "Corazón", "Riñón"], correct: 2, hint: "Músculo hueco situado en el tórax." },
        { id: "sci_8", difficulty: 2, q: "¿Qué compuesto cubre aproximadamente el 71% de la superficie de nuestro planeta?", options: ["Hierro fundido", "Agua (H2O)", "Silicio", "Carbono puro"], correct: 1, hint: "Forma los océanos y mares." },
        { id: "sci_11", difficulty: 2, q: "¿Qué pigmento vegetal le da el característico color verde a las hojas y capta la luz solar?", options: ["Hemoglobina", "Clorofila", "Melanina", "Caroteno"], correct: 1, hint: "Se localiza dentro de los cloroplastos." },
        { id: "sci_12", difficulty: 2, q: "¿Cómo se llama la fuerza con la que la Tierra atrae los objetos hacia su centro?", options: ["Magnetismo", "Fuerza Centrífuga", "Gravedad", "Fricción"], correct: 2, hint: "Descrita por Sir Isaac Newton tras la célebre manzana." },
        // DIFICULTAD 3: AVANZADA
        { id: "sci_3", difficulty: 3, q: "¿Cuál es la función principal de las mitocondrias en la célula?", options: ["Sintetizar celulosa", "Producir energía (ATP)", "Almacenar clorofila", "Filtrar toxinas externas"], correct: 1, hint: "Son la 'central eléctrica' de la célula." },
        { id: "sci_4", difficulty: 3, q: "Al mezclar un ácido (pH < 7) con una base (pH > 7) en proporciones equivalentes, se produce:", options: ["Una explosión radiactiva", "Sal y agua con pH neutro", "Gas helio puro", "Ácido sulfúrico"], correct: 1, hint: "Reacción clásica de neutralización." },
        { id: "sci_5", difficulty: 3, q: "¿Qué partícula subatómica posee carga eléctrica negativa?", options: ["Protón", "Neutrón", "Electrón", "Positrón"], correct: 2, hint: "Orbita en la corteza alrededor del núcleo atómico." },
        { id: "sci_7", difficulty: 3, q: "¿En qué estado de la materia las partículas tienen menor energía cinética y volumen definido?", options: ["Sólido", "Líquido", "Gaseoso", "Plasma"], correct: 0, hint: "Tienen forma fija y cohesión rígida." },
        { id: "sci_9", difficulty: 3, q: "¿Cuál es la capa de la atmósfera donde se forman las nubes y ocurren los fenómenos climáticos?", options: ["Estratosfera", "Troposfera", "Termosfera", "Mesosfera"], correct: 1, hint: "La capa más baja en contacto con la corteza terrestre." },
        { id: "sci_10", difficulty: 3, q: "¿Cuál de estos elementos es un gas noble que no reacciona fácilmente?", options: ["Helio (He)", "Sodio (Na)", "Cloro (Cl)", "Calcio (Ca)"], correct: 0, hint: "Se usa para inflar globos flotantes." }
      ]
    },

    language_quiz: {
      subject: "LENGUA Y LITERATURA",
      title: "Enigmas de la Biblioteca Central",
      time: 45,
      questions: [
        // DIFICULTAD 1: FÁCIL
        { id: "lan_ez_1", difficulty: 1, q: "¿Cuál es el antónimo (palabra de significado opuesto) de 'ALTO'?", options: ["Grande", "Bajo", "Fuerte", "Largo"], correct: 1, hint: "De poca estatura o altura reducida." },
        { id: "lan_ez_2", difficulty: 1, q: "¿Cuántas vocales existen en el abecedario de la lengua española?", options: ["3", "4", "5", "6"], correct: 2, hint: "Son: A, E, I, O, U." },
        { id: "lan_ez_3", difficulty: 1, q: "En la oración 'El perro corre por el parque', ¿cuál es el verbo (la acción)?", options: ["El", "Perro", "Corre", "Parque"], correct: 2, hint: "Indica lo que hace el animal." },
        { id: "lan_ez_4", difficulty: 1, q: "¿Qué signos ortográficos dobles se colocan al inicio y final de una pregunta?", options: ["Puntos suspensivos (...)", "Signos de interrogación (¿ ?)", "Paréntesis ( )", "Comillas (\" \")"], correct: 1, hint: "Se abren con ¿ y se cierran con ?" },
        { id: "lan_ez_5", difficulty: 1, q: "¿Cuál es el plural correcto de la palabra 'lápiz'?", options: ["Lápices", "Lápizs", "Lápizes", "Lapicitos"], correct: 0, hint: "Las palabras terminadas en 'z' forman el plural cambiando la z por 'ces'." },
        // DIFICULTAD 2: MEDIA
        { id: "lan_1", difficulty: 2, q: "¿Cuál de las siguientes palabras es esdrújula y debe llevar tilde?", options: ["Cántaro", "Reloj", "Cancion", "Lápiz"], correct: 0, hint: "El acento prosódico recae en la antepenúltima sílaba." },
        { id: "lan_4", difficulty: 2, q: "¿Cuál es el sujeto en la oración: 'Ayer por la tarde llegaron los investigadores a la biblioteca'?", options: ["Ayer por la tarde", "Los investigadores", "A la biblioteca", "Llegaron"], correct: 1, hint: "Pregúntale al verbo: ¿Quiénes llegaron?" },
        { id: "lan_5", difficulty: 2, q: "¿Qué palabra está correctamente escrita según la Real Academia?", options: ["Hiva", "Iba", "Hiba", "Iva (de ir)"], correct: 1, hint: "Pretérito imperfecto del verbo ir." },
        { id: "lan_6", difficulty: 2, q: "¿Cuál es el sinónimo más adecuado para 'CONCISO'?", options: ["Extenso", "Breve y preciso", "Confuso", "Lento"], correct: 1, hint: "Que expresa las ideas en pocas palabras." },
        { id: "lan_9", difficulty: 2, q: "¿Qué signo de puntuación se utiliza para introducir una cita textual o una enumeración?", options: ["Punto y coma (;)", "Dos puntos (:)", "Puntos suspensivos (...)", "Comillas solas"], correct: 1, hint: "Se colocan antes de las citas o aclaraciones." },
        { id: "lan_11", difficulty: 2, q: "¿Quién escribió la célebre obra 'Don Quijote de la Mancha'?", options: ["Federico García Lorca", "Miguel de Cervantes", "Gabriel García Márquez", "Lope de Vega"], correct: 1, hint: "Célebre escritor español conocido como 'El Manco de Lepanto'." },
        // DIFICULTAD 3: AVANZADA
        { id: "lan_2", difficulty: 3, q: "La figura retórica consistente en atribuir cualidades humanas a objetos o animales se llama:", options: ["Metáfora", "Personificación (Prosopopeya)", "Hipérbole", "Aliteración"], correct: 1, hint: "Ejemplo: 'El viento silbaba con furia'." },
        { id: "lan_3", difficulty: 3, q: "El antónimo más preciso de la palabra 'EFÍMERO' es:", options: ["Breve", "Fugaz", "Perdurable", "Débil"], correct: 2, hint: "Algo que dura mucho tiempo o es eterno." },
        { id: "lan_7", difficulty: 3, q: "¿Qué tipo de rima comparten 'canción' e 'ilusión'?", options: ["Asonante", "Consonante", "Libre", "Blanca"], correct: 1, hint: "Coinciden vocales y consonantes desde la última vocal acentuada." },
        { id: "lan_8", difficulty: 3, q: "¿Cuál es el tiempo verbal en: 'Nosotros habremos terminado la tarea a las cinco'?", options: ["Presente de subjuntivo", "Futuro compuesto de indicativo", "Pretérito perfecto simple", "Condicional"], correct: 1, hint: "Usa el auxiliar 'habremos' + participio." },
        { id: "lan_10", difficulty: 3, q: "¿Cuál de estos vocablos contiene un hiato acentual?", options: ["Cielo", "Reina", "País", "Fuego"], correct: 2, hint: "Vocal cerrada tónica unida a vocal abierta." },
        { id: "lan_12", difficulty: 3, q: "Identifica el adjetivo en grado superlativo absoluto:", options: ["Bueno", "Mejor", "Buenísimo", "Bien"], correct: 2, hint: "Lleva el sufijo '-ísimo'." }
      ]
    },

    history_quiz: {
      subject: "HISTORIA UNIVERSAL",
      title: "Líneas Temporales del Museo",
      time: 50,
      questions: [
        // DIFICULTAD 1: FÁCIL
        { id: "his_ez_1", difficulty: 1, q: "¿En qué país y continente se construyeron las famosas Pirámides de Guiza?", options: ["Francia (Europa)", "Egipto (África)", "Japón (Asia)", "Brasil (América)"], correct: 1, hint: "A orillas del histórico río Nilo." },
        { id: "his_ez_2", difficulty: 1, q: "¿Quién fue el navegante genovés que llegó al continente americano en octubre de 1492?", options: ["Cristóbal Colón", "Marco Polo", "Alejandro Magno", "Julio César"], correct: 0, hint: "Zarpó al mando de la Santa María, la Pinta y la Niña." },
        { id: "his_ez_3", difficulty: 1, q: "¿Qué material utilizaban los seres humanos prehistóricos para fabricar sus primeras lanzas y cuchillos?", options: ["Plástico", "Piedra y madera tallada", "Hierro inoxidable", "Aluminio"], correct: 1, hint: "Por eso esa etapa se llama Edad de Piedra." },
        { id: "his_ez_4", difficulty: 1, q: "¿Qué civilización clásica de la antigüedad creó los Juegos Olímpicos originales?", options: ["Grecia Clásica", "Imperio Vikingo", "Civilización Maya", "Imperio Ruso"], correct: 0, hint: "Se celebraban en honor a los dioses del Monte Olimpo." },
        { id: "his_ez_5", difficulty: 1, q: "¿Cómo se llama el célebre anfiteatro romano donde luchaban los gladiadores?", options: ["El Partenón", "El Coliseo Romano", "La Alhambra", "El Taj Mahal"], correct: 1, hint: "Ubicado en el corazón de la ciudad de Roma." },
        // DIFICULTAD 2: MEDIA
        { id: "his_1", difficulty: 2, q: "¿En qué civilización antigua se desarrolló la escritura jeroglífica y el papiro?", options: ["Mesopotamia", "Antiguo Egipto", "Grecia Clásica", "Imperio Inca"], correct: 1, hint: "Floreció a orillas del río Nilo." },
        { id: "his_2", difficulty: 2, q: "¿Qué acontecimiento histórico en 1789 marcó el inicio de la Edad Contemporánea?", options: ["La Revolución Francesa", "La invención de la imprenta", "La caída de Constantinopla", "El fin de la Primera Guerra Mundial"], correct: 0, hint: "Toma de la Bastilla y Declaración de los Derechos del Hombre." },
        { id: "his_4", difficulty: 2, q: "¿Quién perfeccionó la imprenta de tipos móviles en Europa hacia 1440?", options: ["Leonardo da Vinci", "Johannes Gutenberg", "Isaac Newton", "Nicolás Copérnico"], correct: 1, hint: "Su primer gran libro impreso fue la Biblia de 42 líneas." },
        { id: "his_6", difficulty: 2, q: "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?", options: ["1492", "1776", "1789", "1810"], correct: 1, hint: "El famoso 4 de julio del siglo XVIII." },
        { id: "his_10", difficulty: 2, q: "¿Qué civilización precolombina erigió la ciudadela de Machu Picchu en los Andes?", options: ["Maya", "Azteca", "Inca", "Olmeca"], correct: 2, hint: "Su capital principal era el Cusco." },
        { id: "his_12", difficulty: 2, q: "¿Qué movimiento cultural y artístico floreció en Europa entre los siglos XIV y XVI con foco en el humanismo?", options: ["Barroco", "Renacimiento", "Romanticismo", "Ilustración"], correct: 1, hint: "Época de Da Vinci, Miguel Ángel y Rafael." },
        // DIFICULTAD 3: AVANZADA
        { id: "his_3", difficulty: 3, q: "¿Qué filósofo griego fue maestro de Platón y utilizaba el método de la Mayéutica?", options: ["Aristóteles", "Sócrates", "Pitágoras", "Heródoto"], correct: 1, hint: "Conocido por la frase: 'Solo sé que nada sé'." },
        { id: "his_5", difficulty: 3, q: "¿Cuál era la principal ruta comercial terrestre que unía Asia con Europa en la antigüedad?", options: ["La Ruta de la Seda", "El Camino Real de los Incas", "La Vía Apia", "La Ruta del Ámbar"], correct: 0, hint: "Llevaba especias, seda y porcelana." },
        { id: "his_7", difficulty: 3, q: "¿Cuál fue la capital del Imperio Romano de Oriente (Imperio Bizantino)?", options: ["Atenas", "Roma", "Constantinopla", "Alejandría"], correct: 2, hint: "Actual ciudad de Estambul." },
        { id: "his_8", difficulty: 3, q: "¿Qué célebre científico formuló la Teoría de la Relatividad General en 1915?", options: ["Nikola Tesla", "Albert Einstein", "Stephen Hawking", "Thomas Edison"], correct: 1, hint: "Ecuación legendaria E = mc²." },
        { id: "his_9", difficulty: 3, q: "¿Cómo se llamaba el sistema político y económico predominante en Europa durante la Edad Media?", options: ["Feudalismo", "Capitalismo", "Mercantilismo", "Socialismo"], correct: 0, hint: "Basado en señores feudales, vasallos y feudos." },
        { id: "his_11", difficulty: 3, q: "¿Qué emperador romano fue asesinado en los Idus de Marzo del año 44 a.C.?", options: ["Julio César", "Nerón", "Augusto", "Calígula"], correct: 0, hint: "Frase legendaria: '¿Tú también, Bruto?'." }
      ]
    },

    geo_quiz: {
      subject: "GEOGRAFÍA Y MUNDO",
      title: "Expedición del Centro de Viajes",
      time: 45,
      questions: [
        // DIFICULTAD 1: FÁCIL
        { id: "geo_ez_1", difficulty: 1, q: "¿En qué país se encuentra la famosa Torre Eiffel y la ciudad de París?", options: ["España", "Francia", "Italia", "Alemania"], correct: 1, hint: "País europeo vecino de Bélgica y España." },
        { id: "geo_ez_2", difficulty: 1, q: "¿Cómo se llama el planeta en el que habitamos los seres humanos?", options: ["Marte", "La Tierra", "Júpiter", "Saturno"], correct: 1, hint: "El llamado 'Planeta Azul' por sus océanos." },
        { id: "geo_ez_3", difficulty: 1, q: "¿Por cuál punto cardinal sale el Sol en el horizonte cada mañana?", options: ["Norte", "Sur", "Este (Oriente)", "Oeste (Occidente)"], correct: 2, hint: "Dirección opuesta a donde se pone al atardecer." },
        { id: "geo_ez_4", difficulty: 1, q: "¿En qué continente se encuentran países como México, Colombia, Argentina y Canadá?", options: ["Europa", "América", "Asia", "Oceanía"], correct: 1, hint: "El continente que se extiende de polo a polo." },
        { id: "geo_ez_5", difficulty: 1, q: "¿Qué masa gigante de agua salada cubre más de dos tercios de la superficie terrestre?", options: ["Los ríos", "Los océanos", "Las piscinas", "Los glaciares"], correct: 1, hint: "Pacífico, Atlántico, Índico, etc." },
        // DIFICULTAD 2: MEDIA
        { id: "geo_1", difficulty: 2, q: "¿Cuál es la capital oficial de Japón?", options: ["Kioto", "Osaka", "Tokio", "Hiroshima"], correct: 2, hint: "La metrópolis más poblada del archipiélago nipón." },
        { id: "geo_2", difficulty: 2, q: "¿Cuál es el río más caudaloso y largo del planeta Tierra?", options: ["Río Nilo", "Río Amazonas", "Río Misisipi", "Río Yangtsé"], correct: 1, hint: "Atraviesa la selva sudamericana." },
        { id: "geo_3", difficulty: 2, q: "¿En qué continente se encuentra la cordillera del Himalaya con el Monte Everest?", options: ["América del Sur", "Asia", "África", "Europa"], correct: 1, hint: "Entre China, Nepal y la India." },
        { id: "geo_5", difficulty: 2, q: "¿Cuál es el océano más extenso del planeta?", options: ["Océano Atlántico", "Océano Índico", "Océano Pacífico", "Océano Ártico"], correct: 2, hint: "Cubre más de un tercio de la superficie terrestre." },
        { id: "geo_6", difficulty: 2, q: "¿Cuál es el país más grande del mundo en superficie territorial?", options: ["Canadá", "Estados Unidos", "Rusia", "China"], correct: 2, hint: "Se extiende a través de Europa del Este y el norte de Asia." },
        { id: "geo_10", difficulty: 2, q: "¿Cuál es el desierto cálido más grande del mundo?", options: ["Desierto de Atacama", "Desierto de Gobi", "Desierto del Sahara", "Desierto de Sonora"], correct: 2, hint: "Abarca la mayor parte del norte de África." },
        // DIFICULTAD 3: AVANZADA
        { id: "geo_4", difficulty: 3, q: "¿Qué país tiene una bandera roja con una cruz blanca en el centro (forma cuadrada)?", options: ["Suiza", "Suecia", "Dinamarca", "Inglaterra"], correct: 0, hint: "País alpino famoso por sus relojes y chocolate." },
        { id: "geo_7", difficulty: 3, q: "¿Cuál es la capital de Australia?", options: ["Sídney", "Melbourne", "Canberra", "Brisbane"], correct: 2, hint: "Fue planeada y construida como capital neutral entre Sídney y Melbourne." },
        { id: "geo_8", difficulty: 3, q: "¿Qué estrecho separa el continente africano de la península ibérica en Europa?", options: ["Estrecho de Bering", "Estrecho de Gibraltar", "Estrecho de Magallanes", "Canal de Suez"], correct: 1, hint: "Une el océano Atlántico con el mar Mediterráneo." },
        { id: "geo_11", difficulty: 3, q: "¿Cuál es la línea imaginaria que divide la Tierra en Hemisferio Norte y Hemisferio Sur?", options: ["Meridiano de Greenwich", "Trópico de Cáncer", "Línea del Ecuador", "Círculo Polar Ártico"], correct: 2, hint: "Latitud cero grados (0°)." },
        { id: "geo_12", difficulty: 3, q: "¿A qué país pertenece la isla de Groenlandia?", options: ["Canadá", "Dinamarca", "Noruega", "Islandia"], correct: 1, hint: "Territorio autónomo del reino danés." }
      ]
    },

    school_quiz: {
      subject: "EVALUACIÓN MULTIDISCIPLINAR",
      title: "Examen Trimestral de la Escuela Mayor",
      time: 60,
      questions: [
        // DIFICULTAD 1: FÁCIL
        { id: "sch_ez_1", difficulty: 1, q: "¿Cuánto es 10 + 15?", options: ["20", "25", "30", "35"], correct: 1, hint: "Suma diez y luego añade quince." },
        { id: "sch_ez_2", difficulty: 1, q: "¿Cuántos días tiene una semana completa de lunes a domingo?", options: ["5 días", "6 días", "7 días", "8 días"], correct: 2, hint: "5 días de clase + 2 días de fin de semana." },
        { id: "sch_ez_3", difficulty: 1, q: "¿Cuántos minutos tiene una hora completa?", options: ["30 minutos", "45 minutos", "60 minutos", "100 minutos"], correct: 2, hint: "Media hora son 30; una hora son el doble." },
        { id: "sch_ez_4", difficulty: 1, q: "¿Qué color se obtiene al mezclar pintura azul y amarilla?", options: ["Verde", "Rojo", "Negro", "Morado"], correct: 0, hint: "Color de las plantas y praderas." },
        { id: "sch_ez_5", difficulty: 1, q: "¿Cuántos lados tiene una figura geométrica cuadrada?", options: ["3 lados", "4 lados iguales", "5 lados", "6 lados"], correct: 1, hint: "Polígono regular de cuatro esquinas." },
        // DIFICULTAD 2: MEDIA
        { id: "sch_1", difficulty: 2, q: "¿Cuánto es (8 × 7) - 15?", options: ["41", "56", "39", "45"], correct: 0, hint: "8 × 7 = 56; luego resta 15." },
        { id: "sch_2", difficulty: 2, q: "¿Cuál es el planeta más grande del Sistema Solar?", options: ["Saturno", "Júpiter", "Marte", "Neptuno"], correct: 1, hint: "Es un gigante gaseoso con la Gran Mancha Roja." },
        { id: "sch_3", difficulty: 2, q: "¿Qué tipo de palabra es 'rápidamente'?", options: ["Sustantivo", "Verbo", "Adverbio", "Adjetivo"], correct: 2, hint: "Termina en el sufijo '-mente' e indica modo." },
        { id: "sch_5", difficulty: 2, q: "Si un triángulo tiene un ángulo recto (90°), se llama:", options: ["Equilátero", "Rectángulo", "Obtusángulo", "Isósceles"], correct: 1, hint: "Cumple el Teorema de Pitágoras." },
        { id: "sch_10", difficulty: 2, q: "¿Quién pintó la 'Mona Lisa' y la 'Última Cena'?", options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Salvador Dalí"], correct: 0, hint: "Polímata florentino del Renacimiento." },
        // DIFICULTAD 3: AVANZADA
        { id: "sch_4", difficulty: 3, q: "¿En qué año llegó la misión Apolo 11 a la Luna?", options: ["1959", "1969", "1975", "1981"], correct: 1, hint: "'Un pequeño paso para el hombre...' en el siglo XX." },
        { id: "sch_6", difficulty: 3, q: "¿Cuál es la velocidad aproximada de la luz en el vacío?", options: ["300.000 km/s", "150.000 km/h", "1.000 km/s", "30.000 m/s"], correct: 0, hint: "Casi 300.000 kilómetros por segundo." },
        { id: "sch_7", difficulty: 3, q: "¿Qué elemento fundamental para la vida forma la columna vertebral de las moléculas orgánicas?", options: ["Carbono (C)", "Hierro (Fe)", "Sodio (Na)", "Argón (Ar)"], correct: 0, hint: "Forma 4 enlaces covalentes estables." },
        { id: "sch_8", difficulty: 3, q: "¿Cuál es el resultado de simplificar la fracción 18/24?", options: ["2/3", "3/4", "4/5", "1/2"], correct: 1, hint: "Divide numerador y denominador entre su MCD, que es 6." },
        { id: "sch_9", difficulty: 3, q: "¿En qué año cayó el Muro de Berlín, símbolo de la Guerra Fría?", options: ["1975", "1989", "1995", "2001"], correct: 1, hint: "A finales de la década de los ochenta." }
      ]
    }
  };

  // -----------------------------------------------------------
  // OBTENER PREGUNTAS CON DIFICULTAD ADAPTATIVA SEGÚN AFINIDAD
  // -----------------------------------------------------------
  function getUnaskedQuestions(challengeType, count = 5) {
    const config = questionBanks[challengeType];
    if (!config) return [];

    // Determinar dificultad objetivo según afinidad del personaje de esta área
    const areaInfo = challengeAreaMap[challengeType];
    let targetDifficulty = 1; // Por defecto Fácil para comenzar
    if (areaInfo && typeof RelationshipsManager !== "undefined") {
      const points = RelationshipsManager.getPoints(areaInfo.charId);
      const level = RelationshipsManager.getLevel(points);
      if (level.tier === 1) targetDifficulty = 1; // Principiante / Fácil
      else if (level.tier === 2 || level.tier === 3) targetDifficulty = 2; // Intermedio / Medio
      else targetDifficulty = 3; // Avanzado / Experto
    }

    // 1. Filtrar preguntas no hechas que coincidan con la dificultad objetivo
    let available = config.questions.filter(q => !askedQuestionsHistory.has(q.id) && (q.difficulty === targetDifficulty || !q.difficulty));

    // 2. Si no hay suficientes para completar el reto, permitir las demás no hechas
    if (available.length < count) {
      available = config.questions.filter(q => !askedQuestionsHistory.has(q.id));
    }

    // 3. Si se agotó el banco, reiniciar historial para esta materia
    if (available.length < count) {
      config.questions.forEach(q => askedQuestionsHistory.delete(q.id));
      available = config.questions.filter(q => q.difficulty === targetDifficulty || !q.difficulty);
      if (available.length < count) available = [...config.questions];
    }

    // Mezclar aleatoriamente
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, count);

    // Registrar como usadas
    chosen.forEach(q => askedQuestionsHistory.add(q.id));
    return chosen;
  }

  // -----------------------------------------------------------
  // CONTROLADOR GENERAL DE RETO
  // -----------------------------------------------------------
  function startChallenge(challengeType) {
    initDOM();
    AudioManager.playBGM("quiz");
    clearInterval(timerInterval);

    activeChallenge = challengeType;
    currentScore = 0;
    lives = 3;
    activeShield = false;
    currentQuestionIndex = 0;

    // Verificar si es minijuego especial (Memoria, Cajero, Arena)
    if (challengeType === "memory_cards") {
      startMemoryGame();
      return;
    }
    if (challengeType === "financial_cashier") {
      startCashierGame();
      return;
    }
    if (challengeType === "arena_blitz") {
      startArenaBlitz();
      return;
    }

    const config = questionBanks[challengeType];
    if (!config) return;

    remainingTime = config.time || 45;
    // Seleccionar preguntas adaptadas por afinidad
    questionsPool = getUnaskedQuestions(challengeType, 5);

    // Dificultad visual
    const areaInfo = challengeAreaMap[challengeType];
    let diffBadge = "FÁCIL ⭐";
    if (areaInfo && typeof RelationshipsManager !== "undefined") {
      const points = RelationshipsManager.getPoints(areaInfo.charId);
      const level = RelationshipsManager.getLevel(points);
      if (level.tier === 2 || level.tier === 3) diffBadge = "MEDIA ⭐⭐";
      else if (level.tier >= 4) diffBadge = "AVANZADA ⭐⭐⭐";
    }

    // Configurar interfaz
    elBadgeSubject.textContent = `${config.subject} • ${diffBadge}`;
    elTitle.textContent = config.title;
    elTimerBox.style.display = "flex";
    updateHUDStats();
    renderBoosters();

    elModal.classList.add("active");
    startTimer();
    renderQuestionStep();
  }

  function startTimer() {
    elTimerVal.textContent = `${remainingTime}s`;
    timerInterval = setInterval(() => {
      remainingTime--;
      elTimerVal.textContent = `${remainingTime}s`;

      if (remainingTime <= 10) {
        elTimerVal.style.color = "#ef476f";
      } else {
        elTimerVal.style.color = "#ffd166";
      }

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endChallenge(false, "¡Se agotó el tiempo reglamentario!");
      }
    }, 1000);
  }

  function updateHUDStats() {
    elScoreVal.textContent = currentScore;
    let hearts = "";
    for (let i = 0; i < lives; i++) hearts += "❤️";
    for (let i = lives; i < 3; i++) hearts += "🖤";
    elLivesIcons.textContent = hearts;
  }

  function renderBoosters() {
    elBoostersBar.innerHTML = "";
    const boosters = [
      { id: "item_time_potion", label: "+10s", icon: "⏳" },
      { id: "item_hint_5050", label: "50/50", icon: "🔍" },
      { id: "item_shield", label: "Escudo", icon: "🛡️" }
    ];

    boosters.forEach(b => {
      const qty = InventoryManager.getItemQty(b.id);
      const btn = document.createElement("button");
      btn.className = "btn-booster-use";
      btn.innerHTML = `<span>${b.icon}</span> <span>${b.label} (${qty})</span>`;
      btn.disabled = qty <= 0;

      btn.onclick = () => {
        if (InventoryManager.removeItem(b.id, 1)) {
          applyBooster(b.id);
          renderBoosters();
        }
      };
      elBoostersBar.appendChild(btn);
    });
  }

  function applyBooster(boosterId) {
    AudioManager.playBooster();
    if (boosterId === "item_time_potion") {
      remainingTime += 10;
      elTimerVal.textContent = `${remainingTime}s`;
      UI.showToast("⏳ ¡Poción de tiempo activada! +10s añadidos", "reward");
    } else if (boosterId === "item_hint_5050") {
      eliminateTwoWrongAnswers();
      UI.showToast("🔍 ¡Lupa 50/50 activada! 2 opciones erróneas descartadas", "reward");
    } else if (boosterId === "item_shield") {
      activeShield = true;
      UI.showToast("🛡️ ¡Escudo protector activo contra el próximo fallo!", "reward");
    }
  }

  function eliminateTwoWrongAnswers() {
    const q = questionsPool[currentQuestionIndex];
    if (!q) return;
    const answerButtons = elStage.querySelectorAll(".btn-mg-answer");
    let eliminatedCount = 0;

    answerButtons.forEach(btn => {
      const idx = parseInt(btn.dataset.index);
      if (idx !== q.correct && eliminatedCount < 2 && !btn.classList.contains("answer-eliminated")) {
        btn.classList.add("answer-eliminated");
        eliminatedCount++;
      }
    });
  }

  function renderQuestionStep() {
    if (currentQuestionIndex >= questionsPool.length) {
      endChallenge(true, "¡Excelente desempeño en todos los ejercicios!");
      return;
    }

    const q = questionsPool[currentQuestionIndex];
    elFeedback.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questionsPool.length}`;
    elFeedback.className = "mg-feedback-msg";

    elStage.innerHTML = `
      <div class="mg-question-box animate-zoom-in">
        <div class="mg-question-prompt">${q.q}</div>
        <div class="mg-question-hint">💡 Pista: ${q.hint || "Lee con detenimiento cada opción."}</div>
      </div>
      <div class="mg-answers-grid">
        ${q.options.map((opt, idx) => `
          <button class="btn-mg-answer" data-index="${idx}">${opt}</button>
        `).join('')}
      </div>
    `;

    const btns = elStage.querySelectorAll(".btn-mg-answer");
    btns.forEach(btn => {
      btn.onclick = () => {
        handleAnswer(parseInt(btn.dataset.index), q.correct, btn);
      };
    });
  }

  function handleAnswer(selectedIndex, correctIndex, buttonEl) {
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
      AudioManager.playSuccess();
      buttonEl.classList.add("answer-correct");
      elFeedback.textContent = "¡Respuesta Correcta! ⭐";
      elFeedback.className = "mg-feedback-msg correct";
      currentScore += 100;
      updateHUDStats();

      setTimeout(() => {
        currentQuestionIndex++;
        renderQuestionStep();
      }, 700);
    } else {
      if (activeShield) {
        activeShield = false;
        AudioManager.playBooster();
        UI.showToast("🛡️ ¡El Escudo absorbió el impacto del fallo!", "info");
        buttonEl.classList.add("answer-eliminated");
        return;
      }

      AudioManager.playWrong();
      buttonEl.classList.add("answer-wrong");
      buttonEl.classList.add("shake-wrong");
      elFeedback.textContent = "¡Incorrecto! Cuidado con tus vidas académicas.";
      elFeedback.className = "mg-feedback-msg wrong";
      lives--;
      updateHUDStats();

      if (lives <= 0) {
        setTimeout(() => {
          endChallenge(false, "Te has quedado sin vidas académicas.");
        }, 500);
      }
    }
  }

  // -----------------------------------------------------------
  // MINIJUEGO: CUADERNO DE EJERCICIOS COMPRADO (EXERCISE PACK)
  // Generación procedimental dinámica con prevención estricta de duplicados
  // -----------------------------------------------------------
  function startExercisePack(packDef) {
    initDOM();
    AudioManager.playBGM("quiz");
    clearInterval(timerInterval);

    activeChallenge = "exercise_pack";
    currentScore = 0;
    lives = 3;
    activeShield = false;
    currentQuestionIndex = 0;
    remainingTime = 60;

    questionsPool = generateMathProblems(packDef.subType, 5);

    elBadgeSubject.textContent = "MATEMÁTICAS";
    elTitle.textContent = packDef.name;
    elTimerBox.style.display = "flex";
    updateHUDStats();
    renderBoosters();

    elModal.classList.add("active");
    startTimer();
    renderQuestionStep();

    onCompleteCallback = () => {
      Player.addCoins(packDef.cashback);
      Player.addXP(packDef.xpBonus);
      UI.showToast(`🎉 ¡Completaste el ${packDef.name}! Cashback: +${packDef.cashback} monedas 🪙`, "reward");
      MissionsManager.checkMissions();
    };
  }

  function generateMathProblems(subType, count) {
    const list = [];
    let attempts = 0;

    while (list.length < count && attempts < 100) {
      attempts++;
      let a = 0, b = 0, ans = 0, prompt = "";
      let signature = "";

      if (subType === "addition") {
        a = Math.floor(Math.random() * 85) + 14;
        b = Math.floor(Math.random() * 85) + 14;
        signature = `add_${Math.min(a, b)}_${Math.max(a, b)}`;
        if (askedMathHistory.has(signature)) continue;
        ans = a + b;
        prompt = `¿Cuánto es ${a} + ${b}?`;
      } else if (subType === "subtraction") {
        a = Math.floor(Math.random() * 90) + 30;
        b = Math.floor(Math.random() * 28) + 7;
        signature = `sub_${a}_${b}`;
        if (askedMathHistory.has(signature)) continue;
        ans = a - b;
        prompt = `¿Cuánto es ${a} - ${b}?`;
      } else if (subType === "multiplication") {
        a = Math.floor(Math.random() * 11) + 3;
        b = Math.floor(Math.random() * 12) + 3;
        signature = `mul_${Math.min(a, b)}_${Math.max(a, b)}`;
        if (askedMathHistory.has(signature)) continue;
        ans = a * b;
        prompt = `¿Cuánto es ${a} × ${b}?`;
      } else if (subType === "division") {
        b = Math.floor(Math.random() * 8) + 2;
        ans = Math.floor(Math.random() * 14) + 3;
        a = b * ans;
        signature = `div_${a}_${b}`;
        if (askedMathHistory.has(signature)) continue;
        prompt = `¿Cuánto es ${a} ÷ ${b}?`;
      } else if (subType === "equations") {
        const x = Math.floor(Math.random() * 14) + 2;
        const c = Math.floor(Math.random() * 25) + 6;
        signature = `eq_${x}_${c}`;
        if (askedMathHistory.has(signature)) continue;
        const total = x + c;
        ans = x;
        prompt = `Despeja el valor de x en:  x + ${c} = ${total}`;
      }

      askedMathHistory.add(signature);
      if (askedMathHistory.size > 200) askedMathHistory.clear();

      // Generar 3 opciones incorrectas convincentes
      const opts = new Set([ans]);
      while (opts.size < 4) {
        const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 8) + 1);
        const candidate = ans + delta;
        if (candidate > 0) opts.add(candidate);
      }
      const shuffled = Array.from(opts).sort(() => Math.random() - 0.5);

      list.push({
        id: `math_${subType}_${list.length}_${Date.now()}`,
        q: prompt,
        options: shuffled.map(String),
        correct: shuffled.indexOf(ans),
        hint: `Calcula con precisión y orden mental.`
      });
    }
    return list;
  }

  // -----------------------------------------------------------
  // MINIJUEGO: SIMULADOR DE CAJERO Y DESCUENTOS (Madame Decimal)
  // Con productos variados y escenarios de compra dinámicos
  // -----------------------------------------------------------
  const storeItemsCatalog = [
    { name: "Compás de Precisión y Regla T", min: 14, max: 28 },
    { name: "Atlas Geográfico Ilustrado", min: 25, max: 48 },
    { name: "Kit de Matraces y Pipeta", min: 32, max: 65 },
    { name: "Calculadora Científica Solar", min: 45, max: 80 },
    { name: "Mochila Ergonómica Escolar", min: 55, max: 95 },
    { name: "Diccionario Etimológico Universal", min: 20, max: 42 }
  ];

  let targetChange = 0;
  let currentChangeGiven = 0;

  function startCashierGame() {
    initDOM();
    AudioManager.playBGM("school");
    clearInterval(timerInterval);

    activeChallenge = "financial_cashier";
    currentScore = 0;
    lives = 3;
    remainingTime = 60;

    elBadgeSubject.textContent = "FINANZAS & COMERCIO";
    elTitle.textContent = "Simulador de Caja y Descuentos";
    elTimerBox.style.display = "flex";
    updateHUDStats();
    elBoostersBar.innerHTML = "";
    elModal.classList.add("active");
    startTimer();

    loadCashierLevel();
  }

  function loadCashierLevel() {
    currentChangeGiven = 0;
    const item = storeItemsCatalog[Math.floor(Math.random() * storeItemsCatalog.length)];
    const itemCost = Math.floor(Math.random() * (item.max - item.min + 1)) + item.min;

    // Calcular billete entregado por el cliente superior al precio
    const baseTen = Math.ceil(itemCost / 10) * 10;
    const payment = baseTen === itemCost ? itemCost + 20 : (baseTen + (Math.random() > 0.5 ? 10 : 20));
    targetChange = payment - itemCost;

    elFeedback.textContent = "Entrega el cambio exacto pulsando sobre las monedas y billetes:";
    elFeedback.className = "mg-feedback-msg";

    renderCashierStage(item.name, itemCost, payment);
  }

  function renderCashierStage(itemName, itemCost, payment) {
    elStage.innerHTML = `
      <div class="cashier-desk animate-zoom-in">
        <div class="cashier-receipt">
          <div class="receipt-row"><span>Artículo Académico:</span><span style="font-weight:700;">${itemName}</span></div>
          <div class="receipt-row"><span>Precio de Venta:</span><span>$${itemCost}.00</span></div>
          <div class="receipt-row"><span>Efectivo Entregado:</span><span style="color:#059669; font-weight:700;">$${payment}.00</span></div>
          <div class="receipt-row receipt-total"><span>Vuelto Exacto a Devolver:</span><span>$${targetChange}.00</span></div>
        </div>

        <div class="cashier-collected">
          Cambio preparado: <span id="cashier-sum">$${currentChangeGiven}.00</span>
        </div>

        <div class="cash-drawer">
          <button class="cash-token-btn" data-val="1">🪙 +$1</button>
          <button class="cash-token-btn" data-val="2">🪙 +$2</button>
          <button class="cash-token-btn" data-val="5">💵 +$5</button>
          <button class="cash-token-btn" data-val="10">💵 +$10</button>
          <button class="cash-token-btn" data-val="20">💵 +$20</button>
          <button class="cash-token-btn" data-val="50">💵 +$50</button>
        </div>

        <div style="display:flex; gap: 12px; margin-top: 10px;">
          <button id="btn-cashier-clear" class="btn btn-secondary">↺ Reiniciar Cambio</button>
          <button id="btn-cashier-confirm" class="btn btn-primary glow-effect">✅ Entregar Vuelto</button>
        </div>
      </div>
    `;

    const tokens = elStage.querySelectorAll(".cash-token-btn");
    tokens.forEach(btn => {
      btn.onclick = () => {
        AudioManager.playCoin();
        currentChangeGiven += parseInt(btn.dataset.val);
        document.getElementById("cashier-sum").textContent = `$${currentChangeGiven}.00`;
      };
    });

    document.getElementById("btn-cashier-clear").onclick = () => {
      currentChangeGiven = 0;
      document.getElementById("cashier-sum").textContent = `$0.00`;
    };

    document.getElementById("btn-cashier-confirm").onclick = () => {
      if (currentChangeGiven === targetChange) {
        AudioManager.playSuccess();
        currentScore += 150;
        updateHUDStats();
        UI.showToast("¡Vuelto exacto perfecto! +150 puntos", "success");
        if (currentScore >= 450) {
          endChallenge(true, "¡Dominaste la simulación financiera de Madame Decimal!");
        } else {
          loadCashierLevel();
        }
      } else {
        AudioManager.playWrong();
        lives--;
        updateHUDStats();
        UI.showToast(`Error: Entregaste $${currentChangeGiven}, el vuelto era $${targetChange}`, "error");
        if (lives <= 0) {
          endChallenge(false, "Déficit de caja: ¡Demasiados errores de cambio!");
        } else {
          currentChangeGiven = 0;
          document.getElementById("cashier-sum").textContent = `$0.00`;
        }
      }
    };
  }

  // -----------------------------------------------------------
  // MINIJUEGO: MEMORIA Y PAREJAS (Parque Central)
  // Con barajado de 16 iconos variados en cada intento
  // -----------------------------------------------------------
  function startMemoryGame() {
    initDOM();
    AudioManager.playBGM("map");
    clearInterval(timerInterval);

    activeChallenge = "memory_cards";
    currentScore = 0;
    lives = 3;
    remainingTime = 55;

    elBadgeSubject.textContent = "LÓGICA Y MEMORIA";
    elTitle.textContent = "Desafío de Concentración del Parque";
    elTimerBox.style.display = "flex";
    updateHUDStats();
    elBoostersBar.innerHTML = "";
    elModal.classList.add("active");
    startTimer();

    // Banco de iconos para que las parejas sean diferentes en cada partida
    const fullIconsPool = ["🔬", "📐", "📚", "🏛️", "🧪", "⚡", "🧭", "🎒", "🔭", "🎨", "🏆", "🎓", "🪐", "💡", "✒️", "🧬"];
    const selectedIcons = fullIconsPool.sort(() => Math.random() - 0.5).slice(0, 8);
    const cards = [...selectedIcons, ...selectedIcons].sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let matchedCount = 0;

    elStage.innerHTML = `
      <div class="memory-grid animate-zoom-in">
        ${cards.map((sym, idx) => `
          <div class="memory-card" data-idx="${idx}" data-sym="${sym}">❓</div>
        `).join('')}
      </div>
    `;

    elFeedback.textContent = "Encuentra las 8 parejas de iconos académicos:";
    elFeedback.className = "mg-feedback-msg";

    const cardElements = elStage.querySelectorAll(".memory-card");
    cardElements.forEach(card => {
      card.onclick = () => {
        if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length >= 2) {
          return;
        }

        AudioManager.playClick();
        card.classList.add("flipped");
        card.textContent = card.dataset.sym;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [c1, c2] = flippedCards;
          if (c1.dataset.sym === c2.dataset.sym) {
            AudioManager.playSuccess();
            c1.classList.add("matched");
            c2.classList.add("matched");
            matchedCount++;
            currentScore += 100;
            updateHUDStats();
            flippedCards = [];

            if (matchedCount === selectedIcons.length) {
              endChallenge(true, "¡Memoria brillante! Has despejado todo el tablero.");
            }
          } else {
            AudioManager.playWrong();
            setTimeout(() => {
              c1.classList.remove("flipped");
              c2.classList.remove("flipped");
              c1.textContent = "❓";
              c2.textContent = "❓";
              flippedCards = [];
            }, 750);
          }
        }
      };
    });
  }

  // -----------------------------------------------------------
  // MINIJUEGO: ARENA DE RETOS (TORNEO CONTRARRELOJ BLITZ)
  // Selección de 10 preguntas únicas multidisciplinares no vistas
  // -----------------------------------------------------------
  function startArenaBlitz() {
    initDOM();
    AudioManager.playBGM("quiz");
    clearInterval(timerInterval);

    activeChallenge = "arena_blitz";
    currentScore = 0;
    lives = 3;
    activeShield = false;
    remainingTime = 60;
    currentQuestionIndex = 0;

    // Obtener 2 preguntas de cada una de las 5 materias sin repetición
    const p1 = getUnaskedQuestions("science_quiz", 2);
    const p2 = getUnaskedQuestions("language_quiz", 2);
    const p3 = getUnaskedQuestions("history_quiz", 2);
    const p4 = getUnaskedQuestions("geo_quiz", 2);
    const p5 = getUnaskedQuestions("school_quiz", 2);

    questionsPool = [...p1, ...p2, ...p3, ...p4, ...p5].sort(() => Math.random() - 0.5);

    elBadgeSubject.textContent = "GRAN TORNEO";
    elTitle.textContent = "Arena de Retos Contrarreloj (60s)";
    elTimerBox.style.display = "flex";
    updateHUDStats();
    renderBoosters();

    elModal.classList.add("active");
    startTimer();
    renderQuestionStep();
  }

  // -----------------------------------------------------------
  // FINALIZACIÓN DE RETO Y RECOMPENSAS
  // -----------------------------------------------------------
  function endChallenge(success, message) {
    clearInterval(timerInterval);

    if (success) {
      AudioManager.playVictory();
      elModal.classList.remove("active");

      let stars = 3;
      if (lives === 2) stars = 2;
      if (lives === 1) stars = 1;

      const earnedXP = 120 + (currentScore / 2);
      const earnedCoins = 90 + Math.floor(currentScore / 3);

      Player.addXP(Math.round(earnedXP));
      Player.addCoins(earnedCoins);
      Player.addBadge("badge_master_quiz");

      // Subir afinidad con el personaje del área completada
      const areaInfo = challengeAreaMap[activeChallenge];
      if (areaInfo && typeof RelationshipsManager !== "undefined") {
        RelationshipsManager.addPoints(areaInfo.charId, 25);
      }

      UI.showMissionCompletedModal(
        activeChallenge.toUpperCase().replace("_", " "),
        stars,
        Math.round(earnedXP),
        earnedCoins,
        areaInfo ? `Vínculo con ${CharacterRegistry.get(areaInfo.charId)?.name || 'Mentor'}` : "Medalla Académica"
      );

      if (typeof onCompleteCallback === "function") {
        onCompleteCallback();
        onCompleteCallback = null;
      }

      MissionsManager.checkMissions();
    } else {
      AudioManager.playWrong();
      alert(`Fin del reto: ${message}\n¡Sigue practicando en School City!`);
      quitChallenge();
    }
  }

  function quitChallenge() {
    clearInterval(timerInterval);
    activeChallenge = null;
    if (elModal) elModal.classList.remove("active");
    AudioManager.playBGM("map");
  }

  return {
    startChallenge,
    startExercisePack,
    quitChallenge
  };
})();
