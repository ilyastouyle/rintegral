<!DOCTYPE html>
<html>
<head>
	<title>Plotting!</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<img src="riemann.svg" width="275">
<div id="parameters">
	<label>f(x) = </label>
	<input id="function" type="text" value="2*cos([x]^[10]) + sin(3*x + 5)">
	<label>a = </label><input type="text" id="a" maxlength="6" value="-1">
	<label>b = </label><input type="text" id="b" maxlength="5" value="1">
	<label>n = </label><input type="text" id="n" maxlength="5" value="10">
	<a id="plot" class="control">Plot!</a>
</div>
<div id="main">
	<nav id="controlbar">
		<a id="zoomin"><i class="fa fa-search-plus"></i><span> Zoom in</span></a>
		<a id="zoomout"><i class="fa fa-search-minus"></i><span> Zoom out</span></a>
		<a id="settings"><i class="fa fa-cog"></i><span> Settings</span></a>
		<a id="go-left"><i class="fa fa-arrow-left"></i><span> Go left</span></a>
		<a id="go-right"><i class="fa fa-arrow-right"></i><span> Go right</span></a>
		<a id="go-up"><i class="fa fa-arrow-up"></i><span> Go up</span></a>
		<a id="go-down"><i class="fa fa-arrow-down"></i><span> Go down</span></a>
		<a id="center"><i class="fa fa-arrows"></i><span> Center</span></a>
		<div id="settingsdiv">
			<table>
				<tr>
					<td id="curvesettings">
						<label>Curve's color: </label><br/><br/>
						<a class="color black"><i class="fa fa-check"></i></a>
						<a class="color pomegranate"><i class="fa fa-check"></i></a>
						<a class="color madison"><i class="fa fa-check"></i></a>
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
						<a class="color madison"><i class="fa fa-check"></i></a>
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
	<canvas id="graph" width="850" height="420" tabindex = "1"></canvas>
</div>
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