<!DOCTYPE html>
<html>
<head>
	<title>Plotting!</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<img src="riemann.svg" width="275">
<div id="parameters">
	<label>f(x) = </label>
	<input id="function" type="text" value="x^2">
	<label>a = </label><input type="text" id="a" maxlength="6" value="-1">
	<label>b = </label><input type="text" id="b" maxlength="5" value="1">
	<label>n = </label><input type="text" id="n" maxlength="5">
	<a id="plot" class="control">Plot!</a>
</div>
<div id="main">
	<nav id="controlbar">
		<a id="zoomin"><i class="fa fa-search-plus"></i></a>
		<a id="zoomout"><i class="fa fa-search-minus"></i></a>
		<a id="settings"><i class="fa fa-cog"></i></a>
		<a id="go-left"><i class="fa fa-chevron-left"></i></a>
		<a id="go-right"><i class="fa fa-chevron-right"></i></a>
		<a id="go-up"><i class="fa fa-chevron-up"></i></a>
		<a id="go-down"><i class="fa fa-chevron-down"></i></a>
		<a id="center">Center</a>
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
<script type="text/javascript" src="js/plot.js"></script>
</html>