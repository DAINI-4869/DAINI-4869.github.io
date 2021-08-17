var cvs		= document.getElementById("cvs");
var context	= cvs.getContext("2d");
//------------------------------------------------------------------------------

function loadVal(){

 tileSheet = new Image();


 tileMap = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];


 me_x = 32;		 me_y = 32;		 me_dx = 8;	 me_dy = 8;	//characters'val
 en_x = 32*10;	 en_y = 32*9;	 en_dx = 16;	 en_dy = 16;	//chaser
 sc_x = 32*15;	 sc_y = 32*10;	 sc_dx = 16;  sc_dy = 16;	//interseptor
 ma_x = 32*14;	 ma_y = 32*12;		//magma
 fe_x = 32*6;	 fe_y = 32*7;

 character = new Array();


 mapIndexOffset	= -1;
 mapRows	= 14;
 mapCols	= 27;

 selectX = mapCols / 4 * 32;

 point = 0;
 sheetLoaded	= 0;
 meLoaded	= 0;
 enemyLoaded	= 0;
 feedLoaded	= 0;

 mode = 0;
 keyS = [0,0,0,0];
 endingTime =	0;
 selectTime =	1;
 restartOn =	0;

}

//------------------------------------------------------------------------------


function opening(){
drawScreen();

context.beginPath();			//easy
context.fillStyle = "#FFFF00";
context.fillRect(selectX,	0,	mapCols*32/4+selectX,	mapRows*32/4);

context.beginPath();
context.fillStyle = "#000000";
context.font = "100px Century Gothic";
context.fillText("Practice", selectX, mapRows*32/4-20);

context.beginPath();			//normal
context.fillStyle = "#00FFFF";
context.fillRect(selectX,	mapRows*32/4,	mapCols*32/4+selectX,	mapRows*32/4);


context.beginPath();
context.fillStyle = "#000000";
context.font = "100px Century Gothic";
context.fillText("Normal", selectX, mapRows*32/4*2-20);

context.beginPath();			//hard
context.fillStyle = "#FF0000";
context.fillRect(selectX,	mapRows*32/4*2,	mapCols*32/4+selectX,	mapRows*32/4);

context.beginPath();
context.fillStyle = "#000000";
context.font = "100px Century Gothic";
context.fillText("Hard", selectX, mapRows*32/4*3-20);

context.beginPath();			//lunatic
context.fillStyle = "#FF00FF";
context.fillRect(selectX,	mapRows*32/4*3,	mapCols*32/4+selectX,	mapRows*32/4);

context.beginPath();	
context.fillStyle = "#000000";
context.font = "100px Century Gothic";
context.fillText("Lunatic", selectX, mapRows*32/4*4-20);



if(mode != 0){
	switch(mode){
		case 1:
			startAiChase();
		break;
		case 2:
			startAiChase();
		break;
		case 3:
			startAiInterceptor();
			startMagma();
		break;
		case 4:
			en_dy += 8;
			startAiChase();
			startAiInterceptor();
			startMagma();
		break;
	}
	selectTime = 0;
	startPlusD();
	stopOpening();
	startMain();
	
}


}

function startOpening(){
	openingTimer = setInterval("opening()",	1);
}

function stopOpening(){
	clearInterval(openingTimer);
}


//------------------------------------------------------------------------------


function ending(){
	endingTime = 1;
	
	switch(mode){
		case 1:
			stopAiChase();
		break;
		case 2:
			stopAiChase();
		break;
		case 3:
			stopAiInterceptor();
			stopMagma();
		break;
		case 4:
			stopAiChase();
			stopAiInterceptor();
			stopMagma();
		break;
	}
	stopPlusD();
	stopMain();
	alert("Your score is "+ point +".");
	startDrawButton();
}


function drawButton(){
	drawScreen();
	context.beginPath();
	context.fillStyle = "#00FFFF";
	context.fillRect(selectX,	mapRows*32/4,	mapCols*32/4+selectX,	mapRows*32/4);
	
	context.beginPath();
	context.fillStyle = "#000000";
	context.font = "100px Century Gothic";
	context.fillText("Restart", selectX, mapRows*32/4*2-20);
	
	
	if(restartOn == 1){
		stopDrawButton();
		loadVal();
		loading();
		context.clearRect(0, 0, 1500, 600);
		startOpening();
	}
}
function startDrawButton(){
	startButton = setInterval("drawButton()", 1);
}
function stopDrawButton(){
	clearInterval(startButton);
}


