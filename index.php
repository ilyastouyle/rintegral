<!DOCTYPE html>
<html>
<head>
	<title>Plotting!</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<img src="riemann.svg" width="275">
<div id="parameters">
	<label>f(x) = </label>
	<input id="function" type="text" value="x^2">
	<label>a = </label><input type="text" id="a" maxlength="3">
	<label>b = </label><input type="text" id="b" maxlength="4">
	<label>n = </label><input type="text" id="n" maxlength="4">
	<a id="plot" href="##">Plot!</a>
</div>
<canvas id="graph" width="850" height="420">
	
</canvas>
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