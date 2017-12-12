$(document).ready(function(){
	var n = 10, p = 1, d = 0, c = 0, e = 0, txs = 0, tys = 0, fn = 1;
	var indexcs = 0;//index of the current span.input for which settings should be saved
	var P = {a:[0, 0], b:[0, 0], n:[0]}//Initial values for both initial curves
	var tab1 = [];
	var tab2 = [];
	var tabt = [];
	var tests = 0;
	var rectanglecolor, curvecolor, curvewidth, rectanglewidth;
	//var origin = {x: 425, y: 210};
	var cheight = 420, cwidth = 1200;//Canvas height, Canvas width
	var origin = {x: cwidth/2, y: cheight/2};//Coordinates of the origin
	var thestep = 19;
	var expression;
	var nbc = 1;//Number of curves
	var curves = [];//Table containing all current curves
	var subdivision = new Array();//Current subdivision table
	var canvas = document.getElementById("graph");
	var topcanvas = document.getElementById("toplayer");
	var context = canvas.getContext("2d");
	var topcontext = topcanvas.getContext("2d");
	context.strokeStyle="#000000";
	context.fillStyle = "#ececec";
	context.fillRect(0, 0, cwidth, cheight);
	//In the beginning, we push both pre-existing curves
	curves.push(new Curve2d([], [], "#" + $($("span.function")[0]).children(".jscolor").val(), 4));
	curves.push(new Curve2d([], [], "#" + $($("span.parameterized")[0]).children(".jscolor").val(), 3));
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
	function Curve2d(X, Y, color, width){
		this.X = X;
		this.Y = Y;
		this.color = color;
		this.width = width;
		this.draw = function(){
			drawCurve(width, X, Y, txs, tys, origin.x, origin.y, color);
		}
	}
	function drawYAxis(x, color){
		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = 1;
		context.moveTo(x, 0);		
		context.lineTo(x, cheight);
		context.stroke();
	}
	function drawXAxis(y, color){
		context.beginPath();
		context.strokeStyle = color;
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
	function subdivide(x_0, x_n, n, tab){
		if(x_0 > x_n){
			for(i=0; i<=n; i++){
				tab[i] = parseFloat((x_0 - i*(x_0-x_n)/n).toPrecision(12)); 
			}
		}
		else{
			for(i=0; i<=n; i++){
				tab[i] = parseFloat((x_0 + i*(x_n-x_0)/n).toPrecision(12)); 
			}
		}
	}
	//Subdivide riemann 
	function subdivideR(X, Y, n, table){
		var middle = 0;
		for(var i = 0; i <= n; i++){
			middle = (Y[i] + Y[i+1])/2; 
		}
	}
	function xstep(){
		d = 0, mn = Minimum(curves[0].X), mx = Maximum(curves[0].X);
		for(var i = 1; i < curves.length; i++){
			if(mn > Minimum(curves[i].X)){
				mn = Minimum(curves[i].X)
			}
		}
		for(var i = 1; i < curves.length; i++){
			if(mx < Maximum(curves[i].X)){
				mx = Maximum(curves[i].X)
			}
		}
		if(Math.abs(mn) >= Math.abs(mx)){
			if(Math.abs(mn) >= 2){
				while(Math.abs(mn) > 2*d){
					d++;
				}
				return d/10;
			}
			else{
				while(Math.abs(mn) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}	
		}
		else{
			if(Math.abs(mx) >= 2){
				while(Math.abs(mx) > 2*d){
					d++;
				}
				return d/10;
			}
			else{
				while(Math.abs(mx) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}	
		}
	}
	function ystep(min, max){
		d = 0, mn = Minimum(curves[0].Y), mx = Maximum(curves[0].Y);
		for(var i = 1; i < curves.length; i++){
			if(mn > Minimum(curves[i].Y)){
				mn = Minimum(curves[i].Y)
			}
		}
		for(var i = 1; i < curves.length; i++){
			if(mx < Maximum(curves[i].Y)){
				mx = Maximum(curves[i].Y)
			}
		}
		if(Math.abs(mn) >= Math.abs(mx)){
			if(Math.abs(mn) >= 2){
				while(Math.abs(mn) > 2*d){
					d++;
				}
				return d/5;
			}
			else{
				while(Math.abs(mn) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}	
		}
		else{
			if(Math.abs(mx) >= 2){
				while(Math.abs(mx) > 2*d){
					d++;
				}
				return d/5;
			}
			else{
				while(Math.abs(mx) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}	
		}
		/*if(Math.abs(mn) >= 2 && Math.abs(mx) >= 2){
			if(Math.abs(mn) >= Math.abs(mx)){
				while(Math.abs(mn) > 2*d){
					d++;
				}
				return d/5;
			}
			else{
				while(Math.abs(mx) > 2*d){
					d++;
				}
				return d/5;
			}
	
		else{
			if(Math.abs(mn) >= Math.abs(mx)){
				while(Math.abs(mn) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}
			else{
				while(Math.abs(mx) > 2*Math.pow(10, d)){
					d--;
				}
				return Math.pow(10, d - 1);
			}
		}*/
	}
	function drawOnX(x, y, xstep, m){
		for(var i = 1; i <= m; i++){
			drawYAxis(origin.x + i*thestep, "#DADFE1");
		}
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
		for(var i = 1; i <= m; i++){
			drawXAxis(origin.y - i*thestep, "#DADFE1");
		}
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
		for(var i = 1; i <= m + 1; i++){
			drawYAxis(origin.x - i*thestep, "#DADFE1");
		}
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
		for(var i = 1; i <= m; i++){
			drawXAxis(origin.y + i*thestep, "#DADFE1");
		}
		context.strokeStyle = "#1F3A93";
		context.beginPath();
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
		if(values[0] == undefined){
			max = 0;
		}
		else if(isNaN(values[0])){
			max = 0;
		}
		else{
			max = values[0];
		}
		for(var i = 0; i < values.length; i++){
			if(values[i] == undefined){}
			else if(isNaN(values[0])){}
			else{
				if(max < values[i]){
					max = values[i];
				}
			}
		}
		return max;
	}
	//Returns the minimum on a range of values
	function Minimum(values){
		var min;
		if(values[0] == undefined){
			min = 0;
		}
		else if(isNaN(values[0])){
			min = 0;
		}
		else{
			min = values[0];
		}
		for(var i = 0; i < values.length; i++){
			if(values[i] == undefined){}
			else if(isNaN(values[0])){}
			else{
				if(min > values[i]){
					min = values[i];
				}
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
	//Takes the width, of the line to draw with, the table of values and their images, x,y steps and the color
	function drawCurve(w, values, images, xstep, ystep, x, y, color){
		context.beginPath();
		context.strokeStyle = color;
		context.moveTo(x, y);
		context.lineWidth = w;
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
		var str = (input).replace(/([^\[]*)\^([^\]]*)/g, function(match, p1, p2, offset, string){return "Math.pow("+ p1.slice(0, -1 )+", "+p2.slice(1, p2.length)+")"; }).replace(/\[/g, "(").replace(/\]/g, ")");
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
	function getRandomArbitrary(min, max) {
  		return Math.random() * (max - min) + min;
	}
	function ord(p, x){
		var i = 0;
		if(x == 0){
			return -1000;
		}
		if(x % p != 0){
			return 0;
		}
		else{
			while(x % Math.pow(p, i) == 0){
				i++;
			}
			return i-1;
		}
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
	/*$("body").on("keydown", "input#a", function(e){
		if(e.which == 13){
			//P.a[$("span.input").index($(this).parent())] = $(this).val();
		}
	});
	$("body").on("keydown", "input#b", function(e){
		if(e.which == 13){
			//P.b[$("span.input").index($(this).parent())] = $(this).val();
		}
	});*/
	$("body").on("keydown", "input", function(e){
		if(e.which == 13){
			if($(this).parent().children("input").index($(this)) == 3){
				//Go back to the first input with a simple next()
				$(this).parent().children("a.next")[$(this).parent().children("input").index($(this))].click();
				//Then save all the inputs
				$(this).parent().children("a.save").click();
			}
			else{
				$(this).parent().children("a.next")[$(this).parent().children("input").index($(this))].click();
			}
		}
	});
	$("a#add").click(function(){
		addNewFunct($("span.input.function").length);
	});
	function addNewFunct(nb){
		//&#92; = \ in
		//console.log(curves);
		if($("span.input.function").length == 0){
			$("div#parameters").scrollLeft(($("span.input").width())*($("span.input").length) + 20);
			P.a.splice(0, 0, 0);
			P.b.splice(0, 0, 0);
			curves.splice(0, 0, new Curve2d(tab1, tab2, "#3A539B", 3));	
		}
		else{
			$("div#parameters").scrollLeft(($("span.input").width())*($("span.input").length) + 20);
			P.a.splice(nb, 0, 0);
			P.b.splice(nb, 0, 0);
			curves.splice(nb, 0, new Curve2d(tab1, tab2, "#3A539B", 3));
		}
		if($("span.input.function").length == 0){
			var rec = $('<span class = "input function"><a href="#" class="delete"><i class = "fa fa-cut"></i></a><a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a><a href="#" class="edit">Edit</a><a href="#" class="save">Save</a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="fx">&#92;(f_{1}(x)&#92;)</label><input class="f" type="text" placeholder="sin(cos(x) - 1)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(a&#92;)</label><input class ="value" type="text" id="a" maxlength="8" value="" placeholder = "-5"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(b&#92;)</label><input class ="value" type="text" id="b" maxlength="8" value="" placeholder = "5"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(n&#92;)</label><input class ="value" type="text" id="n" maxlength="5" value="" placeholder = "100"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><input class="jscolor" value="#3A539B"></span>').prependTo("div#parameters").find("label.fx").html('&#92;( f_{' + ($("span.function").length) + '}(x) &#92;)');
		}
		else{
			var rec = $('<span class = "input function"><a href="#" class="delete"><i class = "fa fa-cut"></i></a><a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a><a href="#" class="edit">Edit</a><a href="#" class="save">Save</a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="fx">&#92;(f_{1}(x)&#92;)</label><input class="f" type="text" placeholder="sin(cos(x) - 1)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(a&#92;)</label><input class ="value" type="text" id="a" maxlength="8" value="" placeholder = "-5"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(b&#92;)</label><input class ="value" type="text" id="b" maxlength="8" value="" placeholder = "5"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(n&#92;)</label><input class ="value" type="text" id="n" maxlength="5" value="" placeholder = "100"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><input class="jscolor" value="#3A539B"></span>').insertAfter($("span.input")[nb - 1]).find("label.fx").html('&#92;( f_{' + ($("span.function").length) + '}(x) &#92;)');	
		}
		for(var i = 0; i < $("span.function").length; i++){
				$($($("span.function")[i]).children("label")[0]).html('&#92;( f_{' + (i + 1) + '}(x) &#92;)');
		}
		MathJax.Hub.Queue(["Typeset",MathJax.Hub, "parameters"]);
		MathJax.Hub.Queue(function(){
			jscolor.installByClassName("jscolor");
		});
		//console.log(curves);
		return rec.parent();
	}
	$("a#addp").click(function(){
		//&#92; = \ in
		if($("span.input.parameterized").length == 0){
			$($('<span class = "input parameterized"><a href="#" class="delete"><i class = "fa fa-cut"></i></a><a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a><a href="#" class="edit">Edit</a><a href="#" class="save">Save</a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="xt">\(&#92;( &#92;_{1}(t) \)</label><input class="x" type="text" placeholder="cos(t)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="yt">\( y_{1}(t) \)</label><input class="y" type="text" placeholder="sin(t)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(a&#92;)</label><input class ="value" type="text" id="a" maxlength="8" value="" placeholder="-4"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(b&#92;)</label><input class ="value" type="text" id="b" maxlength="8" value="" placeholder="4"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><input class="jscolor" value="#3A539B"></span>').appendTo("div#parameters").find("label.xt").html('&#92;( x_{' + ($("span.parameterized").length) + '}(t) &#92;)').parent("span")).find("label.yt").html('&#92;( y_{' + ($("span.parameterized").length) + '}(t) &#92;)');			
		}
		else{
			$($('<span class = "input parameterized"><a href="#" class="delete"><i class = "fa fa-cut"></i></a><a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a><a href="#" class="edit">Edit</a><a href="#" class="save">Save</a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="xt">\(&#92;( &#92;_{1}(t) \)</label><input class="x" type="text" placeholder="cos(t)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="yt">\( y_{1}(t) \)</label><input class="y" type="text" placeholder="sin(t)"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(a&#92;)</label><input class ="value" type="text" id="a" maxlength="8" value="" placeholder="-4"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a><label class="value">&#92;(b&#92;)</label><input class ="value" type="text" id="b" maxlength="8" value="" placeholder="4"><a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a><input class="jscolor" value="#3A539B"></span>').insertAfter($("span.input.parameterized").last()).find("label.xt").html('&#92;( x_{' + ($("span.parameterized").length) + '}(t) &#92;)').parent("span")).find("label.yt").html('&#92;( y_{' + ($("span.parameterized").length) + '}(t) &#92;)');
		}
		MathJax.Hub.Queue(["Typeset",MathJax.Hub, "parameters"]);
		MathJax.Hub.Queue(function(){
			jscolor.installByClassName("jscolor");
			$("div#parameters").scrollLeft(($("span.input").width())*($("span.input").length) + 20);
			P.a.push(0);
			P.b.push(0);
			curves.push(new Curve2d(tab1, tab2, "#3A539B", 3));		
		});
	});
	$("a#plot").click(function(){
		topcontext.clearRect(0, 0, cwidth, cheight);
		$("canvas#graph").focus();
		//Clearing out the last values
		if(tab2 != undefined){
			tab2.splice(0, tab2.length);
		}
		//To avoid drawing repeatedly
		//curves.splice(0, curves.length);
		/*expression = evaluateInput($("input#function"));
		expression2 = evaluateInput($("input#function2"));*/
		c = 0, e = 0, p = 1;
		origin.x = cwidth/2;
		origin.y = cheight/2;
		n = 0, val = [], im=[];
		context.clearRect(0, 0, cwidth, cheight);
		val = [], im=[];
		//xs = xstep(a, b, 22);
		//subdivide(-(cwidth/thestep)*xs, (cwidth/thestep)*txs, 1000, val);
		/*for(var i = 0; i < val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}*/	
		//ys = ystep(Minimum(im), Maximum(im));
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
		context.fillStyle = "#ececec";
		context.fillRect(0, 0, cwidth, cheight);
		context.fillStyle = "#000000";
		/*if(Minimum(im) >= 0){
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
			drawOnMinusXs(origin.x, origin.y, txs, cwidth/thestep);
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
		var k = 0;
		myinterval = window.setInterval(function(){
			if(k < 4){
				a = -1 - k;
				b = 1 + k;
				xs = xstep(a, b, 22);
				txs = xs;
				subdivide(-(cwidth/thestep)*xs, (cwidth/thestep)*txs, 1000, val);
				for(var i = 0; i  < val.length; i++){
					var x = val[i];
					im[i] = eval(expression);
					im2[i] = eval(expression2);
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
				k++;
			}
			else if(k < 10){
				a = a - k;
				b = b + k;
				xs = xstep(a, b, 22);
				txs = xs;
				subdivide(-(cwidth/thestep)*xs, (cwidth/thestep)*txs, 1000, val);
				for(var i = 0; i  < val.length; i++){
					var x = val[i];
					im[i] = eval(expression);
					im2[i] = eval(expression2);
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
				k++;
			}else if(k = 10){
				window.clearInterval(myinterval);
			}
		}, 250);
		*/
		/*for(var j = 0; j < $("span.function").length; j++){
			P.a[j] = $($("span.function")[j]).children("#a").val();
			P.b[j] = $($("span.function")[j]).children("#b").val();
			P.n[j] = $($("span.function")[j]).children("#n").val();
			a = parseFloat(P.a[j]);
			b = parseFloat(P.b[j]);
			subdivide(a, b, 250, tab1);
			for(var i = 0; i < tab1.length; i++){
				x = tab1[i];
				tab2[i] = eval(evaluateInput($($("span.function")[j]).children("input.f").val()));
			}
			curves.splice($("span.function").length - 1, 0,new Curve2d(tab1, tab2, "#" + $($("span.function")[j]).children(".jscolor").val(), 2));
			console.log(curves);
			tab1 = [];
			tab2 = [];
		}
		for(var j = 0; j < $("span.parameterized").length; j++){
			a = parseFloat($($("span.parameterized")[j]).children("#a").val());
			b = parseFloat($($("span.parameterized")[j]).children("#b").val());
			subdivide(a, b, 250, tabt);
			for(var i = 0; i < tabt.length; i++){
				t = tabt[i];
				tab1[i] = eval(evaluateInput($($("span.parameterized")[j]).children("input.x").val()));
				tab2[i] = eval(evaluateInput($($("span.parameterized")[j]).children("input.y").val()));
			}
			curves.push(new Curve2d(tab1, tab2, "#" + $($("span.parameterized")[j]).children(".jscolor").val(), 3));
			tabt = [];
			tab1 = [];
			tab2 = [];
		}*/
		/*for(var i = 0; i < curves.length; i++){
			curves[i].draw();
			expr = $($("span.function")[i]).children("input").val();
			a = parseFloat(P.a[i]);
			b = parseFloat(P.b[i]);
			n = parseInt(P.n[i]);
			drawRiemann(rectanglewidth, a, b, n, function(x){
				return eval(evaluateInput(expr));
			}, txs, tys, origin.x, origin.y);
		}*/
		$.getScript("http://localhost:3172/cvg.js").done(function(){
			console.log("curves: " + curves);
			var k = 0;
			context.clearRect(0, 0, cwidth, cheight);
			myint = window.setInterval(function(){
				if(k < 25){
					if(k != 0){
						for(var i = 0; i < curves.length; i++){
							(new Curve2d(curves[i].X.slice(10*k - 1, 10*(k+1) + 1), curves[i].Y.slice(10*k - 1, 10*(k+1) + 1), curves[i].color, curves[i].width)).draw();
							cvg.addFrame(canvas);
						}
					}
					else{
						for(var i = 0; i < curves.length; i++){
							(new Curve2d(curves[i].X.slice(10*k, 10*(k+1) + 1), curves[i].Y.slice(10*k, 10*(k+1) + 1), curves[i].color, curves[i].width)).draw();
							cvg.addFrame(canvas);
						}	
					}
				}
				else{
					cvg.render(Math.random());
					window.clearInterval(myint);
					html.find('script[src="http://localhost:3172/cvg.js"]').remove();
				}
				k++;
			}, 80);
		}).fail(function(){
			/*for(var i = 0; i < curves[0].X.length; i++){
				tab2[i] = ((curves[0].Y)[i] + (curves[1].Y)[i])/2;
			}
			console.log(tab2);*/
			//curves[2] = new Curve2d(curves[0].X, tab2, "#3A539B", 3);
			//console.log("Failed to load!");
			xs = xstep();
			ys = ystep();
			//The y-axis is half long than the x-axis, hence the times 2
			if(xs >= ys){
				txs = xs;
				tys = xs;
			}
			else{
				txs = ys;
				tys = ys;
			}
			context.clearRect(0, 0, cwidth, cheight);
			context.setLineDash([]);
			drawXAxis(origin.y, "#95A5A6");
			drawYAxis(origin.x, "#95A5A6");
			drawOnX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnY(origin.x, origin.y, tys, 22);
			drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
			drawOnMinusY(origin.x, origin.y, tys, 22);
			var k = 0;
			//window.clearInterval(myint);
			if(typeof(myint) == "undefined"){
				console.log("undefined case");
				myint = window.setInterval(function(){
					if(k < 11){
						if(k == 0){
							for(var i = 0; i < curves[0].X.length; i++){
								tab2[i] = curves[0].Y[i];
							}
						}
						else{
							for(var i = 0; i < curves[0].X.length; i++){
								//console.log((curves[0].Y)[i] + (curves[1].Y)[i])/2
								tab2[i] = curves[1].Y[i] + (10 - k)*(curves[0].Y[i] - curves[1].Y[i])/10;
							}
						}						
						//console.log(k);
						context.clearRect(0, 0, cwidth, cheight);
						context.setLineDash([]);
						drawXAxis(origin.y, "#95A5A6");
						drawYAxis(origin.x, "#95A5A6");
						drawOnX(origin.x, origin.y, txs, cwidth/thestep);
						drawOnY(origin.x, origin.y, tys, 22);
						drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
						drawOnMinusY(origin.x, origin.y, tys, 22);
						console.log(tab2);
						(new Curve2d(curves[0].X, tab2, "#3A539B", 3)).draw();
					}
					else{
						window.clearInterval(myint);	
						tab2 = [];	
					}
					k++;
				}, 150);
			}else{
				window.clearInterval(myint);
				console.log("defined case");
				console.log(tab2);
				myint = window.setInterval(function(){
					if(k < 11){
						if(k == 0){
							for(var i = 0; i < curves[0].X.length; i++){
								tab2[i] = curves[0].Y[i];
							}
						}
						else{
							for(var i = 0; i < curves[0].X.length; i++){
								//console.log((curves[0].Y)[i] + (curves[1].Y)[i])/2
								tab2[i] = curves[1].Y[i] + (10 - k)*(curves[0].Y[i] - curves[1].Y[i])/10;;
							}						
						}
						//console.log(k);
						context.clearRect(0, 0, cwidth, cheight);
						context.setLineDash([]);
						drawXAxis(origin.y, "#95A5A6");
						drawYAxis(origin.x, "#95A5A6");
						drawOnX(origin.x, origin.y, txs, cwidth/thestep);
						drawOnY(origin.x, origin.y, tys, 22);
						drawOnMinusX(origin.x, origin.y, txs, cwidth/thestep);
						drawOnMinusY(origin.x, origin.y, tys, 22);
						console.log(tab2);
						(new Curve2d(curves[0].X, tab2, "#3A539B", 3)).draw();
					}
					else{
						window.clearInterval(myint);		
					}
					k++;
				}, 150);
			}
		});
	});
	$("a#save").click(function(){
		Canvas2Image.saveAsPNG(canvas, cwidth, cheight);
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
		subdivide((-(cwidth/thestep) + c)*txs, ((cwidth/thestep) + c)*txs, 800, val);
		for(var i = 0; i<val.length; i++){
			var x = val[i];
			im[i] = eval(expression);
			im2[i] = eval(expression2);
		}
		context.clearRect(0, 0, cwidth, cheight);
		//drawCurve(curvewidth, val, im, txs, tys, origin.x, origin.y, curvecolor);
		//drawRiemann(rectanglewidth, a, b, n, function(x){
		//	return eval(expression);
		//}, txs, tys, origin.x, origin.y);
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
	//Rotate plot clock-wise
	$("a#rotate_cw").click(function(){
		console.log("Rotate..");
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
	$("body").on("click", "span.input.function a.delete",function(){
		var index = $("span.input").index($(this).parent());
		if($("span.input").length > 1){
			$(this).parent().remove();
			for(var i = 0; i < $("span.function").length; i++){
				$($($("span.function")[i]).children("label")[0]).html('&#92;( f_{' + (i + 1) + '}(x) &#92;)');
			}
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, "parameters"]);
			curves.splice(index, 1);
			P.a.splice(index, 1);
			P.b.splice(index, 1);
			//console.log(curves);
		}
	});
	$("body").on("click", "span.input.function a.dropdown, span.input.parameterized a.dropdown", function(){
		$(this).hide();
		($(this).parent()).siblings().children("a.dropdown").hide();
		$(this).parent().addClass("selected");
		$(this).parent().siblings().removeClass("selected");
		$(this).parent().siblings().css("opacity", "0.5");
		$($("div#fsettings span.thickness")[curves[$("span.input").index($(this).parent())].width - 2]).click();
		$("div#fsettings").slideDown();
	});
	$("body").on("click", "div#fsettings span.scontainer span.thickness", function(){
		$(this).parent().addClass("selected");
		$(this).parent().siblings().removeClass("selected");
	});
	$("body").on("click", "div#fsettings button#divideb", function(){
		//Number of divisions
		console.log("curves: ");
				for(var l = 0; l < curves.length; l++){
					console.log(curves[l].X);
				}
		divnum = $("input#divide").val();
		if(divnum > 0){
			//Index of current function to divide
			index = $("span.input").index($("span.input.selected")); 
			for(var i = 0; i < divnum; i++){
				var curr = addNewFunct(index + i + 1);
				a = P.a[index] + i*(P.b[index] - P.a[index])/divnum;
				b = P.a[index] + (i+1)*(P.b[index] - P.a[index])/divnum;
				$(curr.children("input")[0]).val($($("span.input.selected").children("input")[0]).val());
				$(curr.children("input")[1]).val(P.a[index] + i*(P.b[index] - P.a[index])/divnum);
				$(curr.children("input")[2]).val(P.a[index] + (i+1)*(P.b[index] - P.a[index])/divnum);	
				MathJax.Hub.Queue(function(){
					//$(curr.children("a.edit")).click();
				});
				//MathJax.Hub.Queue(function(){
				tab1 = [];
				tab2 = [];
				tabt = [];
				P.a[index + i + 1] = a;
				P.b[index + i + 1] = b;
				if($("span.input.selected").hasClass("function")){
					subdivide(a, b, 250, tab1);
					for(var j = 0; j < tab1.length; j++){
						x = tab1[j];
						tab2[j] = eval(evaluateInput($($("span.input.selected").children("input")[0]).val()));
					}	
				}
				if($("span.input.selected").hasClass("parameterized")){
					subdivide(a, b, 250, tabt);
					for(var j = 0; j < tabt.length; j++){
						t = tabt[j];
						tab1[j] = eval(evaluateInput($($("span.input.selected").children("input")[0]).val()));
						tab2[j] = eval(evaluateInput($($("span.input.selected").children("input")[1]).val()));
					}	
				}
				curves[index + i + 1].X = tab1;
				curves[index + i + 1].Y = tab2;
				curves[index + i + 1].width = curves[index].width;
				tab1 = [];
				tab2 = [];
				//});
			}
			MathJax.Hub.Queue(function(){
				$("button#saveb").click();
				$("span.input.selected").children("a.delete").click();
				tab1 = [];
				tab2 = [];
			});
		}
	});
	$("body").on("click", "div#fsettings button#saveb", function(){
		current_index = $("span.input").index($("span.input.selected"));
		$("div#fsettings").slideUp();
		$("div#parameters").children("span").css("opacity", "1");
		$("div#parameters").children("span").children("a.dropdown").show();
		curves[current_index].width = $("span.scontainer").index($("span.scontainer.selected")) + 2;
	});
	$("body").on("click", "span.input.function a.edit, span.input.parameterized a.edit", function(){
		$(this).parent().siblings().children("a.save").hide();
		$(this).parent().siblings().children("a.save").siblings("a.edit").show();
		$($(this).parent().siblings().children("a.save").siblings("label")[0]).show();
		$(this).parent().siblings().children("a.save").siblings("label").removeClass("selec");
		$(this).parent().siblings().children("a.save").siblings("input:not(.jscolor)").hide();
		$(this).parent().siblings().children("a.save").siblings("a.next").hide();
		$(this).parent().siblings().children("a.save").siblings("a.previous").hide();

		$(this).hide();
		$(this).siblings("a.save").show();
		$(this).siblings("input").addClass("selected");
		for(var i = 1; i < 4; i++){
			$($(this).siblings("input")[i]).hide();
			$($(this).siblings("label")[i]).hide();
		}
		$(this).siblings("label").removeClass("selec");
		$($(this).siblings("input")[0]).show();
		$($(this).siblings("input"))[0].focus();
		$($(this).siblings("a.next")[0]).show();
		$($(this).siblings("a.previous")[0]).show();
	});
	$("body").on("click", "span.input.function a.save, span.input.parameterized a.save", function(){
		$(this).hide();
		$(this).siblings("a.edit").show();
		$($(this).siblings("label")[0]).show();
		if($(this).parent().hasClass("parameterized")){
			$($(this).siblings("label")[1]).show();
		}
		$(this).siblings("label").removeClass("selec");
		$(this).siblings("input:not(.jscolor)").hide();
		$(this).siblings("a.next").hide();
		$(this).siblings("a.previous").hide();
		current_index = $("span.input").index($(this).parent());
		a = parseFloat(P.a[current_index]);
		b = parseFloat(P.b[current_index]);
		if($(this).parent().hasClass("function")){
			subdivide(a, b, 250, tab1);
			for(var i = 0; i < tab1.length; i++){
				x = tab1[i];
				tab2[i] = eval(evaluateInput($($("span.input")[current_index]).children("input.f").val()));
			}	
		}
		if($(this).parent().hasClass("parameterized")){
			subdivide(a, b, 250, tabt);
			for(var i = 0; i < tabt.length; i++){
				t = tabt[i];
				tab1[i] = eval(evaluateInput($($("span.input")[current_index]).children("input.x").val()));;
				tab2[i] = eval(evaluateInput($($("span.input")[current_index]).children("input.y").val()));
			}	
		}
		console.log(a);
		curves[current_index].X = tab1;
		curves[current_index].Y = tab2;
		tab1 = [];
		tab2 = [];
		//console.log("curves: ");
		/*for(var l = 0; l < curves.length; l++){
			console.log(curves[l].X);
		}*/
	});
	$("body").on("click", "span.input.function a.next, span.input.parameterized a.next", function(){
		//Current selected input index 
		var inp = $($(this).parent()).children("a.next").index($(this));
		index = $("span.input").index($(this).parent());
		if(inp == 1){
			P.a[index] = parseFloat($("input.selected").val());
		}
		if(inp == 2){
			P.b[index] = parseFloat($("input.selected").val());
		}
		$("span.input").children("input").removeClass("selected");
		$(this).hide();
		$(this).parent().children("input:not(.jscolor)").hide();
		$(this).parent().children("label").hide();
		$(this).parent().children("a.previous").hide();
		if($(this).parent().children("a.next").index($(this)) == 3){
			$($($(this).parent().children("input"))[0]).show();
			$($($(this).parent().children("label"))[0]).show();
			$(this).siblings("label").removeClass("selec");
			$($($(this).parent().children("a.next"))[0]).show();
			$($($(this).parent().children("a.previous"))[0]).show();
			$($(this).parent().children("input")[0]).addClass("selected");
			$($($(this).parent().children("input"))[0]).focus();
		}
		else{
			$($($(this).parent().children("input"))[$(this).parent().children("a.next").index($(this)) + 1]).show();
			$($($(this).parent().children("label"))[$(this).parent().children("a.next").index($(this)) + 1]).show();
			$($($(this).parent().children("label"))[$(this).parent().children("a.next").index($(this)) + 1]).addClass("selec");
			$($($(this).parent().children("a.next"))[$(this).parent().children("a.next").index($(this)) + 1]).show();
			$($($(this).parent().children("a.previous"))[$(this).parent().children("a.next").index($(this)) + 1]).show();
			$($(this).parent().children("input")[$(this).parent().children("a.next").index($(this)) + 1]).addClass("selected");
			$($($(this).parent().children("input"))[$(this).parent().children("a.next").index($(this)) + 1]).focus();
		}
	});
	$("body").on("click", "span.input a.previous, span.input.parameterized a.previous", function(){
		$(this).parent().children("input").removeClass("selected");
		$(this).hide();
		$(this).parent().children("input:not(.jscolor)").hide();
		$(this).parent().children("label").hide();
		$(this).parent().children("a.next").hide();
		if($(this).parent().children("a.previous").index($(this)) == 0){
			$($($(this).parent().children("input"))[3]).show();
			$($($(this).parent().children("label"))[3]).show();
			$(this).siblings("label").addClass("selec");
			$($($(this).parent().children("a.next"))[3]).show();
			$($($(this).parent().children("a.previous"))[3]).show();
			$($(this).parent().children("input")[3]).addClass("selected");
			$($($(this).parent().children("input"))[3]).focus();
		}
		else{
			$($($(this).parent().children("input"))[$(this).parent().children("a.previous").index($(this)) - 1]).show();
			$($($(this).parent().children("label"))[$(this).parent().children("a.previous").index($(this)) - 1]).show();
			$($($(this).parent().children("label"))[$(this).parent().children("a.previous").index($(this)) - 1]).addClass("selec");
			$($($(this).parent().children("a.next"))[$(this).parent().children("a.previous").index($(this)) - 1]).show();
			$($($(this).parent().children("a.previous"))[$(this).parent().children("a.previous").index($(this)) - 1]).show();
			$($(this).parent().children("input")[$(this).parent().children("a.previous").index($(this)) - 1]).addClass("selected");
			$($($(this).parent().children("input"))[$(this).parent().children("a.previous").index($(this)) - 1]).focus();
		}
	});
	/*$("body").on("blur", "span.input input",function(){
		$(this).parent().children("input").removeClass("selected");
	});*/
	$("body").on("click", "span.input.parameterized a.delete",function(){
		var index = $("span.input").index($(this).parent());
		console.log(index);
		console.log(curves);
		if($("span.input").length > 1){
			var index = $("span.parameterized").index($(this).parent());
			$(this).parent().remove();
			for(var i = 0; i < $("span.parameterized").length; i++){
				$($($("span.parameterized")[i]).children("label.xt")).html('&#92;( x_{' + (i + 1) + '}(t) &#92;)');
				$($($("span.parameterized")[i]).children("label.yt")).html('&#92;( y_{' + (i + 1) + '}(t) &#92;)');
			}
			MathJax.Hub.Queue(["Typeset",MathJax.Hub, "parameters"]);
		}
		console.log(curves);
	});
	$("body").on("change", ".jscolor",function(){
		curves[$("span.input").index($(this).parent())].color = "#" + $(this).val();
	})
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
		subdivide((cwidth/thestep)*txs, -(cwidth/thestep)*txs, 800, val);
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

