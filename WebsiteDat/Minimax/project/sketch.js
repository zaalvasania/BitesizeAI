var squareWidth = 0;
var whoseTurn = false
var board = [];
var notDone = true;
var array = [];
var O = 4;
var X = 9;
var N = 1;

function setup(){
	createCanvas(400,400);
	resetCreate();
	translate(20,20);
}

function resetCreate(){
	background(255);
	for(var i=0;i<3;i++){
		board[i] = [];
		for(var j=0;j<3;j++){
			board[i][j] = 1;
		}
	}
	squareWidth = (width/3);
	makeBoard();
}

function makeBoard(){
	line(0,(height/3),width,(height/3));
	line(0,(2*height/3),width,(2*height/3));
	line((width/3),0,(width/3),height);
	line((2*width/3),0,(2*width/3),height);
	array = [createVector((height/3),(width/3)),
  		   createVector((height/3),(2*width/3)),
  		   createVector((height/3),width),
  		   createVector((2*height/3),(width/3)),
  		   createVector((2*height/3),(2*width/3)),
  		   createVector((2*height/3),width),
  		   createVector(height,(width/3)),
  		   createVector(height,(2*width/3)),
  		   createVector(height,width)];
}

function draw(){
	var i = checkDone();
	if(i>=0){
		textSize(30);
		fill(0);
		if(i==0){
			text("Draw!",155,height/2);
	    }else if(i==1){
	    	text("Computer (X) wins!",77,height/2);
	    }else{
	    	text("Player (O) wins!",90,height/2);
	    }
	    textSize(20);
	    text("Click screen to restart",100,1.85*height/3);
	    whoseTurn=false;
	    notDone = false;
	    noLoop();
	}
	if(whoseTurn){
		var state = recursion(new State(board,true,0),true);
	    board = state.bestState.board;
	    drawBoard(board);
	    whoseTurn = !whoseTurn;
	}
}

function drawBoard(boardState){
	for(var i=0;i<boardState.length;i++){
	  for(var j=0;j<boardState[i].length;j++){
	    if(boardState[i][j]==4){
	      drawCircle(array[(i*3)+j]);
	    }else if(boardState[i][j] == 9){
	      drawX(array[(i*3)+j]);
	    }
      }
    }
}

function checkDone(){
	//rows & cols
	for(var i=0;i<3;i++){
      var rows = board[i][0]+board[i][1]+board[i][2];
      var cols = board[0][i]+board[1][i]+board[2][i];
      
      if(rows == 12||cols==12){
        return 2;
      }
      if(rows==27 || cols == 27){
        return 1;
      }
    }
    //diagonals
    var diagonal1 = board[0][0]+board[1][1]+board[2][2];
    var diagonal2 = board[0][2]+board[1][1]+board[2][0];
    if(diagonal1 == 12||diagonal2 == 12){
      return 2;
    }
    if(diagonal1 == 27|| diagonal2 == 27){
      return 1;
    }

    for(var i=0;i<board.length;i++){
	    for(var j=0;j<board[i].length;j++){
	      if(board[i][j]==1){
	        return -1;
	      }
	    }
  	}
  	return 0;
}

function mouseClicked(){
	if(!whoseTurn&&notDone){
    for(var i=0;i<array.length;i++){
      if((mouseX>array[i].x-squareWidth)&&(mouseX<=array[i].x)){
        if((mouseY>array[i].y-squareWidth)&&(mouseY<=array[i].y)){
          if(board[(i-(i%3))/3][i%3] == 1){
            drawCircle(array[i]);
            board[(i-(i%3))/3][i%3] = 4;
            whoseTurn = !whoseTurn;
            break;
          }
        }
      }
    }
  }
  if(!notDone){
  	reset();
  }
}

function reset(){
	squareWidth = 0;
	whoseTurn = false
	board = [];
	notDone = true;
	array = [];
	resetCreate();
	loop();
}

function drawCircle(v){
	fill(255);
	ellipse(v.x-(squareWidth/2),v.y-(squareWidth/2),(2*squareWidth/3),(2*squareWidth/3));
}

function drawX(v){
	line(v.x-squareWidth,v.y-squareWidth,v.x,v.y);
	line(v.x,v.y-squareWidth,v.x-squareWidth,v.y);
}

function recursion(root, turn){
	var x = root.returnStatus();
	if(x>0){
		if(x==1){
			root.score = 0;
        	return root;
		}else{
			if(turn==false){
				root.score = 10;
				return root;
			}else{
				root.score = -10;
				return root;
			}
		}
	}else{
		var newList = root.returnAvailableStates();
		for(var i=0;i<newList.length;i++){
			var arr = [];
			for(var p=0;p<3;p++){
				arr[p] = [];
				for(var q=0;q<3;q++){
					arr[p][q] = root.board[p][q];
				}
			}
			if(turn==true){
				arr[newList[i][0]][newList[i][1]] = 9;
			}else{
				arr[newList[i][0]][newList[i][1]] = 4;
			}
			root.gameList.push(recursion(new State(arr,!turn,0),!turn));
		}
		root.getMinimax();
		return root;
	}
}