//------------------------------------------------------------------------------

function loading(){

//mapLoad
tileSheet.addEventListener('load',	eventSheetLoaded);
tileSheet.src = "img/sheet.png";



function eventSheetLoaded(){
	sheetLoaded = 1;
	drawScreen();
}



for(var i=1; i<=5; i++){
	character[i] = new Image();
}
character[1].addEventListener('load',	eventMeLoaded,		false);
character[2].addEventListener('load',	eventEnemyLoaded,	false);
character[3].addEventListener('load',	eventFeedLoaded,	false);
character[4].addEventListener('load',	eventScpLoaded,		false);
character[5].addEventListener('load',	eventMagmaLoaded,	false);



character[1].src = "img/me.png";
character[2].src = "img/enemy.png";
character[3].src = "img/feed.png";
character[4].src = "img/scp.png";
character[5].src = "img/magma.png";


function eventMeLoaded(){
	meLoaded = 1;
	meDraw(me_x,	me_y);
}
function eventEnemyLoaded(){
	enemyLoaded = 1;
	enemyDraw(en_x,	en_y);
}
function eventFeedLoaded(){
	feedLoaded = 1;
	feedDraw(fe_x,	fe_y);
}
function eventScpLoaded(){
	scpLoaded = 1;
	scpDraw(sc_x,	sc_y);
}
function eventMagmaLoaded(){
	magmaLoaded = 1;
	magmaDraw(ma_x,	ma_y);
}


}


//------------------------------------------------------------------------------


function drawScreen(){
	for(var rowCtr=0; rowCtr<mapRows; rowCtr++){
		for(var colCtr=0; colCtr<mapCols; colCtr++){
			var tileId = tileMap[rowCtr][colCtr] + mapIndexOffset;
			var sourceX = (tileId % 8) * 32;
			var sourceY = Math.floor(tileId / 8) * 32;
			context.drawImage(tileSheet, sourceX, sourceY, 32, 32, colCtr*32, rowCtr*32, 32, 32);
		}
	}
}
function meDraw(x,y){
	context.drawImage(character[1], x, y);
}
function enemyDraw(x,y){
	context.drawImage(character[2], x, y);
}
function feedDraw(x,y){
	context.drawImage(character[3], x, y);
}
function scpDraw(x,y){
	context.drawImage(character[4], x, y);
}
function magmaDraw(x,y){
	context.drawImage(character[5], x, y);
}




function moveKey(){
	for(var i=0; i<4; i++){
		if(keyS[i] == 1){
			switch(i){
				case 0:
					me_x -= me_dx;
				break;
				case 1:
					me_y -= me_dy;
				break;
				case 2:
					me_x += me_dx;
				break;
				case 3:
					me_y += me_dy;
				break;
			}
		}
	}
}


