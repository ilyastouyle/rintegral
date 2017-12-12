<!DOCTYPE html>
<html>
<head>
	<title>Plotting!</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">
	<link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.css">
</head>
<body>
<header>
		<img src="drawing.svg" width="110" height="100" ></br>
</header>
<div id="parameters">
	<span class = "input function">
		<a href="#" class="delete"><i class = "fa fa-cut"></i></a>
		<a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a>
		<a href="#" class="edit">Edit</a>
		<a href="#" class="save">Save</a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="fx">\(f_{1}(x)\)</label>
		<input class="f" type="text" placeholder="sin(cos(x) - 1)">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="value">\(a\)</label><input class ="value" type="text" id="a" maxlength="8" value="" placeholder = "-5">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="value">\(b\)</label><input class ="value" type="text" id="b" maxlength="8" value="" placeholder = "5">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="value">\(n\)</label><input class ="value" type="text" id="n" maxlength="5" value="" placeholder = "100">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<input class="jscolor" value="#1E8BC3">
	</span>
	<span class = "input parameterized">
		<a href="#" class="delete"><i class = "fa fa-cut"></i></a>
		<a href="#" class="dropdown"><i class="fa fa-angle-down fa-lg"></i></a>
		<a href="#" class="edit">Edit</a>
		<a href="#" class="save">Save</a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="xt">\( x_{1}(t) \)</label><input class="x" type="text" placeholder="cos(t)">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="yt">\( y_{1}(t) \)</label><input class="y" type="text" placeholder="sin(t)">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="value">\(a\)</label><input class ="value" type="text" id="a" maxlength="8" value=""
		placeholder="-4">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<a href="#" class="previous"><i class="fa fa-angle-left fa-lg"></i></a>
		<label class="value">\(b\)</label><input class ="value" type="text" id="b" maxlength="8" value=""
		placeholder="4">
		<a href="#" class="next"><i class="fa fa-angle-right fa-lg"></i></a>
		<input class="jscolor" value="#3A539B">
	</span>
</div>
<div id="fsettings">
	<div class="row">
		<div class="column">
			<label>Curve thickness: </label>
			<span class="scontainer"><span class ="thickness" id="thn"></span></span>
			<span class="scontainer selected"><span class ="thickness" id="md"></span></span>
			<span class="scontainer"><span class ="thickness" id="thk"></span></span>
		</div>
		<div class="column">
			<label>Divide into: </label>
			<input type="text" id="divide" placeholder="20" maxlength="3"><button id="divideb">Divide</button>
		</div>
		<div class="column">
			<label>Dash size & spacing: </label>
			<input id="dash" placeholder="3"> &
			<input id="spacing" placeholder="2">
		</div>
	</div>
	<div class="row two">
		<div class="column">
			<label>Animation style: </label>
			<button id="noanim">No animation</button>
			<button id="completeb">Complete</button>
			<button id="chase">Chase</button>
			<button id="morph">Morph</button>
		</div>
		<div class="column">
			<label>Duration: </label>
			<input type="text" name="duration"> seconds
		</div>
	</div>
	<div class="row">
		<div class="column">
			<button id="resetb">Reset</button>
			<button id="saveb">Save!</button>
		</div>
	</div>
</div>
<div id="main">
	<nav id="controlbar">
		<div id="upperdiv">
			<nav id="wrapper">
				<nav id="buttons">
					<a id="zoomin"><i class="fa fa-search-plus"></i></a>
					<ahahahah I am not walakin id="zoomout"><i class="fa fa-search-minus"></i></a>
					<a id="settings"><i class="fa fa-cog"></i></a>
					<span id="status">Yellow colonel! </span>
					<span id="label">Hover bitch </span>	
					<a id="go-left"><i class="fa fa-arrow-left"></i></a>
					<a id="go-right"><i class="fa fa-arrow-right"></i></a>
					<a id="go-up"><i class="fa fa-arrow-up"></i></a>
					<a id="go-down"><i class="fa fa-arrow-down"></i></a>
					<a id="center"><i class="fa fa-arrows"></i></a>
				</nav>
				<nav id="controlbuttons">
					<a id="add"> Add function</a>
					<a id="addp"> Add curve</a>
					<a id="plot"><i class="fa fa-pencil-square"></i> Plot </a>
					<a id="save"><i class="fa fa-save"></i> Save Canvas</a>
				</nav>
			</nav>
		</div>
		<div id="settingsdiv" tabindex="2">
			<table>
				<tr>
					<td id="curvesettings">
						<label>Curve's color: </label><br/><br/>
						<br/><a class="color black"><i class="fa fa-check"></i></a>
						<a class="color pomegranate"><i class="fa fa-check"></i></a>
						<a class="color wistful"><i class="fa fa-check"></i></a>
						<a class="color eucalyptus"><i class="fa fa-check"></i></a>
						<a class="color ecstasy"><i class="fa fa-check"></i></a>
						<a class="color sandstorm"><i class="fa fa-check"></i></a><br/><br/>
						<br/><label>Curve's line width: </label><br/><br/>
						<br/><a class="thickness verythin"><i class="fa fa-check"></i> Very thin</a>
						<a class="thickness thin"><i class="fa fa-check"></i> Thin</a>
						<a class="thickness regular"><i class="fa fa-check"></i> Regular</a>
						<a class="thickness thick"><i class="fa fa-check"></i> Thick</a>
					</td>
					<td id="rectanglesettings">
						<label>Rectangles' color: </label><br/><br/>
						<br/><a class="color black"><i class="fa fa-check"></i></a>
						<a class="color pomegranate"><i class="fa fa-check"></i></a>
						<a class="color wistful"><i class="fa fa-check"></i></a>
						<a class="color eucalyptus"><i class="fa fa-check"></i></a>
						<a class="color ecstasy"><i class="fa fa-check"></i></a>
						<a class="color sandstorm"><i class="fa fa-check"></i></a><br/><br/>
						<br/><label>Rectangles' line width: </label><br/><br/>
						<br/><a class="thickness verythin"><i class="fa fa-check"></i> Very thin</a>
						<a class="thickness thin"><i class="fa fa-check"></i> Thin</a>
						<a class="thickness regular"><i class="fa fa-check"></i> Regular</a>
						<a class="thickness thick"><i class="fa fa-check"></i> Thick</a>
					</td>
				</tr>
			</table>
		</div>
	</nav>
</div>
<article>
	<div id="wrapper">
		<canvas id="graph" width="1200" height="420" tabindex = "1"></canvas>
		<canvas id="toplayer" width="1200" height="420" tabindex="2"></canvas>
	</div>
</article>
<footer>
	<nav>
		<a href="plot.php">Home</a> -
		<a href="about.php">About</a> -
		<a href="more.php">More</a>
	</nav>
</footer>
</body>
<script src="js/jscolor.js"></script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>
<script src="node_modules/mathjax/MathJax.js"></script>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.cookie.js"></script>
<script src="canvas2image.js"></script>
<script src="js/fraction.js"></script>
<script type="text/javascript" src="js/plot.js"></script>
</html>