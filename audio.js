/**
 * SCHOOL CITY - AUDIO ENGINE (js/audio.js)
 * Sistema de sonido procedural y SFX mediante Web Audio API nativo.
 * Totalmente autónomo, sin dependencias externas ni archivos de audio remotos.
 */

const AudioManager = (() => {
  let audioCtx = null;
  let musicGainNode = null;
  let sfxGainNode = null;
  let currentBgmInterval = null;
  let isMuted = false;

  let musicVolume = 0.5;
  let sfxVolume = 0.7;

  // Inicializa el contexto al primer gesto del usuario
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();

        musicGainNode = audioCtx.createGain();
        musicGainNode.gain.setValueAtTime(musicVolume, audioCtx.currentTime);
        musicGainNode.connect(audioCtx.destination);

        sfxGainNode = audioCtx.createGain();
        sfxGainNode.gain.setValueAtTime(sfxVolume, audioCtx.currentTime);
        sfxGainNode.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Generador de ondas sintéticas
  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.3, detune = 0) {
    if (!audioCtx || isMuted) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      if (detune) osc.detune.setValueAtTime(detune, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal * sfxVolume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(sfxGainNode);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playTone error", e);
    }
  }

  // --- EFECTOS DE SONIDO (SFX) ---

  function playClick() {
    initAudio();
    playTone(600, 'triangle', 0.06, 0.2);
  }

  function playTypewriter() {
    initAudio();
    // Sonido sutil de tecla con ligera variación de frecuencia
    const variance = (Math.random() - 0.5) * 60;
    playTone(420 + variance, 'sine', 0.03, 0.08);
  }

  function playSuccess() {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.2, 0.25), idx * 70);
    });
  }

  function playWrong() {
    initAudio();
    if (!audioCtx) return;
    playTone(220, 'sawtooth', 0.25, 0.25);
    setTimeout(() => playTone(180, 'sawtooth', 0.35, 0.3), 120);
  }

  function playCoin() {
    initAudio();
    playTone(987.77, 'sine', 0.1, 0.3);
    setTimeout(() => playTone(1318.51, 'triangle', 0.2, 0.3), 80);
  }

  function playBooster() {
    initAudio();
    [440, 554, 659, 880, 1108].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.15, 0.2), i * 50);
    });
  }

  function playLevelUp() {
    initAudio();
    const notes = [440, 554, 659, 880, 1108, 1318];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.35, 0.35), idx * 90);
    });
  }

  function playVictory() {
    initAudio();
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.5, 0.4), idx * 110);
    });
  }

  // --- MÚSICA DE FONDO AMBIENTAL PROCEDURAL (BGM) ---
  let bgmThemeName = null;
  const themes = {
    title: [261.63, 329.63, 392.00, 493.88], // Do, Mi, Sol, Si
    map: [293.66, 369.99, 440.00, 587.33],   // Re, Fa#, La, Re
    school: [261.63, 349.23, 392.00, 523.25], // Do, Fa, Sol, Do
    lab: [329.63, 392.00, 493.88, 659.25],    // Mi, Sol, Si, Mi
    quiz: [440.00, 523.25, 659.25, 783.99]    // La, Do, Mi, Sol
  };

  function playBGM(theme = 'map') {
    initAudio();
    if (bgmThemeName === theme && currentBgmInterval) return;
    stopBGM();
    bgmThemeName = theme;

    const chords = themes[theme] || themes.map;
    let step = 0;

    currentBgmInterval = setInterval(() => {
      if (!audioCtx || isMuted || musicVolume <= 0) return;
      try {
        const freq = chords[step % chords.length];
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06 * musicVolume, audioCtx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(musicGainNode);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);

        step++;
      } catch (e) {
        // Ignorar excepciones menores de audio context
      }
    }, 1200);
  }

  function stopBGM() {
    if (currentBgmInterval) {
      clearInterval(currentBgmInterval);
      currentBgmInterval = null;
    }
    bgmThemeName = null;
  }

  function setMusicVolume(val) {
    musicVolume = Math.max(0, Math.min(1, val));
    if (musicGainNode && audioCtx) {
      musicGainNode.gain.setValueAtTime(musicVolume, audioCtx.currentTime);
    }
  }

  function setSfxVolume(val) {
    sfxVolume = Math.max(0, Math.min(1, val));
    if (sfxGainNode && audioCtx) {
      sfxGainNode.gain.setValueAtTime(sfxVolume, audioCtx.currentTime);
    }
  }

  return {
    init: initAudio,
    playClick,
    playTypewriter,
    playSuccess,
    playWrong,
    playCoin,
    playBooster,
    playLevelUp,
    playVictory,
    playBGM,
    stopBGM,
    setMusicVolume,
    setSfxVolume
  };
})();
