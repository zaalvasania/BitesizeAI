function Gene(cities,path){
	this.cities = cities;
	this.path = path;
	this.fitness = 0;

	this.findRoute = function(){
		var path = [];
		var count = 0;
		var p;
		//TO - DO: Implement the more efficient method
		while(count<this.cities.length){
			console.log(count);
			p =floor(random(cities.length));
			if(!this.addedAlr(p,path)){
				path.push(p);
				count++;
			}
		}
		return path;
	}

	this.addedAlr = function(p,path){
		for(var i=0;i<path.length;i++){
			if(path[i]==p){
				return true;
			}
		}
		return false;
	}


	if(this.path==null){
		this.path = this.findRoute();
	}

	this.realFitness = function(){
		var totalDist = 0;
		for(var i=0;i<this.path.length-1;i++){
			totalDist += Math.sqrt(Math.pow(this.cities[this.path[i]].x-this.cities[this.path[i+1]].x,2)+Math.pow(this.cities[this.path[i]].y-this.cities[this.path[i+1]].y,2));
		}
		return totalDist;
	}

	this.getFitness = function(){
		var totalDist = this.realFitness();
		var fit = map(1/totalDist,0,0.1,1,10000);
		//console.log("Inverse scaled fitness:"+fit);
		//console.log("Scaled twice fitness:"+10*floor(fit));
		this.fitness = floor(1000*fit);
	}

	this.crossover = function(gene2){
		var length = floor(random(1,this.path.length/3));
		var startingPoint = floor(random(0,this.path.length-(this.path.length/3)));
		var pathNew = [];
		var done = [];
		var nextGene = [];
		var count = 0;
		for(var i=startingPoint;i<startingPoint+length;i++){
			pathNew[i] = this.path[i];
			done[count] = this.path[i];
			count++;
		}
		for(var j=0;j<gene2.path.length;j++){
			if(!this.alrFilled(gene2.path[j],done)){
				nextGene.push(gene2.path[j]);
			}
		}
		for(var p=0;p<startingPoint;p++){
			pathNew[p] = nextGene[p];
		}
		var q = startingPoint;
		for(var g=startingPoint+length;g<this.path.length;g++){
			pathNew[g] = nextGene[q];
			q++;
		}
		return new Gene(cities,pathNew);
	}

	this.alrFilled = function(j,done){
		for(var i=0;i<done.length;i++){
			if(j==done[i]){
				return true;
			}
		}
		return false;
	}

	//Swapping cities in list
	this.mutate = function(mutateRate){
		for(var i=0;i<this.path.length;i++){
			for(var k=0;k<this.path.length;k++){
				
				var rand = random(0,1);
				if((k!=i)&&(mutateRate>rand)){
					var temp = this.path[k];
					this.path[k] = this.path[i];
					this.path[i] = temp;
				}
			}
		}
	}
}