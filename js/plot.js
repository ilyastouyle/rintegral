$(document).ready(function(){
	var n = 10, a = -10, b = 10, d = 0, choice = 0;
	subdivision = new Array();
	var canvas = document.getElementById("graph");
	var context = canvas.getContext("2d");
	context.strokeStyle="#FFFFFF";
	function drawYAxis(x){
		context.moveTo(x, 0);
		context.lineTo(x - 5, 12);
		context.moveTo(x, 0);
		context.lineTo(x + 5, 12);
		context.moveTo(x, 0);
		context.lineTo(x, 420);
		context.stroke();
	}
	function drawXAxis(y){
		context.moveTo(0, y);
		context.lineTo(850, y);
		context.moveTo(850, y);
		context.lineTo(838, y - 5);
		context.moveTo(850, y);
		context.lineTo(838, y + 5);
		context.stroke();
	}
	function vdash(x, y, height){
		context.moveTo(x, y);
		context.lineTo(x, y+height);
		context.moveTo(x, y);
		context.lineTo(x, y-height);
	}
	function hdash(x, y, width){
		context.moveTo(x, y);
		context.lineTo(x+width, y);
		context.moveTo(x, y);
		context.lineTo(x-width, y);
	}
	function subdivide(a, b, n, table){
		for(i=0; i<=n; i++){
			table[i] = parseFloat((a + i*(b-a)/n).toPrecision(12)); 
		}
	}

	function xstep(a, b){
		d = 0;
		if((Math.abs(a) <= 1 && Math.abs(a) >= Math.abs(b)) || (Math.abs(b) <= 1 && Math.abs(a) <= Math.abs(b))){
			return 0.05;
		}
		if(Math.abs(a) > Math.abs(b)){
			while(Math.abs(a) > 2*d){
				d++;
			}
			return d/10;
		}
		else{
			while(Math.abs(b) > 2*d){
				d++;
			}
			return d/10;
		}
	}
	function ystep(min, max){
		d = 0;
		if((Math.abs(min) <= 1 && Math.abs(min) >= Math.abs(max)) || (Math.abs(max) <= 1 && Math.abs(min) <= Math.abs(max))){
			return 0.1;
		}
		else{
			if(Math.abs(min) > Math.abs(max)){
				if(Math.abs(min) <= Math.exp(18))
				{
					while(Math.abs(min) > 2*d){
						d++;
					}
					console.log("2d = " + 2*d);
					return d/5;
				}
				else{
					return (Math.abs(min))/17;
				}
			}
			else{
				if(Math.abs(max) <= Math.exp(18)){
					while((2*d < Math.abs(max))){
						d++;
					}
					console.log("2d = " + 2*d);
					return d/5;
				}
				else{
					return (Math.abs(max))/17;
				}
			}
		}
	}
	function drawOnX(x, xstep){
		context.beginPath();
		for(var i = 0; i <= 21; i++){
			vdash(x + 19*i, 210, 5);
			if(i != 0 && i%2 == 0){
				if(xstep >= 50){
					if(xstep >= 100){
						if(xstep >= 5000){
							context.fillText((i*xstep).toFixed(1), x - 15 + (19*i), 224, 34);	
						}
						else{
							context.fillText((i*xstep).toFixed(1), x - 14 + (19*i), 224, 33);
						}
					}
					else{
						context.fillText((i*xstep).toFixed(1), x - 10 + (19*i), 224, 27);
					}
				}
				else{
					context.fillText((i*xstep).toFixed(1), x - 7 + (19*i), 224, 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnY(y, ystep){
		context.beginPath();
		if(ystep < (Math.exp(15))){
			for(var i = 0; i <= 10; i++){
				hdash(425, y - 19*i, 5);
				if(i != 0 && i%2 ==0){
					context.fillText((i*ystep).toFixed(1), 433, y + 2 - (19*i), 22);
				}
			}
		}
		else{
			for(var i = 0; i <= 10; i++){
				hdash(425, y - 19*i, 5);
				if(i == 10){
					context.fillText("\u221E", 433, y + 2 - (19*i), 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnMinusX(x, xstep){
		context.beginPath();
		for(var i = 1; i <= 21; i++){
			vdash(x - 19*i, 210, 5);
			if(i != 0 && i%2 == 0){
				if(xstep >= 50){
					if(xstep >= 100){
						if(xstep >= 5000){
							context.fillText("-" + (i*xstep).toFixed(1), x - 16 - (19*i), 224, 34);	
						}
						else{
							context.fillText("-" + (i*xstep).toFixed(1), x - 15 - (19*i), 224, 33);
						}
					}
					else{
						context.fillText("-" + (i*xstep).toFixed(1), x - 12 - (19*i), 224, 27);
					}
				}
				else{
					context.fillText("-" + (i*xstep).toFixed(1), x - 12 - (19*i), 224, 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnMinusY(y, ystep){
		context.beginPath();
		if(ystep != Infinity){
			for(var i = 1; i<=10; i++){
				hdash(425, y + 19*i, 5);
				if(i%2 == 0){
					context.fillText(-(i*ystep).toFixed(1), 433, y + (19*i), 22);
				}
			}
		}
		else{

		}
		context.stroke();
	}
	//Computes the coordinates for a given point p
	function Xcoord(p, xstep){
		if(p > 0){
			return 425 + 19*(p/xstep);
		}
		else{
			return 425 - 19*(Math.abs(p)/xstep);
		}
	}
	function Ycoord(p, ystep){
		if(p > 0){	
			return 210 - (19*(p/ystep));
		}
		else{
			return 210 + (19*(Math.abs(p)/ystep));	
		}
	}
	//Returns the maximum on a range of values
	function Maximum(values){
		var max;
		max = 0;
		for(var i = 0; i < values.length; i++){
			if(max < values[i]){
				max = values[i];
			}
		}
		return max.toFixed(1);
	}
	//Returns the minimum on a range of values
	function Minimum(values){
		var min;
		min = 0;
		for(var i = 0; i < values.length; i++){
			if(min > values[i]){
				min = values[i];
			}
		}
		return min.toFixed(1);
	}
	function drawRect(x, y, height, width){
		context.moveTo(x, y);
		context.lineTo(x, y-height);
		context.lineTo(x + width, y-height);
		context.lineTo(x + width, y);
		context.lineTo(x, y);	
	}
	//For drawing the riemann rectangles
	function drawRiemann(a, b, n, funct, xstep, ystep){
		subdivide(a, b, n, subdivision);
		context.beginPath();
		context.strokeStyle = "#F89406";
		for(var i = 0; i < subdivision.length - 1; i++){
			drawRect(Xcoord(subdivision[i], xstep), 210, 210 - Ycoord(funct((subdivision[i] + subdivision[i+1])/2), ystep), Xcoord(subdivision[i+1], xstep) - Xcoord(subdivision[i], xstep));
		}
		context.stroke();
	}
	//Takes the width, of the line to draw with, the table of values and their images
	function drawCurve(width, values, images, xstep, ystep){
		context.beginPath();
		context.moveTo(425, 210);
		context.lineWidth = width;
		if(ystep < Math.exp(12)){
			for(var i = 0; i <= values.length; i++){
				context.moveTo(Xcoord(values[i], xstep), Ycoord(images[i], ystep));
				context.lineTo(Xcoord(values[i+1], xstep), Ycoord(images[i+1], ystep));
			}
		}
		else{
			for(var i = 0; i <= values.length; i++){
				context.moveTo(Xcoord(values[i], xstep), Ycoord(images[i], ystep));
				context.lineTo(Xcoord(values[i+1], xstep), Ycoord(images[i+1], ystep));
			}
		}
		context.stroke();
		context.lineWidth = 1;
	}
	context.lineWidth = 1;
	context.font = "11px sans-serif";
	context.fillStyle = "white";
	context.strokeStyle = "white";
	context.beginPath();
	var val = [], im = [];
	var xs, ys;
	$("a#plot").click(function(){
		context.clearRect(0, 0, 850, 420);
		context.beginPath();		
		a = eval($("input#a").val());
		b = eval($("input#b").val());
		n = eval($("input#n").val());
		console.log(a);
		subdivide(a, b, 9999, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval($("input#function").val());
		}	
		xs = xstep(a, b);
		ys = ystep(Minimum(im), Maximum(im));
		drawXAxis(210);
		drawYAxis(425);
		drawOnX(425, xs);
		drawOnY(210, ys);
		drawOnMinusX(425, xs);
		drawOnMinusY(210 ,ys);
		drawCurve(2, val, im, xs, ys);
		drawRiemann(a, b, n, function(x){
			return eval($("input#function").val());
		}, xs, ys);
		context.lineWidth = 1;
		context.stroke();
		context.closePath();
	});
});
//Regex for replacing powers with equivalent in js
//"(x+2)^2".replace(/(\(.+\))\^(\(.+\))/g, function(match, p1, p2, offset, string){return "Math.pow("+p1+", "+p2+")"; })