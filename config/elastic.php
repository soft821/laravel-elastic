<?php
declare(strict_types=1);

return [
	'username' => env('ELASTIC_USERNAME'),
	'password' => env('ELASTIC_PASSWORD'),
	'url' => env('ELASTIC_URL'),
	'max_body_size' => env('ELASTIC_MAX_BODY_SIZE')
];
