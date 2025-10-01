let frases = [];
let indice = 0;

async function cargarDatos() {
  const res = await fetch("frases.json");
  frases = await res.json();
}

document.getElementById("playButton").addEventListener("click", async () => {
  await Tone.start();
  document.getElementById("playButton").style.display = "none";
  await cargarDatos();
  reproducirFrase();
});

function mapPrecipitacionANota(valor) {
  // Escala musical ampliada para más variedad
  const escala = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];
  // Ajuste del rango: divide por 3 o 5 según tus datos
  const index = Math.min(
    escala.length - 1,
    Math.floor(valor / 3)
  );
  return escala[index];
}

function reproducirFrase() {
  if (indice >= frases.length) indice = 0;

  const frase = frases[indice];
  const textoEl = document.getElementById("texto");
  const imgEl = document.getElementById("imagen");

  // Actualiza texto e imagen
  textoEl.textContent = frase.frase;
  imgEl.src = frase.imagen;
  imgEl.style.display = "block";

  // Efecto suave de aparición
  textoEl.style.opacity = 0;
  imgEl.style.opacity = 0;

  setTimeout(() => {
    textoEl.style.transition = "opacity 1s";
    imgEl.style.transition = "opacity 1s";
    textoEl.style.opacity = 1;
    imgEl.style.opacity = 1;
  }, 100);

// Crear sonido
const synth = new Tone.Synth({
  oscillator: { type: "sine" }, // sonido redondo, suave
  envelope: {
    attack: 0.2, // entrada progresiva
    decay: 0.4,
    sustain: 0.5,
    release: 1.5 // salida lenta
  }
}).toDestination();

// Escala con más notas pero sin exagerar
const escala = ["C4", "D4", "E4", "G4", "A4", "B4", "C5"];
const nota = escala[Math.min(escala.length - 1, Math.floor(indice / 4))];

// Nota más larga (~1.2 seg)
synth.triggerAttackRelease(nota, "2n");


  indice++;
  setTimeout(reproducirFrase, 4000); // cambia cada 4 segundos
}
