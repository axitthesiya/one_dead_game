function generateNumber() {
  let number = "";
  while (number.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!number.includes(digit.toString())) {
      number += digit.toString();
    }
  }
  localStorage.setItem("generatedNumber", number);
}

generateNumber();

function checkGuess(guess, generatedNumber) {
  let dead = 0;
  let injured = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === generatedNumber[i]) {
      dead++;
    } else if (generatedNumber.includes(guess[i])) {
      injured++;
    }
  }

  return { dead, injured };
}

let attempts = 0;

function playGame(guess) {
  const generatedNumber = localStorage.getItem("generatedNumber");
  console.log("Generated number:", generatedNumber);

  if (!guess) {
    console.log("Game aborted!");
    return;
  }

  if (guess.length !== 4 || isNaN(guess)) {
    console.log("Please enter a valid 4-digit number!");
    return;
  }

  attempts++;

  const { dead, injured } = checkGuess(guess, generatedNumber);
  console.log(
    `Attempt ${attempts}: ${guess} - ${dead} dead, ${injured} injured`
  );

  localStorage.setItem("attempts", attempts);
}

function appendToDisplay(digit) {
  document.getElementById("displayDiv").innerText += digit;
}

function clearDisplay() {
  document.getElementById("displayDiv").innerText = "";
}

function enterNumber() {
  const guess = document.getElementById("displayDiv").innerText;
  if (guess.length !== 4 || isNaN(guess)) {
    return;
  }
  playGame(guess);
  appendToHistory(guess);
  clearDisplay();
}

function appendToHistory(guess) {
  const generatedNumber = localStorage.getItem("generatedNumber");
  const { dead, injured } = checkGuess(guess, generatedNumber);

  const tableBody = document.getElementById("historyBody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${attempts}</td><td>${guess}</td><td>${dead}</td><td>${injured}</td>`;

  if (dead === 4) {
    alert(" 🚀 Superb performance You won the game 🚀 ")
    newRow.innerHTML = `<td colspan="4">🚀Congratulations! You won the game!🚀 Your Code is ${generatedNumber}  correctly in ${attempts} attempts.</td>`;
    generateNumber(); 
  }

  tableBody.appendChild(newRow);
}
