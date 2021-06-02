const gridContainer = document.querySelector("#grid-tableau");
const form = document.getElementById("formulaire");
const resetSize = document.querySelector("#resetSize");
const alert = document.querySelector("#alert");
const reset = document.querySelector(".reset");
const modal = document.getElementById("ajoutTaille");

let sizeNumber;
form.addEventListener("input", (e) => {
  e.preventDefault();
  sizeNumber = e.target.value;
  console.log(sizeNumber);
});

window.addEventListener("load", setDefaultGrid);
resetSize.addEventListener("click", (e) => {
  e.preventDefault();
    changeSize();
    modal.style.display = "none";
  
});
reset.addEventListener("click", (e) => {
  clearGrid();
  if (sizeNumber) {
    changeSize();
  } else {
    setDefaultGrid();
  }
});

function setDefaultGrid() {
  setGridSize(16);
  fillGrid(16);
}

function setGridSize(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

function fillGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList = "grid-element";
    gridElement.addEventListener("mouseover", changeColor);
    gridContainer.appendChild(gridElement);
  }
}

function changeColor(e) {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function changeSize() {
  let newSize = sizeNumber;

  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize < 1 || newSize > 64 || Number.isNaN(newSize)) {
      alert.textContent = "Enter a number from 1-64 range";
    } else {
      clearGrid();
      setGridSize(newSize);
      fillGrid(newSize);
    }
  }
}

function clearGrid() {
  const gridArray = Array.from(gridContainer.childNodes);
  gridArray.forEach((element) => {
    gridContainer.removeChild(element);
  });
}
