let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guess = Number(document.getElementById("guessInput").value);
  const feedback = document.getElementById("feedback");
  const attemptsDisplay = document.getElementById("attempts");

  attempts++;

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber} em ${attempts} tentativas.`;
    feedback.style.color = "lime";
  } else if (guess > secretNumber) {
    feedback.textContent = "O número é menor ⬇️";
    feedback.style.color = "orange";
  } else if (guess < secretNumber) {
    feedback.textContent = "O número é maior ⬆️";
    feedback.style.color = "orange";
  } else {
    feedback.textContent = "Digite um número válido.";
    feedback.style.color = "red";
  }

  attemptsDisplay.textContent = attempts;
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("feedback").textContent = "";
  document.getElementById("attempts").textContent = "0";
  document.getElementById("guessInput").value = "";
}
