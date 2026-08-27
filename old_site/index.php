<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<?php include('./inc/head.php'); ?>
</head>

<body>
<!--<div class="menu">☰</div>-->

<div id="fullpage">
	<div class="section" id="section0">
		<?php include('./inc/sections/andyhay-logo.php'); ?>
	</div>
	<div class="section" id="section1">
		<?php include('./inc/sections/aboutme.php'); ?>
	</div>
	<div class="section" id="section2">
		<?php include('./inc/sections/earl.php'); ?>
	</div>
	<div class="section" id="section3">
		<?php include('./inc/sections/websites.php'); ?>
	</div>
	<div class="section" id="section4">
		<?php include('./inc/sections/illustration.php'); ?>
	</div>
</div>
<?php include('./inc/menu.php'); ?>
<script type="text/javascript">
	$(document).ready(function(){
		$('#fullpage').fullpage({
			sectionsColor: ['transparent','#1bbc9b', '#4BBFC3', '#7BAABE'],
			css3: true,
			'navigation': true,
			'navigationPosition': 'right',
			'navigationTooltips': ['Home', 'About Me', 'Earl', 'Websites', 'Illustration'],
			anchors: ['home','earl','websites','illustration','aboutme']
		});
		$('#menu').slicknav({
			label: '',
			duplicate: false
		});
	});
</script>
</body>
<!--
<?php
// Place this part at the very end of your page

$time = microtime();
$time = explode(" ", $time);
$time = $time[1] + $time[0];
$finish = $time;
$totaltime = ($finish - $start);
printf ("This page took %f seconds to load.", $totaltime);
?>
-->
</html>