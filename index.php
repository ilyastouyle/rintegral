<!DOCTYPE html>
<html>
<head>
	<title>Plotting!</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<header>
	<img src="riemann.svg" width="275">
</header>
<div id="parameters">
	<label>f(x) = </label>
	<input id="function" type="text" value="sin(2*x) + 4*cos(x)">
	<label>a = </label><input type="text" id="a" maxlength="6" value="-1">
	<label>b = </label><input type="text" id="b" maxlength="5" value="1">
	<label>n = </label><input type="text" id="n" maxlength="5" value="150">
	<a id="plot" class="control"><i class="fa fa-pencil-square"></i> | Plot </a>
</div>
<div id="main">
	<nav id="controlbar">
		<div id="upperdiv">
			<nav id="buttons">
				<a id="zoomin"><i class="fa fa-search-plus"></i></a>
				<a id="zoomout"><i class="fa fa-search-minus"></i></a>
				<a id="settings"><i class="fa fa-cog"></i></a>
				<span id="status">Yellow colonel! </span>
				<span id="label">Hover bitch </span>	
				<a id="go-left"><i class="fa fa-arrow-left"></i></a>
				<a id="go-right"><i class="fa fa-arrow-right"></i></a>
				<a id="go-up"><i class="fa fa-arrow-up"></i></a>
				<a id="go-down"><i class="fa fa-arrow-down"></i></a>
				<a id="center"><i class="fa fa-arrows"></i></a>
			</nav>
		</div>
		<div id="settingsdiv" tabindex="2">
			<table>
				<tr>
					<td id="curvesettings">
						<label>Curve's color: </label><br/><br/>
						<a class="color black"><i class="fa fa-check"></i></a>
						<a class="color pomegranate"><i class="fa fa-check"></i></a>
						<a class="color wistful"><i class="fa fa-check"></i></a>
						<a class="color eucalyptus"><i class="fa fa-check"></i></a>
						<a class="color ecstasy"><i class="fa fa-check"></i></a>
						<a class="color sandstorm"><i class="fa fa-check"></i></a><br/><br/>
						<label>Curve's line width: </label><br/><br/>
						<a class="thickness verythin"><i class="fa fa-check"></i> Very thin</a>
						<a class="thickness thin"><i class="fa fa-check"></i> Thin</a>
						<a class="thickness regular"><i class="fa fa-check"></i> Regular</a>
						<a class="thickness thick"><i class="fa fa-check"></i> Thick</a>
					</td>
					<td id="rectanglesettings">
						<label>Rectangles' color: </label><br/><br/>
						<a class="color black"><i class="fa fa-check"></i></a>
						<a class="color pomegranate"><i class="fa fa-check"></i></a>
						<a class="color wistful"><i class="fa fa-check"></i></a>
						<a class="color eucalyptus"><i class="fa fa-check"></i></a>
						<a class="color ecstasy"><i class="fa fa-check"></i></a>
						<a class="color sandstorm"><i class="fa fa-check"></i></a><br/><br/>
						<label>Rectangles' line width: </label><br/><br/>
						<a class="thickness verythin"><i class="fa fa-check"></i> Very thin</a>
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
		<canvas id="toplayer" width="1200" height="420" tabindex = "0"></canvas>
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
<script src="js/jquery.js"></script>
<script src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/plot.js"></script>
</html>