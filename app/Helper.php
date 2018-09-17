<?php

if (!function_exists('_dd')) {
	function _dd($args)
	{
		http_response_code(500);
		dd($args);
	}
}

?>