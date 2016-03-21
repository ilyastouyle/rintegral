$(document).ready(function(){
	var n = 10, a = -10, b = 10, p = 1, d = 0, c = 0, e = 0, txs = 0, tys = 0;
	var rectanglecolor;
	var curvecolor;
	var curvewidth;
	var rectanglewidth;
	var origin = {x: 425, y: 210};
	var expression;
	subdivision = new Array();
	var canvas = document.getElementById("graph");
	var context = canvas.getContext("2d");
	context.strokeStyle="#FFFFFF";
	if($.cookie('curvewidth') == undefined){
		curvewidth = 3, rectanglewidth = 2, curvecolor = "#F9BF3B", rectanglecolor = "#F9BF3B"; 
		$.cookie('curvewidth', curvewidth, {expires: 365});
		$.cookie('rectanglewidth', rectanglewidth, {expires: 365});
		$.cookie('curvecolor', curvecolor, {expires: 365});
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	}
	else{
		curvewidth = parseInt($.cookie('curvewidth'));
		rectanglewidth = parseInt($.cookie('rectanglewidth'));
		curvecolor = $.cookie('curvecolor');
		rectanglecolor = $.cookie('rectanglecolor');
	}
	switch(curvewidth){
		case 2:
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.verythin").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.verythin").siblings(".thickness").removeClass("selected");
			break;
		case 3: 
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thin").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thin").siblings(".thickness").removeClass("selected");
			break;
		case 4:
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.regular").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.regular").siblings(".thickness").removeClass("selected");
			break;
		case 5:
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thick").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thick").siblings(".thickness").removeClass("selected");
			break;
	}
	switch(curvecolor){
		case "#000000":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").siblings(".color").removeClass("selected");
			break;
		case "#F22613":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").siblings(".color").removeClass("selected");
			break;
		case "#2C3E50":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.madison").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.madison").siblings(".color").removeClass("selected");
			break;
		case "#26A65B":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.eucalyptus").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.eucalyptus").siblings(".color").removeClass("selected");
			break;
		case "#F9690E":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.ecstasy").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.ecstasy").siblings(".color").removeClass("selected");
			break;
		case "#F9BF3B":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.sandstorm").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.sandstorm").siblings(".color").removeClass("selected");
			break;
	} 
	switch(rectanglewidth){
		case 1:
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.verythin").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.verythin").siblings(".thickness").removeClass("selected");
			break;
		case 2: 
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thin").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thin").siblings(".thickness").removeClass("selected");
			break;
		case 3:
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.regular").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.regular").siblings(".thickness").removeClass("selected");
			break;
		case 4:
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thick").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thick").siblings(".thickness").removeClass("selected");
			break;
	}
	switch(rectanglecolor){
		case "#000000":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.black").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.black").siblings(".color").removeClass("selected");
			break;
		case "#F22613":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").siblings(".color").removeClass("selected");
			break;
		case "#2C3E50":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.madison").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.madison").siblings(".color").removeClass("selected");
			break;
		case "#26A65B":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.eucalyptus").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.eucalyptus").siblings(".color").removeClass("selected");
			break;
		case "#F9690E":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.ecstasy").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.ecstasy").siblings(".color").removeClass("selected");
			break;
		case "#F9BF3B":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.sandstorm").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.sandstorm").siblings(".color").removeClass("selected");
			break;
	}
	function drawYAxis(x){
		context.beginPath();
		context.strokeStyle="#FFFFFF";
		context.lineWidth = 2;
		context.moveTo(x, 0);
		context.lineTo(x - 5, 12);
		context.moveTo(x, 0);
		context.lineTo(x + 5, 12);
		context.moveTo(x, 0);
		context.lineTo(x, 420);
		context.stroke();
		context.lineWidth = 1;
		context.stroke();
	}
	function drawXAxis(y){
		context.beginPath();
		context.strokeStyle="#FFFFFF";
		context.lineWidth = 2;
		context.moveTo(0, y);
		context.lineTo(850, y);
		context.moveTo(850, y);
		context.lineTo(838, y - 5);
		context.moveTo(850, y);
		context.lineTo(838, y + 5);
		context.stroke();
		context.lineWidth = 1;
		context.stroke();
	}
	function vdash(x, y, height){
		context.lineWidth = 2;
		context.moveTo(x, y);
		context.lineTo(x, y+height);
		context.moveTo(x, y);
		context.lineTo(x, y-height);
		context.stroke();
		context.lineWidth = 1;
	}
	function hdash(x, y, width){
		context.lineWidth = 2;
		context.moveTo(x, y);
		context.lineTo(x+width, y);
		context.moveTo(x, y);
		context.lineTo(x-width, y);
		context.stroke();
		context.lineWidth = 1;
	}
	function subdivide(a, b, n, table){
		if(a > b){
			for(i=0; i<=n; i++){
				table[i] = parseFloat((b + i*(a-b)/n).toPrecision(12)); 
			}
		}
		else{
			for(i=0; i<=n; i++){
				table[i] = parseFloat((a + i*(b-a)/n).toPrecision(12)); 
			}
		}
	}
	function xstep(a, b){
		d = 0;
		if(Math.abs(a) <= 1 && Math.abs(b) <= 1){
			if(Math.abs(a) >= Math.abs(b)){
				return Math.abs(a)/20;
			}
			else{
				return Math.abs(b)/20;
			}
		}else{
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
	}
	function ystep(min, max){
		d = 0;
		if(Math.abs(max) < 2 && Math.abs(min) < 2){
			if(Math.abs(max) >= Math.abs(min)){
				return Math.abs(max)/10;
			}
			else{
				return Math.abs(min)/10;
			}
		}
		else{
			if(Math.abs(min) > Math.abs(max)){
				if(Math.abs(min) <= Math.exp(18))
				{
					while(Math.abs(min) > 2*d){
						d++;
					}
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
					return d/5;
				}
				else{
					return (Math.abs(max))/17;
				}
			}
		}
	}
	function drawOnX(x, y, xstep, m){
		context.strokeStyle = "#FFFFFF";
		context.beginPath();
		for(var i = 0; i <= m+1; i++){
			vdash(x + 19*i, y, 5);
			if(i != 0 && i%2 == 0){
				if(xstep >= 50){
					if(xstep >= 100){
						if(xstep >= 5000){
							context.fillText((i*xstep).toFixed(2), x - 15 + (19*i), y + 14, 34);	
						}
						else{
							context.fillText((i*xstep).toFixed(2), x - 14 + (19*i), y + 14, 33);
						}
					}
					else{
						context.fillText((i*xstep).toFixed(2), x - 10 + (19*i), y + 14, 27);
					}
				}
				else{
					context.fillText((i*xstep).toFixed(2), x - 7 + (19*i), y + 14, 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnY(x, y, ystep, m){
		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		if(ystep < (Math.exp(15))){
			for(var i = 0; i <= m; i++){
				hdash(x, y - 19*i, 5);
				if(i != 0 && i%2 ==0){
					context.fillText((i*ystep).toFixed(2), x + 10, y + 2 - (19*i), 22);
				}
			}
		}
		else{
			for(var i = 0; i <= m; i++){
				hdash(x, y - 19*i, 5);
				if(i == 10){
					context.fillText("\u221E", x, y + 2 - (19*i), 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnMinusX(x, y, xstep, m){
		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		for(var i = 1; i <= m + 1; i++){
			vdash(x - 19*i, y, 5);
			if(i != 0 && i%2 == 0){
				if(xstep >= 50){
					if(xstep >= 100){
						if(xstep >= 5000){
							context.fillText("-" + (i*xstep).toFixed(2), x - 16 - (19*i), y + 10, 34);	
						}
						else{
							context.fillText("-" + (i*xstep).toFixed(2), x - 15 - (19*i), y + 10, 33);
						}
					}
					else{
						context.fillText("-" + (i*xstep).toFixed(2), x - 12 - (19*i), y + 14, 27);
					}
				}
				else{
					context.fillText("-" + (i*xstep).toFixed(2), x - 12 - (19*i), y + 14, 22);
				}
			}
		}
		context.stroke();
	}
	function drawOnMinusY(x, y, ystep, m){
		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		if(ystep != Infinity){
			for(var i = 1; i<=m; i++){
				hdash(x, y + 19*i, 5);
				if(i%2 == 0){
					context.fillText(-(i*ystep).toFixed(2), x + 8, y + (19*i), 22);
				}
			}
		}
		else{

		}
		context.stroke();
	}
	//Computes the coordinates for a given point p in a axis system where xstep is the step of the xaxis and (x, y) the coordinates of the origin
	function Xcoord(p, xstep, x){
		if(p > 0){
			return x + 19*(p/xstep);
		}
		else{
			return x - 19*(Math.abs(p)/xstep);
		}
	}
	function Ycoord(p, ystep, y){
		if(p > 0){	
			return y - (19*(p/ystep));
		}
		else{
			return y + (19*(Math.abs(p)/ystep));	
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
	function drawRiemann(width, a, b, n, funct, xstep, ystep, originx, originy){
		subdivision = [];
		context.beginPath();
		context.lineWidth = width;
		if(n > 0){
			subdivide(a, b, n, subdivision);
			context.beginPath();
			context.strokeStyle = rectanglecolor;
			for(var i = 0; i < subdivision.length - 1; i++){
				drawRect(Xcoord(subdivision[i], xstep, originx), originy, originy - Ycoord(funct((subdivision[i] + subdivision[i+1])/2), ystep, originy), Xcoord(subdivision[i+1], xstep, originx) - Xcoord(subdivision[i], xstep, originx));
			}
			n = 0;
			context.stroke();
		}else{

		}
	}
	//Takes the width, of the line to draw with, the table of values and their images
	function drawCurve(width, values, images, xstep, ystep, x, y, color){
		context.beginPath();
		context.strokeStyle = color;
		context.moveTo(x, y);
		context.lineWidth = width;
		if(ystep < Math.exp(12)){
			for(var i = 0; i <= values.length; i++){
				context.moveTo(Xcoord(values[i], xstep, x), Ycoord(images[i], ystep, y));
				context.lineTo(Xcoord(values[i+1], xstep, x), Ycoord(images[i+1], ystep, y));
			}
		}
		else{
			for(var i = 0; i <= values.length; i++){
				context.moveTo(Xcoord(values[i], xstep, x), Ycoord(images[i], ystep, y));
				context.lineTo(Xcoord(values[i+1], xstep, x), Ycoord(images[i+1], ystep, y));
			}
		}
		context.stroke();
		context.lineWidth = 1;
	}
	function evaluateInput(){
		var str = ($("input#function").val()).replace(/([^\[]*)\^([^\]]*)/g, function(match, p1, p2, offset, string){return "Math.pow("+ p1.slice(0, -1 )+", "+p2.slice(1, p2.length)+")"; }).replace(/\[/g, "(").replace(/\]/g, ")");
		str = str.replace(/(?!a)\bsin(?!h)\b/g, "Math.sin").replace(/(?!a)\bcos(?!h)\b/g, "Math.cos").replace(/(?!a)\btan(?!h)\b/g, "Math.tan");
		str = str.replace(/sinh/g, "Math.sinh").replace(/cosh/g, "Math.cosh").replace(/tanh/g, "Math.tanh");
		str = str.replace(/asin/g, "Math.asin").replace(/acos/g, "Math.acos").replace(/atan/g, "Math.atan");
		str = str.replace(/exp/g, "Math.exp");
		str = str.replace(/ln/g, "Math.log");
		return str;
	}
	context.lineWidth = 1;
	context.font = "11px sans-serif";
	context.fillStyle = "white";
	var val = [], im = [];//val[] for stocking values and im[] for their images
	var xs, ys; //xs:=xstep && ys:=ystep
	$("input#function").focus(function(){
		$(this).animate({
			width: 325
		}, 650);
	});
	$("input#function").blur(function(){
		$(this).animate({
			width: 200
		}, 650);
	});
	$("input").keydown(function(e){
		if(e.which == 13){
			$("a#plot").click();
		}
	});
	$("a#plot").click(function(){
		$("canvas#graph").focus();
		expression = evaluateInput();
		c = 0, e = 0, p = 1;
		origin.x = 425;
		origin.y = 210;
		n = 0, val = [], im=[];
		context.clearRect(0, 0, 850, 420);
		val = [], im=[];
		a = eval($("input#a").val());
		b = eval($("input#b").val());
		n = eval($("input#n").val());
		xs = xstep(a, b, 22);
		txs = xs;
		subdivide(24*xs, -24*xs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}	
		ys = ystep(Minimum(im), Maximum(im));
		tys = ys;
		context.clearRect(0, 0, 850, 420);
		if(Minimum(im) >= 0){
			tys = ys/2;
			origin.x = 425;
			origin.y = 400;
			context.clearRect(0, 0, 850, 420);
			drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
			drawRiemann(rectanglewidth, a, b, n, function(x){
				return eval(expression);
			}, txs, tys, origin.x, origin.y);
			drawXAxis(origin.y);	
			drawYAxis(origin.x);
			drawOnY(origin.x, origin.y, tys, 22);
			drawOnX(origin.x, origin.y, txs, 22);
			drawOnMinusX(origin.x, origin.y, txs, 22);
			drawOnMinusY(origin.x, origin.y, tys, 22);
		}
		else{
			origin.x = 425;
			origin.y = 210;
			context.clearRect(0, 0, 850, 420);
			drawCurve(curvewidth, val, im, xs, ys, origin.x, origin.y, curvecolor);
			drawRiemann(rectanglewidth, a, b, n, function(x){
				return eval(expression);
			}, xs, ys, origin.x, origin.y);
			drawOnX(origin.x, origin.y, xs, 22);
			drawOnY(origin.x, origin.y, ys, 22);
			drawXAxis(origin.y);	
			drawYAxis(origin.x);
			drawOnMinusX(origin.x, origin.y,xs, 22);
			drawOnMinusY(origin.x, origin.y,ys, 22);
		}
	});
	$("a#zoomin").click(function(){
		if(p < 10 && p >= 1){
			p += 1;
		}
		else{
			if(p < 1){
 				p += 0.1;
			}
		}
		txs = xs/p;
		tys = ys/p;
		im = []; val = [];
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("a#zoomout").click(function(){
		if(p > 0.2 && p <= 1){
			p -= 0.1;
		}
		else{
			if(p > 1){
				p -= 1;
			}
		}
		txs = xs/p;
		tys = ys/p;
		im = []; val = [];
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("a#go-left").click(function(){
		c -= 2;
		im = []; val = [];
		origin.x += 38;
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("a#go-right").click(function(){
		c += 2;
		im = []; val = [];
		origin.x -= 38;
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("a#go-up").click(function(){
		e += 2;
		im = []; val = [];
		origin.y += 38;
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("a#go-down").click(function(){
		e -= 2;
		im = []; val = [];
		origin.y -= 38;
		context.clearRect(0, 0, 850, 420);
		subdivide((-24 + c)*txs, (24 + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 24 + e);
		drawOnX(origin.x, origin.y, txs, 24 + c);
		drawOnMinusX(origin.x, origin.y, txs, 24 - c);
		drawOnMinusY(origin.x, origin.y, tys, 24 - e);
	});
	$("canvas#graph").keydown(function(e){
		if(e.which == 32){
			$("a#center").click();
		}
		if(e.which == 37){
			$("a#go-left").click();
		}
		if(e.which == 38){
			$("a#go-up").click();
			e.preventDefault();
		}
		if(e.which == 39){
			$("a#go-right").click();
		}
		if(e.which == 40){
			$("a#go-down").click();
			e.preventDefault();
		}
		if(e.which == 73){
			$("a#zoomin").click();
			e.preventDefault();
		}
		if(e.which == 79){
			$("a#zoomout").click();
			e.preventDefault();
		}
		if(e.which == 67){
			$("a#center").click();
			e.preventDefault();
		}
	});
	$("a#center").click(function(){
		c = 0, e = 0;
		origin.x = 425;
		origin.y = 210;
		val = [], im=[];
		context.clearRect(0, 0, 850, 420);
		subdivide(24*txs, -24*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, 850, 420);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnX(origin.x, origin.y, txs, 22);
		drawOnY(origin.x, origin.y, tys, 22);
		drawOnMinusX(origin.x, origin.y, txs, 22);
		drawOnMinusY(origin.x, origin.y, tys, 22);
	});
	$("nav#controlbar a#settings").click(function(){
		$("nav#controlbar div#settingsdiv").slideToggle(450);
	});
	//Curve related settings
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").click(function(){
		curvecolor = "#000000";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").click(function(){
		curvecolor = "#F22613";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.madison").click(function(){
		curvecolor = "#2C3E50";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.eucalyptus").click(function(){
		curvecolor = "#26A65B";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.ecstasy").click(function(){
		curvecolor = "#F9690E";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.sandstorm").click(function(){
		curvecolor = "#F9BF3B";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.verythin").click(function(){
		curvewidth = 2;
		$.cookie('curvewidth', curvewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thin").click(function(){
		curvewidth = 3;
		$.cookie('curvewidth', curvewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.regular").click(function(){
		curvewidth = 4;
		$.cookie('curvewidth', curvewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.thick").click(function(){
		curvewidth = 5;
		$.cookie('curvewidth', curvewidth, {expires: 365});
	});
	//Rectangles related settings
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.black").click(function(){
		rectanglecolor = "#000000";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").click(function(){
		rectanglecolor = "#F22613";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.madison").click(function(){
		rectanglecolor = "#2C3E50";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.eucalyptus").click(function(){
		rectanglecolor = "#26A65B";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.ecstasy").click(function(){
		rectanglecolor = "#F9690E";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.sandstorm").click(function(){
		rectanglecolor = "#F9BF3B";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.verythin").click(function(){
		rectanglewidth = 1;
		$.cookie('rectanglewidth', rectanglewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thin").click(function(){
		rectanglewidth = 2;
		$.cookie('rectanglewidth', rectanglewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.regular").click(function(){
		rectanglewidth = 3;
		$.cookie('rectanglewidth', rectanglewidth, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.thick").click(function(){
		rectanglewidth = 4;
		$.cookie('rectanglewidth', rectanglewidth, {expires: 365});
	});
	//Apply the new parameters before plotting
	$("nav#controlbar div#settingsdiv table tr td a.color").click(function(){
		$(this).addClass("selected");
		$(this).siblings(".color").removeClass("selected");
		$("a#plot").click();
	});
	$("nav#controlbar div#settingsdiv table tr td a.thickness").click(function(){
		$(this).addClass("selected");
		$(this).siblings(".thickness").removeClass("selected");
		$("a#plot").click();
	});
});
//Regex for replacing powers with equivalent in js
//"(x+2)^2".replace(/(\(.+\))\^(\(.+\))/g, function(match, p1, p2, offset, string){return "Math.pow("+p1+", "+p2+")"; })
//"3*(x+2)^(x+2)*3^(12)".replace(/([^\(]*)\^([^\)]*)/g, function(match, p1, p2, offset, string){return "Math.pow("+ p1.slice(0, -1 )+", "+p2.slice(1, p2.length)+")"; })
