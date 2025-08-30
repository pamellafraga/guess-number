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

// Função auto-executável para isolar o escopo e evitar poluir o escopo global
(() => {
  // Seletores dos elementos principais da interface
  const input = document.getElementById("guessInput"); // Campo de entrada do palpite
  const feedback = document.getElementById("feedback"); // Elemento para mostrar mensagens ao usuário
  const attemptsDisplay = document.getElementById("attempts"); // Exibe o número de tentativas

  // Variáveis de estado do jogo
  let secretNumber; // Número secreto a ser adivinhado
  let attempts;     // Contador de tentativas

  // Inicia um novo jogo, sorteando um número e resetando tentativas e interface
  function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // Sorteia número entre 1 e 100
    attempts = 0; // Zera tentativas
    attemptsDisplay.textContent = "0"; // Atualiza display
    feedback.textContent = ""; // Limpa mensagens
    feedback.style.color = ""; // Reseta cor
    input.value = ""; // Limpa campo
    input.disabled = false; // Habilita input
    input.focus(); // Foca no campo
  }

  // Função chamada ao tentar um palpite
  function checkGuess() {
    const value = input.value.trim(); // Remove espaços

    // Validação: campo vazio
    if (value === "") {
      feedback.textContent = "Digite um número entre 1 e 100.";
      feedback.style.color = "red";
      input.focus();
      return;
    }

    const guess = Number(value); // Converte para número
    // Validação: não é inteiro ou fora do intervalo
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      feedback.textContent = "Número inválido. Use um inteiro de 1 a 100.";
      feedback.style.color = "red";
      input.focus();
      return;
    }

    // Só conta tentativa válida
    attempts++;
    attemptsDisplay.textContent = String(attempts); // Atualiza display

    // Verifica se acertou
    if (guess === secretNumber) {
      feedback.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber} em ${attempts} tentativa${attempts === 1 ? "" : "s"}.`;
      feedback.style.color = "lime";
      input.disabled = true; // Desabilita input após acerto
      return;
    }

    // Dica: maior ou menor
    if (guess > secretNumber) {
      feedback.textContent = "O número é menor ⬇️";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "O número é maior ⬆️";
      feedback.style.color = "orange";
    }

    input.focus(); // Mantém foco
    input.select(); // Seleciona texto para facilitar novo chute
  }

  // Reinicia o jogo ao clicar no botão "Reiniciar"
  function resetGame() {
    newGame();
  }

  // Atalho: pressionar Enter no input executa o chute
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkGuess();
  });

  // Expõe funções para uso nos botões inline do HTML
  window.checkGuess = checkGuess;
  window.resetGame = resetGame;

  // Inicializa o jogo ao carregar a página
  newGame();
})();