function hitJudge(){
	var mapRow = mapRows - 2;
	var mapCol = mapCols - 2;
	if(me_x <= 32)			me_x = 32;		//wall
	if(me_x >= 32*mapCol)	me_x = 32*mapCol;
	if(me_y <= 32)			me_y = 32;
	if(me_y >= 32*mapRow)	me_y = 32*mapRow;
	
	if(en_x <= 32)			en_x = 32;		//wall
	if(en_x >= 32*mapCol)	en_x = 32*mapCol;
	if(en_y <= 32)			en_y = 32;
	if(en_y >= 32*mapRow)	en_y = 32*mapRow;
	
	if(fe_x <= 32)			fe_x = 32;		//wall
	if(fe_x >= 32*mapCol)	fe_x = 32*mapCol;
	if(fe_y <= 32)			fe_y = 32;
	if(fe_y >= 32*mapRow)	fe_y = 32*mapRow;
	
	if(sc_x <= 32)			sc_x = 32;		//wall
	if(sc_x >= 32*mapCol)	sc_x = 32*mapCol;
	if(sc_y <= 32)			sc_y = 32;
	if(sc_y >= 32*mapRow)	sc_y = 32*mapRow;
	
	if(ma_x <= 32)			ma_x = 32;		//wall
	if(ma_x >= 32*mapCol)	ma_x = 32*mapCol;
	if(ma_y <= 32)			ma_y = 32;
	if(ma_y >= 32*mapRow)	ma_y = 32*mapRow;
	
	if(mode == 1 || mode == 2 || mode == 4){
		if(Math.abs(me_x - en_x) < 32 && Math.abs(me_y - en_y) < 32) {	//enemytouchme
			
			ending();
		}
	}
	if(Math.abs(me_x - fe_x) < 32 && Math.abs(me_y - fe_y) < 32) {	//feedtouchme
		fe_x = NaN;	fe_y = NaN;
		point += 100;
		var fetimer = setTimeout("feedRevive()", 2000);
		
	}
	if(mode == 3 || mode == 4){		//
		if(Math.abs(me_x - sc_x) < 32 && Math.abs(me_y - sc_y) < 32) {	//scptouchme
			
			ending();
		}
		if(Math.abs(me_x - ma_x) < 32 && Math.abs(me_y - ma_y) < 32) {	//magmatouchme
			
			ending();
		}
	}
}


function feedRevive(){
	var mapRow = mapRows - 2;
	var mapCol = mapCols - 2;
	
	do{
		var x = Math.floor(Math.random()*mapRow + 1);
		var y = Math.floor(Math.random()*mapCol + 1);
		fe_x = x*32;
		fe_y = y*32;
	}while(Math.abs(me_x - fe_x) < 32*6 && Math.abs(me_y - fe_y) < 32*6)
}
function magmaRevive(){
	var mapRow = mapRows - 2;
	var mapCol = mapCols - 2;
	
	do{
		var x = Math.floor(Math.random()*mapRow + 1);
		var y = Math.floor(Math.random()*mapCol + 1);
		ma_x = x*32;
		ma_y = y*32;
	}while(Math.abs(me_x - ma_x) < 32*6 && Math.abs(me_y - ma_y) < 32*6)
}
function startMagma(){
	magmaTimer = setInterval("magmaRevive()", 2000);
}
function stopMagma(){
	clearInterval(magmaTimer);
}


function enemyAiChase(){
	var root = Math.sqrt((me_x - en_x)*(me_x - en_x) + (me_y - en_y)*(me_y - en_y));
	en_x += (me_x - en_x) / root * en_dx;
	en_y += (me_y - en_y) / root * en_dy;
}

function startAiChase(){
	aiChaseTimer = setInterval("enemyAiChase()", 100);
}
function stopAiChase(){
	clearInterval(aiChaseTimer);
}

function enemyAiInterceptor(){
	var root = Math.sqrt((me_x - sc_x)*(me_x - sc_x) + (me_y - sc_y)*(me_y - sc_y));
	var plus_x = 0;
	var plus_y = 0;
	for(var i=0; i<4; i++){
		if(keyS[i] == 1){
			switch(i){
				case 0:
					plus_x = -64*2;
				break;
				case 1:
					plus_y = -64*2;
				break;
				case 2:
					plus_x = 64*2;
				break;
				case 3:
					plus_y = 64*2;
				break;
			}
		}
	}
	sc_x += (me_x + plus_x - sc_x) / root * sc_dx;
	sc_y += (me_y + plus_y - sc_y) / root * sc_dy;
}

function startAiInterceptor(){
	aiInterceptorTimer = setInterval("enemyAiInterceptor()", 100);
}
function stopAiInterceptor(){
	clearInterval(aiInterceptorTimer);
}


function infoDraw(){
	var col = mapCols + 1;
	var row = mapRows + 1;
	context.beginPath();
	context.fillStyle = "#000000";
	context.font = "40px serif";
	context.fillText(point+"p", col*32, 100);
	switch(mode){
		case 1:
			context.fillText("practice", col*32, 50);
		break;
		case 2:
			context.fillText("normal", col*32, 50);
			context.fillText("enemy speed:"+en_dx,	0, row*32);
		break;
		case 3:
			context.fillText("hard", col*32, 50);
			context.fillText("enemy speed:"+sc_dx,	0, row*32);
		break;
		case 4:
			context.fillText("lunatic", col*32, 50);
			context.fillText("enemy speed:"+en_dx,	0, row*32);
		break;
	}
}


