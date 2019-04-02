(function () {
	var active;
	var score = 0;
	var highScore = 0;


	function randomGenerator(limit) {
		return Math.floor(Math.random() * limit);
	}

	function loadDefault() {
		loadMatrix(3);
		highScore = localStorage.getItem("highScore");
		document.getElementById("highScore").innerHTML = highScore;
		document.getElementById("start").onclick = onStart;
		document.getElementById("container").addEventListener("click", check, false);
		document.getElementById("gridSelector").onchange = loadGrid;
	}

	function loadGrid() {
		loadMatrix(document.getElementById("gridSelector").value);
	}

	function loadMatrix(row) {
		let parentDiv = document.getElementById("container");
		if (parentDiv.hasChildNodes()) {
			while (parentDiv.firstChild) {
				parentDiv.removeChild(parentDiv.firstChild);
			}
		}
		let gridtemplatecolumns = "";
		for (let i = 1; i <= row * row; i++) {
			let cNode = document.createElement("div");
			cNode.classList.add("grid-Item");
			cNode.innerHTML = i;
			parentDiv.appendChild(cNode);
		}
		for (let i = 0; i < row; i++) {
			gridtemplatecolumns += " auto";
		}
		parentDiv.style.gridTemplateColumns = gridtemplatecolumns;
	}
	window.addEventListener("load", loadDefault, false);

	function onStart() {
		let intervalID = null;
		let counter = 0;
		let previous = null;
		intervalID = window.setInterval(function () {
			counter++;
			previous = setActiveGrid(previous);
			setTimer();
			if (counter == 120) {
				clearInterval(intervalID);
				clearBox(previous);
				setTimer(true);
				if (score > highScore) {
					localStorage.setItem("highScore", score);
					document.getElementById("highScore").innerHTML = score;
					document.getElementById("successMessage").classList.remove("hidden");
				}
				alert("Game Over");
			}
		}, 1000);
	}

	function setTimer(isreset) {
		let timer = document.getElementById("timer");
		if(isreset){
			timer.innerHTML = 120;
		}else if (timer.innerHTML) {
			timer.innerHTML -= 1;
		}
	}

	function clearBox(boxId) {
		let parentDiv = document.getElementById("container");
		let cNodes = parentDiv.getElementsByTagName("div");
		if (boxId || boxId == 0) {
			let previousNode = cNodes[boxId];
			previousNode.style.backgroundColor = "";
		}
	}

	function check(e) {
		score = e.target.innerHTML == active + 1 ? ++score : --score;
		document.getElementById("score").innerHTML = score;
	}

	function setActiveGrid(previous) {
		let rowlength = document.getElementById("gridSelector").value
		active = randomGenerator(rowlength * rowlength);
		let parentDiv = document.getElementById("container");
		let cNodes = parentDiv.getElementsByTagName("div");
		clearBox(previous);
		let activeNode = cNodes[active];
		activeNode.style.backgroundColor = "green";
		console.log(activeNode);
		previous = active;
		return previous;
	}
})()