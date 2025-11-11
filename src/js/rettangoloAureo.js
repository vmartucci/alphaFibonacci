// Gioco: Disegna il Rettangolo Aureo
// Regola (dal tuo documento corretto):
// Il quadrato successivo è valido se:
// (A2 ≈ B1 && D2 ≈ C1)  [a destra]
//    OR
// (B2 ≈ A1 && C2 ≈ D1)  [a sinistra]

const canvas   = document.getElementById("canvas-gioco");
const msg      = document.getElementById("msg");
const squares  = [
  document.getElementById("square1"),
  document.getElementById("square2"),
  document.getElementById("square3"),
  document.getElementById("square4"),
  document.getElementById("square5"),
];

let current = 0;           // indice del quadrato attivo
const epsilon = 12;        // tolleranza in px
const locked = [];         // salveremo le info (DOM + vertici) dei quadrati fissati

// stato iniziale: abilita solo il primo
squares.forEach((sq, i) => {
  sq.draggable = (i === 0);
  if (i === 0) sq.classList.add("enabled");
  sq.addEventListener("dragstart", (e) => {
    if (!sq.draggable) { e.preventDefault(); return; }
    e.dataTransfer.setData("id", sq.id);
  });
});

canvas.addEventListener("dragover", (e) => e.preventDefault());

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("id");
  if (!id) return;
  const sq = document.getElementById(id);
  const i = squares.indexOf(sq);
  if (i !== current) return; // solo il corrente può essere rilasciato

  // Posiziona il quadrato centrando il punto di drop
  const cRect = canvas.getBoundingClientRect();
  const x = e.clientX - cRect.left - sq.offsetWidth  / 2;
  const y = e.clientY - cRect.top  - sq.offsetHeight / 2;

  // Limita entro l'area di gioco (opzionale ma utile)
  const maxX = canvas.clientWidth  - sq.offsetWidth;
  const maxY = canvas.clientHeight - sq.offsetHeight;

  sq.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
  sq.style.top  = `${Math.max(0, Math.min(y, maxY))}px`;

  // Validazione
  if (i === 0) {
    // Primo quadrato: accettalo sempre (ancora non c'è precedente)
    lockSquare(sq, i);
    msgSuccess(`Quadrato ${i + 1} posizionato! Ora trascina il successivo.`);
  } else {
    const prev = locked[i - 1];
    const prevV = getVertices(prev.el);
    const currV = getVertices(sq);

    if (isValidPlacement(prevV, currV, epsilon)) {
      lockSquare(sq, i);
      if (i === squares.length - 1) {
        msgSuccess("🎉 Ottimo! Hai completato il Rettangolo Aureo.");
      } else {
        msgSuccess(`Quadrato ${i + 1} corretto! Ora trascina il ${i + 2}.`);
      }
    } else {
      msgError("❌ Non è nella posizione giusta rispetto al precedente. Riprova.");
    }
  }
});

function lockSquare(sq, index) {
  sq.classList.remove("enabled");
  sq.classList.add("fixed");
  sq.draggable = false;
  locked[index] = { el: sq, verts: getVertices(sq) };

  current++;
  if (squares[current]) {
    squares[current].draggable = true;
    squares[current].classList.add("enabled");
  }
}

function getVertices(el) {
  // Vertici relativi al canvas
  const rect = el.getBoundingClientRect();
  const crect = canvas.getBoundingClientRect();
  const left = rect.left - crect.left;
  const top  = rect.top  - crect.top;
  const w = rect.width;
  const h = rect.height;

  // Convenzione: A = top-left, B = top-right, C = bottom-right, D = bottom-left
  return {
    A: { x: left,     y: top      },
    B: { x: left + w, y: top      },
    C: { x: left + w, y: top + h  },
    D: { x: left,     y: top + h  }
  };
}

function closeEnough(p, q, eps) {
  return Math.abs(p.x - q.x) < eps && Math.abs(p.y - q.y) < eps;
}

function isValidPlacement(prevV, currV, eps) {
  // Caso 1: nuovo a destra → A2 ≈ B1  &&  D2 ≈ C1
  const cond1 = closeEnough(currV.A, prevV.B, eps) && closeEnough(currV.D, prevV.C, eps);

  // Caso 2: nuovo a sinistra → B2 ≈ A1  &&  C2 ≈ D1
  const cond2 = closeEnough(currV.B, prevV.A, eps) && closeEnough(currV.C, prevV.D, eps);

  return cond1 || cond2;
}

function msgSuccess(text) {
  msg.textContent = text;
  msg.classList.remove("error");
  msg.classList.add("success");
}

function msgError(text) {
  msg.textContent = text;
  msg.classList.remove("success");
  msg.classList.add("error");
}
