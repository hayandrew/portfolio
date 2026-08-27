<?php 

function makeLinks($str) {
	$reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
	$urls = array();
	$urlsToReplace = array();
	if(preg_match_all($reg_exUrl, $str, $urls)) {
		$numOfMatches = count($urls[0]);
		$numOfUrlsToReplace = 0;
		for($i=0; $i<$numOfMatches; $i++) {
			$alreadyAdded = false;
			$numOfUrlsToReplace = count($urlsToReplace);
			for($j=0; $j<$numOfUrlsToReplace; $j++) {
				if($urlsToReplace[$j] == $urls[0][$i]) {
					$alreadyAdded = true;
				}
			}
			if(!$alreadyAdded) {
				array_push($urlsToReplace, $urls[0][$i]);
			}
		}
		$numOfUrlsToReplace = count($urlsToReplace);
		for($i=0; $i<$numOfUrlsToReplace; $i++) {
			$str = str_replace($urlsToReplace[$i], "<a href=\"".$urlsToReplace[$i]."\">".$urlsToReplace[$i]."</a> ", $str);
		}
		return $str;
	} else {
		return $str;
	}
}

function buildBaseString($baseURI, $method, $params) {
	$r = array();
	ksort($params);
	foreach($params as $key=>$value){
		$r[] = "$key=" . rawurlencode($value);
	}
	return $method."&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
}

function buildAuthorizationHeader($oauth) {
	$r = 'Authorization: OAuth ';
	$values = array();
	foreach($oauth as $key=>$value)
		$values[] = "$key=\"" . rawurlencode($value) . "\"";
	$r .= implode(', ', $values);
	return $r;
}

function _ago($tm,$rcs = 0) {
   $cur_tm = time(); $dif = $cur_tm-$tm;
   $pds = array('second','minute','hour','day','week','month','year','decade');
   $lngh = array(1,60,3600,86400,604800,2630880,31570560,315705600);
   for($v = sizeof($lngh)-1; ($v >= 0)&&(($no = $dif/$lngh[$v])<=1); $v--); if($v < 0) $v = 0; $_tm = $cur_tm-($dif%$lngh[$v]);

   $no = floor($no); if($no <> 1) $pds[$v] .='s'; $x=sprintf("%d %s ",$no,$pds[$v]);
   if(($rcs == 1)&&($v >= 1)&&(($cur_tm-$_tm) > 0)) $x .= time_ago($_tm);
   return $x;
}

function returnTweet(){

	$oauth_access_token = "256682062-phJqKeSCLetNoMmTPsZ45aCcPgoQnNH7m2LTkHfz";
	$oauth_access_token_secret = "gDZfCn43CVRqh0pzZ02niKeU1jnQ3clz42KxSlegidNEv";
	$consumer_key = "QGqGVbPE9UEuvmb71qS1A";
	$consumer_secret = "9Yud1J3l6W2sQ6AI9pRsbaXHfBntIjggcxYCgrDNJs";

	$twitter_timeline           = "user_timeline";  //  mentions_timeline / user_timeline / home_timeline / retweets_of_me
	//  create request
	$request = array(
			'screen_name'       => 'superandystar',
			'count'             => '1'
	);
	$oauth = array(
			'oauth_consumer_key'        => $consumer_key,
			'oauth_nonce'               => time(),
			'oauth_signature_method'    => 'HMAC-SHA1',
			'oauth_token'               => $oauth_access_token,
			'oauth_timestamp'           => time(),
			'oauth_version'             => '1.0'
	);
	//  merge request and oauth to one array
	$oauth = array_merge($oauth, $request);
	//  do some magic
	$base_info              = buildBaseString("https://api.twitter.com/1.1/statuses/$twitter_timeline.json", 'GET', $oauth);
	$composite_key          = rawurlencode($consumer_secret) . '&' . rawurlencode($oauth_access_token_secret);
	$oauth_signature            = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
	$oauth['oauth_signature']   = $oauth_signature;
	//  make request
	$header = array(buildAuthorizationHeader($oauth), 'Expect:');
	$options = array( CURLOPT_HTTPHEADER => $header,
			CURLOPT_HEADER => false,
			CURLOPT_URL => "https://api.twitter.com/1.1/statuses/$twitter_timeline.json?". http_build_query($request),
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false);
	$feed = curl_init();
	curl_setopt_array($feed, $options);
	$json = curl_exec($feed);
	curl_close($feed);
	return json_decode($json, true);
}
$tweets = returnTweet();
#var_dump($tweets);

#foreach($tweets[0] as $item) {
#	echo $item;
#}

$tweet = makeLinks($tweets[0]['text']);
$tweet = str_replace(' /','',$tweet);
$tweet = str_replace('/ ','',$tweet);
$tweet = str_replace('>http://','>',$tweet);

$date = $tweets[0]['created_at'];
$time = strtotime($date);
$h_time = _ago( $time );
?>

<?php echo $tweet;?>
<div class="ago"><a href="https://twitter.com/superandystar" target="_blank">@superandystar</a> | <?php echo $h_time;?> ago</div>