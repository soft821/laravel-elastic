<?php
declare(strict_types=1);

?>
<!DOCTYPE html>
<html lang="da-DK">
<head>
    <meta charset="utf-8">
</head>
<body>
<h1>An error happened</h1>

<p>Timestamp: {{ \Carbon\Carbon::now() }}</p>

<p>Details about the error:</p>

<pre>{{ $errorDetails }}</pre>

</body>
</html>