function plusD(){
	if(mode != 1){
		en_dx++;	en_dy++;
		sc_dx++;	sc_dy++;
	}
}
function startPlusD(){
	plusDTimer = setInterval("plusD()", 5000);
}
function stopPlusD(){
	clearInterval(plusDTimer);
}


//------------------------------------------------------------------------------


function main(){
	if(sheetLoaded == 1 && meLoaded == 1 && enemyLoaded == 1 && feedLoaded == 1){	//loadCheck

	context.clearRect(0, 0, 1500, 600);
	drawScreen();
	moveKey();
	hitJudge();
	meDraw(me_x,	me_y);
	if(mode == 1 || mode == 2 || mode == 4){
		enemyDraw(en_x,	en_y);
	}
	if(mode == 3 || mode == 4){
		scpDraw(sc_x,	sc_y);
	}
	feedDraw(fe_x,	fe_y);
	if(mode == 3 || mode == 4){
		magmaDraw(ma_x,	ma_y);
	}
	infoDraw();
	
	}
}

function startMain(){
	mainTimer = setInterval("main()", 1);
}

function stopMain(){
	clearInterval(mainTimer);
}

function debug(){
	}


var de = setTimeout("debug()", 5000);


//------------------------------------------------------------------------------

window.onmouseover = function(eventMo){
	var mouseXo = eventMo.pageX - cvs.offsetLeft;
	var mouseYo = eventMo.pageX - cvs.offsetTop;
	if(mouseXo >= selectX && mouseXo <= mapCols*32/2+selectX){
		if(mouseYo > 0 && mouseYo < mapRows*32/4){					//easy
		}
		if(mouseYo > mapRows*32/4 && mouseYo < mapRows*32/4*2){		//normal
		}
		if(mouseYo > mapRows*32/4*2 && mouseYo < mapRows*32/4*3){	//hard
		}
		if(mouseYo > mapRows*32/4*3 && mouseYo < mapRows*32){		//lunatic
		}
	}
}

window.onmousedown = function(eventMd){
	var mouseX = eventMd.pageX - cvs.offsetLeft;
	var mouseY = eventMd.pageY - cvs.offsetTop;
	if (selectTime == 1){
	if(mouseX >= selectX && mouseX <= mapCols*32/2+selectX){
		if(mouseY > 0 && mouseY < mapRows*32/4){					//easy
			mode = 1;
			
		}
		if(mouseY > mapRows*32/4 && mouseY < mapRows*32/4*2){		//normal
			mode = 2;
		}
		if(mouseY > mapRows*32/4*2 && mouseY < mapRows*32/4*3){	//hard
			mode = 3;
		}
		if(mouseY > mapRows*32/4*3 && mouseY < mapRows*32){		//lunatic
			mode = 4;
		}
	}
	}
	if (endingTime == 1){
		
		if(mouseX >= selectX && mouseX <= mapCols*32/2+selectX){
			if(mouseY > mapRows*32/4 && mouseY < mapRows*32/4*2){		//normal
				restartOn = 1;
			}
		}
	}
}


window.onkeydown = function (eventKd){		//key
	switch(eventKd.keyCode){
		case 37:
			keyS[0] = 1;
		break;
		case 38:
			keyS[1] = 1;
		break;
		case 39:
			keyS[2] = 1;
		break;
		case 40:
			keyS[3] = 1;
		break;
	}
}

window.onkeyup = function (eventKu){
	switch(eventKu.keyCode){
		case 37:
			keyS[0] = 0;
		break;
		case 38:
			keyS[1] = 0;
		break;
		case 39:
			keyS[2] = 0;
		break;
		case 40:
			keyS[3] = 0;
		break;
	}
}



//------------------------------------------------------------------------------
loadVal();
loading();
startOpening();
