var facingUp,facingDown,bird;
var pipes = [];
var gap = 150;
var pipeMin = 40;
var gapBetween = 200;
var current = 0;
var popu;
var maxFit = 0;

function preload(){
	facingUp = loadImage("assets/obstacle_top.png");
	facingDown = loadImage("assets/obstacle_top-2.png");
	bird = loadImage("assets/favicon.png");
}

function setup(){
	createCanvas(500, 500);
	background(171,216,246);
	frameRate(55);
	facingUp.resize(facingUp.width/3,height);
	facingDown.resize(facingDown.width/3,height);
	bird.resize(bird.width/3,bird.height/3);
	popu = new Population(bird,200,0.05);
	generateNew();
	console.log(popu.generation);
}

function draw(){
	pipeMovement();
	var k = birdsMovement();
	repaintEv(k);
	if(k == popu.population.length){
		popu.naturalSelection();
		popu.generateNewPopulation();
		//console.log("Population length:"+pop.population.length);
		console.log(popu.generation);
		pipes = [];
		current = 0;
		generateNew();
	}
}

function birdsMovement(){
	var k=0;
	for(var a=0;a<popu.population.length;a++){
		if(!popu.population[a].dead){
			popu.population[a].jumpUpCheck(pipes,gap);
			popu.population[a].updateLocation();
			popu.population[a].deadCheck(pipes);
		}else{
			k++;
		}
	}
	return k;
}

function pipeMovement(){
	if(current<gapBetween){
		moveAll();
		current++;
	}else{
		generateNew();
		moveAll();
		current=0;
	}
}

function generateNew(){
	var i = random(pipeMin,height-(pipeMin+gap));
	var tempFacingDown = facingDown;
	var yDown = -tempFacingDown.height+i;
	var tempFacingUp = facingUp;
	var yUp = (i+gap);
	var p = new Pipes(tempFacingDown,tempFacingUp,width,yUp,yDown,i);
	pipes.push(p);
	//console.log(pipes.length);
	p.display();
}

function repaintEv(k){
	var e = popu.population.length-k;
	background(171,216,246);
	for(var i=0;i<pipes.length;i++){
		pipes[i].display();
	}
	for(var j=0;j<popu.population.length;j++){
		if(!popu.population[j].dead){
			popu.population[j].display();
		}
	}
	var r = getMaxFitness();
	text("Fitness: "+r,330,490);
	text("Still Alive: "+e,330,470);
	text("Generation: "+popu.generation,330,450);
	text("Overall Max Fitness: "+getMax(r),330,430);
}

function getMax(r){
	if(r>maxFit){
		maxFit = r;
	}
	return maxFit;
}

function getMaxFitness(){
	var b=-1;
	//var maxFit = null;
	for(var a=0;a<popu.population.length;a++){
		if(popu.population[a].fitness>b){
			b = popu.population[a].fitness;
			//maxFit = pop.population[a];
		}
	}
	return b;
}

function moveAll(){
	for(var i=0;i<pipes.length;i++){
		pipes[i].xLoc-=1;
	}
	check();
}

function check(){
	//console.log(pipes.length);
	for(var i=0;i<pipes.length;i++){
		if(pipes[i].xLoc<-pipes[i].imgUp.width){
			pipes.splice(i,1);
		}
	}
}
