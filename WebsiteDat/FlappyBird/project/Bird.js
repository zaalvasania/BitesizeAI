function Bird(bird,wih,who,x,y,distAhead,toFloor,toCeiling){
	this.bird = bird;
	this.net = null;
	if(who == null && wih == null){
		this.net = new NeuralNet(3,25,2,null,null);
	}else{
		this.net = new NeuralNet(3,25,2,wih,who);
	}
	this.fitness = 0;
	this.x = x;
	this.y = y;
	this.distAhead = distAhead;
	this.toFloor = toFloor;
	this.ceiling = toCeiling;
	this.gravity = 9.81/55;
	this.vel = 0;
	this.jump = false;
	this.dead = false;
	this.jumpRate = 0;
	this.sinceLastJumped = 0;
	this.jumpHeight = -2;

		this.unroll = function(){
		var w = [];
		var k = 0;
		for(var i=0;i<this.net.wih.length;i++){
			for(var j=0;j<this.net.wih[i].length;j++){
				//console.log("Unroll function: "+this.net.wih[i][j]);
				w.push(this.net.wih[i][j]);
				k+=1;
			}
		}
		for(var p=0;p<this.net.who.length;p++){
			for(var q=0;q<this.net.who[p].length;q++){
				//console.log("Unroll function: "+this.net.who[p][q]);
				w.push(this.net.who[p][q]);
				//console.log("Unroll j[k]: "+d);
				k+=1;
			}
		}
		
		return w;
	}

	this.WIHRoll = function(r){
		var k = 0;
		var p = [];
		for(var i=0;i<this.net.wih.length;i++){
			p[i]=[];
			for(var j=0;j<this.net.wih[i].length;j++){
				p[i][j] = r[k];
				k++;
			}
		}
		return p;
	}

	this.WHORoll = function(r){
		var k = this.net.wih.length*this.net.wih[0].length;
		var p = [];
		for(var i=0;i<this.net.who.length;i++){
			p[i] = [];
			for(var j=0;j<this.net.who[i].length;j++){
				p[i][j] = r[k];
				k++
			}
		}
		return p;
	}

	this.crossover = function(Bird2){
		var j = [];
		var check = false;
		var midpoint = Math.floor(random(5,(this.net.inputNodes*this.net.hiddenNodes)+(this.net.hiddenNodes*this.net.outputNodes)-4));
		var unrolledWIHWHO = this.unroll();
		var unrolledWIHWHOPartner = Bird2.unroll();
		//this.unroll(Bird2.net.wih,Bird2.net.who);//Bird2.net.unroll();
		for(var i=0;i<(this.net.inputNodes*this.net.hiddenNodes)+(this.net.hiddenNodes*this.net.outputNodes);i++){
			if(i<=midpoint){
				j[i] = unrolledWIHWHO[i];
			}else{
				j[i] = unrolledWIHWHOPartner[i];
				//console.log("Bird 2: "+j[i]);
			}
		}
		var k = j;
		var wih = this.WIHRoll(k);
		var who = this.WHORoll(j);
		//var q = this.net.Roll(j);
		//return new Bird(bird,q[0],q[1],100,250,400,250,250);
		return new Bird(bird,wih,who,100,250,400,250,250);
	}

	this.mutate = function(mutRate){
		for(var i=0;i<this.net.wih.length;i++){
			for(var j=0;j<this.net.wih[i].length;j++){
				var n = random(0,1);
				if(n<mutRate){
					this.net.wih[i][j] = this.net.randn_bm();
				}
			}
		}
		for(var k=0;k<this.net.who.length;k++){
			for(var y=0;y<this.net.who[k].length;y++){
				var h = random(0,1);
				if(h<mutRate){
					this.net.who[k][y] = this.net.randn_bm();
				}
			}
		}
	}

	//call per frame
	this.display = function(){
		image(this.bird, this.x, this.y);
	}

	//No call
	this.toCeiling = function(pipes){
		for(var a=0;a<pipes.length;a++){
			if(((this.x+(this.bird.width*0.5))>(pipes[a].xLoc))&&((this.x+(this.bird.width*0.5))<(pipes[a].xLoc+pipes[a].imgDown.width))){
				return ((this.y-(pipes[a].yDownImg+pipes[a].imgDown.height)));
			}
		}
		return this.y;
	}

	//No call
	this.forwardCheck = function(pipes){
		var check = true;
		for(var i=0;i<pipes.length&&check;i++){
			//TOP PIPE
			if((this.y-10<(pipes[i].imgDown.height+pipes[i].yDownImg))&&(this.y>0)){
				check = false;
				return ((pipes[i].xLoc-(this.x+this.bird.width)));
			}
			if((this.y+10>pipes[i].yUpImg)&&(this.y<height-this.bird.height)){
				check = false;
				return ((pipes[i].xLoc-(this.x+this.bird.width)));
			}
		}
		return 400;
	}

	this.getNextandNext = function(pipes){
		var temp = [];
		var check = true;
		for(var p=0;p<pipes.length&&check;p++){
			if(pipes[p].xLoc>this.x){
				temp.push(pipes[p].yDownImg+pipes[p].imgDown.height+(75));
				if((p+2)>pipes.length){
					temp.push(temp[0]);
				}else{
					temp.push(pipes[p+1].yDownImg+pipes[p+1].imgDown.height+(75));
					//console.log(pipes[p+1].i*0.5);
				}
				check = false;
			}
		}
		return temp;
	}


	//call per frame
	this.jumpUpCheck = function(pipes,i){
		this.distAhead = this.forwardCheck(pipes);
		//var yNext = this.getNextandNext(pipes);
		this.ceiling = this.toCeiling(pipes);
		if(this.ceiling == this.y){
			this.toFloor = height - (this.ceiling);
		}else{
			this.toFloor = i-(this.ceiling)-this.bird.height;
		}
		var query = this.net.query([this.distAhead, this.ceiling, this.toFloor])
		//var query = this.net.query([yNext[0],1,this.distAhead,this.ceiling,this.toFloor]);
		if(query[0][0]>0.5){
			this.jump = true;
			this.jumpHeight = map(query[1][0],0,1,2,5);
		}else{
			this.jump = false;
		}
		this.sinceLastJumped++;
		//console.log(this.sinceLastJumped);
	}

	//call per frame
	this.updateLocation = function(){
		this.vel+=this.gravity;
		if(this.jump&&(this.sinceLastJumped>13)){
			this.sinceLastJumped=0;
			this.vel = -this.jumpHeight;
			//this.vel = -2; // JUMP VELOCITY
			//console.log("Jumped");
		}
		this.y +=this.vel;
		this.fitness+=1;
	}

	//call per frame
	this.deadCheck = function(pipes){

		//Top & Bottom
		if(this.y<-this.bird.height||this.y>(height)){
			this.dead = true;
		}
		var check = true;
		for(var i=0;i<pipes.length&&check;i++){
			//console.log("Reached: "+pipes[i].xLoc);
			//console.log(this.x);
			if(((this.x+this.bird.width-10)>=pipes[i].xLoc) && ((this.x+this.bird.width-10)<(pipes[i].xLoc+pipes[i].imgDown.width+30))){
				//console.log(this.x);
				if(((this.y+10)<(pipes[i].imgDown.height+pipes[i].yDownImg))){
					//console.log("YUp up pipe: "+(pipes[i].imgDown.height+pipes[i].yDownImg));
					//console.log("y+height up pipe: "+(this.y));
					this.dead = true;
					//console.log("Dead");
					check = false;
				}

				if((this.y+this.bird.height-10)>(pipes[i].yUpImg)){
					this.dead = true;
					//console.log("Dead");
					check = false;
				}
			}
		}
	}
}