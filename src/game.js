const startGameBtn = document.querySelector("startGame");

document.addEventListener("click", (event) => {
  if (event.target.id === "startGame") {
    alert("Ya Mama");
  }
});

function addFadeAnimationDelay(callback) {
  setTimeout(callback, 1000);
}
