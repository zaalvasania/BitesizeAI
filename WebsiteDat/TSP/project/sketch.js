var cities = [];
var path = [];
var circleRad=10;
var noOfCities = 12;
var population,currentBest;
var count = 0;

function setup(){
	createCanvas(500,500);
	background(255);
	generateCityLocations();
	drawEllipsesAndPaths();
	var popMax = 20;
	var mutRate = 0.02;
	population = new Population(popMax,mutRate,cities);
}

function draw(){
	var currentBestTemp = currentBest;
	var genMaxFit = population.maxFitness();
	if(currentBest == null){
		currentBest = genMaxFit;
	}else{
		if(currentBest.fitness<genMaxFit.fitness){
			currentBest = genMaxFit;
		}
	}
	if(currentBest!=currentBestTemp){
		drawEllipsesAndPaths();
	}
	population.naturalSelection();
	population.generateNewPop();
	console.log("Maximum Fitness: "+currentBest.realFitness());
	console.log("Generation: "+population.generation);
	if(currentBest == genMaxFit.fitness){
		console.log("checkcheckheck");
		count++;
	}else{
		count = 0;
	}
}

function drawEllipsesAndPaths(){
	background(255);
	for(var i=0;i<cities.length;i++){
		ellipse(cities[i].x,cities[i].y,(circleRad*2),(circleRad*2));
	}
	if(currentBest!=null){
		console.log(currentBest.path);
		for(var j=0;j<currentBest.path.length-1;j++){
			line(cities[currentBest.path[j]].x,cities[currentBest.path[j]].y,cities[currentBest.path[j+1]].x,cities[currentBest.path[j+1]].y);
		}
	}
}

function generateCityLocations(){
	for(var i=0;i<noOfCities;i++){
		cities.push(createVector(random(10,width-10),random(10,height-10)));
	}
}