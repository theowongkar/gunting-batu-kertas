const CHOICES = ["Gunting", "Batu", "Kertas"];

const rules = {
  Gunting: "Kertas",
  Batu: "Gunting",
  Kertas: "Batu",
};

const computerDOM = document.querySelector(".computer img");
const resultDOM = document.querySelector(".result p");
const playersDOM = document.querySelectorAll(".player img");

function getWinner(player, computer) {
  if (player === computer) return "Seri";

  return rules[player] === computer ? "Menang" : "Kalah";
}

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function setPlayerInteraction(enabled) {
  playersDOM.forEach((img) => {
    img.style.pointerEvents = enabled ? "auto" : "none";
  });
}

async function spinComputer(duration = 1500) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const choice = getComputerChoice();

      computerDOM.src = `assets/images/${choice.toLowerCase()}.png`;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const finalChoice = getComputerChoice();

      resolve(finalChoice);
    }, duration);
  });
}

playersDOM.forEach((playerDOM) => {
  playerDOM.addEventListener("click", async (e) => {
    const player = e.currentTarget.dataset.choice;

    resultDOM.textContent = "...";

    playersDOM.forEach((img) => {
      img.classList.remove("active");
    });

    e.currentTarget.classList.add("active");

    try {
      setPlayerInteraction(false);

      const computer = await spinComputer(1500);

      computerDOM.src = `assets/images/${computer.toLowerCase()}.png`;

      const result = getWinner(player, computer);

      resultDOM.textContent = result;
    } finally {
      setPlayerInteraction(true);
    }
  });
});
