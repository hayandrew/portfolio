<!-- Copyright Andy Hay 2012 -->
<meta name="robots" content="index,follow" />
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Andy Hay - Portfolio</title>
<meta name="keywords" content="andy,hay,portfolio,new,york,city,nyc,javascript,jquery,html5,html,css3,css,web,developer,development,ui,ux,designer,design,php,mysql,flash,user,interface,user,experience,illustrator,illustration" />
<meta name="description" content="View the portfolio of Andy Hay. Javascript developer, UI/UX designer, and illustrator living in New York City." />
<meta name="author" content="Andy Hay" />
<meta name="viewport" content="user-scalable=no" />
<meta name="Resource-type" content="Document" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php include('meta-icons.php'); ?>
<?php
$time = microtime();
$time = explode(" ", $time);
$time = $time[1] + $time[0];
$start = $time;
include  './inc/utils/Mobile_Detect.php';
$detect = new Mobile_Detect();
if($detect->isTablet()){
	$detected = "true";
} else if ($detect->isMobile()) {
	$detected = "true";
} else {
	$detected = "false";
}
?>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=Copse'>
<link rel="stylesheet" type="text/css" href="./assets/build/base.min.css">
<script>
	if (!window.ah) window.ah = {};
	ah.mobile = <?= $detected ?>;
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
<script type="text/javascript" src="./assets/build/base.min.js"></script>