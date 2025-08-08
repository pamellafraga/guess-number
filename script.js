(() => {
  const input = document.getElementById("guessInput");
  const feedback = document.getElementById("feedback");
  const attemptsDisplay = document.getElementById("attempts");

  let secretNumber;
  let attempts;

  function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // 1..100
    attempts = 0;
    attemptsDisplay.textContent = "0";
    feedback.textContent = "";
    feedback.style.color = "";
    input.value = "";
    input.disabled = false;
    input.focus();
  }

  function checkGuess() {
    const value = input.value.trim();

    // validação
    if (value === "") {
      feedback.textContent = "Digite um número entre 1 e 100.";
      feedback.style.color = "red";
      input.focus();
      return;
    }

    const guess = Number(value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      feedback.textContent = "Número inválido. Use um inteiro de 1 a 100.";
      feedback.style.color = "red";
      input.focus();
      return;
    }

    // só conta tentativa válida
    attempts++;
    attemptsDisplay.textContent = String(attempts);

    if (guess === secretNumber) {
      feedback.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber} em ${attempts} tentativa${attempts === 1 ? "" : "s"}.`;
      feedback.style.color = "lime";
      input.disabled = true; // trava após acertar
      return;
    }

    if (guess > secretNumber) {
      feedback.textContent = "O número é menor ⬇️";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "O número é maior ⬆️";
      feedback.style.color = "orange";
    }

    input.focus();
    input.select();
  }

  function resetGame() {
    newGame();
  }

  // Atalho: Enter faz o chute
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkGuess();
  });

  // Expor para os botões inline do HTML
  window.checkGuess = checkGuess;
  window.resetGame = resetGame;

  // inicializa
  newGame();
})();
