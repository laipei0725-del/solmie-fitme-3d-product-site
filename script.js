const colorName = document.querySelector("#colorName");
const logoName = document.querySelector("#logoName");
const fitmeModel = document.querySelector("#fitmeModel");
const swatches = document.querySelectorAll("[data-color]");
const logoButtons = document.querySelectorAll("[data-logo]");

const colorLabels = {
  black: "霧面黑",
  white: "經典白",
  coffee: "柔咖色",
};

const logoLabels = {
  badge: "圓形徽章",
  this: "This is me",
  script: "Solmié",
};

const materialTints = {
  black: [0.07, 0.065, 0.06, 1],
  white: [1, 0.94, 0.84, 1],
  coffee: [0.55, 0.38, 0.27, 1],
};

let selectedColor = "black";

function tintModel(color) {
  if (!fitmeModel || !fitmeModel.model) {
    return;
  }

  const [material] = fitmeModel.model.materials;

  if (!material || !material.pbrMetallicRoughness) {
    return;
  }

  material.pbrMetallicRoughness.setBaseColorFactor(materialTints[color]);
  material.pbrMetallicRoughness.setMetallicFactor(0);
  material.pbrMetallicRoughness.setRoughnessFactor(color === "white" ? 0.82 : 0.9);
}

function setColor(color) {
  selectedColor = color;
  colorName.textContent = colorLabels[color];

  swatches.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.color === color);
  });

  tintModel(color);
}

function setLogo(logo) {
  logoName.textContent = logoLabels[logo];

  logoButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.logo === logo);
  });
}

swatches.forEach((button) => {
  button.addEventListener("click", () => setColor(button.dataset.color));
});

logoButtons.forEach((button) => {
  button.addEventListener("click", () => setLogo(button.dataset.logo));
});

if (fitmeModel) {
  fitmeModel.addEventListener("load", () => tintModel(selectedColor));
}
