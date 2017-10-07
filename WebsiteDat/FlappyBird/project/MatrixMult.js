function MatrixMult(a,b){
	var p = [];
	for(var i=0;i<a.length;i++){
		p[i] = [];
		for(var j=0;j<b[0].length;j++){
			p[i][j] = getVal(a[i],swap(b,j));
		}
	}
	return p;
}

function getVal(a,b){
	var k=0;

	for(var i=0;i<a.length;i++){
		k+=a[i]*b[i];
	}
	return k;
}

function swap(b,k){
	var j = [];
	for(var i=0;i<b.length;i++){
		j[i] = b[i][k];
	}
	return j;
}

function transpose(a){
	var j=[];
	for(var i=0;i<a[0].length;i++){
		j[i]=[];
		for(var j=0;j<a.length;j++){
			j[i][j] = a[j][i];
		}
	}
	return j;
}

function transposeRow(a){
	var j=[];
	for(var i=0;i<a.length;i++){
		j[i]=[a[i]];
	}
	return j;
}