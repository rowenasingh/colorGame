var menubuttons = document.getElementsByTagName("button");
var newgame = document.getElementsByTagName("button")[0];
var squares = document.getElementsByClassName("squares");
var h1 = document.querySelector("h1");
var message = document.getElementById("message");
var displayRGB = document.getElementById("bigger");
var easy = document.getElementsByTagName("button")[1];
var hard = document.getElementsByTagName("button")[2];

// load the page on hard mode
hard.classList.add("invert");
var hardFlag = true;

// add invert class to menu buttons to change color when clicked
for (var i = 1; i < menubuttons.length; i++) {
	menubuttons[i].addEventListener("click", function() {
		this.classList.add("invert");
	});
}

// keep message area "blank"
message.style.color = "white";

// create winning number for hard mode
var hardWinNum; 

// create winning number for easy mode
var easyWinNum; 

function winningNumber() {
	if (hard.className === "invert") {
		// console.log(hardWinNum);
		displayRGB.innerHTML = squares[hardWinNum].style.background;
	}
	if (easy.className === "invert") {
		// console.log(easyWinNum);
		displayRGB.innerHTML = squares[easyWinNum].style.background;
	}
}

// change color of all  squares when new colors button is clicked
hard.addEventListener("click", newColors);
easy.addEventListener("click", newColors);
newgame.addEventListener("click", newColors);
function newColors() {
	newgame.innerHTML = "New Colors";
	h1.style.background = "steelblue";
	message.style.color = "white";

	if (this === easy) {
		easyMode();
		hardFlag = false;
	}
	if (this === hard) {
		hardMode();
		hardFlag = true;
	}

	if (hardFlag) {
		hardMode();
	}

	else {
		easyMode();
	}
}

// call newColors() whenever the page is reloaded
newColors();

// what to do when squares are clicked
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if (hard.className === "invert") {
			if (this.style.background === squares[hardWinNum].style.background) {
				for (var i = 0; i < squares.length; i++) {
					squares[i].style.background = squares[hardWinNum].style.background;
				}
				h1.style.background = squares[hardWinNum].style.background;
				message.style.color = "black";
				message.innerHTML = "You won!";
				newgame.innerHTML = "Play again?";
			}
			else if (this.style.background !== squares[hardWinNum].style.background) {
				message.style.color = "black";
				message.innerHTML = "Try again.";
				this.style.background = "#232323";
			}
		}
		if (easy.className === "invert") {
			if (this.style.background === squares[easyWinNum].style.background) {
				for (var i = 0; i < squares.length / 2; i++) {
					squares[i].style.background = squares[easyWinNum].style.background;
				}
				h1.style.background = squares[easyWinNum].style.background;
				message.style.color = "black";
				message.innerHTML = "You won!";
				newgame.innerHTML = "Play again?";
			}
			else if (this.style.background !== squares[easyWinNum].style.background) {
				message.style.color = "black";
				message.innerHTML = "Try again.";
				this.style.background = "#232323";
			}
		}
	})
}

function hardMode() {
	easy.classList.remove("invert");
	hardWinNum = (Math.floor(6*Math.random()));
	for (var i = 3; i < 6; i++) {
		squares[i].classList.remove("visibility");
	}

	for (var i = 0; i < squares.length; i++) {
		// random color
		var r = Math.floor(256*Math.random());
		var g = Math.floor(256*Math.random());
		var b = Math.floor(256*Math.random());

		var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
		squares[i].style.background = rgb;
		// console.log(rgb);
	}
	winningNumber();
}

function easyMode() {
	hard.classList.remove("invert");
	easyWinNum = (Math.floor(3*Math.random()));
	for (var i = 3; i < 6; i++) {
		squares[i].classList.add("visibility");
		squares[i].style.background = "#232323";
	}
	for (var i = 0; i < squares.length / 2; i++) {
		// random color
		var r = Math.floor(256*Math.random());
		var g = Math.floor(256*Math.random());
		var b = Math.floor(256*Math.random());

		var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
		squares[i].style.background = rgb;
		// console.log(rgb);
	}
	winningNumber();
}
