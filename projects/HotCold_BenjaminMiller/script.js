// variable assignment
var previousGuessDifference = 25
	,	targetNumber; //default guess is 25 away

//bind window.onload
window.onload = windowLoad;



//document.getElementById() shortcut function
function $(id){return document.getElementById(id)}

function initialize(){
	//Assign Random Number to be targetNumber
	targetNumber = Math.ceil(Math.random()*100);
	console.log(targetNumber);
}

function windowLoad(){
	//variable assignment
	var statusBall = $('status')
		,	guessText  = $('guess')
		,	submitBtn  = $('submit')
		,	resetBtn   = $('reset');


	guessText.select();
	//Bind enter Press
	guessText.onkeyup = function(e){
		//conditions for cross compatibility
		if(e.keyCode == 13 || e.charCode == 13){
			submitBtn.click() //launch click event
			this.select();
		}
	}

	//Bind submit button click
	submitBtn.onclick = function(e){
		//variable assignment
		var currentGuess = guessText.value
			,	currentGuessDifference = Math.abs(currentGuess-targetNumber)
			, proccessing = false;
		console.log(currentGuessDifference, (currentGuessDifference < previousGuessDifference))

		//Guess Proccessing animation
		var interval = window.setInterval(function(){
			if(!proccessing){
				statusBall.innerHTML = ".";
				proccessing = true;
				return
			}
			if(statusBall.innerHTML != "..."){
				statusBall.innerHTML += ".";
				return
			}
			window.clearInterval(interval);
			proccessGuess();
		}, 200);

		//process based on current difference
		function proccessGuess(){
			//colder
			if(currentGuessDifference >= previousGuessDifference){
				console.log('colder')
				statusBall.style.backgroundColor = '#33f';
				statusBall.innerHTML = 'Colder';
			}
			//warmer
			if(currentGuessDifference < previousGuessDifference){
				console.log('warmer')
				statusBall.style.backgroundColor = 'red';
				statusBall.innerHTML = 'Warmer';
			}
			// got it!
			if(currentGuessDifference == 0){
				console.log('correct')
				statusBall.style.backgroundColor = '#3f3';
				statusBall.innerHTML = 'Correct!';
			}
		previousGuessDifference = currentGuessDifference;
		}
	}

	//Bind reset Button
	resetBtn.onclick = function(){
		initialize(); //get new target
		//clear guessText
		guessText.value = "";
		//reset status ball's color and text
		statusBall.style.backgroundColor = "#333";
		statusBall.innerHTML = '...';
	}

	//initialize
	initialize();
}