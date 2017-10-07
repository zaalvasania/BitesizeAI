function NeuralNet(inputNodes, hiddenNodes, outputNodes, wih, who){
	this.inputNodes = inputNodes;
	this.hiddenNodes = hiddenNodes;
	this.outputNodes = outputNodes;
	this.wih = wih;
	this.who = who;

	this.randn_bm = function() {
	    var u = 0, v = 0;
	    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	    while(v === 0) v = Math.random();
	    return Math.sqrt( -2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v );
	}

	this.generateRandomWeights = function(stdDev, rows, cols){
		var weightSet = [];
		for(var i=0;i<rows;i++){
			weightSet[i] = [];
			for(var j=0;j<cols;j++){
				weightSet[i][j] = this.randn_bm()*stdDev;
			}
		}
		return weightSet;
	}

	if(this.wih == null){
		this.wih = this.generateRandomWeights(Math.pow(this.hiddenNodes,-0.5),this.hiddenNodes,this.inputNodes);
	}

	if(this.who == null){
		this.who = this.generateRandomWeights(Math.pow(this.outputNodes,-0.5),this.outputNodes,this.hiddenNodes);
	}else{
		//console.log(who);
	}

	this.query = function(inputList){	//assumed input as row vector
		var inputs = transposeRow(inputList);
		var hiddenInputs = MatrixMult(this.wih,inputs);
		var hiddenOutputs = this.activationFunc(hiddenInputs);
		var finalInputs = MatrixMult(this.who,hiddenOutputs);
		return this.activationFunc(finalInputs);
	}

	this.activationFunc = function(input){
		var newInput = input;
		for(var i=0;i<input.length;i++){
			for(var j=0;j<input[i].length;j++){
				newInput[i][j] = 1/(1+Math.exp(-input[i][j]));
			}
		}
		return newInput;
	}

	this.unroll = function(){
		var j = [];
		var k = 0;
		for(var i=0;i<this.wih.length;i++){
			for(var j=0;j<this.wih[i].length;j++){
				j[k] = (this.wih[i][j]);
				k++;
			}
		}
		for(var i=0;i<this.who.length;i++){
			for(var j=0;j<this.who[i].length;j++){
				j[k] = (this.who[i][j]);
				k++;
			}
		}
		return j;
	}

	this.Roll = function(j){
		var k = 0;
		var p = [];
		for(var i=0;i<this.wih.length;i++){
			p[i]=[];
			for(var j=0;j<this.wih[i].length;j++){
				p[i][j] = j[k];
				k++;
			}
		}
		var t = this.WHORoll(j,k);
		return [p,t];
	}

	this.WHORoll = function(j,k){
		//var k = this.net.wih.length*this.net.wih[0].length;
		var p = [];
		for(var i=0;i<this.who.length;i++){
			p[i] = [];
			for(var j=0;j<this.who[i].length;j++){
				p[i][j] = j[k];
				k++
			}
		}
		return p;
	}
}