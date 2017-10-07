function Population(popMax,mutationRate,cities){
	this.popMax = popMax;
	this.mutRate = mutationRate;
	this.generation = 1;
	this.cities = cities;
	this.population = [];
	this.matingPool = [];
	for(var i=0;i<this.popMax;i++){
		this.population.push(new Gene(this.cities,null));
		this.population[i].getFitness();
	}

	this.maxFitness = function(){
		var j = -1;
		var index = 0;
		for(var i=0;i<this.population.length;i++){
			this.population[i].getFitness();
			if(this.population[i].fitness>j){
				j=this.population[i].fitness;
				index = i;
			}
		}
		return this.population[index];
	}

	this.naturalSelection = function(){
		for(var i=0;i<this.population.length;i++){
			var p = this.population[i].fitness;
			for(var j=0;j<p;j++){
				this.matingPool.push(this.population[i]);
			}
		}
	}

	this.generateNewPop = function(){
		for(var a=0;a<this.population.length;a++){
			var i = floor(random(this.matingPool.length));
			var j = floor(random(this.matingPool.length));
			var child = this.matingPool[i].crossover(this.matingPool[j]);
			child.mutate(this.mutatRate);
			this.population[a] = child;
		}
		matingPool = [];
		this.generation++;
	}
}