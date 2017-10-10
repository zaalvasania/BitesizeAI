function Population(popMax,mutationRate,cities){
	this.popMax = popMax;
	this.mutRate = mutationRate;
	this.generation = 1;
	this.cities = cities;
	this.population = [];
	this.matingPool = [];
	this.p = 0;
	this.amt = 0;
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
		this.matingPool.length = 2000000;
		for(var i=0;i<this.population.length;i++){
			this.p = this.population[i].fitness/3.5;
			for(var j=0;j<this.p;j++){
				this.amt++;
				if(this.amt>this.matingPool.length){
					this.matingPool.push(this.population[i]);
				}else{
					this.matingPool[this.amt] = (this.population[i]);
				}
			}
		}
	}

	this.generateNewPop = function(){
		for(var a=0;a<this.population.length;a++){
			var i = floor(random(this.amt-1));
			var j = floor(random(this.amt-1));
			var child = this.matingPool[i].crossover(this.matingPool[j]);
			child.mutate(this.mutatRate);
			this.population[a] = child;
		}
		this.amt = 0;
		this.p = 0;
		this.matingPool = [];
		this.generation++;
	}
}