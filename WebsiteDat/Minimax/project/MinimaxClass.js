function State(presetBoard,turn,score){
	this.board = presetBoard;
	this.myTurn = turn;
	this.score = score;
	this.gameList = [];
	this.bestState = null;

	this.getMinimax = function(){
		var a;
		if(this.myTurn){
			a = -20;
		}else{
			a = 20;
		}
		for(var i=0;i<this.gameList.length;i++){
			if(this.myTurn){
				if(this.gameList[i].score>a){
					a = this.gameList[i].score;
					this.bestState = this.gameList[i];
				}
			}else{
				if(this.gameList[i].score<a){
					a = this.gameList[i].score;
					this.bestState = this.gameList[i];
				}
			}
		}
		this.score = a;
	}

	this.returnAvailableStates = function(){
		var available = [];
		for(var i=0;i<3;i++){
			for(var j=0;j<3;j++){
				if(this.board[i][j]==1){
					var p = [i,j];
					available.push(p);
				}
			}
		}
		return available;
	}

	this.returnStatus = function(){
		for(var i=0;i<3;i++){
	      var rows = this.board[i][0]+this.board[i][1]+this.board[i][2];
	      var cols = this.board[0][i]+this.board[1][i]+this.board[2][i];
	      
	      if(rows == 12||rows == 27){
	        return 2;
	      }
	      if(cols == 12 || cols == 27){
	        return 2;
	      }
	    }
	    //diagonals
	    var diagonal1 = this.board[0][0]+this.board[1][1]+this.board[2][2];
	    var diagonal2 = this.board[0][2]+this.board[1][1]+this.board[2][0];
	    if(diagonal1 == 12||diagonal1 == 27){
	      return 2;
	    }
	    if(diagonal2 == 12|| diagonal2 == 27){
	      return 2;
	    }
	    var count = 0;
	    for(var p=0;p<3;p++){
	    	for(var q=0;q<3;q++){
	    		if(this.board[p][q]!=1){
	    			count+=1;
	    		}
	    	}
	    }
	    if(count==9){
      		return 1;
    	}
    	return 0;
	}
}