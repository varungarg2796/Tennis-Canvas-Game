var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY=50;
var ballSpeedY=4;

var paddleRightY=250;
var paddleLeftY=250;
var cpuSpeed=8;

var Player1Score=0;
var Player2Score=0;

var gameWon=false;





//this is in capitals as this will never change
const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;
const WINNING_SCORE=3;

window.onload=function() {
	console.log('hello world');
	canvas=document.getElementById('gameCanvas');
	canvasContext=canvas.getContext('2d');

	
	//main calling
	var fps = 30;
	setInterval(function() {
		move();
		draw();
		computerMove();
	},1000/fps);

	canvas.addEventListener('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove',function(event){
			var mousePos=calculateMousePos(event);
			paddleLeftY=mousePos.y-(PADDLE_HEIGHT/2);

	});
};

function handleMouseClick(event) {
		if (gameWon!=false) {
		 	Player1Score=0;
		 	Player2Score=0;
		 	gameWon=false;
		 	location.reload();
		 } 
	}

function ballReset (argument) {
	 ballSpeedX = -ballSpeedX;

	 if(Player1Score>=WINNING_SCORE || Player2Score>=WINNING_SCORE)
	 {
	 	gameWon=true;
	 }
	 ballX=canvas.width/2;
	 ballY=canvas.height/2;


}


//calculating the position of the mouse on the screen
function calculateMousePos(event){

	var rect=canvas.getBoundingClientRect();
	var root=document.documentElement;
	var mouseX=event.clientX-rect.left-root.scrollLeft;
	var mouseY=event.clientY-rect.top-root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};

}


function computerMove(){
	var paddleRightYCenter=paddleRightY+ (PADDLE_HEIGHT/2);
	if (paddleRightYCenter<ballY-35){
		paddleRightY=paddleRightY+cpuSpeed;
	}
	else if(paddleRightYCenter>ballY+35){
		paddleRightY=paddleRightY-cpuSpeed;
	}
}

//moves stuff
function move (argument) {
	 ballX = ballX + ballSpeedX;
	 ballY=ballY+ballSpeedY;
	 if(gameWon!=false){
	 	return;
	 }

	 //for collisions on the Cpu end
	 if (ballX>canvas.width) {

	 	if(ballY>paddleRightY && ballY<paddleRightY+PADDLE_HEIGHT){

	   	 		ballSpeedX = -ballSpeedX;

	   	 		//changing the speed along Y axis to make the game interesting
	   	 		//approx calc. changeY= 200-(100+50)
	   	 		var changeY=ballY-(paddleRightY+PADDLE_HEIGHT/2);
	   	 		ballSpeedY=changeY* 0.35;
	   		}
	   	 	else {

	   	 		Player1Score++; //must be before ball reset as scoring is added in ball reset
	   	 		ballReset();
	   	 }
	   }  

	   //for collisions on the player end
	   if (ballX<0) 
	   {

	   		if(ballY>paddleLeftY && ballY<paddleLeftY+PADDLE_HEIGHT){

	   	 		ballSpeedX = -ballSpeedX;
	   	 		//changing the speed along Y axis to make the game interesting
	   	 		//approx calc. changeY= 200-(100+50)
	   	 		var changeY=ballY-(paddleLeftY+PADDLE_HEIGHT/2);
	   	 		ballSpeedY=changeY* 0.35;
	   		}
	   	 	else {

	   	 		Player2Score++;
	   	 		ballReset();
	   	 	}
	   	 
	   	 	
	   }


	   //for top collisions  
	   if(ballY<0){
			ballSpeedY=-ballSpeedY;	   	
	   }
	   if (ballY>canvas.height) {
	   	 ballSpeedY=-ballSpeedY;
	   }

}

//used this to draw rectangles in one line
function drawRect(leftX, topY, width, height, color ){

	canvasContext.fillStyle=color;
	canvasContext.fillRect(leftX,topY,width,height);
}

//used this to draw circles in one line
function drawCircle (centerX,centerY,radius,color) {
	 canvasContext.fillStyle=color;
	 canvasContext.beginPath();
	 canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	 canvasContext.fill();
}

function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		drawRect((canvas.width/2)-1,i,2,20,'white');
	}
}

//draws stuff
function draw(){
	//this is the field
	drawRect(0,0,canvas.width,canvas.height,'black');

	if (gameWon!=false) {
		canvasContext.fillStyle = 'white';

		if(Player1Score >= WINNING_SCORE) {
			canvasContext.fillText("You Won", 350, 200);
		} else if(Player2Score >= WINNING_SCORE) {
			canvasContext.fillText("Computer Won", 350, 200);
		}

		canvasContext.fillText("click to continue", 350, 500);
		return;
		
	}
	//this draws the net
	//initialise draw net before draw ball as then the ball will be visible
	drawNet(); 

	//left player paddle
	drawRect(0,paddleLeftY,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

	//right computer paddle
	drawRect(canvas.width-10,paddleRightY,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');
	
	//this is used to draw the ball
	drawCircle(ballX,ballY,10,'white');

	canvasContext.fillText("Your Score",100,80);
	canvasContext.fillText("Computer's Score",canvas.width-180,80);	

	canvasContext.fillText(Player1Score,120,100);
	canvasContext.fillText(Player2Score,canvas.width-140,100);


}