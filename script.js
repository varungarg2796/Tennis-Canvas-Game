var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;
var ballY=50;
var ballSpeedY=4;

var paddleRightY=250;
var paddleLeftY=250;


//this is in capitals as this will never change
const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;

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

	canvas.addEventListener('mousemove',function(event){
			var mousePos=calculateMousePos(event);
			paddleLeftY=mousePos.y-(PADDLE_HEIGHT/2);

	});
};



function ballReset (argument) {
	 ballSpeedX = -ballSpeedX;
	 ballX=canvas.width/2;
	 ballY=canvas.height/2;


}


//calculating the position of the mouse on the screen
function calculateMousePos(event){

	var rect=canvas.getBoundingClientRect();
	var root=document.documentElement;
	var mouseX=event.clientX-rect.left-root.scrollLeft;
	var mouseY=event.clientX-rect.top-root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};

}


function computerMove(){
	var paddleRightYCenter=paddleRightY+ (PADDLE_HEIGHT/2);
	if (paddleRightY<ballY){
		paddleRightY=paddleRightY+10;
	}
	else if(paddleRightY>ballY+35){
		paddleRightY=paddleRightY-10;
	}
}

//moves stuff
function move (argument) {
	 ballX = ballX + ballSpeedX;
	 ballY=ballY+ballSpeedY;

	 if (ballX>canvas.width) {

	 	if(ballY>paddleRightY && ballY<paddleRightY+PADDLE_HEIGHT){

	   	 		ballSpeedX = -ballSpeedX;
	   		}
	   	 	else {

	   	 ballReset();
	   	 }
	   }  
	   if (ballX<0) 
	   {

	   		if(ballY>paddleLeftY && ballY<paddleLeftY+PADDLE_HEIGHT){

	   	 		ballSpeedX = -ballSpeedX;
	   		}
	   	 	else {

	   	 ballReset();
	   	 }
	   	 
	   	 	
	   }  
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

//draws stuff
function draw(){
	//this is the field
	drawRect(0,0,canvas.width,canvas.height,'black');
	
	//left player paddle
	drawRect(0,paddleLeftY,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

	//right computer paddle
	drawRect(canvas.width-10,paddleRightY,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');
	
	//this is used to draw the ball
	drawCircle(ballX,ballY,5,'white');
}