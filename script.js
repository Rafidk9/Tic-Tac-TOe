const buttons = document.getElementsByClassName("myBtn");
let count = 0;
let clicked = {};
let xClicks = [];
let oClicks = [];
let gameWon = false;
const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]             // Diagonals
];

Array.from(buttons).forEach((button, index) => {
    let buttonNum = `button-${index + 1}`;
    button.value = `button-${index + 1}`;
    clicked[buttonNum] = false;

    button.addEventListener("click", (event) => {
        if (gameWon || clicked[buttonNum]) {
            return;
        }

        if (count % 2 === 0) {
            event.target.textContent = "O";
            event.target.classList.add("O-bgColor");
            oClicks.push(index + 1);
        } else {
            event.target.textContent = "X";
            event.target.classList.add("X-bgColor");
            xClicks.push(index + 1);
        }
        count++;
        clicked[buttonNum] = true;

        let winningCombination = checkWin(xClicks);
        if (winningCombination) {
            gameWon = true;
            highlightWinningCombination(winningCombination, "X");
            showPopup("X wins! Congratulations!");
        } else {
            winningCombination = checkWin(oClicks);
            if (winningCombination) {
                gameWon = true;
                highlightWinningCombination(winningCombination, "O");
                showPopup("O wins! Congratulations!");
            } else if (count === 9) {
                showPopup("It's a draw!");
            }
        }
    });
});

function checkWin(clicks) {
    if (!Array.isArray(clicks)) {
        console.error("Invalid clicks array:", clicks);
        return false;
    }

    for (let combination of winningCombinations) {
        if (!Array.isArray(combination)) {
            console.error("Invalid combination array:", combination);
            return false;
        }
        if (combination.every(num => clicks.includes(num))) {
            return combination;
        }
    }
    return false;
}

function highlightWinningCombination(combination, player) {
    combination.forEach(num => {
        const button = document.querySelector(`.myBtn[value="button-${num}"]`);
        button.classList.add(`${player}-win-bgColor`);
    });
}

function showPopup(message) {
    const popup = document.getElementById("popUp");
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    popup.style.display = "block";
}

// Close the popup when the user clicks on <span> (x)
const closeSpan = document.getElementById("popupClose");
closeSpan.onclick = () => {
    const popup = document.getElementById("popUp");
    popup.style.display = "none";
}

// Close the popup when the user clicks anywhere outside of the popup
window.onclick = function(event) {
    const popup = document.getElementById("popUp");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// Add event listener for reset button
document.getElementById("resetButton").addEventListener("click", resetGame);

function resetGame() {
    count = 0;
    clicked = {};
    xClicks = [];
    oClicks = [];
    gameWon = false;

    Array.from(buttons).forEach(button => {
        button.textContent = "";
        button.classList.remove("X-bgColor", "O-bgColor", "X-win-bgColor", "O-win-bgColor");
    });

    const popup = document.getElementById("popUp");
    popup.style.display = "none";
}
