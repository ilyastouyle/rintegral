$(document).ready(function(){
	var n = 10, a = -10, b = 10, p = 1, d = 0, c = 0, e = 0, txs = 0, tys = 0;
	var rectanglecolor, curvecolor, curvewidth, rectanglewidth;
	var cheight = 420, cwidth = 1200;
	//var origin = {x: 425, y: 210};
	var origin = {x: cwidth/2, y: cheight/2};
	var thestep = 19;
	var expression;
	var subdivision = new Array();
	var canvas = document.getElementById("graph");
	var topcanvas = document.getElementById("toplayer");
	var context = canvas.getContext("2d");
	var topcontext = topcanvas.getContext("2d");
	context.strokeStyle="#000000";
	//If it's the first visit, or the cookies have been removed, setting up a new cookie 
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
		case "#1F3A93":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").siblings(".color").removeClass("selected");
			break;
		case "#F22613":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").siblings(".color").removeClass("selected");
			break;
		case "#AEA8D3":
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.wistful").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#curvesettings a.wistful").siblings(".color").removeClass("selected");
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
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.verythin").siblings(".thickness").removeClass("selected");
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
		case "#1F3A93":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.black").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.black").siblings(".color").removeClass("selected");
			break;
		case "#F22613":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").siblings(".color").removeClass("selected");
			break;
		case "#AEA8D3":
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.wistful").addClass("selected");
			$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.wistful").siblings(".color").removeClass("selected");
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
		context.strokeStyle="#ABB7B7";
		context.lineWidth = 1;
		context.moveTo(x, 0);		
		context.lineTo(x, cheight);
		context.stroke();
	}
	function drawXAxis(y){
		context.beginPath();
		context.strokeStyle="#ABB7B7";
		context.lineWidth = 1;
		context.moveTo(0, y);
		context.lineTo(cwidth, y);
		context.moveTo(cwidth, y);
		context.stroke();
	}
	function vdash(x, y, height){
		context.beginPath();
		context.lineWidth = 2;
		context.moveTo(x, y);
		context.lineTo(x, y+height);
		context.moveTo(x, y);
		context.lineTo(x, y-height);
		context.stroke();
		context.lineWidth = 1;
	}
	function hdash(x, y, width){
		context.beginPath();
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
				return d/15;
			}
			else{
				while(Math.abs(b) > 2*d){
					d++;
				}
				return d/15;
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
					return Math.exp(4);
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
					return Math.exp(4);
				}
			}
		}
	}
	function drawOnX(x, y, xstep, m){
		context.strokeStyle = "#1F3A93";
		context.beginPath();
		for(var i = 0; i <= m+1; i++){
			vdash(x + thestep*i, y, 3);
			if(i != 0 && i%(afterComma(xstep)+beforeComma(xstep)) == 0){
				vdash(x + thestep*i, y, 5);
				context.fillText((i*xstep).toFixed(afterComma(xstep)), x + (thestep*i) - 8 - 3*(afterComma(xstep)), y + 14, 28 + 3*(beforeComma(xstep) + afterComma(xstep)));
			}
		}
		context.stroke();
	}
	function drawOnY(x, y, ystep, m){
		context.beginPath();
		context.strokeStyle = "#1F3A93";
		if(ystep < (Math.exp(15))){
			for(var i = 0; i <= m; i++){
				hdash(x, y - thestep*i, 3);
				if(i != 0 && i%2 ==0){
					context.fillText((i*ystep).toFixed(afterComma(ystep)), x + 10, y + 2 - (thestep*i), 28 + 3*(beforeComma(ystep) + afterComma(ystep)));
				}
			}
		}
		else{
			for(var i = 0; i <= m; i++){
				hdash(x, y - thestep*i, 3);
				if(i == 10){
					//Infinity
					context.fillText("\u221E", x, y + 2 - (thestep*i), 28);
				}
			}
		}
		context.stroke();
	}
	function drawOnMinusX(x, y, xstep, m){
		context.beginPath();
		context.strokeStyle = "#1F3A93";
		for(var i = 1; i <= m + 1; i++){
			vdash(x - thestep*i, y, 3);
			if(i != 0 && i%(afterComma(xstep)+beforeComma(xstep)) == 0){
				context.fillText("-" + (i*xstep).toFixed(afterComma(xstep)), x - 12 - (thestep*i) - 3*(afterComma(xstep)), y + 14, 28 + 3*(beforeComma(xstep) + afterComma(xstep)));
				
			}
		}
		context.stroke();
	}
	function drawOnMinusY(x, y, ystep, m){
		context.beginPath();
		context.strokeStyle = "#1F3A93";
		for(var i = 1; i<=m; i++){
			hdash(x, y + thestep*i, 3);
			if(i%2 == 0){
				context.fillText(-(i*ystep).toFixed(afterComma(ystep)), x + 8, y + (thestep*i), 28 + 3*(beforeComma(ystep) + afterComma(ystep)));
			}
		}
		context.stroke();
	}
	//Computes the coordinates for a given point p in an axis system where xstep is the step of the xaxis and (x, y) the coordinates of the origin
	function Xcoord(p, xstep, x){
		if(p > 0){
			return x + thestep*(p/xstep);
		}
		else{
			return x - thestep*(Math.abs(p)/xstep);
		}
	}
	function Ycoord(p, ystep, y){
		if(p > 0){	
			return y - (thestep*(p/ystep));
		}
		else{
			return y + (thestep*(Math.abs(p)/ystep));	
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
		return max;
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
		return min;
	}
	function drawRect(x, y, height, width){
		context.moveTo(x, y);
		context.lineTo(x, y-height);
		context.lineTo(x + width, y-height);
		context.lineTo(x + width, y);
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
			for(var i = 0; i < values.length; i++){
				if(!isNaN(images[i])){
					context.moveTo(Xcoord(values[i], xstep, x), Ycoord(images[i], ystep, y));
					context.lineTo(Xcoord(values[i+1], xstep, x), Ycoord(images[i+1], ystep, y));
				}
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
	function evaluateInput(input){
		var str = (input.val()).replace(/([^\[]*)\^([^\]]*)/g, function(match, p1, p2, offset, string){return "Math.pow("+ p1.slice(0, -1 )+", "+p2.slice(1, p2.length)+")"; }).replace(/\[/g, "(").replace(/\]/g, ")");
		str = str.replace(/(?!a)\bsin(?!h)\b/g, "Math.sin").replace(/(?!a)\bcos(?!h)\b/g, "Math.cos").replace(/(?!a)\btan(?!h)\b/g, "Math.tan");
		str = str.replace(/sinh/g, "Math.sinh").replace(/cosh/g, "Math.cosh").replace(/tanh/g, "Math.tanh");
		str = str.replace(/asin/g, "Math.asin").replace(/acos/g, "Math.acos").replace(/atan/g, "Math.atan");
		str = str.replace(/exp/g, "Math.exp");
		str = str.replace(/ln/g, "Math.log");
		return str;
	}
	//Stay is a boolean parameter, if it is set to false then the status is shown then hidden, and if it is set to true the status stays till a next update
	function updateStatus(string, stay){
		$("span#status").show();
		if(stay){
			$("span#status").text(string);
		}
		else{
			console.log(string);
			$("span#status").text(string).slideDown(50).delay(2000).slideUp(50);
		}
	}
	//Returns the number of significant numbers after the comma
	function afterComma(x){	
		var counter = 1;
		while(x.toFixed(counter) != x){
			counter++;
		}
		return counter;
	}
	function beforeComma(x){
		var counter  = 1;
		while(x > Math.pow(10, counter)){
			counter++;
		}
		return counter;
	}
	function format(x){

	}
	context.lineWidth = 1;
	context.font = "11px sans-serif";
	context.fillStyle = "#000000";
	val = [], im = [], im2 = [];//val[] for stocking values and im[] for their images
	var xs, ys; //xs:=xstep && ys:=ystep
	$("canvas#toplayer").focus(function(){
		$("canvas#graph").focus();
	});
	$("input#function").focus(function(){
		$(this).animate({
			width: 325
		}, 250);
	});
	$("input#function").blur(function(){
		$(this).animate({
			width: 200
		}, 250);
	});
	$("input").keydown(function(e){
		if(e.which == 13){
			$("a#plot").click();
		}
	});
	$("a#plot").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		$("canvas#graph").focus();
		expression = evaluateInput($("input#function"));
		expression2 = evaluateInput($("input#function2"));
		c = 0, e = 0, p = 1;
		origin.x = cwidth/2;
		origin.y = cheight/2;
		n = 0, val = [], im=[];
		context.clearRect(0, 0, cwidth, cheight);
		val = [], im=[];
		a = eval($("input#a").val());
		b = eval($("input#b").val());
		n = eval($("input#n").val());
		xs = xstep(a, b, 22);
		txs = xs;
		subdivide(-(cwidth/thestep)*xs, (cwidth/thestep)*txs, 1000, val);
		for(var i = 0; i < val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}	
		ys = ystep(Minimum(im), Maximum(im));
		tys = ys;
		if(afterComma(txs) > 4){
			if(beforeComma(txs) < 3){
				if(beforeComma(txs) < 2){
					txs = Number(txs.toFixed(6));
				}
				else{
					txs = Number(txs.toFixed(4));
				}
			}
			else{
				txs = Number(txs.toFixed(2));
			}
		}
		if(afterComma(tys) > 4){
			if(beforeComma(tys) < 3){
				if(beforeComma(tys) < 2){
					tys = Number(tys.toFixed(6));
				}
				else{
					tys = Number(tys.toFixed(4));
				}
			}
			else{
				tys = Number(tys.toFixed(2));
			}
		}
		context.clearRect(0, 0, cwidth, cheight);
		if(Minimum(im) >= 0){
			tys = tys/2;
			if(afterComma(tys) > 4){
				if(beforeComma(tys) < 3){
					tys = Number(tys.toFixed(4));
				}
				else{
					tys = Number(tys.toFixed(2));
				}
			}	
			origin.x = cwidth/2;
			for(var i = 0; i < 5; i++){
				$("a#go-up").click();
			}
			context.clearRect(0, 0, cwidth, cheight);
			drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
			drawRiemann(rectanglewidth, a, b, n, function(x){
				return eval(expression);
			}, txs, tys, origin.x, origin.y);
			drawXAxis(origin.y);
			drawYAxis(origin.x);
			drawOnX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnY(origin.x, origin.y, tys, 22);
			drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnMinusY(origin.x, origin.y, tys, 22);
		}
		else{
			origin.x = cwidth/2;
			origin.y = cheight/2;
			context.clearRect(0, 0, cwidth, cheight);
			drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
			drawRiemann(rectanglewidth, a, b, n, function(x){
				return eval(expression);
			}, txs, tys, origin.x, origin.y);
			drawXAxis(origin.y);
			drawYAxis(origin.x);
			drawOnX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnY(origin.x, origin.y, tys, 22);
			drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnMinusY(origin.x, origin.y, tys, 22);
		}
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
	});
	$("a#zoomin").hover(function(){
		$("span#label").text("Zoom in").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#zoomin").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
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
		if(afterComma(txs) > 4){
			if(beforeComma(txs) < 3){
				if(beforeComma(txs) < 2){
					txs = Number(txs.toFixed(6));
				}
				else{
					txs = Number(txs.toFixed(4));
				}
			}
			else{
				txs = Number(txs.toFixed(2));
			}
		}
		if(afterComma(tys) > 4){
			if(beforeComma(tys) < 3){
				if(beforeComma(tys) < 2){
					tys = Number(tys.toFixed(6));
				}
				else{
					tys = Number(tys.toFixed(4));
				}
			}
			else{
				tys = Number(tys.toFixed(2));
			}
		}
		im = []; val = [];
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
	});
	$("a#zoomout").hover(function(){
		$("span#label").text("Zoom out").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#zoomout").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
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
		if(afterComma(txs) > 4){
			if(beforeComma(txs) < 3){
				if(beforeComma(txs) < 2){
					txs = Number(txs.toFixed(6));
				}
				else{
					txs = Number(txs.toFixed(4));
				}
			}
			else{
				txs = Number(txs.toFixed(2));
			}
		}
		if(afterComma(tys) > 4){
			if(beforeComma(tys) < 3){
				if(beforeComma(tys) < 2){
					tys = Number(tys.toFixed(6));
				}
				else{
					tys = Number(tys.toFixed(4));
				}
			}
			else{
				tys = Number(tys.toFixed(2));
			}
		}
		im = [], val = [];
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
	});
	$("a#go-left").hover(function(){
		$("span#label").text("Go left").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#go-left").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		c -= 2;
		im = [], val = [];
		origin.x += 2*thestep;
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 300, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
		console.log(im);
	});
	$("a#go-right").hover(function(){
		$("span#label").text("Go right").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#go-right").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		c += 2;
		im = []; val = [];
		origin.x -= 2*thestep;
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 800, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
	});
	$("a#go-up").hover(function(){
		$("span#label").text("Go up").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#go-up").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		e += 2;
		im = []; val = [];
		origin.y += 2*thestep;
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
	});
	$("a#go-down").hover(function(){
		$("span#label").text("Go down").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#go-down").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		e -= 2;
		im = []; val = [];
		origin.y -= 2*thestep;
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawCurve(curvewidth, val, im2, txs, tys, origin.x, origin.y, "#F9690E");
		drawXAxis(origin.y);
		drawYAxis(origin.x);
		drawOnY(origin.x, origin.y, tys, 28 + e);
		drawOnX(origin.x, origin.y, txs, (cwidth/thestep) + c);
		drawOnMinusX(origin.x, origin.y, txs, (cwidth/thestep) - c);
		drawOnMinusY(origin.x, origin.y, tys, 28 - e);
	});
	$("canvas#graph").keypress(function(e){
		e.preventDefault();
	});
	$("canvas#graph").keyup(function(e){
		if(e.which == 32){
			e.preventDefault();
			$("a#center").click();
		}
		if(e.which == 37){
			e.preventDefault();
			$("a#go-left").click();
		}
		if(e.which == 38){
			e.preventDefault();
			$("a#go-up").click();
		}
		if(e.which == 39){
			e.preventDefault();
			$("a#go-right").click();
		}
		if(e.which == 40){
			e.preventDefault();
			$("a#go-down").click();
		}
		if(e.which == 73){
			e.preventDefault();
			$("a#zoomin").click();
		}
		if(e.which == 79){
			e.preventDefault();
			$("a#zoomout").click();
		}
		if(e.which == 67){
			e.preventDefault();
			$("a#center").click();
		}
	});
	$("canvas#toplayer").mousemove(function(event){
		topcontext.clearRect(0, 0, cwidth, cheight);
		topcontext.strokeStyle = "#22313F";
		topcontext.fillStyle = "#000000";
		x = Math.floor(Math.floor(event.pageX) - Math.floor($("canvas#graph").offset().left));
		y = Math.floor(Math.floor(event.pageY) - Math.floor($("canvas#graph").offset().top));
		ax = (c + (x/thestep))*txs;
		ay = (e + (y/thestep))*tys;
		topcontext.beginPath();
		topcontext.lineWidth = 2;
		topcontext.moveTo(x, origin.y);
		topcontext.lineTo(x, origin.y+6);
		topcontext.moveTo(x, origin.y);
		topcontext.lineTo(x, origin.y-6);
		topcontext.moveTo(origin.x, y);
		topcontext.lineTo(origin.x+6, y);
		topcontext.moveTo(origin.x, y);
		topcontext.lineTo(origin.x-6, y);
		if((x - origin.x)%(thestep*(afterComma(txs) + beforeComma(txs))) != 0){
			topcontext.fillText(ax.toFixed(afterComma(txs) + 1), x - 15, origin.y - 15, 2*thestep - 8 + 3*(afterComma(txs) + beforeComma(txs)));
		}
		if((y - origin.y)%(2*thestep) != 0){
			topcontext.fillText(ay.toFixed(afterComma(tys) + 1), origin.x + 2*thestep - 10 + afterComma(tys)*3, y + 2, 30 + 3*(afterComma(tys)+beforeComma(tys)));
		}
		topcontext.stroke();
	});
	$("a#center").hover(function(){
		$("span#label").text("Center").show();
	}, function(){
		$("span#label").hide();
	});
	$("a#center").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		c = 0, e = 0;
		origin.x = cwidth/2;
		origin.y = cheight/2;
		val = [], im=[];
		context.clearRect(0, 0, cwidth, cheight);
		subdivide((cwidth/thestep)*txs, -(cwidth/thestep)*txs, 1200, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
		}
		context.clearRect(0, 0, cwidth, cheight);
		drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		drawRiemann(rectanglewidth, a, b, n, function(x){
			return eval(expression);
		}, txs, tys, origin.x, origin.y);
		drawXAxis(origin.y);	
		drawYAxis(origin.x);
		drawOnX(origin.x, origin.y, txs, cwidth/thestep);
		drawOnY(origin.x, origin.y, tys, 28);
		drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
		drawOnMinusY(origin.x, origin.y, tys, 28);
	});
	$("a#settings").hover(function(){
		$("span#label").text("Settings").show();
	}, function(){
		$("span#label").hide();
	});
	$("nav#controlbar a#settings").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		$("nav#controlbar div#settingsdiv").slideToggle(450);
	});
	//Curve related settings
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.black").click(function(){
		curvecolor = "#1F3A93";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.pomegranate").click(function(){
		curvecolor = "#F22613";
		$.cookie('curvecolor', curvecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#curvesettings a.wistful").click(function(){
		curvecolor = "#AEA8D3";
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
		rectanglecolor = "#1F3A93";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.pomegranate").click(function(){
		rectanglecolor = "#F22613";
		$.cookie('rectanglecolor', rectanglecolor, {expires: 365});
	});
	$("nav#controlbar div#settingsdiv table tr td#rectanglesettings a.wistful").click(function(){
		rectanglecolor = "#AEA8D3";
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

