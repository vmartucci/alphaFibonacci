const squares = [
  document.getElementById("square1"),
  document.getElementById("square2"),
  document.getElementById("square3"),
  document.getElementById("square4"),
  document.getElementById("square5")
];

let current = 0;
let epsilon = 15;
let msg = document.getElementById("msg");

squares.forEach((sq, i) => {
  if (i > 0) sq.draggable = false;

  sq.addEventListener("dragstart", e => {
    e.dataTransfer.setData("id", sq.id);
  });
});

const canvas = document.getElementById("canvas-gioco");

canvas.addEventListener("dragover", e => e.preventDefault());

canvas.addEventListener("drop", e => {
  e.preventDefault();
  const id = e.dataTransfer.getData("id");
  const sq = document.getElementById(id);

  const rectArea = canvas.getBoundingClientRect();
  const x = e.clientX - rectArea.left - sq.offsetWidth / 2;
  const y = e.clientY - rectArea.top - sq.offsetHeight / 2;

  sq.style.left = `${x}px`;
  sq.style.top = `${y}px`;

  const target = document.getElementById("target").getBoundingClientRect();
  const sqRect = sq.getBoundingClientRect();

  const dx = Math.abs(sqRect.left - target.left);
  const dy = Math.abs(sqRect.top - target.top);

  if (dx < epsilon && dy < epsilon) {
    sq.style.opacity = 1;
    sq.draggable = false;
    msg.textContent = `✅ Quadrato ${i + 1} corretto!`;
    current++;

    moveTarget(i + 1);
    if (squares[current]) squares[current].draggable = true;
    if (current === 5) msg.textContent = "🎉 Hai completato il Rettangolo Aureo!";
  } else {
    msg.textContent = "❌ Non è nella posizione giusta, riprova.";
  }
});

function moveTarget(step) {
  const target = document.getElementById("target");
  switch (step) {
    case 1: target.style.left = "150px"; break;
    case 2: target.style.left = "250px"; target.style.top = "100px"; target.style.width = "100px"; target.style.height = "100px"; break;
    case 3: target.style.left = "350px"; target.style.top = "250px"; target.style.width = "150px"; target.style.height = "150px"; break;
    case 4: target.style.left = "500px"; target.style.top = "400px"; target.style.width = "250px"; target.style.height = "250px"; break;
    default: break;
  }
}
