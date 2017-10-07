function Pipes(imgDown, imgUp, xLoc, yUpImg, yDownImg, i){
	this.imgDown = imgDown;
	this.imgUp = imgUp;
	this.xLoc = xLoc;
	this.yUpImg = yUpImg;
	this.yDownImg = yDownImg;
	this.i=i;

	this.display = function(){
		image(this.imgDown,this.xLoc,this.yDownImg);
		image(this.imgUp, this.xLoc, this.yUpImg);
	}
}