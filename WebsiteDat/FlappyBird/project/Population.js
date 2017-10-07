function Population(bird,popMax,mutationRate){
	this.bird = bird;
	this.popMax = popMax;
	this.mutationRate = mutationRate;
	this.generation = 1;
	this.population = [];
	this.matingPool = [];
	for(var i=0;i<popMax;i++){
		this.population.push(new Bird(bird,null,null,100,250,400,250,250))
	}

	this.naturalSelection = function(){
		for(var i=0;i<this.population.length;i++){
			var j = 10*this.population[i].fitness;
			for(var p=0;p<j;p++){
				this.matingPool.push(this.population[i]);
			}
		}
	}

	this.generateNewPopulation = function(){
		for(var a=0;a<this.popMax;a++){
			var g = Math.floor(random(this.matingPool.length));
			var p = Math.floor(random(this.matingPool.length));
			var bird1 = this.matingPool[g];
			var bird2 = this.matingPool[p];
			var offspring = bird1.crossover(bird2);
			offspring.mutate(this.mutationRate);
			this.population[a] = offspring;
		}
		this.matingPool = [];
		this.generation++;
	}
}